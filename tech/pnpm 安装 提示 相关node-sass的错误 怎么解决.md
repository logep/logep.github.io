如果在使用 pnpm 安装过程中遇到了与 `node-sass` 相关的错误，这可能与 `node-sass` 的二进制文件在安装时无法正确编译有关。以下是一些可能的解决方法：

1. **检查 Node.js 版本：** 确保你的 Node.js 版本与你项目中的要求匹配。有时 `node-sass` 的二进制文件可能与 Node.js 版本不兼容。

2. **重新安装 pnpm：** 尝试使用以下命令卸载 pnpm，并重新安装：

   ```bash
   npm uninstall -g pnpm
   npm install -g pnpm
   ```

3. **清除缓存：** 有时候，安装缓存可能导致问题。尝试清除 pnpm 的缓存：

   ```bash
   pnpm cache clear --force
   ```

4. **检查 Python 环境：** `node-sass` 在安装时可能需要使用 Python 进行编译。确保你的系统中安装了 Python，并且环境变量中包含了正确的 Python 路径。

5. **安装 node-sass 的特定版本：** 尝试安装 `node-sass` 的一个特定版本，可能是与你的 Node.js 版本兼容的版本：

   ```bash
   pnpm install node-sass@<版本号>
   ```

   你可以在项目的 `package.json` 文件中查找 `node-sass` 的版本，或者去 [node-sass 的 npm 页面](https://www.npmjs.com/package/node-sass)查看最新的版本。

6. **使用镜像：** 有时候网络问题也可能导致安装失败。可以尝试使用淘宝的 npm 镜像或其他可用的镜像：

   ```bash
   pnpm install --registry=https://registry.npm.taobao.org
   ```

7. **检查 Node-sass 是否支持 Node.js 版本：** 在 [node-sass 的 GitHub 仓库](https://github.com/sass/node-sass)上查看文档，确保你的 Node.js 版本在 `node-sass` 的支持范围之内。

8. **手动构建 Node-sass：** 如果上述方法都不起作用，你可以尝试手动构建 `node-sass`：

   ```bash
   pnpm rebuild node-sass
   ```

   这会重新构建 `node-sass`，可能会解决一些编译问题。

请根据具体情况逐一尝试这些解决方法，通常能够解决 `node-sass` 相关的安装问题。


### Error: Node Sass does not yet support your current environment: Windows 64-bit with Unsupported runtime (93)
是node版本太高了，不匹配



首先，dependencies 是生产依赖，devDependencies 是开发依赖，这个理解是有一点偏差的，这个文章里面讲到了。

其次，从你的描述看，你应该是习惯了 npm / yarn 拍平 node_modules 的处理，所以要用 shamefully-hoist 去提升依赖，建议你在 A 包的代码中去搜索那个报错的插件，应该是可以搜到的。

关于这点我举一个例子，在 pnpm 下，如果你的项目依赖于 vue，你写

import { ref } from 'vue'

是没问题的，但是如果写

import { ref } from '@vue/reactivity'

则就是会提示找不到 '@vue/reactivity'，虽然我们都很清楚 vue 中的 ref 就是来自于 @vue/reactivity，但是你就是不能这样用，这就是我文中提到的幽灵依赖问题。想要访问 @vue/reactivity，必须将其加入 dependencies 或者 devDependencies 字段中。

最后，关于框架多版本问题如何处理，这个我没有在文章里写，但是我的monorepo也项目同时用到了 vue2 和 vue3，我给你一个参考链接：pnpm.io/zh/package_json#

这个 packageExtensions 字段可以强制修改某些包原本的依赖关系，使得一些本应依赖 react17 的包不会去错误地依赖 react18。

如果你项目的 lodash 版本低于 antd 依赖的 lodash 最低版本，就会导致两个 lodash 的出现，npm 和 yarn 在这种情况下一样会出现两个 lodash，你自己的 lodash 会被装到根级 node_modules 目录，而 antd 的 lodash 会在依赖内部的 node_modules 中。

不过，如果我们使用 ^ 为主来声明依赖版本的话，共有依赖版本不一致的现象是极少数的。使用 ~ 或者固定版本依赖时，引入新的生产依赖项要注意及时评审。

另外，文章中也提到了 pnpm 可以通过一条配置实现和 npm 和 yarn 一样的表现，幽灵依赖只是客观存在，是不是负面的取决于工程管理者的个人喜好，工具还是给了用户选择的自由。


# .npmrc
# 提升含有 eslint(模糊匹配)、prettier(模糊匹配)、viewerjs(精确匹配) 的依赖包到根 node_modules 目录下
public-hoist-pattern[]=*eslint*
public-hoist-pattern[]=*prettier*
public-hoist-pattern[]=viewerjs

# 提升所有依赖到根 node_modules 目录下，相当于 public-hoist-pattern[]=*，与上面一种方式一般二选一使用
shamefully-hoist=true
当然，幽灵依赖问题也可以通过在根目录下创建 .npmrc 文件，在其中配置 public-hoist-pattern 或者 shamefully-hoist 字段，将依赖提升到根node_modules 目录下解决。参考：依赖提升设置
