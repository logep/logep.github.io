您可以创建一个自定义的 Vue 组件，以实现一个可以控制上下滚动翻页的功能，同时通过上一页和下一页按钮进行控制。下面是一个简单示例：

```vue
<template>
  <div class="scrollable-page">
    <div class="page-content" ref="content">
      <slot></slot>
    </div>
    <button class="prev-button" @click="scrollPage(-1)">上一页</button>
    <button class="next-button" @click="scrollPage(1)">下一页</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 0,
      pages: 0,
    };
  },
  pages() {

      return this.$refs.content.children.length
    }
  mounted() {
    this.pages = this.$refs.content.children.length;
  },
  methods: {
    scrollPage(direction) {
      const nextPage = this.currentPage + direction;
  let pages = Math.ceil(this.pages / 10)
      if (nextPage >= 0 && nextPage < pages) {
        this.currentPage = nextPage
        this.$refs.content.style.transform = `translateY(-${nextPage * 100}%)`
      }
      if (nextPage >= 0 && nextPage < this.pages) {
        this.currentPage = nextPage;
        this.$refs.content.style.transform = `translateY(-${nextPage * 100}%)`;
      }
    },
  },
};
</script>

<style scoped>
.scrollable-page {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.page-content {
  display: flex;
  flex-direction: column;
  transition: transform 0.5s;
}

.prev-button,
.next-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}

.prev-button {
  left: 10px;
}

.next-button {
  right: 10px;
}
</style>
```

这个组件包含一个可滚动的内容区域，以及上一页和下一页按钮。当用户点击上一页或下一页按钮时，`scrollPage` 方法会根据 `direction` 参数来滚动到上一页或下一页。该组件使用 CSS `transform` 属性来实现滚动效果。

在父组件中，您可以使用这个自定义组件来包装您想要滚动的内容，如下所示：

```vue
<template>
  <div>
    <scrollable-page>
      <div class="page">Page 1 Content</div>
      <div class="page">Page 2 Content</div>
      <div class="page">Page 3 Content</div>
      <!-- 添加更多页面内容 -->
    </scrollable-page>
  </div>
</template>
```

这是一个基本的示例，您可以根据您的需求对样式和功能进行自定义。这个组件使您能够在上下滚动翻页，同时通过上一页和下一页按钮进行控制。



用setInterval方式：

要向上面的代码中添加暂停和自动滚动功能，你可以使用 `setInterval` 和 `clearInterval` 来定时滚动页面并控制滚动的暂停。以下是一个修改后的示例：

```vue
<template>
  <div class="scrollable-page" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <div class="page-content" style="height: 100%" ref="content">
      <slot></slot>
    </div>
    <button class="prev-button" @click="scrollPage(-1)">上一页</button>
    <button class="next-button" @click="scrollPage(1)">下一页</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 0,
      scrollInterval: null,
      isPaused: false
    }
  },
  computed: {
    pages() {
      return this.$refs.content.children.length
    }
  },
  methods: {
    scrollPage(direction) {
      if (this.isPaused) {
        return;
      }

      const nextPage = this.currentPage + direction;
      let pages = Math.ceil(this.pages / 4);
      if (nextPage >= 0 && nextPage < pages) {
        this.currentPage = nextPage;
        this.$refs.content.style.transform = `translateY(-${nextPage * 100}%)`;
      }
    },
    pauseScroll() {
      this.isPaused = true;
      clearInterval(this.scrollInterval);
    },
    resumeScroll() {
      this.isPaused = false;
      this.autoScroll();
    },
    autoScroll() {
      if (!this.isPaused) {
        this.scrollInterval = setInterval(() => {
          this.scrollPage(1);
        }, 2000); // Adjust the interval as needed
      }
    }
  },
  mounted() {
    this.autoScroll();
  },
  beforeDestroy() {
    clearInterval(this.scrollInterval);
  }
};
</script>
```

在这个修改后的代码中，我们增加了 `isPaused` 状态用于暂停和恢复滚动。当鼠标进入组件时，滚动被暂停，当鼠标离开组件时，滚动被恢复。`autoScroll` 方法用于启动自动滚动，它在组件加载后被调用，并使用 `setInterval` 定时滚动页面。你可以根据需要调整定时滚动的间隔。当组件被销毁时，我们还清除了定时器，以确保没有内存泄漏。



### 不可以自动循环


如果你想将定时滚动的实现从 `setInterval` 改为 `setTimeout`，你可以按照以下方式修改代码：

```vue
<template>
  <div class="scrollable-page" @mouseenter="pauseScroll" @mouseleave="resumeScroll">
    <div class="page-content" style="height: 100%" ref="content">
      <slot></slot>
    </div>
    <button class="prev-button" @click="scrollPage(-1)">上一页</button>
    <button class="next-button" @click="scrollPage(1)">下一页</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 0,
      isPaused: false
    }
  },
  computed: {
    pages() {
      return this.$refs.content.children.length
    }
  },
  methods: {
    scrollPage(direction) {
      if (this.isPaused) {
        return;
      }

      const nextPage = this.currentPage + direction;
      let pages = Math.ceil(this.pages / 4);
      if (nextPage >= 0 && nextPage < pages) {
        this.currentPage = nextPage;
        this.$refs.content.style.transform = `translateY(-${nextPage * 100}%)`;
        this.autoScroll(); // Scroll automatically after manual scroll
      }
    },
    pauseScroll() {
      this.isPaused = true;
    },
    resumeScroll() {
      this.isPaused = false;
      this.autoScroll();
    },
    autoScroll() {
      if (!this.isPaused) {
        setTimeout(() => {
          this.scrollPage(1);
        }, 2000); // Adjust the delay as needed
      }
    }
  },
  mounted() {
    this.autoScroll();
  }
};
</script>
```

在这个修改后的代码中，我们使用 `setTimeout` 来实现自动滚动。当用户手动滚动页面时，我们也在滚动后调用 `this.autoScroll()`，以启动自动滚动。这确保了自动滚动在用户手动滚动之后会自动恢复。你可以根据需要调整 `setTimeout` 的延迟。


