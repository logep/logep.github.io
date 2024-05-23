为了创建一个 Vue 插件来生成模块导航，可以按照以下步骤来实现。这包括自动生成导航栏，并且在页面上点击导航项时定位到相应的模块。导航栏的样式设计为定位在右上角，鼠标放上去时展开，鼠标移开时收缩只展示一个导航标题。

### 步骤概述

1. **创建 Vue 插件**：定义一个插件，用于注册全局组件或指令。
2. **自动生成导航栏**：通过扫描页面上的模块，动态生成导航项。
3. **导航栏的样式和行为**：实现悬停展开和离开收缩的效果。
4. **定位功能**：点击导航项时滚动到对应模块。

### 实现代码

#### 1. 创建插件文件 `module-nav-plugin.js`

```javascript
import Vue from 'vue';
import ModuleNav from './ModuleNav.vue';

const ModuleNavPlugin = {
  install(Vue, options = {}) {
    Vue.component('module-nav', ModuleNav);
  }
};

export default ModuleNavPlugin;
```

#### 2. 导航组件 `ModuleNav.vue`

```html
<template>
  <div class="module-nav" @mouseenter="expandNav" @mouseleave="collapseNav">
    <div class="nav-title" v-if="collapsed">导航</div>
    <ul v-if="!collapsed">
      <li v-for="(module, index) in modules" :key="index" @click="scrollToModule(module)">
        {{ module.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
      modules: []
    };
  },
  mounted() {
    this.collectModules();
  },
  methods: {
    collectModules() {
      const moduleElements = document.querySelectorAll('[data-module]');
      this.modules = Array.from(moduleElements).map((el, index) => ({
        id: el.id || `module-${index}`,
        title: el.getAttribute('data-title') || `Module ${index + 1}`,
        element: el
      }));
    },
    scrollToModule(module) {
      module.element.scrollIntoView({ behavior: 'smooth' });
    },
    expandNav() {
      this.collapsed = false;
    },
    collapseNav() {
      this.collapsed = true;
    }
  }
};
</script>

<style scoped>
.module-nav {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  width: 200px;
  transition: width 0.3s, height 0.3s;
}

.nav-title {
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 5px 10px;
  cursor: pointer;
}

li:hover {
  background: #f0f0f0;
}
</style>
```

#### 3. 在主项目中使用插件

首先，引入插件并在 Vue 应用中安装它：

```javascript
// main.js
import Vue from 'vue';
import App from './App.vue';
import ModuleNavPlugin from './plugins/module-nav-plugin';

Vue.use(ModuleNavPlugin);

new Vue({
  render: h => h(App)
}).$mount('#app');
```

然后，在你的主模板中使用这个导航组件：

```html
<template>
  <div id="app">
    <module-nav></module-nav>
    <div v-for="index in 10" :key="index" :id="'module-' + index" :data-module="true" :data-title="'Module ' + index" class="module">
      <h2>Module {{ index }}</h2>
      <p>Content for module {{ index }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
.module {
  padding: 20px;
  border: 1px solid #ccc;
  margin: 20px 0;
  background: #f9f9f9;
}
</style>
```

### 解释

1. **插件安装**：插件定义了一个全局组件 `module-nav`，并在 `main.js` 中安装了插件。
2. **组件功能**：
   - **数据属性**：`modules` 存储页面模块的信息，`collapsed` 控制导航栏的展开和收缩。
   - **生命周期钩子**：`mounted` 钩子中调用 `collectModules` 方法，收集页面上所有标记了 `data-module` 属性的元素。
   - **方法**：
     - `collectModules`：收集页面上所有模块的信息。
     - `scrollToModule`：滚动到相应的模块。
     - `expandNav` 和 `collapseNav`：控制导航栏的展开和收缩。
3. **样式和行为**：
   - 样式中定义了导航栏的固定位置、展开和收缩的样式。
   - 鼠标进入导航栏时展开，移开时收缩，只显示导航标题。

这种实现方式确保导航栏在页面上始终可见，方便用户快速定位到不同的模块，并提供良好的用户体验。

### rollup 打包
为了将 `module-nav-plugin` 插件打包并发布到 npm，需要按照以下步骤进行代码组织和配置。我们将创建一个标准的 npm 包结构，包括必要的配置文件，并编写打包脚本。

### 目录结构

首先，组织项目目录结构如下：

