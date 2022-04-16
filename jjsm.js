#!/usr/bin/env node

const {version, description, author, bugs} = require('./package.json')

console.log(`\x1b[1;32m${description} v${version}\x1b[0m`);
console.log('作者', `林小帅（${author}）\n`);
console.log('如有使用问题 Issues ->', `\x1b[34m${bugs.url}\x1b[0m`);
console.log('深色模式为 juejin-theme-devtool 作者私有实现，非官方支持！');
console.log('深色模式切换的 chrome 插件目前正在开发中……\n');

const viewServer = require('./tools/server.js');
viewServer.run(process.argv.slice(2));
