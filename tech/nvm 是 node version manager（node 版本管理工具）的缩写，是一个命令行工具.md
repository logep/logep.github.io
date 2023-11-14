> 本文由 [简悦 SimpRead](http://ksria.com/simpread/) 转码， 原文地址 [baijiahao.baidu.com](https://baijiahao.baidu.com/s?id=1750888821840618173&wfr=spider&for=pc)


https://nodejs.org/en/about/previous-releases  npm 和node版本对应地址 最新地址
https://registry.npmmirror.com/binary.html?path=npm/v8.19.4/  npm 下载地址

https://www.cnblogs.com/gaozejie/p/10689742.html
2、提示 npm 不能识别
经实验：14.X 版本会自动下载 npm，16.X 和 17.X 版本会在 temp 路径列出 node 对应的 npm 版本，需要自己下载。

2.1、node 版本和 npm 版本对应查询
点击查看

2.2、下载对应版本的 npm
点击此处并选择对应版本下载

下载解压后重命名为 npm，粘贴到 nvm 安装的 node 目录下的 \ node_modules 文件夹，目录如下
把 bin 下的 npm、npmx 相关文件拷贝到 node 路径下



![](https://pics3.baidu.com/feed/3ac79f3df8dcd1003e97824be803111bb8122fe0.png@f_auto?token=453cf248f83096f1f6b88df54c3c6112)

介绍 nvm 是 node version manager（node 版本管理工具）的缩写，是一个命令行工具，用于管理和切换到不同版本的 node.js。

不同的项目可能需要不同版本的 node.js 和 npm（node 包管理器），例如，最近我需要开发的项目一个基于 12.22.7 版本的 node，一个则基于 16.X 以上的版本，为了切换方便，我便学习安装了 nvm。

另外，如果我们自己有开发制作 npm 包的情况，也是需要在不同版本的 Node.js 环境下对其进行测试。

自查

先查看当前电脑是否安装了 node，cmd（命令提示符）打开电脑终端，查看当前安装的 node 版本，输入：

node -v

![](https://pics0.baidu.com/feed/0824ab18972bd407fbd5c65be601c85a0eb3099d.jpeg@f_auto?token=d99bacde56cd86c098d0b2ccf63fdfe5)

查看当前安装的 npm 版本，输入：

npm -v

![](https://pics7.baidu.com/feed/83025aafa40f4bfb58bde2edb3c72efbf63618a9.jpeg@f_auto?token=0df1ed26bdf505e59c7ee7a0d819eea8)

如果显示无相关命令，或查不到命令等，则代表当前电脑没有安装 node，即可从步骤 2 开始安装；

如果显示了 node 版本号和 npm 的版本号，说明当前电脑已安装 node，则需要执行步骤 1；

注意：如果安装了 yarn，也需要卸载它，安装 nvm 后重新安装它。

1. 卸载 node

安装 nvm 必须要先彻底卸载当前电脑已安装的 node，否则会影响 nvm 的安装和后续的执行！

请逐步执行以下卸载步骤：

从控制面板的程序卸载 nodejs

控制面板 -> 卸载程序 -> 找到 nodejs 右键 -> 卸载

删除 node 的安装目录，默认是 C:\Program Files\nodejs，也可能在其他盘，这取决于安装时的选择

查找. npmrc 文件删除，默认在 C:\User \ 用户名（例如：C:\User\kaigejava）

逐一查看下列文件

C:\Program Files (x86)\Nodejs

C:\Program Files\Nodejs

C:\Users \ 用户名 \ AppData\Roaming\npm

C:\Users \ 用户名 \ AppData\Roaming\npm-cache 存在就删除

检查环境变量，将 node 相关的配置都删掉，环境变量打开方式：右键我的电脑 -> 属性 -> 高级 -> 环境变量 -> 用户变量的 Path 删除 -> 系统变量的 NODE_PATH 里的 node 删掉

检查 node 和 npm，在 cmd 中输入 node-v、npm-v, 然后重启电脑

2. 安装 nvm

其实，在 windows 系统下安装的是 nvm-windows，nvm 只支持安装在在 Linux 和 Mac 系统下；

nvm-windows 与 nvm 稍有不同，但是功能大致一样，都是为了切换 node 版本；

前往 nvm-windows 仓库进行下载：

点击最新版本下载安装（傻瓜式安装即可），当前最新的是 1.1.10

![](https://pics5.baidu.com/feed/9e3df8dcd100baa125489ab2d998ef19c9fc2ee3.png@f_auto?token=1543d1f22444656bf5321442f7028d9f)

![](https://pics5.baidu.com/feed/377adab44aed2e734e44ebc01a89f78085d6fac5.png@f_auto?token=5c42fa921b30e7c76a6b9aed783e2b57)

3. 执行 nvm

以管理员身份执行 cmd

![](https://pics6.baidu.com/feed/9e3df8dcd100baa134a9aa46da98ef19cafc2ede.png@f_auto?token=2082f6b9670e2fc09642fb923dbb1878)

执行 nvm list available 查看所有 node 版本

执行 nvm install x.x.x（如：nvm install 12.22.7）安装指定版本

一旦你安装了一个版本的 node，就会自动为你安装相应版本的 npm，所以不需要单独安装 npm

![](https://pics5.baidu.com/feed/1ad5ad6eddc451da6f6bdd4c0675046dd1163208.png@f_auto?token=4fde1f362e6fe9a4d5ea9d956d3a1412)

执行 nvm list 查看已安装的 node 版本

![](https://pics5.baidu.com/feed/fcfaaf51f3deb48fa62ef80156976c222cf57839.png@f_auto?token=8a7a90dffa441d5b3d6a1478366e4113)

执行 nvm use x.x.x（如：nvm use 12.22.7）切换到指定 node 环境

![](https://pics5.baidu.com/feed/faf2b2119313b07edfbb063b945fc72897dd8c16.png@f_auto?token=c17ed3dc22d915bfb3955d1a45048f9d)

4. 另外补充其他 nvm 命令

nvm use latest 安装最新版本

nvm use lts 安装长期支持版本

安装 Node 的长期支持（LTS）版本更好，因为它的 bug 更少
