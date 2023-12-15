在 qiankun 微前端框架中，主应用使用 `loadMicroApp` 方法来加载子应用，而子应用本身负责自己的路由管理。如果你希望在加载子应用后，主应用控制子应用进行页面跳转，可以通过一些方式实现。

一种常见的方法是使用 qiankun 的 `emitLifeCycles` 方法，该方法允许你在主应用中触发子应用的生命周期函数，包括 `mount` 阶段。在 `mount` 阶段中，你可以通过发送自定义事件的方式通知子应用进行路由跳转。

以下是一个简单的示例：

在主应用中：

```javascript
// 主应用中
import { loadMicroApp, initGlobalState } from 'qiankun';

// 创建全局状态
const actions = initGlobalState({});

// 加载子应用
const app = loadMicroApp({
  name: 'child-app',
  entry: 'http://localhost:8081',
  container: '#child-app-container',
  props: {
    globalState: actions,
  },
});

// 在需要的时候触发子应用路由跳转
actions.onGlobalStateChange((state, prev) => {
  if (state.route) {
    // 触发子应用的路由跳转事件
    app.mountPromise.then(() => {
      app.instance.emit('navigate', state.route);
    });
  }
});
```

在子应用中：

```javascript
// 子应用中
import Vue from 'vue';
import App from './App.vue';
import router from './router';

const instance = new Vue({
  router,
  render: h => h(App),
}).$mount('#app');

// 监听主应用传递过来的路由跳转事件
instance.$on('navigate', route => {
  router.push(route);
});
```

在这个示例中，主应用通过 `initGlobalState` 创建了一个全局状态对象 `actions`，然后将该状态对象传递给子应用的 `props` 属性中。当需要在子应用中进行路由跳转时，主应用通过 `actions.onGlobalStateChange` 监听全局状态变化，并触发子应用的 `navigate` 事件。在子应用中，通过 `$on` 方法监听 `navigate` 事件，实现路由跳转。

请注意，这只是一种实现方式，实际上可以根据具体需求选择适当的方法。
