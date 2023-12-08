### 前沿
想到一个非常形象的比喻：

IFrame vs 微前端 vs 微模块 可类比于 进程 vs 线程 vs 协程


## 参考  https://juejin.cn/post/6844904128922009607
参考 wl-mfe  vue-qiankun qiankun-admin 写的很详细
2019 年 6 月，微前端框架 qiankun 正式发布了 1.0 版本
2020年 4月 qiankun 将正式发布 2.0 版本

qiankun 是一个生产可用的微前端框架，它基于 single-spa，具备 js 沙箱、样式隔离、HTML Loader、预加载 等微前端系统所需的能力。qiankun 可以用于任意 js 框架，微应用接入像嵌入一个 iframe 系统一样简单。

## https://qiankun.umijs.org/

qiankun 2.0 带来的最大变化便是 qiankun 的定位将由 微前端框架 转变为 微应用加载器。



### 调研新技术的步骤
1、调研该技术，产出相应的调研文档。

2、输出技术Demo，基本的框架结构。

3、试着在项目中使用它，这一步坑会很多。

4、把它推动到线上完成真正的技术升级。


####一些编译的说法
使用微模块，可借助于打包工具：
静态编译：微模块作为一个NPM包被安装到工程中，通过打包工具（如webpack）正常编译打包即可。这种方式的优点是代码产物得到打包工具的各种去重和优化；缺点是当某个模块更新时，需要整体重新打包。
动态注入：利用Module Federation，将微模块作为子应用独立部署，与时下流行的微前端类似。这种方式的优点是某子应用中的微模块更新时，依赖该微模块的其它应用无需重新编译，刷新浏览器即可动态获取最新模块；缺点是没有打包工具的整体编译与优化，代码和资源容易重复加载或冲突。



###
### 一个负责聚合与切换的主应用 与 多个相互独自的微应用 一起构成了整个大的微前端应用，一般来说页面上活跃着的也往往只有一个微应用。
##### 在另外一些场景下，你应该可以在同一个页面中，加载多个不同的微应用，每个微应用都是主应用的组成部分 或者是 提供一些增强能力，这种场景可以说是微应用粒度的前端组件化（https://juejin.cn/post/6864381092061773831）。
qiankun@2.0 将跳出 route-based 的微前端场景，提供更加通用的微应用加载能力，让用户可以更加自由的组合微应用来搭建产品
新功能
支持多应用并行及多实例沙箱
支持手动 加载/卸载 微应用
支持 IE11 沙箱兼容
官方的极简微应用通信方案
支持基于 Shadow DOM 的样式隔离


从前端的角度来说，主要是两种。构建时集成和运行时集成。
构建时集成，也就是代码分割。什么意思呢，我们可以把不同的app放到一起开发，给webpack配置多个入口，最后打包生成多个出口文件，以实现代码分割。这种方式目前来说只是看上去可行，但是没办法上沙箱，而且你还是没有实现独立开发，独立部署。
运行时集成主要是两种方案。一种，我想大家肯定都知道，iframe。实际上，如果不考虑用户体验，我觉得iframe就是一个完美的微前端方案。但是没办法，iframe带来的问题，使得我们没办法优先考虑它。比如iframe每次都会重新加载，在移动端兼容性差，并且还需要服务端帮忙，不然会有跨域问题。


lifeCycle会遍历子应用列表，依次执行它们的生命周期函数，这里有个小问题，子应用的生命周期函数是如何被主应用获取到的，如果你和我一样不熟悉webpack，或许会陷入这样的困惑，
## 事实上，webpack以umd格式进行打包的话，require函数会将export出的函数合成一个model挂到window上。这样我们就可以获取啦。


## 预加载
预加载是为了降低白屏时间，获取更流畅的应用切换效果，对于一些通过微前端实现的工作台，主应用上可能注册了十几个甚至更多的子应用，我们往往不会在短时间内都执行它们，那通过预加载，就能够提前抓取子应用的数据信息，让微前端的优势发挥到极致。

要注意的是浏览器同域名下的并发请求数量是有限制的，不同浏览器可能都不太一样，比如在chrome上可能是6，所以我们需要对子应用列表进行切片，再通过promise 链式调用。



### 一个很全的解决方案 （https://github.com/xushanpei/qiankun_template）
iframe
基座模式，主要基于路由分发，qiankun 和 single-spa 就是基于这种模式
组合式集成，即单独构建组件，按需加载，类似 npm 包的形式
EMP，主要基于 Webpack5 Module Federation
Web Components

### qiankun一些方案（https://github.com/gongshun/qiankun-vue-demo）