```
module-nav-plugin/
├── dist/
├── src/
│   ├── ModuleNav.vue
│   └── index.js
├── .gitignore
├── package.json
├── README.md
├── rollup.config.js
└── webpack.config.js (optional)
```

### 1. `ModuleNav.vue`

组件文件 `src/ModuleNav.vue` 内容与之前提供的代码保持一致。

### 2. `index.js`

插件入口文件 `src/index.js`：

```javascript
import ModuleNav from './ModuleNav.vue';

const ModuleNavPlugin = {
  install(Vue) {
    Vue.component('module-nav', ModuleNav);
  }
};

export default ModuleNavPlugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ModuleNavPlugin);
}
```

### 3. `package.json`

`package.json` 配置文件：

```json
{
  "name": "module-nav-plugin",
  "version": "1.0.0",
  "description": "A Vue.js plugin for creating a module navigation",
  "main": "dist/module-nav-plugin.umd.js",
  "module": "dist/module-nav-plugin.esm.js",
  "scripts": {
    "build": "rollup -c"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/module-nav-plugin.git"
  },
  "keywords": [
    "vue",
    "plugin",
    "navigation",
    "module"
  ],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "rollup": "^2.0.0",
    "rollup-plugin-vue": "^5.0.0",
    "rollup-plugin-terser": "^7.0.0",
    "rollup-plugin-node-resolve": "^5.0.0",
    "rollup-plugin-commonjs": "^10.0.0",
    "vue-template-compiler": "^2.6.0"
  },
  "peerDependencies": {
    "vue": "^2.6.0"
  }
}
```

### 4. `rollup.config.js`

配置 Rollup 以打包插件：

```javascript
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/module-nav-plugin.umd.js',
      format: 'umd',
      name: 'ModuleNavPlugin',
      globals: {
        vue: 'Vue'
      }
    },
    {
      file: 'dist/module-nav-plugin.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    vue({
      css: true,
      compileTemplate: true
    }),
    terser()
  ],
  external: ['vue']
};
```

### 5. `.gitignore`

忽略不必要的文件：

```
node_modules/
dist/
```

### 6. `README.md`

编写插件的使用说明：

```markdown
# Module Nav Plugin

A Vue.js plugin for creating a module navigation.

## Installation

```sh
npm install module-nav-plugin
```

## Usage

```javascript
import Vue from 'vue';
import ModuleNavPlugin from 'module-nav-plugin';

Vue.use(ModuleNavPlugin);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

In your template:

```html
<template>
  <div id="app">
    <module-nav></module-nav>
    <div v-for="index in 10" :key="index" :id="'module-' + index" :data-module="true" :data-title="'Module ' + index" class="module">
      <h2>Module {{ index }}</h2>
      <p>Content for module {{ index }}</p>
    </div>
  </div>
</template>
```

## License

MIT
```

### 7. 打包并发布

#### 打包插件

首先，确保已经安装了依赖：

```sh
npm install
```

然后，运行打包脚本：

```sh
npm run build
```

这会在 `dist/` 文件夹中生成打包后的文件。

#### 发布到 npm

1. 登录到 npm：

```sh
npm login
```

2. 发布插件：

```sh
npm publish
```

### 总结

通过以上步骤，你可以创建并发布一个 Vue 插件，使其可以在其他 Vue 项目中方便地使用。打包过程采用 Rollup 工具，并配置了必要的文件结构和配置文件以支持插件的开发和发布。


###  webpack打包
为了使用 Webpack 打包你的 Vue 插件，我们需要配置 Webpack，确保它能正确处理 Vue 文件和依赖，并输出符合 UMD 和 ES 模块规范的文件。以下是详细步骤：

### 目录结构

首先，确保你的项目目录结构如下：

```
module-nav-plugin/
├── dist/
├── src/
│   ├── ModuleNav.vue
│   └── index.js
├── .gitignore
├── package.json
├── README.md
└── webpack.config.js
```

### 1. `ModuleNav.vue`

组件文件 `src/ModuleNav.vue`：

```html
<template>
  <div class="module-nav" @mouseenter="expandNav" @mouseleave="collapseNav">
    <div class="nav-title" v-if="collapsed">导航</div>
    <ul v-if="!collapsed">
      <li v-for="(module, index) in modules" :key="index" @click="scrollToModule(module)">
        {{ module.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
      modules: []
    };
  },
  mounted() {
    this.collectModules();
  },
  methods: {
    collectModules() {
      const moduleElements = document.querySelectorAll('[data-module]');
      this.modules = Array.from(moduleElements).map((el, index) => ({
        id: el.id || `module-${index}`,
        title: el.getAttribute('data-title') || `Module ${index + 1}`,
        element: el
      }));
    },
    scrollToModule(module) {
      module.element.scrollIntoView({ behavior: 'smooth' });
    },
    expandNav() {
      this.collapsed = false;
    },
    collapseNav() {
      this.collapsed = true;
    }
  }
};
</script>

