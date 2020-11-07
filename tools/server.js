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
const fetch = require('node-fetch');

// 实例化 koa 和路由
const app = new koa();
const router = new koaRouter();

let socketItem;
const filePath = file => path.join(__dirname, `../${file}`);

async function run(file, articleId) {
  const fetchData = await fetcthArticleData(articleId);
  const data = await parseMarkdown(fetchData);
  // console.log(data);

  watchFile(file);
  koaServer(data);

  const server = http.createServer(app.callback());
  const io = socketio(server);
  io.on('connection', socket => { socketItem = socket; });
  // console.dir(server);

  console.log('请勿短时间内多次启动，掘金 API 接口有访问限制！');
  console.log('恶意多次调用掘金 API 接口导致被封 IP 概不负责！');
  console.log('为减少频繁渲染，在 2 秒内多次变更文件将不会生效！');

  server.listen(3000, () => { console.log('http://localhost:3000'); });
}

function watchFile(file) {
  // 启用子线程执行 scss 监听
  const execCmd = `npx sass --watch ./${file}:./static/juejin.css`;
  child_process.exec(execCmd);

  // 监听编译后的文件变化
  const watcherFile = chokidar.watch(filePath('static/*.css'), {});
  watcherFile.on('change', () => { app.emit('change'); });
}

function koaServer(data) {
  let changing = false;
  // 静态文件服务 & 模板服务
  app.use(statics(filePath('static')));
  app.use(views(filePath('views'), { map: { html: 'ejs' } }));

  // 路由
  router.get('/', async ctx => { await ctx.render('index', { data }); });

  app.on('change', () => {
    if (!changing) {
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

async function fetcthArticleData(article_id) {
  const req = await fetch('https://apinew.juejin.im/content_api/v1/article/detail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'access-control-request-headers': 'content-type',
      'access-control-request-method': 'POST',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      origin: 'https://juejin.im',
      referer: 'https://juejin.im/',
    },
    body: JSON.stringify({
      article_id
    })
  });

  const jsonData = await req.json();
  const pageData = jsonData?.data?.article_info;
  return pageData?.content || pageData?.mark_content;
}

async function parseMarkdown(fetchData) {
  return new Promise((resolve, reject) => {
    remark().use(remarkHTML).process(fetchData, (err, file) => {
      if (err) { reject(); }
      resolve(String(file));
    });
  });
}

module.exports = run;
