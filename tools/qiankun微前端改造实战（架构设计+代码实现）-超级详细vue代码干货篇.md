> 本原文地址 [juejin.cn](https://juejin.cn/post/7096047543447978014)

> 上篇我们讲到了怎么去设计微前端架构，这篇将从代码层面，全面详细的从零开始，5000 + 行代码，手摸把手的一点点开始搭建微前端

上篇我们讲到了怎么去设计微前端架构，这篇将从代码层面，全面详细的从零开始，**5000 + 行代码**，手~摸~把手的一点点开始搭建微前端！

###### PS: 众所周知，掘金社区活跃最多的，就是非常爱好 ctrl+c 的伸手党。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/896ef8dffc194841a38f68824b40a486~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

为了方便各位伸手党的大佬们直接拿走，特意做了两个代码仓库，一个主应用，一个子应用，甚至完整在自己的服务器上部署了主子应用的代码，**有 code，有 demo**，**这诚意是不是可以拿走之前点个赞？**

线上 demo 地址：[在线预览微前端，可以自由加载子应用的主应用 workspace](https://link.juejin.cn/?target=http%3A%2F%2F121.5.172.29%3A8080%2Flogin "http://121.5.172.29:8080/login")

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/324dd1b97a704e44af95b6aac52d4d38~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

主应用代码仓库地址: [主应用地址，npm run 开箱即用!](https://link.juejin.cn/?target=https%3A%2F%2Fgitee.com%2Fwx_3b8f380df3%2Fqiankun-main-application "https://gitee.com/wx_3b8f380df3/qiankun-main-application")

子应用代码仓库地址: [子应用地址，npm run 开箱即用!](https://link.juejin.cn/?target=https%3A%2F%2Fgitee.com%2Fwx_3b8f380df3%2Fqiankun-sub-application "https://gitee.com/wx_3b8f380df3/qiankun-sub-application")

对于需要搭建微前端的小伙伴来说，qiankun 应该是非常熟悉了。这里不再对 qiankun 做过多篇幅的基础概念介绍，只针对用 qiankun 里的 loadmicroapp、setGlobalState 等等一些特性做细致的代码讲解，如果对 qiankun 还是零基础可以去[官网](https://link.juejin.cn/?target=https%3A%2F%2Fqiankun.umijs.org%2Fzh "https://qiankun.umijs.org/zh")或者去掘金搜索相关介绍文档。

上一篇我们提到，想要完成微前端改造，需要新建一个后台管理**总**系统。接下来我们把总系统称为 workspace(工作总台), 也在微前端里面的主应用的概念。我们要先搭建一个主应用，然后在主应用内部去加载各个子应用（也就是电话、手机等等具体的业务系统），最终结合起来形成我们一套完整的微前端体系。具体的代码思路为：

**1、主应用 workspace 内统一 login 登陆页面，所有以前的子应用剥离 login 登陆逻辑和登陆页签，统一从 workspace 入口进入系统，子应用系统通过 qiankun 的 globalState 机制，以 authToken 形式下发 token 令牌，达到一个令牌登陆所有系统的目的。**

**2、所有的子应用通过全量 url 形式直接提供给 workspace，提供了 url 即可嵌入到 workspace 的视图页面中，做到开箱即用。**

**3、子应用和主应用的一些交互（比如由子应用发起的在主应用内的路由跳转、由子应用发起的登陆信息过期在主应用内做退出登录等）通过一套标准的通信规范文档来实现。**

1、workspace 底层搭建
----------------

无论是否是微应用系统，通用的后台管理类系统，绕不开的底层 2 大模块 --- 路由模块 (router)、数据模块 (vuex)。接下来我们讲这两大模块和 qiankun 结合起来，从 main.js 开始一个个模块代码详细讲解！干货来了！

### 1、main.js 改造。

由于可能会有子应用 url 地址动态加入，所以 workspace 的路由表将会变成动态路由，才能适应未来任意扩展新的子应用路由进入。此外，由于数据层面需要和子应用做交互，我们需要依赖 setGlobalState 做一套标准完善的数据通信机制。有了这两点考虑，我们就开始可以改造 main.js 了。如下

```


import './permission' 

import { initState } from '@/initQiankunState/index.js'

import { makeAllRouter } from '@/makeAllComponentRouter/index.js'

console.log('workspace-start')

initState()
makeAllRouter()













```

第一步：全局状态 globalState 改造。（注意此处的全局不再是 workspace 全局，而是指 workspace 系统加上全部手机系统、电话系统等等整个系统的合集）

```
import { initGlobalState } from 'qiankun'

import { goToRouter } from './navigator.js'

import { clearLogin } from '@/utils/tokenExpired.js'

export const initState = function() {
  console.log('开始初始化state')
  
  
  const allInfoJSON = window.localStorage.getItem('allUserInfo') || '{}'
  
  if (!window.actionsQiankun) {
    const allInfo = JSON.parse(allInfoJSON)
    
    window.actionsQiankun = initGlobalState({
      authToken: allInfo.authToken, 
      appName: '',  
      eventType: '', 
      routeParams: {}, 
      subAppOptions: {} 
    })
    
    window.actionsQiankun.onGlobalStateChange((state, prev) => {
      console.log('子应用收到的全量state', state)
      
      if (state.eventType === 'NAVIGATETO' && state.routeParams) {
        console.log('开始路由跳转', state.routeParams)
        
        goToRouter(state)
      }
      
      if (state.eventType === 'TOKEN_EXPIRED') {
        console.log('登录过期')
        clearLogin()
      }
    })
  } else {
    console.log('已经初始化过state')
  }
}



```

```
import { Message } from 'element-ui'


import { autoFillComponent, addAllRoutes } from '@/makeAllComponentRouter/makeComponents.js'
import router from '@/router/index.js'
export const goToRouter = (state) => {
  if (!state.routeParams?.name) {
    Message({
      message: '缺少路由name，请联系管理员',
      type: 'error',
      duration: 3 * 1000
    })
    return
  }
  if (!state.routeParams?.url) {
    Message({
      message: '缺少路由url，请联系管理员',
      type: 'error',
      duration: 3 * 1000
    })
    return
  }
  
  const fullRouter = autoFillComponent(state.routeParams, true)
  const firstChild = fullRouter.children[0] || {}
  
  const queryStr = firstChild.meta?.query || ''
  const urlSearchParams = new URLSearchParams(queryStr)
  const query = Object.fromEntries(urlSearchParams.entries())
  console.log('urlquery', query)
  
  addAllRoutes([fullRouter])
  
  
  const tempRouteJson = window.localStorage.getItem('tempRouteJson')
  const tempRoute = tempRouteJson ? JSON.parse(tempRouteJson) : []
  let routeHasExist = false
  for (let index = 0; index < tempRoute.length; index++) {
    const element = tempRoute[index] || {}
    if (element.url === state.routeParams.url) {
      routeHasExist = true
      break
    }
  }
  if (!routeHasExist) {
    tempRoute.push(state.routeParams || {})
  }
  window.localStorage.setItem('tempRouteJson', JSON.stringify(tempRoute))

  router.push({
    path: firstChild.path,
    query
  })
}



```

```
import router from '@/router/index.js'
import { removeToken } from '@/utils/auth'
let disable = false
export const clearLogin = () => {
  if (!disable) {
    disable = true
    console.log('开始执行removeToken-tokenExpired')
    removeToken()
    router.push('/login')
  }
  setTimeout(() => {
    disable = false
  }, 1500)
}


```

```
import Cookies from 'js-cookie'

const TokenKey = 'workspace-token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  window.localStorage.removeItem('allUserInfo')
  window.localStorage.removeItem('tempRouteJson')
  console.log('localStorage has been cleared by remove token')
  return Cookies.remove(TokenKey)
}


```

第二步：动态路由改造

```
import { autoFillComponent } from '@/makeAllComponentRouter/makeComponents.js'
import { addAllRoutes } from '@/makeAllComponentRouter/makeComponents.js'
import { resetRouter } from '@/router/index.js'

import { splitUrl } from '@/utils/qiankunMethods.js'
import Vuex from '@/store/index'

import { prefetchApps } from 'qiankun'


function makePathArr(menus = []) {
  const pathArrTemp = []
  
  for (let firstIndex = 0; firstIndex < menus.length; firstIndex++) {
    const firstElement = menus[firstIndex]
    
    
    if (firstElement.url && firstElement.id && firstElement.name) {
      pathArrTemp.push(firstElement)
    }
  }
  return pathArrTemp
}

export const makeAllRouter = function() {
  const fullRouter = []
  const userInfo = JSON.parse(window.localStorage.getItem('allUserInfo') || '{}')
  
  
  const preLoadArr = []
  if (userInfo.menus) {
    const pathArr = makePathArr(userInfo.menus)
    console.log('pathArr:', pathArr)
    for (let index = 0; index < pathArr.length; index++) {
      
      const element = pathArr[index]
      const fullSingleRouter = autoFillComponent(element)
      fullRouter.push(fullSingleRouter)
      
      const pathSplit = splitUrl(element.url)
      const host = pathSplit[0]
      preLoadArr.push(host)
    }
  } else {
    console.log('未登录或者已经初始化过router')
  }
  
  const tempRouteJson = window.localStorage.getItem('tempRouteJson')
  const tempRoute = tempRouteJson ? JSON.parse(tempRouteJson) : []
  if (tempRoute.length > 0) {
    for (let index = 0; index < tempRoute.length; index++) {
      const element = tempRoute[index] || {}
      const fullSingleRouter = autoFillComponent(element, true)
      fullRouter.push(fullSingleRouter)
    }
  }
  if (fullRouter.length > 0) {
    
    resetRouter()
    console.log('制造好的全量qiankun路由为:', fullRouter)
    
    addAllRoutes(fullRouter)
  } else {
    
    
    console.log('没有菜单')
  }

  
  const preLoadArrSet = [...new Set(preLoadArr)]
  console.log(preLoadArrSet, 'preLoadArr')
  
  Vuex.commit('permission/CHANGE_PRELOAD', preLoadArrSet)
  const qiankunConfigArr = preLoadArrSet.map((preLoad, index) => {
    return {
      name: `qiankunPreloadSubapp${index}`,
      entry: preLoad
    }
  })
  
  if (!window.hasPreloadSubApp) {
    prefetchApps(qiankunConfigArr)
    window.hasPreloadSubApp = true
  }
}


```

```
import { Message } from 'element-ui'
export const splitUrl = (url = '') => {
  try {
    const urlObj = new URL(url)
    const origin = urlObj.origin
    
    if (urlObj.hash) {
      const hashPath = urlObj.hash.slice(1)
      
      if (hashPath.includes('?')) {
        
        const pathAnQueryArr = hashPath.split('?')
        const hasPathOnly = pathAnQueryArr[0]
        const query = `?${pathAnQueryArr[1]}`
        return [origin, hasPathOnly, query]
      } else {
        return [origin, hashPath]
      }
    }
    if (urlObj.pathname) {
      if (urlObj.search) {
        return [origin, urlObj.pathname, urlObj.search]
      } else {
        return [origin, urlObj.pathname]
      }
    }
  } catch (error) {
    Message.error(`解析菜单url失败,非法的url为：${url}`)
    console.error(error)
    return [window.location.origin, `/unknown${Math.random() * 100}`]
  }
}


```

接下里是最重要的部分，自动生成 qiankun 路由

```
import { loadMicroApp } from 'qiankun'
import Layout from '@/components/layout'
import store from '@/store/index.js'
import router from '@/router/index.js'
import { splitUrl } from '@/utils/qiankunMethods.js'
import { getToken } from '@/utils/auth.js'
const md5 = require('md5')

export const autoFillComponent = (element = {}, isFromSubApp = false) => {
  const pathSplit = splitUrl(element.url)
  const host = pathSplit[0]
  const allPath = pathSplit[1]
  const query = pathSplit[2]
  const queryForSearch = {}
  if (query) {
    const queryOnly = query.slice(1)
    console.log(queryOnly, 'queryOnly')
    const tmpFirstArr = queryOnly.split('&')
    for (let index = 0; index < tmpFirstArr.length; index++) {
      const element = tmpFirstArr[index]
      const tmpSecondArr = element.split('=')
      const key = tmpSecondArr[0] || 'errorKey'
      const value = tmpSecondArr[1] || 'errorValue'
      queryForSearch[key] = value
    }
  }
  const splitPath = allPath.split('/')
  const firstPath = splitPath[1]
  
  
  
  const identity = isFromSubApp ? `sub${md5(allPath)}` : element.id
  return {
    path: `/${firstPath}${identity}`,
    meta: {
      title: element.name
    },
    component: Layout,
    children: [
      {
        path: allPath,
        name: identity,
        component: {
          render: function(h) {
            return h(
              'div',
              {
                attrs: {
                  id: identity,
                  class: `full-height-and-width`
                }
              },
              [h('div', {
                attrs: {
                  class: 'full-height-and-width-spin'
                }
              }, '加载中')]
            )
          },
          name: identity,
          data() {
            return {
              loading: false,
              microApp: null,
              routePath: '',
              name: '',
              username: ''
            }
          },
          activated() {
            console.log('activated subapp')
            if (this.microApp.update) {
              this.microApp.update({
                routePath: this.routePath,
                lifeCycle: 'onactive'
              })
            }
          },
          mounted() {
            console.log(this.$el, 'curent subapp mounted')
            this.initQiankunMicroApp()
          },
          methods: {
            initQiankunMicroApp() {
              this.loading = true
              store.commit('permission/CHANGE_MOUNTED_STATUS', this.loading)
              console.log('当前qiankun容器的this.$route路由为:', this.$route)
              const entry = this.$route.meta.qiankunConfig.entry
              
              this.routePath = this.$route.meta.qiankunConfig.routePath || this.$route.path
              this.microApp = loadMicroApp({
                name: identity,
                entry,
                container: `#${identity}`,
                props: {
                  routePath: this.routePath,
                  query: queryForSearch,
                  workspaceWindow: window,
                  loginInfo: {
                    platform: 'WORKSPACE',
                    type: '2',
                    authToken: getToken()
                  }
                }
              }, {
                excludeAssetFilter: url => (url.includes('baidu') || url.includes('bdimg'))
              })
              this.microApp.mountPromise.then(() => {
                this.loading = false
              }).catch((err) => {
                console.log(err, 'mount sub app fail')
              }).finally(() => {
                this.loading = false
                console.log('子应用 finally')
                store.commit('permission/CHANGE_MOUNTED_STATUS', this.loading)
              })
            }
          },
          beforeDestroy() {
            console.log('beforeDestroy')
            store.commit('permission/CHANGE_MOUNTED_STATUS', false)
            if (this.microApp) {
              this.microApp.unmount()
            }
          }
        },
        meta: {
          qiankunConfig: {
            entry: host
          },
          query,
          title: element.name,
          icon: 'form',
          activeMenu: element.activeMenu
        }
      }
    ]
  }
}