<style scoped>
.module-nav {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  width: 200px;
  transition: width 0.3s, height 0.3s;
}

.nav-title {
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 5px 10px;
  cursor: pointer;
}

li:hover {
  background: #f0f0f0;
}
</style>
```

### 2. 插件入口文件 `index.js`

插件入口文件 `src/index.js`：

```javascript
import ModuleNav from './ModuleNav.vue';

const ModuleNavPlugin = {
  install(Vue) {
    Vue.component('module-nav', ModuleNav);
  }
};

export default ModuleNavPlugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ModuleNavPlugin);
}
```

### 3. `package.json`

`package.json` 配置文件：

```json
{
  "name": "module-nav-plugin",
  "version": "1.0.0",
  "description": "A Vue.js plugin for creating a module navigation",
  "main": "dist/module-nav-plugin.umd.js",
  "module": "dist/module-nav-plugin.esm.js",
  "scripts": {
    "build": "webpack"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/module-nav-plugin.git"
  },
  "keywords": [
    "vue",
    "plugin",
    "navigation",
    "module"
  ],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "vue-loader": "^15.9.0",
    "vue-template-compiler": "^2.6.0",
    "webpack": "^4.0.0",
    "webpack-cli": "^3.3.12",
    "css-loader": "^3.5.3",
    "style-loader": "^1.2.1"
  },
  "peerDependencies": {
    "vue": "^2.6.0"
  }
}
```

### 4. Webpack 配置文件 `webpack.config.js`

```javascript
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'module-nav-plugin.umd.js',
    library: 'ModuleNavPlugin',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new (require('vue-loader/lib/plugin'))()
  ]
};
```

### 5. `.gitignore`

忽略不必要的文件：

```
node_modules/
dist/
```

### 6. `README.md`

编写插件的使用说明：

```markdown
# Module Nav Plugin

A Vue.js plugin for creating a module navigation.

## Installation

```sh
npm install module-nav-plugin
```

## Usage

```javascript
import Vue from 'vue';
import ModuleNavPlugin from 'module-nav-plugin';

Vue.use(ModuleNavPlugin);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

In your template:

```html
<template>
  <div id="app">
    <module-nav></module-nav>
    <div v-for="index in 10" :key="index" :id="'module-' + index" :data-module="true" :data-title="'Module ' + index" class="module">
      <h2>Module {{ index }}</h2>
      <p>Content for module {{ index }}</p>
    </div>
  </div>
</template>
```

## License

MIT
```

### 打包并发布

#### 打包插件

首先，确保已经安装了依赖：

```sh
npm install
```

然后，运行打包脚本：

```sh
npm run build
```

这会在 `dist/` 文件夹中生成打包后的文件。

#### 发布到 npm

1. 登录到 npm：

```sh
npm login
```

2. 发布插件：

```sh
npm publish
```

### 总结

通过上述步骤，你可以创建并发布一个 Vue 插件，并使用 Webpack 进行打包。此配置支持 UMD 和 ES 模块格式，使得插件可以在不同环境中使用。

### 加上esm模块导出
为了使用 Webpack 打包 Vue 插件并生成 UMD 和 ES 模块文件，你可以调整 Webpack 配置来同时输出两个不同格式的文件。以下是具体步骤：

### 目录结构

确保你的项目目录结构如下：

```
module-nav-plugin/
├── dist/
├── src/
│   ├── ModuleNav.vue
│   └── index.js
├── .gitignore
├── package.json
├── README.md
└── webpack.config.js
```

### 1. `ModuleNav.vue`

组件文件 `src/ModuleNav.vue`：

