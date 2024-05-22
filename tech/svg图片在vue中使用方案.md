在 Vue 2 中，你可以使用以下几种方式引入和使用 SVG 图片：
  .loader('svg-sprite-loader')
### 1. 直接使用 `<img>` 标签

```vue
<template>
  <div>
    <img src="@/assets/logo.svg" alt="SVG Image">
  </div>
</template>

<script>
export default {
  name: 'SvgImage'
}
</script>
```

这种方式是最简单的，直接使用 `<img>` 标签引入 SVG 图片。你只需指定正确的路径即可。

### 2. 使用 `require` 导入

```vue
<template>
  <div v-html="svgContent"></div>
</template>

<script>
import svgContent from '@/assets/logo.svg';

export default {
  name: 'SvgImage',
  data() {
    return {
      svgContent: svgContent
    };
  }
}
</script>
```

这种方式使用 `require` 导入 SVG 文件的内容，然后通过 `v-html` 指令将 SVG 内容直接渲染到页面中。

### 3. 使用 Vue 组件

```vue
<template>
  <div>
    <Logo />
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'SvgImage',
  components: {
    Logo
  }
}
</script>
```

在这种方式中，你可以将 SVG 图片封装为一个 Vue 组件，在需要的地方直接使用该组件。

### 4. 使用 Vue CLI 的 Vue SVG Loader

Vue CLI 的 Vue SVG Loader 可以将 SVG 文件转换为 Vue 组件，方便在 Vue 项目中使用。

首先，确保安装了 `vue-svg-loader`：

```bash
npm install --save-dev vue-svg-loader
```

然后，在 `vue.config.js` 中配置：

```javascript
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('vue-svg-loader')
      .test(/\.svg$/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end();
  }
}
```

现在，你可以在 Vue 组件中直接引入 SVG 文件，并以组件形式使用：

```vue
<template>
  <div>
    <Logo />
  </div>
</template>

<script>
import Logo from '@/assets/logo.svg';

export default {
  name: 'SvgImage',
  components: {
    Logo
  }
}
</script>
```

这四种方法中，选择适合你项目需求的最简单方便的即可。

在 Vue 组件中使用 SVG 的方式，你可以创建一个单独的 Vue 组件来渲染 SVG 图片。以下是一个示例：

```vue
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="width"
    :height="height"
    :fill="fill"
    class="logo"
  >
    <!-- SVG 图片的具体内容 -->
    <path
      fill-rule="evenodd"
      d="M0 0h24v24H0z"
      :fill="fillColor"
    />
  </svg>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    width: {
      type: [String, Number],
      default: '24'
    },
    height: {
      type: [String, Number],
      default: '24'
    },
    fill: {
      type: String,
      default: 'none'
    },
    fillColor: {
      type: String,
      default: '#000'
    }
  }
}
</script>

<style scoped>
/* 样式 */
.logo {
  display: inline-block;
  vertical-align: middle;
}
</style>
```

在这个示例中，我们创建了一个名为 `Logo` 的 Vue 组件，它接受一些属性来控制 SVG 图片的宽度、高度、填充颜色等。你可以根据需要修改这些属性以及 SVG 图片的具体内容。

在其他 Vue 文件中，你可以像使用其他组件一样使用这个 `Logo` 组件：

```vue
<template>
  <div>
    <Logo width="100" height="100" fill="#FF0000" />
  </div>
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  name: 'App',
  components: {
    Logo
  }
}
</script>

<style>
/* 样式 */
</style>
```

在上面的示例中，我们导入了 `Logo` 组件，并在模板中直接使用它，并传递了一些属性来定制 SVG 图片的样式。
