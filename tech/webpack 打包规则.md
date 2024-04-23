`chunks: 'initial'` 是指定在代码分割（Code Splitting）过程中，只对入口文件进行代码分割，而不会对动态导入的模块进行代码分割。具体来说，它的含义如下：

- `'initial'`: 表示只对入口文件进行代码分割。这意味着只有在入口文件中显式导入的模块才会被打包成独立的 chunk，而动态导入的模块不会被代码分割，它们将会被打包进入相应的入口文件的 chunk 中。

如果你希望将公共部分的代码提取到单独的 chunk 中，你可以通过其他的配置来实现。例如，可以使用 Webpack 的 `splitChunks` 配置来配置公共代码的提取规则。下面是一个示例：

```javascript
// webpack.config.js

const path = require('path');

module.exports = {
  // 入口文件配置
  entry: {
    main: './src/index.js' // 入口文件
  },
  // 输出文件配置
  output: {
    filename: '[name].bundle.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出路径
  },
  // 代码分割配置
  optimization: {
    splitChunks: {
      chunks: 'all', // 对所有的模块进行代码分割
      minSize: 30000, // 分割出的chunk最小为30kb
      maxSize: 0, // 没有限制
      minChunks: 1, // 模块至少被引用1次时才进行代码分割
      maxAsyncRequests: 5, // 异步加载时同时进行的请求数量不超过5个
      maxInitialRequests: 3, // 入口文件最多同时请求数量不超过3个
      automaticNameDelimiter: '~', // 名称的连接符
      name: true,
      cacheGroups: { // 缓存组配置
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 权重高的优先打包到该chunk中
          name: 'vendors'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 如果模块已经存在于某个chunk中，就共享该模块
        }
      }
    }
  },
  // 其他配置...
};
```

在上面的配置中，`optimization.splitChunks` 配置了代码分割的规则，其中 `chunks: 'all'` 表示对所有的模块进行代码分割。Webpack 将会根据配置的规则将公共部分的代码提取到单独的 chunk 中。