```html
<template>
  <div class="module-nav" @mouseenter="expandNav" @mouseleave="collapseNav">
    <div class="nav-title" v-if="collapsed">导航</div>
    <ul v-if="!collapsed">
      <li v-for="(module, index) in modules" :key="index" @click="scrollToModule(module)">
        {{ module.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: true,
      modules: []
    };
  },
  mounted() {
    this.collectModules();
  },
  methods: {
    collectModules() {
      const moduleElements = document.querySelectorAll('[data-module]');
      this.modules = Array.from(moduleElements).map((el, index) => ({
        id: el.id || `module-${index}`,
        title: el.getAttribute('data-title') || `Module ${index + 1}`,
        element: el
      }));
    },
    scrollToModule(module) {
      module.element.scrollIntoView({ behavior: 'smooth' });
    },
    expandNav() {
      this.collapsed = false;
    },
    collapseNav() {
      this.collapsed = true;
    }
  }
};
</script>

<style scoped>
.module-nav {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  z-index: 1000;
  width: 200px;
  transition: width 0.3s, height 0.3s;
}

.nav-title {
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 5px 10px;
  cursor: pointer;
}

li:hover {
  background: #f0f0f0;
}
</style>
```

### 2. 插件入口文件 `index.js`

插件入口文件 `src/index.js`：

```javascript
import ModuleNav from './ModuleNav.vue';

const ModuleNavPlugin = {
  install(Vue) {
    Vue.component('module-nav', ModuleNav);
  }
};

export default ModuleNavPlugin;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ModuleNavPlugin);
}
```

### 3. `package.json`

`package.json` 配置文件：

```json
{
  "name": "module-nav-plugin",
  "version": "1.0.0",
  "description": "A Vue.js plugin for creating a module navigation",
  "main": "dist/module-nav-plugin.umd.js",
  "module": "dist/module-nav-plugin.esm.js",
  "scripts": {
    "build": "webpack --config webpack.config.js && webpack --config webpack.config.esm.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/module-nav-plugin.git"
  },
  "keywords": [
    "vue",
    "plugin",
    "navigation",
    "module"
  ],
  "author": "Your Name",
  "license": "MIT",
  "devDependencies": {
    "vue-loader": "^15.9.0",
    "vue-template-compiler": "^2.6.0",
    "webpack": "^4.0.0",
    "webpack-cli": "^3.3.12",
    "css-loader": "^3.5.3",
    "style-loader": "^1.2.1",
    "babel-loader": "^8.1.0",
    "@babel/core": "^7.9.0",
    "@babel/preset-env": "^7.9.0"
  },
  "peerDependencies": {
    "vue": "^2.6.0"
  }
}
```

### 4. Webpack 配置文件

#### `webpack.config.js` (用于 UMD)

```javascript
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'module-nav-plugin.umd.js',
    library: 'ModuleNavPlugin',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
```

#### `webpack.config.esm.js` (用于 ES 模块)

```javascript
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'module-nav-plugin.esm.js',
    library: 'ModuleNavPlugin',
    libraryTarget: 'module',
    module: true
  },
  externals: {
    vue: 'Vue'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
```

### 5. `.gitignore`

忽略不必要的文件：

```
node_modules/
dist/
```

### 6. `README.md`

编写插件的使用说明：

```markdown
# Module Nav Plugin

A Vue.js plugin for creating a module navigation.

## Installation

```sh
npm install module-nav-plugin
```

## Usage

```javascript
import Vue from 'vue';
import ModuleNavPlugin from 'module-nav-plugin';

Vue.use(ModuleNavPlugin);

new Vue({
  el: '#app',
  render: h => h(App)
});
```

In your template:

```html
<template>
  <div id="app">
    <module-nav></module-nav>
    <div v-for="index in 10" :key="index" :id="'module-' + index" :data-module="true" :data-title="'Module ' + index" class="module">
      <h2>Module {{ index }}</h2>
      <p>Content for module {{ index }}</p>
    </div>
  </div>
</template>
```

## License

MIT
```

### 打包并发布

#### 打包插件

首先，确保已经安装了依赖：

```sh
npm install
```

然后，运行打包脚本：

```sh
npm run build
```

这会在 `dist/` 文件夹中生成打包后的文件，包括 UMD 和 ES 模块文件。

#### 发布到 npm

1. 登录到 npm：

```sh
npm login
```

2. 发布插件：

```sh
npm publish
```

### 总结

通过上述步骤，你可以使用 Webpack 配置打包生成 UMD 和 ES 模块的 Vue 插件。这个配置支持在不同环境中使用插件，并确保打包文件可以正确导入和使用。