master 分支： qiankun 的常规基础用法
feature/hash-router 分支 ：主子项目都是 hash 模式
feature/keep-alive 分支 ：使用 loadMicroApp 来实现 keep-alive 的 tab 效果
feature/share-component 分支 ：项目间共享组件的例子
#### feature/routing-page 分支 ：在主项目的某个路由页面加载子应用

registerMicroApps时  rule符合相应规则 activeRule: '/about/app-vue-history',
添加相应路由就会跳转到主路由的某个页面里去
const routes = [
  {
    path: '/about',
    path: '/about/*',
    name: 'About',
    component: () => import('../views/About.vue')
  },
about.vue文件写法
<template>
  <div class="about">
    <div id="appContainer"></div>
  </div>
</template>
<script>
import { start } from 'qiankun';
export default {
  mounted() {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true;//主要是这个地方需要判断是否启动过
      start();
    }
  },
}
</script>






### feature/share-dependencies 分支 ：子项目复用主项目的公共依赖（vue，vuex，vue-router），以及主子项目间 i18n 的处理
    <script src="//unpkg.com/vue"></script>
    <script src="//unpkg.com/vuex"></script>
    <script src="//unpkg.com/vue-router"></script>
    <script src="//unpkg.com/vue-i18n/dist/vue-i18n.js"></script>
然后在子应用里（用ignore）
    <script ignore src="//unpkg.com/vue"></script>
    <script ignore src="//unpkg.com/vuex"></script>
    <script ignore src="//unpkg.com/vue-router"></script>


feature/vite-child 分支 ：子项目是 vite 构建的 vue3 项目
## feature/use-main-app-component 分支 ：子项目复用主项目的依赖

主应用里是 window.HelloWorld=组件导出名
在子应用里 的导出生命周期里mounted  vue.use(HelloWorld) 直接注册，然后在其他页面里直接使用组件






feature/abstract-route 分支 ：主项目同时展示两个子应用的不同页面，子项目使用 abstract 路由
develop 分支 ：修改源码来实现 keep-alive，以及公共依赖的复用的例子



### 代码整体思路说明（https://liuhai.work/post/368?cid=61&index=true）
对于需要搭建微前端的小伙伴来说，qiankun应该是非常熟悉了。这里不再对qiankun做过多篇幅的基础概念介绍，只针对用qiankun里的loadmicroapp、setGlobalState等等一些特性做细致的代码讲解，如果对qiankun还是零基础可以去官网或者去掘金搜索相关介绍文档。

上一篇我们提到，想要完成微前端改造，需要新建一个后台管理总系统。接下来我们把总系统称为workspace(工作总台),也在微前端里面的主应用的概念。我们要先搭建一个主应用，然后在主应用内部去加载各个子应用（也就是电话、手机等等具体的业务系统），最终结合起来形成我们一套完整的微前端体系。具体的代码思路为：

1、主应用workspace内统一login登陆页面，所有以前的子应用剥离login登陆逻辑和登陆页签，统一从workspace入口进入系统，子应用系统通过qiankun的globalState机制，以authToken形式下发token令牌，达到一个令牌登陆所有系统的目的。

2、所有的子应用通过全量url形式直接提供给workspace，提供了url即可嵌入到workspace的视图页面中，做到开箱即用。

3、子应用和主应用的一些交互（比如由子应用发起的在主应用内的路由跳转、由子应用发起的登陆信息过期在主应用内做退出登录等）通过一套标准的通信规范文档来实现。




###  initGlobalState 和 onGlobalStateChange 成对使用
    window.actionsQiankun = initGlobalState({
      authToken: allInfo.authToken, //token
      subAppOptions: {} //额外的子应用需要的自定义的一些传输参数
    })
    // 主应用监听change
    window.actionsQiankun.onGlobalStateChange((state, prev) => {
      if (state.eventType === 'NAVIGATETO' && state.routeParams) {
        console.log('开始路由跳转', state.routeParams)
        //根据参数做响应跳转动作 


### 新的 API loadMicroApp
这个 API 用于手动挂载一个微应用
复制代码/** 用于加载一个微应用 */
loadMicroApp(app: LoadableApp, configuration?: FrameworkConfiguration)
使用详情可见上面 多应用支持 小节。


### 碰到的问题
https://blog.csdn.net/weixin_43340372/article/details/122220842
node_modules里的依赖默认是不会编译的,会导致es6语法在ie中的语法报错,所以需要在vue.config.js中使用transpileDependencies属性配置node_modules中指定哪些文件夹或文件需要编译.
## todo
iframe解决方案
微应用嵌套支持
与 Webpack5 Module Federation 的结合，提供官方的使用指导或插件
更多的实验性（experimental）尝试，如基于原生 Portal 标签的微应用渲染，基于运行时的更轻量的样式隔离方案。
