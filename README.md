# juejin-theme
掘金 markdown 主题开发工具

如何贡献主题：https://github.com/linxsbox/juejin-markdown-themes

## 使用说明
此工具为便于开发掘金 markdown 主题，可同步将样式（编译后）应用到到文章上。

clone 此仓库本地，将 **样式文件名** 修改为自己的即可。

```js
// index.js
// 参数为样式文件
run('cyanosis.scss');
```

启动预览
```bash
npm run dev
```

## 同步样式文件
将编写好的样式文件同步到你的主题仓库

```js
// 本主题样式文件：cyanosis.scss
// 样式主题项目目录：可用相对路径和绝对路径，请保留尾部 斜杠/

copyFile('cyanosis.scss', '../juejin-markdown-theme-cyanosis/');
```

同步命令
```bash
npm run cp
```

## 感谢
[@youngjuning](https://github.com/youngjuning) | [同步源仓库方案](https://github.com/youngjuning/youngjuning/issues/30)

## License
MIT