> 本文 原文地址 [github.com](https://github.com/pengzhile/pandora/discussions/862)

租了个云服务器，因为朋友们大多不是计算机专业的，很多计算机的基本操作对他们而言都很难。买了个域名，要求网站悬挂备案号？不然要封！大家有遇到过这种情况吗？  
我本身是学 Java 的会 html,css,js ，但是不会 python ，而且通过 docker 部署，不知道在哪里修改这个页面。请教一下大家是怎么处理这方面的？还请朋友们指点一下。

 

> 租了个云服务器，因为朋友们大多不是计算机专业的，很多计算机的基本操作对他们而言都很难。买了个域名，要求网站悬挂备案号？不然要封！大家有遇到过这种情况吗？ 我本身是学 Java 的会 html,css,js ，但是不会 python ，而且通过 docker 部署，不知道在哪里修改这个页面。请教一下大家是怎么处理这方面的？还请朋友们指点一下。

### P.S.：由于只有 pandora-cloud 下方可以悬挂，所以 pandora 原版是无法实现的。（原版虽然在 HTML 文件 有下方悬挂内容，但是 JavaScript 文件 会让其消失。）

### 还有，如果要修改文本的话，Docker 部署 可能是一个大麻烦，因为你可能会找不到 pandora-cloud 的地址。

### 建议老老实实用 Python+PIP 部署，部署命令：`python -m pip install pandora-chatgpt --upgrade && python -m pip install pandora-chatgpt[cloud] --upgrade && pandora-cloud -s 0.0.0.0:80`（如果机器的 80 端口被锁死，可以考虑把最后的 `0.0.0.0:80` 改成别的如：`0.0.0.0:8080` 等开放的端口号）。

### 又是一个 P.S.：如果你很闲，可以考虑把 pandora-cloud 的 CSS 文件、部分 JS 文件、部分修改过的 HTML 文件 迁移到 pandora 原版，即可使用 pandora-cloud 的 UI。（但是由于这样子不稳定且我还没有测试过，还是建议给作者发个 Issues 请求更新 pandora 原版的 UI。）

教程
==

可以改 `\flask\static\_next\static\chunks` 下的 `734-99309a157861fd83.js`，利用按 `Ctrl+F` 等方式寻找到 `defaultMessage:"This service is not an official OpenAI service. Powered by <link>Pandora</link>"` ，把这里改为： `defaultMessage:"京 ICP 备 XXXXXXXX-X 号 | 京公网安备 XXXXXXXXXXXXXX 号 | 服务为社区使用 <link>Pandora</link> 构建."`

*   Tips：这里的 `服务为社区使用 <link>Pandora</link> 构建.` 必须保留，否则会像 Owner 说的一样：**会直接导致丢失技术支持。**

（把这里的 `京 ICP 备 XXXXXXXX-X 号 京公网安备 XXXXXXXXXXXXXX 号` 该为你相对应的，比如像是 必应中国版 就是：`京ICP备10036305号-7 京公网安备11010802022657号`）

*   Tips：**本人暂时没有使用过 `JavaScript 标签`设置`链接方式`的 京 ICP 备案号 与 京公网安备号，不建议直接尝试；如果有要求必须填写为`链接方式`，可以自行搜索 `JavaScript 标签设置链接` 的方式。**
    
*   Tips：为防止_~有人 IQ 低下~_学不会，`\flask\static\_next\static\chunks` 那里就是 `pandora-cloud` 的路径，比如我使用的是 Windows，系统盘符为 C，Python 版本为 3.8，就是：`C:\Users\Administrator\AppData\Roaming\Python\Python38\site-packages\pandora_cloud\` ，那么 `\flask\static\_next\static\chunks` 就是在 `C:\Users\Administrator\AppData\Roaming\Python\Python38\site-packages\pandora_cloud\flask\static\_next\static\chunks` 。
    

至于 Linux 的 `site-packages` 路径在哪，如何查找... 使用 [Bing](https://www.bing.com)，[百度一下，你就知道](https://www.baidu.com) 等知名搜索引擎查找（雾）

### **本质上就是改 `JavaScript 文件`，这点对你而言其实应该不难。**

### **至于改 `FakeGPT`，详见：[#685](https://github.com/pengzhile/pandora/issues/685) 。**

### **改的就是上文提及的 `734-99309a157861fd83.js`，利用按 `Ctrl+F` 等方式寻找到 `FakeGPT` 改为你想要的即可（共两处），如：`ShadowGPT`、`ReyGPT` 等。**

 

> 租了个云服务器，因为朋友们大多不是计算机专业的，很多计算机的基本操作对他们而言都很难。买了个域名，要求网站悬挂备案号？不然要封！大家有遇到过这种情况吗？ 我本身是学 Java 的会 html,css,js ，但是不会 python ，而且通过 docker 部署，不知道在哪里修改这个页面。请教一下大家是怎么处理这方面的？还请朋友们指点一下。

微广告
===

*   域名愿意可以去 [Cloudflare](https://cloudflare.com) 买一个。
*   或者干脆就去 [EU.ORG 免费域名](https://eu.org) 申请一个（一般而言审核需要 15 天，之后需要 [NS 解析](https://zhuanlan.zhihu.com/p/439598250)才能正常使用），这两个都不用备案。
*   云服务器建议去整个 [AWS](https://aws.amazon.com/cn/) ，亚马逊的云计算有免费套餐且在外国。
*   或者去 [Replit](https://repl.it) + 监控保活 （具体教程网上都有，搜[「Replit 保活」](https://blog.csdn.net/weixin_44786530/article/details/129755606) 即可）整个免费服务器。
*   （所以我成功帮你 -100% 的经费 www）
*   不会用自行点击蓝色链接或者自行运用万能的互联网搜索教程。
