# juejin-theme-devtool
掘金 markdown 主题开发工具

如何贡献主题：https://github.com/linxsbox/juejin-markdown-themes

## 使用说明
此工具为便于开发掘金 markdown 主题，可同步将样式（编译后）应用到到文章上预览。

已经正式 publish 到 npm 上，可以直接使用如下命令，而不需要再克隆这个项目。

```bash
cd <yourThemeProject>
npx juejin-theme-devtool <yourStyleFile>
```

`注意：第一次启动会有编译时间，约 1~2 秒`

每次编写完成后保存会同步编译并渲染至页面，为减少频繁渲染，在 2 秒内多次变更文件将不会执行渲染操作。

## License
MIT