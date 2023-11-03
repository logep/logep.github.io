在 Vue.js 项目的 `vue.config.js` 中，如果你使用了 `externals` 来配置 Vue.js 库不被打包到公共包中，但它仍然被打包到公共包中，可能有几种原因导致这种情况发生：

1. **配置错误**：确保你的 `vue.config.js` 文件中的 `externals` 配置正确，并且 `vue` 的版本号匹配。

2. **依赖关系**：检查你的项目依赖项是否导致 Vue.js 被打包到公共包中。有些插件或库可能会间接引入 Vue.js。

3. **Webpack 版本**：如果你使用的是较旧版本的 Webpack，可能会遇到问题。尽量使用最新版本的 Webpack 和 Vue.js。

4. **Vue CLI 配置冲突**：如果你正在使用 Vue CLI 创建的项目，Vue CLI 也可能会有默认配置，你需要确保你的配置不会与默认配置冲突。

5. **重复安装 Vue.js**：有时，开发人员可能会在项目中多次安装 Vue.js，导致不同版本的 Vue.js 在项目中。你可以运行 `npm ls vue` 来检查是否存在多个 Vue.js 版本。

为了确保 Vue.js 不会被打包到公共包中，你可以尝试以下步骤：

1. 确保 `vue.config.js` 的配置正确。
2. 检查项目的依赖项，确保没有引入多个 Vue.js 版本。
3. 使用最新版本的 Vue.js 和 Webpack。
4. 清除项目的构建缓存（如果有）。

如果你还遇到问题，可以提供更多关于你的项目配置和依赖项的信息，以便我能够提供更具体的建议。




如果有插件或库间接引入了 Vue 并且导致 Vue 被打包到公共包中，你可以尝试使用 Webpack 的 `ProvidePlugin` 和 `externals` 配置来排除这个 Vue 的间接引用。

首先，使用 `ProvidePlugin` 来将 Vue 设置为全局变量，以确保插件和库可以访问全局的 Vue，而不需要将它打包进你的项目中。在 `vue.config.js` 中添加以下配置：

```javascript
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Vue: 'vue',
      }),
    ],
  },
};
```

上述配置会将 Vue 设置为全局变量，但不会将 Vue 打包到项目的构建文件中。

接下来，你可以使用 `externals` 配置来告诉 Webpack 忽略 Vue.js 的打包，因为它被设置为全局变量。在 `vue.config.js` 中添加以下配置：

```javascript
module.exports = {
  configureWebpack: {
    externals: {
      vue: 'Vue',
    },
  },
};
```

这样，Webpack 将不会将 Vue.js 打包到你的项目中，因为它被视为外部依赖。

这个配置的效果是，插件和库可以继续使用全局的 Vue 变量，而不会将 Vue.js 打包到你的项目构建中。这通常可以解决间接引入 Vue.js 的问题。


### 路由 动态加载 配置
vue2 webpack 4 动态路由 我是这么写的 component = () => () => import(`@/views/${item.component}.vue`)，为什么webpack 知道怎么分包，根据我相应的菜单直接分包 

在 Vue 2 项目中，使用 Webpack 4 和动态路由时，你的写法是正确的。Webpack 会自动识别 `import` 语句中的动态路径，并将相应的组件按需分包。这是 Webpack 的懒加载机制的一部分。

具体来说，你的代码片段 `() => () => import('@/views/${item.component}.vue')` 包含两个箭头函数。这是 Vue 路由懒加载的一种常见写法。首先，`import` 语句会返回一个函数，然后在路由被访问时，这个函数会被执行，返回一个 `import` 调用，用于动态加载组件。

Webpack 会解析这个动态路径，并根据相应的菜单项目，为每个组件创建单独的分包。这意味着每个菜单项的组件都将被分别打包，并且只在需要时加载。

这是 Vue 路由懒加载的常见写法，充分利用了 Webpack 的代码分割功能，以提高应用性能。它使得应用只在需要时加载所需的组件，而不是一次性加载所有组件。这对于大型应用来说非常有用，因为它减小了初始加载的包大小，加速了应用的加载速度。



如果你的路径写成 `import('@/${item.component}.vue')`，Webpack 可能会尝试从根目录下加载所有的 `.vue` 文件，这并不是你想要的结果。正确的写法应该是使用具体的相对路径，以确保只有特定的组件被分包。

在动态路由中，你应该使用相对路径，以确保只加载特定的组件，而不是加载所有根目录下的 `.vue` 文件。示例代码应该类似于以下方式：

```javascript
import(`@/views/${item.component}.vue`)
```

这将根据 `item.component` 的值动态加载位于 `@/views/` 目录下的特定组件。这个路径是相对于你的项目根目录的，因此只会加载指定路径下的组件，而不会加载根目录下的所有 `.vue` 文件。

