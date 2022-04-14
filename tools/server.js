const koa = require('koa');
const koaRouter = require('koa-router');
const views = require('koa-views');
const statics = require('koa-static');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const child_process = require('child_process');
const chokidar = require('chokidar');
const remark = require('remark');
const remarkHTML = require('remark-html');
const remargfm = require('remark-gfm');
const remarkFootnotes = require('remark-footnotes');
const remarkFrontmatter = require('remark-frontmatter');
const remarkMath = require('remark-math');
const remarKatex = require('remark-html-katex');

// const fetch = require('node-fetch');
const fs = require('fs');

// 实例化 koa 和路由
const app = new koa();
const router = new koaRouter();

let socketItem;
let isDefault = true;
const filePath = file => path.join(__dirname, `../${file}`);

let isExisted = async function (filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, (err) => {
      err ? reject(false) : resolve(true);
    });
  }).catch(err => err);
};

let cleanCache = async () => {
  const cacheFiles = [
    path.resolve(__dirname, '../static/juejin.css'),
    path.resolve(__dirname, '../static/juejin.css.map')
  ];
  const taskList = cacheFiles.map(item => {
    return new Promise((resolve, reject) => {
      fs.unlink(item, (err) => { err ? reject(err) : resolve(true); });
    });
  });
  return Promise.all(taskList)
    .then(res => {
      if (res[0] && res[1]) { console.log('缓存记录已清除！'); return true; }
    })
    .catch(() => { console.log('没有缓存可清除！'); return false });
}

async function run(filePath) {
  let tempFielPath = '';
  if (filePath.length > 0) {
    if (filePath[0] === 'clean') {
      return await cleanCache();
    }
    tempFielPath = path.resolve('', filePath[0]);
    isDefault = false;
  } else {
    console.log('Tips:');
    console.log('  - 未指定样式文件，将以默认样式执行渲染结果！');
    console.log('  - 命令: \x1B[32mnpx jjsm <file>\x1B[39m\n');
    tempFielPath = path.resolve(__dirname, '../juejin.scss');
  }

  if (!isDefault && !await isExisted(tempFielPath)) {
    console.log('Tips:');
    console.log('  - 未能读取正确的样式文件，请检查文件名是否正确！');
    console.log('  - 目前支持 SASS、SCSS 和 CSS');
    return;
  }

  const dmData = await readMarkdownTemplate();
  const data = await parseMarkdown(dmData);

  watchFile(tempFielPath);
  koaServer(data);

  const server = http.createServer(app.callback());
  const io = socketio(server);
  io.on('connection', socket => { socketItem = socket; });
  // console.dir(server);

  server.listen(3000, () => { console.log('Local: \x1B[96mhttp://localhost:3000\x1B[39m'); });
}

function watchFile(file) {

  // 启用子线程执行 scss 监听
  const execCmd = `npx sass --watch ${file}:${path.resolve(__dirname, '../static/juejin.css')}`;
  // console.log(execCmd);
  child_process.exec(execCmd, (cperr, stdout, stderr) => {
    console.error('[Error] ', cperr);
    console.log('[Error] stdout info: ', stdout);
    console.log('[Error] stderr info: ', stderr);
  });

  // 监听编译后的文件变化
  // , filePath('static/template.md')
  const watcherFile = chokidar.watch([filePath('static/*.css')], {});
  watcherFile.on('change', path => { app.emit('change'); });
}

function koaServer(data) {
  let changing = false;
  // 静态文件服务 & 模板服务
  app.use(statics(filePath('static')));
  app.use(views(filePath('views'), { map: { html: 'ejs' } }));

  // 路由
  router.get('/', async ctx => { await ctx.render('index', { data }); });

  app.on('change', async () => {
    if (!changing) {
      const dmData = await readMarkdownTemplate();
      data = await parseMarkdown(dmData);

      if (!socketItem) return
      socketItem.emit('reload');
      changing = true;
      let st = setTimeout(() => {
        changing = false;
        clearTimeout(st);
      }, 2000);
    }
  });

  app.use(router.routes());
  app.use(router.allowedMethods());
}

async function readMarkdownTemplate() {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath('static/template.md'), (err, data) => {
      data && !err ? resolve(data) : reject(new Error('读取 markdown 文件模板错误！'));
    });
  });
}

async function parseMarkdown(data) {
  return new Promise((resolve, reject) => {
    remark()
      .use(remargfm)
      .use(remarkFootnotes, { inlineNotes: true })
      .use(remarkFrontmatter, ['yaml', 'toml'])
      .use(remarkMath)
      .use(remarKatex)
      .use(remarkHTML)
      .process(data, (err, file) => {
        if (err) { reject(); }
        resolve(String(file));
      });
  });
}

module.exports.run = run;
