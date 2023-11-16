初始化PNPM
3. 创建配置文件 https://booop.net/migrate-from-npm-to-pnpm/
在项目目录下创建 .npmrc 的文件

# pnpm 配置
shamefully-hoist=true
auto-install-peers=true
strict-peer-dependencies=false

 转换相关文件
将 package-lock.json 和 yarn.lock 转成 pnpm-lock.yaml 文件，保证依赖版本不变

pnpm import

npm i -g pnpm@latest && pnpm setup # PNPM需要被安装为全局包，初次运行前需要初始化
重新进入命令行，进入项目根目录

备份原有的依赖项锁文件（可选），移除NPM依赖项安装库及锁文件



通过 pnpm 安装依赖包

pnpm install
最后，迁移完成！

在项目正常运行之后，可以删除原本的 package-lock.json 和 yarn.lock 文件，保持项目的整洁。


# NPM
cp package-lock.json package-lock.json.back && rm -rf node_modules package-lock.json

# Yarn
cp yarn.lock yarn.lock.back && rm -rf node_modules yarn.lock
使用PNPM安装项目依赖项

pnpm i
常用命令

pnpm prune # 清理当前项目下的冗余项
pnpm store prune # 清理全局冗余项



你可以使用 `pnpm config` 命令来查看 `pnpm` 的配置信息，其中包括存储位置等信息。具体来说，你可以使用以下命令查看 `.pnpm-store` 目录的位置：

```bash
pnpm config get store-dir
```

这将返回 `.pnpm-store` 目录的绝对路径。请注意，如果你在项目内运行此命令，它将返回项目内的 `.pnpm-store` 目录路径。如果你在全局环境中运行，它将返回全局 `.pnpm-store` 目录路径。

如果你想查看其他 `pnpm` 的配置信息，你可以运行：

```bash
pnpm config list
```

这将列出所有的 `pnpm` 配置项，包括存储目录等信息。
########################################

问题
扁平化 node_modules 导致了上述错误。如果存在这种情况，需要切换成 pnpm 我们应该如何处理？

方案 1：

通过 pnpm add 添加依赖

方案 2：

通过相关 hooks 添加相关的依赖

.pnpmfile.cjs

module.exports = {
  hooks: {
    readPackage: (pkg) => {
      if (pkg.name === "inspectpack") {
        pkg.dependencies['babel-traverse'] = '^6.26.0'
      }
      return pkg
    }
  }
}
方案 3：

如果缺少依赖太多，可以使用提升选项。此选项官方不推荐。

pnpm install --shamefully-hoist
由于 cli3 对于 pnpm 支持不够完善（在 cli4 中已完全支持），我们采用了这种方式。 相关 Issue

总结
pnpm 方式的实现精髓

通过软链的形式，使得 require 可以正常引用；同时对非真正依赖的项目做隔离（避免引用依赖的混乱）
.pnpm 的存在避免了循环引用和层级过深的问题（都在其第一层）
硬链使得不同项目相同依赖只存在一个副本，减少磁盘空间



################################################## 下面是老方法


## 切换pnpm的一些问题

使用pnpm install --shamefully-hoist

如果依赖一直有问题，可以使用pnpm install --shamefully-hoist创建一个扁平node_modules 目录结构, 类似于npm 或 yarn

解决幽灵依赖时，安装默认的包导致报错

先使用npm安装，生成package-lock.json, 安装缺少的包时，使用lock里面的版本

即使删除了node_modules和lock文件，安装时，特定的包还是报错

比如我们在升级时，一个包把最新的版本删除了。导致安装时一直失败。可以尝试使用pnpm store prune来删除


### monorepo


workspace
pnpm除了安装速度快，节省磁盘空间，避免幽灵依赖等优化，也内置了对monorepo的支持。使用起来比较简单，在项目根目录中新建pnpm-workspace.yaml文件，并声明对应的工作区就好。
bash复制代码packages:
  # 所有在 packages/ 子目录下的 package
  - 'packages/**'




