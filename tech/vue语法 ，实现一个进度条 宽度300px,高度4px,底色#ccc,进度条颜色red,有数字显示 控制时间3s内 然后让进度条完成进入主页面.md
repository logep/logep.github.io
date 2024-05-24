实现一个带有数字显示的进度条，并在 3 秒内完成进度然后进入主页面，可以使用 Vue 来编写。下面是一个完整的示例代码。

### 1. 创建 Vue 组件

首先，创建一个 Vue 组件 `ProgressBar.vue`，这个组件负责显示进度条和处理进度逻辑。

```vue
<template>
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    <div class="progress-text">{{ progress }}%</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      intervalId: null
    };
  },
  mounted() {
    this.startProgress();
  },
  methods: {
    startProgress() {
      const duration = 3000; // 3 seconds
      const increment = 100 / (duration / 100); // Calculate increment per 100ms

      this.intervalId = setInterval(() => {
        if (this.progress < 100) {
          this.progress += increment;
          if (this.progress >= 100) {
            this.progress = 100;
            clearInterval(this.intervalId);
            this.enterMainPage();
          }
        }
      }, 100);
    },
    enterMainPage() {
      // Redirect to the main page
      this.$router.push('/main'); // Assuming you are using Vue Router
    }
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
</script>

<style>
.progress-container {
  width: 300px;
  height: 4px;
  background-color: #ccc;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: red;
  transition: width 0.1s linear;
}

.progress-text {
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 12px;
}
</style>
```

### 2. 使用 Vue Router 进行页面跳转

假设你已经使用 Vue Router 设置了路由，可以在 `main.js` 或者 `router/index.js` 文件中定义路由。

```javascript
import Vue from 'vue';
import Router from 'vue-router';
import MainPage from './components/MainPage.vue';
import ProgressBar from './components/ProgressBar.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProgressBar',
      component: ProgressBar
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    }
  ]
});
```

### 3. 创建主页面组件

创建一个简单的主页面组件 `MainPage.vue`。

```vue
<template>
  <div>
    <h1>Welcome to the Main Page!</h1>
  </div>
</template>

<script>
export default {
  name: 'MainPage'
};
</script>

<style>
/* Add your styles here */
</style>
```

### 4. 初始化 Vue 实例

确保在 `main.js` 中初始化 Vue 实例，并挂载到 DOM。

```javascript
import Vue from 'vue';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
```

### 5. 应用结构

你的应用结构应类似于：

```
/src
  /components
    MainPage.vue
    ProgressBar.vue
  /router
    index.js
  App.vue
  main.js
```

这样，通过上述步骤，你已经创建了一个带有进度条和数字显示的 Vue 组件，并且在进度条完成后会跳转到主页面。



要让进度条组件显示在页面正中间，可以通过设置其父容器的 CSS 样式来实现居中对齐。你可以使用 `flexbox` 布局来实现这个效果。以下是更新后的 `ProgressBar.vue` 组件，带有居中对齐的样式：

### `ProgressBar.vue`

```vue
<template>
  <div class="progress-wrapper">
    <div class="progress-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      <div class="progress-text">{{ progress }}%</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      intervalId: null
    };
  },
  mounted() {
    this.startProgress();
  },
  methods: {
    startProgress() {
      const duration = 3000; // 3 seconds
      const increment = 100 / (duration / 100); // Calculate increment per 100ms

      this.intervalId = setInterval(() => {
        if (this.progress < 100) {
          this.progress += increment;
          if (this.progress >= 100) {
            this.progress = 100;
            clearInterval(this.intervalId);
            this.enterMainPage();
          }
        }
      }, 100);
    },
    enterMainPage() {
      // Redirect to the main page
      this.$router.push('/main'); // Assuming you are using Vue Router
    }
  },
  beforeDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
};
</script>

<style>
.progress-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 让容器高度占满整个视窗 */
}

.progress-container {
  width: 300px;
  height: 4px;
  background-color: #ccc;
  position: relative;
}

.progress-bar {
  height: 100%;
  background-color: red;
  transition: width 0.1s linear;
}

.progress-text {
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 12px;
}
</style>
```

### 主要变动：

1. **增加了 `.progress-wrapper` 样式**：
   - 使用 `display: flex` 来启用 Flexbox 布局。
   - `justify-content: center` 和 `align-items: center` 来水平和垂直居中内容。
   - `height: 100vh` 让容器高度占满整个视窗。

2. **将进度条容器放在 `.progress-wrapper` 中**：
   - 这样，进度条容器会在 `.progress-wrapper` 内居中对齐。

通过这些样式调整，进度条会在页面正中间显示，同时保持进度条的宽度、颜色和数字显示等样式。