export const addAllRoutes = (fullRouter = []) => {
  store.commit('permission/ADD_DYNAMIC_ROUTES', fullRouter)
  router.addRoutes(fullRouter)
}


```

第三步：生层路由鉴权文件

```
import router from './router'
import NProgress from 'nprogress' 
import 'nprogress/nprogress.css' 
import { getToken } from '@/utils/auth' 
import Vuex from '@/store/index'
import { match } from 'path-to-regexp'
NProgress.configure({ showSpinner: false }) 

const rawAppendChild = HTMLHeadElement.prototype.appendChild
const rawAddEventListener = window.addEventListener
let rawAppendChildSubCopy = null
let rawAddEventListenerSubCopy = null
const whiteList = ['/login'] 


router.beforeEach((to, from, next) => {
  
  NProgress.start()

  
  const hasToken = getToken()

  if (hasToken) {
    console.log('有token')
    if (to.path === '/login') {
      console.log('path是login')
      
      next({ path: '/' })
      NProgress.done() 
    } else {
      console.log('开始鉴权qiankun路由')
      
      const allRouterPathArr = Vuex.state.permission.addPaths || []
      const isChildRoute = path => allRouterPathArr.some(item => {
        const fn = match(item, { decode: decodeURIComponent })
        return !!fn(path)
      })
      console.log('开始鉴权qiankun路由结束')
      if (isChildRoute(from.path) && !isChildRoute(to.path)) {
        console.log('从子应用路由跳转到主应用路由')
        rawAppendChildSubCopy = HTMLHeadElement.prototype.appendChild
        rawAddEventListenerSubCopy = window.addEventListener
        HTMLHeadElement.prototype.appendChild = rawAppendChild
        window.addEventListener = rawAddEventListener
        console.log('qiankun整体结束')
      } else if (!isChildRoute(from.path) && isChildRoute(to.path)) {
        if (rawAppendChildSubCopy && rawAddEventListenerSubCopy) {
          HTMLHeadElement.prototype.appendChild = rawAppendChildSubCopy
          window.addEventListener = rawAddEventListenerSubCopy
        }
        console.log('qiankun整体结束')
      }
      
      next()
    }
  } else {
    
    console.log('没有token')
    if (whiteList.indexOf(to.path) !== -1) {
      console.log('在白名单')
      
      next()
    } else {
      
      console.log('不在白名单', to)
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  
  NProgress.done()
})



```

至此，我们数据模块和路由模块改造完成，接下来改造视图层面的 sidebar 菜单模块

### 2、视图层面的 sidebar 改造

```
// sidebar.vue

<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in allMenusfull" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Scrollbar } from 'element-ui'
import SidebarItem from './SidebarItem'
import { splitUrl } from '@/utils/qiankunMethods.js'
import { constantRoutes } from '@/router/index'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, elScrollbar: Scrollbar },
  data() {
    return {
      allMenusfull: []
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { path } = route
      return path
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    // 生成动态+固定的全量菜单
    this.makeAllDynamicMenus()
    this.makeStaticRouter()
  },
  methods: {
    fullMenuInfo(element) {
      element.path = element.id
      element.meta = {
        icon: element.icon || element.privilegeIcon,
        title: element.name
      }
    },
    fullRouternfo(element) {
      // 按标准格式填充路由
      const pathSplit = splitUrl(element.url)
      const allPath = pathSplit[1]
      element.path = allPath
      element.meta = {
        title: element.name
      }
    },
    fullFisrtNoChildren(element) {
      // 按标准格式填充路由
      const pathSplit = splitUrl(element.url)
      const allPath = pathSplit[1]
      const splitPath = allPath.split('/')
      const firstPath = splitPath[1]
      element.path = `/${firstPath}${element.id}`
      element.meta = {
        title: element.name
      }
      element.children = [
        {
          path: allPath,
          name: element.id,
          meta: { title: element.name, icon: 'form' }
        }
      ]
    },
    makeAllDynamicMenus() {
      const allInfoJson = window.localStorage.getItem('allUserInfo') || '{}'
      const allUserInfo = JSON.parse(allInfoJson)
      // allInfoJSON是从做完登陆动作从登陆login接口获取一些基本的鉴权和用户信息和菜单数据数据给到子应用
      /***
          eg: {
                  'name': 'steven',
                  'username': 'steven',
                  'authToken': '400e4386-38f1-4d56-ab63-a9b0a2694344dc',
                  'menus': [
                    {
                      'name': '手机业务来自子应用url',
                      'id': 'sub_app',
                      'url': 'http://121.5.172.29:8081/#/suborigin/suborigin'
                    },
                    {
                      'name': '电话业务来自子应用url',
                      'id': 'sub_app2',
                      'url': 'http://121.5.172.29:8081/#/subattr/subattr'
                    }
                  ]
            }
       **/
      const menus = allUserInfo.menus || []
      for (let firstIndex = 0; firstIndex < menus.length; firstIndex++) {
        const firstElement = menus[firstIndex] || {}
        this.fullFisrtNoChildren(firstElement)
      }
      this.allMenusfull = menus
    },
    makeStaticRouter() {
      // copy一下 不能破坏路由原始文件
      const constantRoutesCopy = JSON.parse(JSON.stringify(constantRoutes))
      const menusNoHidden = constantRoutesCopy.filter(item => !item.hidden)
      this.allMenusfull = [...menusNoHidden, ...this.allMenusfull]
      console.log('左侧全量的菜单数据为:', this.allMenusfull)
    }
  }
}
</script>


```

到此为止我们的主应用基本上 qiankun 改造完成了，接下来我们只需要在登录的时候模拟下后端返回的菜单数据即可将菜单动态渲染出来。

### 3、login 登录页面对接

```
this.$refs.loginForm.validate(valid => {
    if (valid) {
      this.loading = true
      setTimeout(() => {
        const res = {
          'name': 'steven',
          'username': 'steven',
          'authToken': '400e4386-38f1-4d56-ab63-a9b0a2694344dc',
          'menus': [
            {
              'name': '手机业务来自子应用url',
              'id': 'sub_app',
              'url': 'http://121.5.172.29:8081/#/suborigin/suborigin'
            },
            {
              'name': '电话业务来自子应用url',
              'id': 'sub_app2',
              'url': 'http://121.5.172.29:8081/#/subattr/subattr'
            }
          ]
        }
        const result = res
        window.localStorage.setItem('allUserInfo', JSON.stringify(result))
        
        initState()
        
        window.actionsQiankun.setGlobalState({
          authToken: result.authToken,
          appName: 'WORKSPACE',
          eventType: 'SET_TOKEN'
        })
        
        makeAllRouter()
        setToken(result.authToken)
        this.$router.push({
          name: 'Dashboard'
        })
        this.loading = false
      }, 1000)
    } else {
      console.log('error submit!!')
      return false
    }
})


```

到此为止我们的主应用基本改造完毕，可以看到上面代码中 ttp://121.5.172.29:8081/#/subattr/subattr 链接已经可以在视图层直接打开了，和后端微服务 openapi 方式颇为类似。可以直接对接 url 了！

接下来我们开始改造 121.5.172.29:8081 上的子应用，子应用改造完成之后，我们就正式大功告成！

子应用搭建相对比较简单，只需要按照 qiankun 和主应用要求的格式，改造 main 和基本的打包配置 vue.config.js 即可。接下来开始还是一步步实战

### step.1

在 webpack 入口文件 (main.js) 中的第一行加入动态 publiPath。（推荐使用 public-path 文件引入）

```
if (window.__POWERED_BY_QIANKUN__) {
	
  
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__
}


```

```
import './public-path.js' 
import Vue from 'vue'



```

### step.2

a. 更改 vue-cli 脚手架的 config，合并 css，可解决 qiankun 切换模块 css 样式造成的闪烁，并且可以提高子应用加载性能。（非 vue-cli 项目需独立配置 webpack）

b. 提供 output, 将生命周期钩子函数导出供 qiankun 调用

```
const { name } = require('./package')
function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer)
  } else if (m.name) {
    return m.name
  } else {
    return false
  }
}