###  node-sass的问题
Module build failed (from ./node_modules/.pnpm/sass-loader@8.0.0_node-sass@6.0.1_webpack@4.43.0/node_modules/sass-loader/dist/cj
s.js):
Error: Node Sass version 6.0.1 is incompatible with ^4.0.0.
这个错误表明在你的项目中，`sass-loader` 使用的 `node-sass` 版本为 6.0.1，但在 `sass-loader` 的配置或你的项目依赖中，对 `node-sass` 的版本有一个限制为 `^4.0.0`。为了解决这个问题，你可以按照以下步骤操作：

1. **更新 `package.json` 中的 `node-sass` 版本：**
   打开你项目的 `package.json` 文件，找到 `devDependencies`（或 `dependencies`）中的 `node-sass` 条目。将其更新为与 `sass-loader` 兼容的版本，或者移除版本限制以使用兼容的最新版本。例如：

   ```json
   "devDependencies": {
     "node-sass": "^6.0.1"
   }
   ```

   然后运行：

   ```bash
   pnpm install
   ```

2. **清除 pnpm 缓存：**
   有时候，缓存问题可能导致此类错误。尝试清除 pnpm 缓存：

   ```bash
   pnpm cache clear --force
   ```

3. **手动重建 Node Sass：**
   手动重建 `node-sass` 二进制文件：

   ```bash
   pnpm rebuild node-sass
   ```

4. **检查 Node.js 版本：**
   确保你的 Node.js 版本与 `node-sass` 的版本兼容。你可以查阅 `node-sass` 文档或你项目的 `package.json` 文件以获取版本兼容信息。

5. **全局安装 pnpm：**
   确保你全局安装了 pnpm，并且使用的是正确的版本：

   ```bash
   npm install -g pnpm
   ```

完成这些步骤后，你应该能够解决这个版本不兼容的问题。如果问题仍然存在，考虑查阅你项目依赖的文档或在相关的社区论坛或 GitHub 存储库中寻求帮助。另外，如果可能的话，你也可以考虑迁移到 Dart Sass，这是官方的 Sass 实现，它可能与你的项目兼容。


## 迁移 到 dart sass（如果没有用 /deep/的方法就可以，如果有用到 不兼容）

要将项目迁移到 Dart Sass，你需要进行一些更改，因为 Dart Sass 与 Node Sass 有一些语法和功能上的差异。以下是迁移的一般步骤：

1. **安装 Dart Sass：**
   首先，确保你已经安装了 Dart Sass。可以使用以下命令进行安装：

   ```bash
   pnpm install sass
   ```

   这将安装 Dart Sass 作为你项目的依赖项。

2. **更新 `sass-loader` 配置：**
   如果你在项目中使用了 Webpack 和 `sass-loader`，需要更新 `sass-loader` 的配置，以便使用 Dart Sass。在 webpack 配置中找到 `sass-loader` 的配置，通常在 `module.rules` 中，将 `implementation` 选项设置为 `require('sass')`：

   ```javascript
   module: {
     rules: [
       {
         test: /\.s[ac]ss$/i,
         use: [
           'style-loader',
           'css-loader',
           {
             loader: 'sass-loader',
             options: {
               implementation: require('sass'),
             },
           },
         ],
       },
     ],
   },
   ```

3. **更新代码中的语法：**
   Dart Sass 与 Node Sass 在一些语法和功能上有差异。你可能需要更新你的 Sass 代码以适应 Dart Sass 的语法要求。一些常见的更改包括：

   - 在导入文件时，不再使用文件扩展名（例如，`@import 'file.scss';` 应改为 `@import 'file';`）。
   - 更新变量和混合的语法。
   - 在使用函数时，注意一些函数的名称和参数可能有所不同。

   这些更改可能因你的具体代码而异，需要逐一检查和调整。

