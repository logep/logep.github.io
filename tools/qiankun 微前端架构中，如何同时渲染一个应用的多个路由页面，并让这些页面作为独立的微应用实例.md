> 本文原文地址 [purefunction.xyz](https://purefunction.xyz/microapp-multiple)

> 太长不看，说重点👇： 问题：微前端架构中，如何同时渲染一个应用的多个路由页面，并让这些页面作为独立的微应用实例？ 解决：集成 qiankun.js，用 loadMicroApp 方法手动加载子应用，子......

太长不看，说重点👇：
-----------

问题：微前端架构中，如何同时渲染_一个应用_的多个路由页面，并让这些页面作为_独立_的微应用实例？

解决：集成 qiankun.js，用 `loadMicroApp` 方法手动加载子应用，子应用每次渲染**创建新的应用实例**，并采用**内存路由**方案做页面的匹配和跳转。

废话少说，show me the code 👇👇：
---------------------------

[🔥DEMO🔥](https://github.com/hoomjac/micro-frontend-example)

背景
--

公司有一个平台型应用，像这样：

![](https://i.typlog.com/purefunction/8349465254_978814.png)

左边的一级菜单对应的是一个个独立的应用，二级菜单对应的是该应用的不同路由页面。点击二级菜单时，页面中间的 iframe 会加载这个应用的某个路由页面。每个**子应用**支持独立部署使用，独立使用时，子应用会出现侧边菜单，即应用的不同路由页面，像这样：

![](https://i.typlog.com/purefunction/8349465232_123548.png)

So far so good。iframe 作为微前端方案似乎也没什么不妥，上线运行良好。

但是，当遇到需要在不同页面之间来回跳转的场景，比如在 A 应用做一个查询，然后跳到 B 应用改一个值，接着又要回到 A 页面操作一下，再到 B...。由于中间的 iframe 同一时间只能显示一个应用，所以在来回切换的时候每次都需要初始化应用，导致应用的操作状态无法保存，体验使人崩溃。

解决办法也很简单 -- **加入 Tab 页签**。每次点击菜单，把该应用 / 页面加载到一个 Tab 页签下，就像浏览器的页签一样，来回切换时能保留住页面的操作状态，便于跳转、对比、查看、操作。

![](https://i.typlog.com/purefunction/8349465225_552876.png)

由于引入了多页签设计，每个页签都需要一个 iframe 作为应用容器，体验就出现问题了，页签开多了卡到抑郁，而且一个页签关闭后重新打开，又要重新初始化 iframe。于是决定使用 qiankun.js 做微前端改造。

同一应用加载多个实例
----------

qiankun.js 基于路由的配置，即一个路由地址对应一个应用，不能满足我们的需求。因为我们有多个页签，不同页签下渲染的可能是同一个应用的不同路由页面，而浏览器的地址只有一个，会造成渲染冲突：假如「页签 1」和「页签 2」是同一个应用的不同路由页面，当地址匹配到页签 1 时，页签 2 也同样受到地址改变的影响，从而跳转到页签 1 的路由页面。毕竟是同一个应用，认的是同一个地址栏。

针对此，qiankun.js 的文档上也说得很清楚了：

> [同时存在多个微应用时](https://qiankun.umijs.org/zh/cookbook#%E5%90%8C%E6%97%B6%E5%AD%98%E5%9C%A8%E5%A4%9A%E4%B8%AA%E5%BE%AE%E5%BA%94%E7%94%A8%E6%97%B6)，如果这些微应用都有路由跳转的需求，要保证这些路由能互不干扰，需要使用 memory 路由。

首先，我们不能通过路由配置的方式加载子应用了，那就手动调用 qiankun 提供的`loadMicroApp` API；其次，每一个页签下的子应用，需要是完全独立的应用实例，互不影响，所以不能使用基于地址栏的路由方案，只能用**内存路由**来匹配页面。

> 所谓内存路由，就是不显示在地址栏的路由，路由表作为内存变量维护在应用中，也就是说刷新一下就没了（当然也可以做持久化）。我们平常使用的路由库，除了提供常用的 hash 路由或 histroy 路由的方案，也都提供了内存路由方案。每个库可能命名不同，比如在 `Vue Router 4.x` 中，通过 `createMemoryHistory` 可以创建内存路由。

总结一下，整体流程是这样的：点击菜单项，创建一个新的 tab 标签页，调用 `loadMicroApp` ，传入对应 path，比如 `/childA/page1`。在子应用 childA 中，收到这个 path，于是创建一个新的应用实例（如 Vue3 的 createApp），并且跳转到 `/page1` 对应的路由页面。由于使用的是内存路由，地址栏上的地址不会发生任何变化。接着，点击另一个菜单项 `/childA/page2`，再建一个标签页，子应用 childA 再次创建一个新的应用实例（和前面那个完全无关），并使用内存路由跳转到了 `/page2` 对应的页面...

代码实现
----

**使用 Vue3+TypeScript 为例，其他框架同理。**

首先，参考 qiankun [官方文档](https://qiankun.umijs.org/zh/guide/tutorial)，主应用装好相关依赖，子应用配置好 webpack，publicPath，暴露出钩子方法... 在此不赘述。

说几个重点：

### 主应用

为了方便使用，先封装一个 `useMicroApp` 方法，内部调用 qiankun 的 API

```
// src/utils/useMicroApp.ts


import { LoadableApp, loadMicroApp, MicroApp, ObjectType } from 'qiankun'


import NProgress from 'nprogress'


import '../styles/nprogress.css'


export function useMicroApp() {


  // 维护一个 appMap，作为应用实例缓存


  const appMap: { [k: string]: MicroApp } = {}


  // 封装 loadMicroApp 方法，加点料


  const loadApp = (app: LoadableApp<ObjectType>) => {


		// 加载子应用前，出现加载进度条


    NProgress.start()


    // 调用 loadMicroApp 方法，传入参数


    const newApp = loadMicroApp(app)


    // 将新的微应用实例存入 appMap


    appMap[app.name] = newApp


    // 应用加载结束或错误时，关闭加载进度条


    newApp.mountPromise


      .then(() => {


        NProgress.done()


      })


      .catch(() => NProgress.done())


  }


  // 返回 appMap 和 loadApp


  return {


    loadApp,


    appMap


  }


}


```

菜单的数据长这样👇：

```
export const mockMenu = [


  {


    path: 'childA',


    id: 'suygdf786qadf8a8sf8af878d7fa',


    name: '子应用A',


    entry: '//localhost:10001',


    children: [


      {


        path: 'child-a/page1',


        id: 'f083bcc9f0ea4a7c8e4cf30dfb066f93',


        name: '页面1',


        entry: '//localhost:10001'


      },


      {


        path: 'child-a/page2',


        id: 'ab34b1b1feab4f5abf950d1c9999c46d',


        name: '页面2',


        entry: '//localhost:10001'


      },


      {


        path: 'child-a/page3',


        id: 'aef8d6903a7e4db0b04b96d1403d406c',


        name: '页面3',


        entry: '//localhost:10001'


      }


    ]


  }


]


```

菜单点击的处理逻辑：

```
// src/App.vue


setup() {


    const menuList = ref<MenuList>(mockMenu)


    const { loadApp, appMap } = useMicroApp()


    const panes = ref<{ title: string; key: string; [k: string]: any }[]>([])


    const activePaneKey = ref(


      panes.value.length ? panes.value[0].key : undefined


    )


    async function handleClick(item: MenuItem) {


      const appId = item.id


      const isPaneExist = panes.value.some(p => p.key === appId)


      const microApp = appMap[appId]


      // 如果标签已经存在，切换到对应标签


      if (isPaneExist) {


        activePaneKey.value = appId


        return


      }


      // 不存在，创建新的标签，并激活标签，然后渲染微应用


      panes.value.push({


        title: item.name,


        key: appId


      })


      // 激活新的页签


      activePaneKey.value = appId


      // 在下一个 tick 执行加载微应用的逻辑，确保 DOM 容器生成了


      await nextTick()


      if (microApp) {


        // 如果子应用注册过了，重新mount一下就好


        microApp.mount()


      } else {


        // 首次加载，注册并加载子应用。传入 path 供子应用作路由跳转


        loadApp({


          name: appId,


          entry: item.entry,


          container: `#${appId}`,


          props: {


            path: item.path


          }


        })


      }


    }


}


// ...


```

关闭页签时，卸载应用：

```
// src/App.vue


function onPaneEdit(


      targetKey: string | MouseEvent,


      action: 'remove' | 'add'


    ) {


      if (typeof targetKey === 'string' && action === 'remove') {


        appMap[targetKey].unmount().then(() => {


          removePane(targetKey)


        })


      }


    }


```

### 子应用

路由表配置：

```
import { createRouter, Router, RouterHistory } from 'vue-router'


export const routes = [


  {


    path: '/',


    component: () => import('../views/Page1.vue')


  },


  {


    path: '/page1',


    component: () => import('../views/Page1.vue')


  },


  {


    path: '/page2',


    component: () => import('../views/Page2.vue')


  },


  {


    path: '/page3',


    component: () => import('../views/Page3.vue')


  }


]


// 导出一个 createRouterByHistory 方法


export function createRouterByHistory(history: RouterHistory): Router {


  return createRouter({


    history,


    routes


  })


}


```

上面导出了一个叫做 `createRouterByHistory` 的方法，接受一个 history 作为参数，接着调用 `createRouter` 创建路由。为什么这么做呢？因为我们希望子应用作为微应用加载时使用「内存路由」方案，而单独使用时用 hash 路由方案。所以封装一个方法动态创建。

接着，在子应用入口文件 `main.ts` 中:

```
import './public-path'


import 'core-js/stable'


import 'regenerator-runtime/runtime'


import { App as VueApp, createApp } from 'vue'


import App from './App.vue'


import { createMemoryHistory, createWebHashHistory } from 'vue-router'


import { createRouterByHistory } from './router/index'


import { name as appName } from '../package.json'


// 应用是否作为微应用加载（在qiankun运行环境内）


const poweredByQiankun: boolean = (window as any).__POWERED_BY_QIANKUN__


// 如果是作为微应用加载，使用内存路由，否则使用 hash 路由


const history = poweredByQiankun


  ? createMemoryHistory(`/${appName}/`) // 使用 package.json 中的 name 字段作为路由的 base, 与主应用传入的 path 对应


  : createWebHashHistory()


// 传入 history，创建路由


const router = createRouterByHistory(history)


interface QiankunProps {


  [k: string]: any


  path?: string


  container?: Element


}


// 全局变量，Vue 应用实例，用于方便在 unmount 中访问


let app: VueApp | null


// 应用渲染函数


function render(props: QiankunProps) {


  // 主应用传过来的加载路径，如果不是作为微应用访问，path为 undefined


  const { path, container } = props


  // 每次 render 都重新创建一个新的应用实例


  app = createApp(App)


  app.use(router).mount(container ? container.querySelector('#app') : '#app')


  // 如果作为微应用加载，且主应用传来了 path ,跳转到此 path (内存路由)


  if (poweredByQiankun && path) {


    router.push(path)


  }


}


// 独立运行时,直接调用 render 方法，正常渲染应用


if (!poweredByQiankun) {


  render({})


}


/* 👇 qiankun 微应用钩子函数 👇 */


export async function bootstrap() {


  console.log('bootstrap')


}


export async function mount(props: QiankunProps) {


  render(props)


}


export async function unmount() {


  if (app) {


    app.unmount()


    app._container.innerHTML = ''


    app = null


    history.destroy()


  }


}


```

重点有两个：

1.  **动态创建路由**。根据 `poweredByQiankun` 标识，创建不同的路由。如果应用是作为微应用加载运行，调用 `createMemoryHistory` 创建内存路由，即应用的页面跳转不会反应到浏览器地址栏中；如果子应用独立运行加载，则调用`createWebHashHistory`创建 hash 路由, 确保在单独使用子应用的时候，有正常的浏览器地址作为跳转标识
2.  **独立的应用实例**。在 render 方法中，每次都调用 `createApp` 重新创建一个应用实例，确保每个页签中的应用是完全独立的不会相互影响。把创建的应用实例存在一个全局变量里，是为了 `unmount` 勾子方法可以访问到，从而卸载应用

部署
--

部署方案视情况而定。由于应用加载时，主应用需要用 fetch 方法请求子应用的资源，所以子应用需要做好**跨域配置**。一般来说，用 NGINX 配置妥当即可。