module.exports = {
	configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', 
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
	chainWebpack: config => {
    
    const splitOptions = config.optimization.get('splitChunks')
    
    splitOptions.cacheGroups.appStyles = {
      name: 'styles',
      test: (m, c, entry = 'app') => m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
      chunks: 'all',
      minChunks: 1,
      enforce: true
    }
    config.optimization.splitChunks(splitOptions)

    
    config.plugins.delete('prefetch-index')
    config.plugins.delete('preload-index')
  }
}


```

### step.3

a. 注册全局通信模块 globalState

b. main.js 入口文件做 qiankun 注入对接处理

```
function emptyAction() {
  
  console.warn('Current execute action is empty!')
}

class Actions {
    
    actions = {
      onGlobalStateChange: emptyAction,
      setGlobalState: emptyAction
    };

    
    setActions(actions) {
      this.actions = actions
    }

    
    onGlobalStateChange(...args) {
      return this.actions.onGlobalStateChange(...args)
    }

    
    setGlobalState(...args) {
      return this.actions.setGlobalState(...args)
    }
}

const actions = new Actions()
export default actions


```

```
import './public-path.js'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
import '@/styles/index.scss' 
import store from './store'
import './icons' 
Vue.config.productionTip = false

import routes from './router'
import actions from './actions.js'

