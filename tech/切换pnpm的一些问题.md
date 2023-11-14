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
