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
async function run(file) {
  // '6844904170709843975' '6865308620876808199'
  const fetchData = await fetcthArticleData('6865308620876808199');
  const data = await parseMarkdown(fetchData);
  // console.log(data);

  watchFile();
  koaServer(data);

  const server = http.createServer(app.callback());
  const io = socketio(server);
  io.on('connection', socket => { socketItem = socket; });
  // console.dir(server);
  server.listen(3000, () => { console.log('http://localhost:3000'); });
}

function watchFile() {
  // 启用子线程执行 scss 监听
  const execCmd = `npx sass --watch ./${file}:./static/juejin.css`;
  child_process.exec(execCmd);

  // 监听编译后的文件变化
  const watcherFile = chokidar.watch(path.join(__dirname, './static/*.css'), {});
  watcherFile.on('change', () => { app.emit('change'); });
}

function koaServer(data) {
  let changing = false;
  // 静态文件服务 & 模板服务
  app.use(statics(path.join(__dirname, './static')));
  app.use(views(path.join(__dirname, './views'), { map: { html: 'ejs' } }));

  // 路由
  router.get('/', async ctx => { await ctx.render('index', { data }); });

  app.on('change', () => {
    if (!changing) {
      socketItem.emit('reload');
      changing = true;
      let st = setTimeout(() => {
        changing = false;
        clearTimeout(st);
      }, 1000);
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

run('cyanosis.scss');