let appInstance = null
let router = null

function render(props = {}) {
  const { container, routePath, query } = props
  
  if (routePath) {
    window.routePathFromQianKun = routePath
  }
  if (query) {
    window.queryFromQianKun = query
  }
  
  const mode = window.__POWERED_BY_QIANKUN__ ? (routePath ? 'abstract' : 'history') : 'hash'
  router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    mode,
    routes: routes
  })
  
  appInstance = new Vue({
    el: container ? container.querySelector('#sub-app') : '#sub-app',
    router,
    store,
    render: (h) => h(App)
  })
}


if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  
  actions.setActions(props)
  console.log('[vue] props from main framework', props)
  render(props)
}

export async function unmount() {
  appInstance.$notify && appInstance.$notify.closeAll()
  console.log('[vue] unmount')
}

export async function update(props) {
  console.log('sub app updated')
}


```

### step.4

a. 新增 qiankun 状态管理

```
const state = {
  authToken: '',
}

const mutations = {
  CHANGE_AUTH_TOKEN: (state, authToken) => {
    console.log(authToken, 'auth token')
    state.authToken = authToken
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


```

b. 改造 App.vue。 对 qiankun 的注入逻辑做 mixin 处理。(注意: 除 setToken 等基础通用逻辑外，所有业务层面的 onGlobalStateChange 都必须加上 eventType 和 appName 判断过滤事件，否则可能会导致业务事件重复触发)

```
<script>
import actions from '@/actions.js'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    this.initQiankunGlobalState()
  },
  mounted() {
    
    if (window.routePathFromQianKun) {
      this.$router.push({
        path: window.routePathFromQianKun,
        query: window.queryFromQianKun || {}
      })
    }
  },
  methods: {
    initQiankunGlobalState() {
      const immediately = true 
      actions.onGlobalStateChange((state, pre) => {
        
        this.$store.commit('qiankun/CHANGE_AUTH_TOKEN', state.authToken)
        
        console.log(state)
      }, immediately)
    }
  }
}
</script>