4. **测试和调试：**
   迁移完成后，进行全面的测试以确保项目的样式表在 Dart Sass 下仍然正常工作。特别关注可能需要调整的地方，例如导入的文件、语法差异等。

5. **更新文档和构建脚本：**
   如果你的项目有文档或构建脚本，确保它们反映了使用 Dart Sass 的变化。更新相关的文档，并调整构建脚本以使用 Dart Sass。

6. **提交和发布：**
   迁移完成后，进行一次全面的测试，并确保所有变更都已提交到版本控制系统。然后你可以发布你的项目，将 Dart Sass 版本的样式表部署到生产环境中。

请注意，以上步骤提供了一般性的指导，实际迁移过程可能因项目的具体情况而有所不同。建议在迁移之前查阅 [Dart Sass 文档](https://sass-lang.com/dart-sass) 以获取更详细的信息和帮助。


### pnpm  如果就是要用 node-sass低版本呢

如果你使用的是 pnpm，并且希望继续使用 `node-sass` 版本 6.0.1 以下，你可以考虑以下方法：

1. **使用 `sass` 而非 `node-sass`：**
   `node-sass` 是 Dart Sass 的旧版本，而 Dart Sass 现在已经成为 Sass 的官方实现。你可以尝试使用 `sass` 包，这是 Dart Sass 的 JavaScript 绑定，兼容性更好。

   安装 `sass` 包：

   ```bash
   pnpm install sass
   ```

   在 `sass-loader` 的配置中将 `implementation` 选项设置为 `require('sass')`，就像之前在 Dart Sass 迁移中所示。

2. **明确指定 `node-sass` 版本：**
   如果你必须使用 `node-sass`，可以在 `package.json` 中明确指定 `node-sass` 的版本。这可以防止 pnpm 在安装时尝试升级到不兼容的版本。

   ```json
   "devDependencies": {
     "node-sass": "4.14.1"
   }
   ```

   然后运行：

   ```bash
   pnpm install
   ```

   这样会安装指定版本的 `node-sass`，并防止 pnpm 尝试升级。

3. **使用 pnpm 配置文件锁定版本：**
   在 pnpm 的配置文件（`pnpm-shrinkwrap.yaml` 或 `pnpm-lock.yaml`）中锁定 `node-sass` 的版本。这将确保在使用 pnpm 安装时使用特定的 `node-sass` 版本。

   手动编辑或使用 pnpm 命令锁定版本：

   ```bash
   pnpm install --save-exact node-sass@4.14.1
   ```

   或者编辑 `pnpm-shrinkwrap.yaml` 或 `pnpm-lock.yaml` 文件中的相应部分。

这些方法中，推荐使用 `sass` 包，因为它是 Dart Sass 的官方绑定，而且具有更好的兼容性。如果你有其他特定的依赖关系，你可能需要根据项目的具体情况进行调整。


### 链式调用 webpack
你可以使用 Webpack Chain API 将你的 Webpack 配置转换为链式调用的形式。以下是如何将你的示例转换为 Webpack Chain API 形式的方法：

```javascript
const { module } = require('webpack');

module.exports = {
  // ... 其他配置 ...

  module: {
    rules: [
      // ... 其他规则 ...

      module.rule('scss')
        .test(/\.s[ac]ss$/i)
        .use('style-loader').loader('style-loader').end()
        .use('css-loader').loader('css-loader').end()
        .use('sass-loader')
          .loader('sass-loader')
          .options({
            implementation: require('sass'),
          })
          .end(),
    ],
  },
};
```

这里使用 `module.rule('scss')` 代替 `module.rules`，然后使用 `.use()`、`.loader()`、`.options()`、`.end()` 方法链式调用替代原先的数组形式。

上面的代码假设你正在配置处理 `.scss` 文件的规则。如果你的实际规则不同，请相应地调整 `test` 部分。
