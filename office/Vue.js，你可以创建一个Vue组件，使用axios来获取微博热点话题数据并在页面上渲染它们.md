要将你的原始Node.js脚本转换为Vue.js，你可以创建一个Vue组件，使用`axios`来获取微博热点话题数据并在页面上渲染它们。以下是一个示例Vue组件的代码：

```vue
<template>
  <div>
    <h1>微博热点话题</h1>
    <ul>
      <li v-for="topic in hotTopics" :key="topic.id">
        <a :href="'https://s.weibo.com/weibo?q=' + topic.word" target="_blank" rel="noopener noreferrer">
          {{ topic.word }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      hotTopics: [],
    };
  },
  mounted() {
    this.getHotTopics();
  },
  methods: {
    async getHotTopics() {
      try {
        const response = await axios.get('https://weibo.com/ajax/side/hotSearch');
        const data = response.data;
        const hotTopics = data.data.realtime;
        this.hotTopics = hotTopics;
      } catch (error) {
        console.error('Failed to get hot topics:', error);
      }
    },
  },
};
</script>

<style scoped>
/* 样式可以根据需求进行定义 */
</style>
```

这个Vue组件将获取微博热点话题的数据，并在`mounted`生命周期钩子中调用`getHotTopics`方法来加载数据。然后，它会使用`v-for`指令将热点话题渲染为列表项，并为每个话题生成一个链接。

你可以将此Vue组件集成到你的Vue应用程序中，确保将其正确渲染到页面上。不要忘记在Vue应用程序中导入和使用这个组件。