```

c. 改造 request.js，从主应用获取 axios 的 baseUrl;header 头添加统一的 authToken 权限。authToken 从 globalState 获取

```
import axios from 'axios'
import Vuex from '@/store/index'

const origin = window.__POWERED_BY_QIANKUN__ ? window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ : window.location.origin
const servies = axios.create({
  baseURL: origin,
  withCredentials: true 
})
servies.interceptors.request.use(
  config => {
 		
    config.headers['AUTH-TOKEN'] = Vuex.state.qiankun.authToken
    return config
  },
  () => {
    return Promise.reject()
  }
)

servies.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      actions.setGlobalState({
        appName: 'RAM', 
        eventType: 'TOKEN_EXPIRED'
      })
    }
  },
  error => {
    return Promise.reject(error)
  }
)


```

### step.6

需要进行应用通信时，引入 acitons 进行 setGlobal 处理，在各个应用监听 onGlobalChange 事件即可。以路由跳转为例，需要跳转路由时，上抛文档格式要求的参数字段到 qiankun，上层 workspace 即可做跳转处理。

```
const state = {
  authToken: '',
  routeParams: {
    name: '', 
    url: '', 
    id: '', 
    activeMenu: ''  
  },
  ramOptions: {

  }
}

const mutations = {
  CHANGE_AUTH_TOKEN: (state, authToken) => {
    console.log(authToken, 'auth token')
    state.authToken = authToken
  },
  CHANGE_ROUTE_PARAMS: (state, routeParams) => {
    console.log(routeParams, 'routeParams')
    state.routeParams = routeParams
  }
}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


