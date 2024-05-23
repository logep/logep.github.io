使用 Docsify 搭建文档非常简单，下面是基本步骤：

### 1. 初始化 Docsify 项目

首先，确保你的系统上已经安装了 Node.js 和 npm。然后，在你的项目目录下初始化 Docsify 项目：

```bash
mkdir docs   # 创建一个存放文档的目录
cd docs      # 进入文档目录
npm init -y  # 初始化 npm 项目
```

### 2. 安装 Docsify

在项目目录下安装 Docsify：

```bash
npm install docsify-cli -D
```

### 3. 创建文档文件

在 `docs` 目录下创建文档文件，通常包括一个 `index.html` 文件作为文档的入口。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Plugin Documentation</title>
  <script>
    window.$docsify = {
      name: 'Your Plugin Documentation',
      loadSidebar: true,
      subMaxLevel: 2,
      alias: {
        '/.*/_sidebar.md': '/_sidebar.md'
      }
    }
  </script>
  <script src="//cdn.jsdelivr.net/npm/docsify@latest"></script>
</head>
<body>
</body>
</html>
```

### 4. 编写文档内容

在 `docs` 目录下创建 `README.md` 文件作为文档的首页，并根据需要编写文档内容，包括插件介绍、安装、使用方法等。

### 5. 创建侧边栏文件

如果你想要添加侧边栏来组织文档结构，可以在 `docs` 目录下创建 `_sidebar.md` 文件，编写侧边栏的内容。

```markdown
* [Introduction](/)
* [Installation](installation.md)
* [Usage](usage.md)
* [Examples](examples.md)
```

### 6. 编写示例代码

在 `examples.md` 或其他章节中，编写展示插件功能的示例代码。你可以在代码块中直接插入插件的使用示例。

### 7. 启动 Docsify 服务

在项目目录下运行以下命令启动 Docsify 服务：

```bash
docsify serve docs
```

然后在浏览器中打开 http://localhost:3000 就可以预览你的文档了。

### 8. 发布文档

你可以将生成的 `docs` 目录部署到任何静态文件托管服务上，比如 GitHub Pages、Netlify 等等，以供用户访问。

通过以上步骤，你就可以使用 Docsify 搭建你的插件文档了。

在 Docsify 中编写展示插件功能的示例代码非常简单，你只需在 Markdown 文件中使用代码块的方式插入插件的使用示例即可。

假设你的插件是一个 Vue 组件，你可以在示例代码中这样使用它：

```markdown
```html
<template>
  <div>
    <!-- 这里是你的插件示例 -->
    <MyPlugin/>
  </div>
</template>

<script>
// 导入你的插件
import MyPlugin from '@/components/MyPlugin.vue';

export default {
  components: {
    MyPlugin
  }
};
</script>

<style>
/* 可能需要一些样式 */
</style>
```

在上面的示例代码中，`MyPlugin` 是你的插件组件，它在 `components` 文件夹下的 `MyPlugin.vue` 文件中定义。这个组件就是你要展示的插件功能。

你可以在示例代码中使用你的插件，并通过代码块的方式展示出来。
