**Markdown 是一种轻量级的「标记语言」**

> Markdown是一种轻量级标记语言，创始人为约翰·格鲁伯（英语：John Gruber）。 它允许人们使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML（或者HTML）文档。这种语言吸收了很多在电子邮件中已有的纯文本标记的特性。
>   
> 由于Markdown的轻量化、易读易写特性，并且对于图片，图表、数学式都有支持，目前许多网站都广泛使用Markdown来撰写帮助文档或是用于论坛上发表消息。 如GitHub、Reddit、Diaspora、Stack Exchange、OpenStreetMap 、SourceForge、简书等，甚至还能被使用来撰写电子书。
>  
> —— form [百度百科 Markdown](https://baike.baidu.com/item/markdown/3245829?fr=aladdin)

**我们非常建议掘友使用 Markdown 编辑器来写作文章**

掘金 Markdown 编辑器整合了 Markdown 标准语法，可以看[官方文档](https://www.markdownguide.org/basic-syntax/)。也非常建议使用标准语法。

---

# Markdown 基本样式 & 预览

## 标题样式

# 标题H1 -> \# + 空格 + 文字
## 标题H2 -> \#\# + 空格 + 文字
### 标题H3 -> \#\#\# + 空格 + 文字
### 标题H4 -> \#\#\#\# + 空格 + 文字
#### 标题H5 -> \#\#\#\#\# + 空格 + 文字
##### 标题H6 -> \#\#\#\#\#\# + 空格 + 文字

> 文章默认标题是 H1 级别，建议文章内标题以 H2 级别开始定义。

## 普通文本
我们都知道，对于世界上不同地区的各个民族来说，历史的发展进程是很不相同的。在上一次冰期结束后的 13000 年间，世界上的某些地区发展成为使用金属工具的、有文字的工业社会，另一些地区仅仅发展成为没有文字的农业社会，还有一些地区则仍然保留着使用石器的狩猎采集社会。

这种历史上的差异对现代世界投上了持久的阴影，因为使用金属工具的、有文字的社会征服了或消灭了其他类型的社会。虽然这些差异构成了世界史的最基本的事实，但产生这些差异的原因始终是不确定的和有争议的。关于这些差异的由来这个令人困惑的问题，是在 25 年前以一种简单的个人形式向我提出来的。

——贾雷德·戴蒙德 **《枪炮、病菌与钢铁》**

## 字符效果和横线等

| 文字效果 | 编写方式 |
| --- | :---: |
| ~~删除线~~ | \~\~删除线\~\~ `or` \<s\>标签包裹<\/s> | 
| *斜体字* | \*斜体字\* `or` \_斜体字\_ |
| **粗体字** | \*\*粗体\*\* `or` \_\_粗体\_\_ |
| ***粗斜体*** | \*\*\*粗斜体\*\*\* `or` \_\_\_粗斜体\_\_\_ |

> 文章内需要表达或着重要表示的文字字体

## 反斜杠
*没有转义*

\*我转义了\*

```markdown
*没有转义*

\*我转义了\*
```

> 基操，勿6

## 引用文本

> 使用引用文本，这里用于表示了一段文本内容

```markdown
> 使用引用文本，这里用于表示了一段文本内容
```

> **当然**也可以使用`其他的格式`与引用文本内容混合，需要注意格式和空格

## 锚点与链接

[普通链接](https://www.juejin.im/)

[普通链接带标题效果](https://juejin.im/ "这是连接标题")

直接链接：<https://juejin.im>

[锚点链接](https://juejin.im/#锚点)

[mailto:test.test@gmail.com](mailto:test.test@gmail.com)

```markdown
[普通链接](https://www.juejin.im/)

[普通链接带标题效果](https://juejin.im/ "这是连接标题")

直接链接：<https://juejin.im>

[锚点链接](https://juejin.im/#锚点)

[mailto:test.test@gmail.com](mailto:test.test@gmail.com)
```

> 不太建议在文章内容中直接留出私人或工作邮箱

## 多语言代码高亮

### 行内代码

执行命令：\`npm install marked\` -> `npm install marked`

### 代码块

```javascript
function test() {
	console.log("Hello world!");
}
```

```markdown
```javascript  
  function test() {  
    console.log("Hello world!");  
  }  
```// 英文重音符，非中文符号
```

> 由三个重音符号+语言名称为开始，三个重音符号为结束，中间包裹代码内容

### HTML 代码块

同上，即语言名称为 html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div>Hello World!!!</div>
  </body>
</html>
```

## 图片

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/791c77e9b61a4ae19589ae302d6c8e63~tplv-k3u1fbpfcp-zoom-1.image)

```
# 使用图片格式 -> ![](图片URL)
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/791c77e9b61a4ae19589ae302d6c8e63~tplv-k3u1fbpfcp-zoom-1.image)
```

> 暂时无法使用第三方图床，后续会有跟进，目前可拖动上传生成图片数据

## 分割线

使用三个 \-\-\- `or` \<hr\/\> 标签，且前后各换一行。

---

## 列表 Lists

### 无序列表（加/减号 or 星号）Unordered Lists (- or *)

- 列表一
- 列表二
- 列表三

+ 列表一
+ 列表二
+ 列表三

* 列表一
* 列表二
* 列表三

```markdown
- 列表一
- 列表二
- 列表三

+ 列表一
+ 列表二
+ 列表三

* 列表一
* 列表二
* 列表三
```

> 减号和星号开头 + 空格 + 文字都可以生成一个无序列表，不同符号会识别成多各列表

### 无序列表（嵌套）Unordered Lists (space 4)

- 列表一
- 列表二
    - 列表二-1
    - 列表二-2
    - 列表二-3
- 列表三
    - 列表一-1
    - 列表二-2
    - 列表三-3

```markdown
- 列表一
- 列表二
    - 列表二-1
    - 列表二-2
    - 列表二-3
- 列表三
    - 列表一-1
    - 列表二-2
    - 列表三-3
```

> 嵌套列表由 4 个空格缩进表示，可以多级嵌套

### 有序列表 Ordered Lists (Num.)

1. 第一行
2. 第二行
3. 第三行

```markdown
1. 第一行
2. 第二行
3. 第三行
```

> 有序列表也可以嵌套，格式同上

## HTML 特殊符号

| 符号 | 代码 | 符号 | 代码 |
| --- | --- | --- | --- |
| &copy; | \&copy; | &amp; | \&amp; |
| &uml; | \&uml; | &trade; | \&trade; |
| &iexcl; | \&iexcl; | &pound; | \&pound; |
| &lt; | \&lt; | &gt; | \&gt; |
| &yen; | \&yen; | &euro; | \&euro; |
| &reg; | \&reg; | &plusmn; | \&plusmn; |
| &para; | \&para; | &sect; | \&sect; |
| &brvbar; | \&brvbar; | &macr; | \&macr; |
| &laquo; | \&laquo; | &raquo; | \&raquo; |
| &times; | \&times; | &divide; | \&divide; |
| X&sup2; | \&sup2; | Y&sup3; | \&sup3; |
| &frac34; | \&frac34; | &frac14; | \&frac14; |
| &middot; | \&middot; | &ordm;C | \&ordm;C |
|  &quot; | \&quot; | &apos; | \&apos; |


## 绘制表格 Tables

| 掘金栏目 | 点赞量+++ | 文章数量 |
| --- | ---: | :---: |
| 前端 | 99999 | 我没数过 |
| 后端 | 99999 | 我也没数过 |
| 全栈 | 99999 | 我也也没数过 |

```markdown
# ---    默认左对齐
# ---:   右对齐
# :---:  居中对齐
| 掘金栏目 | 点赞量+++ | 文章数量 | # 表头
| --- | ---: | :---: |            # 对齐方式
| 前端 | 99999 | 我没数过 |        # 单元格
| 后端 | 99999 | 我也没数过 |
| 全栈 | 99999 | 我也也没数过 |
```

<table><thead><tr><th>掘金栏目</th><th align="right">点赞量+++</th><th align="center">文章数量</th></tr></thead><tbody><tr><td>前端</td><td align="right">99999</td><td align="center">我没数过</td></tr><tr><td>后端</td><td align="right">99999</td><td align="center">我也没数过</td></tr><tr><td>全栈</td><td align="right">99999</td><td align="center">我也也没数过</td></tr></tbody></table>

## GFM task list

- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2

```markdown
- [x] GFM task list 1
- [x] GFM task list 2
- [ ] GFM task list 3
    - [ ] GFM task list 3-1
    - [ ] GFM task list 3-2
    - [ ] GFM task list 3-3
- [ ] GFM task list 4
    - [ ] GFM task list 4-1
    - [ ] GFM task list 4-2
```

> 需要注意格式和空格位置

## 科学公式 TeX(LaTeX)

### 单行公式

$$E=mc^2$$

$$\sin(\alpha)^{\theta}=\sum_{i=0}^{n}(x^i + \cos(f))$$

```markdown
$$E=mc^2$$

$$\sin(\alpha)^{\theta}=\sum_{i=0}^{n}(x^i + \cos(f))$$
```

> 科学公式可由 2 个 $ 符号包裹组成，如有多个请注意使用反斜杠转义

### 多行公式（暂未支持）

```
```latex
f(x) = \int_{-\infty}^\infty
    \hat f(\xi)\,e^{2 \pi i \xi x}
    \,d\xi
```// 使用相关规范即可
```

> 与代码块相同，语言名称为：math `or` latex，但是暂未支持

## 目前暂未支持的 markdown 格式
### - 绘制流程图 Flowchart
### - 绘制序列图 Sequence Diagram

## End