```

```
if (window.__POWERED_BY_QIANKUN__) {
    this.$store.commit('qiankun/CHANGE_ROUTE_PARAMS', {
        name: name,
        url: `${process.env.VUE_APP_BASE_HOST}/#/suborigin/suborigin`,
    })
    actions.setGlobalState({
        appName: 'subapp',
        eventType: 'NAVIGATETO',
        routeParams: this.$store.state.qiankun.routeParams
    })
} else {
    this.$router.push({
        name: routeName,
        params: routeParams
    })
}


```

到此为止，我们的前端层面主子应用的改造终于完毕，按照正确 url 格式和内容接入即可实现一套基础的微前端！

当然，我们距离微前端完整运行，还需要一些后端、运维、以及规范方面的工作。比如：

1.  后端所有的接口和资源都需要支持跨域，需要后端放开处理。
2.  workspace 的项目需要支持 history 模式用来兼容子应用加载。
3.  子应用不应具有登录、权限体系，所有统一的鉴权体系应服从主应用管理。
4.  vue-router 要加上 subapp 名称或者严格的业务路由名称作为标识的基准路由，以防止路由冲突。
5.  禁止污染全局样式或者 UI 组件库样式，严格遵守样式开发规范 (修改局部样式加上自定义的类名)，原则上所有组件样式均加上 scoped 作用域，以防止污染 workspace 样式。
6.  禁用 window.localStorage.clear()。对自身的本地数据单独 remove。
7.  子应用实例化时，如果选择以 id 形式初始化 $el 元素，id 的值要加上具体的 subapp 名称 (如 id="weiteng-app")，不能直接写 id="app", 防止多个 subapp 实例化冲突。

此外，在后续的实际对接中，我们还会遇到很多很多规范和对接问题。比如百度地图问题、富文本编辑器的问题、代码库样式冲突问题等等。这些未来的问题都是可以解决的，只要我们严格的遵守统一的 ui 规范、命名规范、日常开发规范等等，这些问题都会迎刃而解。相反的，随着子应用越来越多，如果大家都随意开发，规范忽略，我们最终会出现的问题也是会越来越严重，越来越臃肿。

**上述示例中，部分代码没有展示，可以在 gitee 仓库中找到其他所有的代码，线上已经有 demo 跑起来了呦！**
