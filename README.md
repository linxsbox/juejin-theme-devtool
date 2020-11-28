# juejin-theme-devtool
掘金 markdown 主题开发工具

如何贡献主题：https://github.com/linxsbox/juejin-markdown-themes

## 使用说明
此工具为便于开发掘金 markdown 主题，可同步将样式（编译后）应用到到文章上预览。

### 1. clone & 启用

```bash
git clone https://github.com/linxsbox/juejin-theme-devtool

cd juejin-theme-devtool

npm install . -g
```

### 2. 开发 & 预览结果

进入待开发的主题仓库

```bash
# 例：我的掘金主题仓库
cd juejin-markdown-theme-cyanosis
```

使用 `npx jjsm <file>` 启动
```bash
# 例：cyanosis.scss 是我的主题文件 
npx jjsm cyanosis.scss

# 如未指定主题文件，则使用默认的样式渲染。
# 如有记录，则优先使用上次记录的样式渲染。
npx jjsm
```

`注意：第一次启动会有编译时间，约 1~2 秒`

每次编写完成后保存会同步编译并渲染至页面，为减少频繁渲染，在 2 秒内多次变更文件将不会执行渲染操作。

### 3. 清理缓存的样式文件
```
npx jjsm clean
```

## License
MIT