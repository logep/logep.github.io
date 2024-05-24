要给 ElementUI 的 `Backtop` 组件加上可以拖动的效果，可以使用 JavaScript 来实现。可以根据不同的需求实现仅水平拖动、仅垂直拖动、全方位拖动或固定位置靠边。下面是一个通用的示例，包括所有这些需求的实现方式。

### 通用实现步骤

1. **引入 ElementUI 并创建基本的 Backtop 组件**。
2. **使用 JavaScript 添加拖动逻辑**。
3. **根据不同需求调整拖动方向**。

### HTML 和 Vue 示例

首先，确保你已经安装了 ElementUI，并且在你的 Vue 项目中正确引入了 ElementUI。

#### 安装 ElementUI

```sh
npm install element-ui
```

#### 引入 ElementUI

在你的 `main.js` 中引入 ElementUI:

```javascript
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
}).$mount('#app');
```

#### 创建一个 Vue 组件，实现拖动效果

```html
<template>
  <div id="app">
    <el-backtop :visibility-height="200" :right="100" :bottom="100">
      <div
        ref="draggableBacktop"
        class="draggable-backtop"
        @mousedown="handleMouseDown"
        @touchstart="handleTouchStart"
      >
        Backtop
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  methods: {
    handleMouseDown(e) {
      e.preventDefault();
      this.initDrag(e.clientX, e.clientY);
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
    },
    handleTouchStart(e) {
      e.preventDefault();
      const touch = e.touches[0];
      this.initDrag(touch.clientX, touch.clientY);
      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchend', this.handleTouchEnd);
    },
    initDrag(startX, startY) {
      this.startX = startX;
      this.startY = startY;
      this.initialLeft = this.$refs.draggableBacktop.offsetLeft;
      this.initialTop = this.$refs.draggableBacktop.offsetTop;
    },
    handleMouseMove(e) {
      this.drag(e.clientX, e.clientY);
    },
    handleTouchMove(e) {
      const touch = e.touches[0];
      this.drag(touch.clientX, touch.clientY);
    },
    drag(clientX, clientY) {
      const deltaX = clientX - this.startX;
      const deltaY = clientY - this.startY;
      
      // For horizontal dragging only
      const newLeft = this.initialLeft + deltaX;
      // For vertical dragging only
      const newTop = this.initialTop + deltaY;

   // 获取窗口宽高
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // 获取元素宽高
      const elementWidth = this.$refs.draggableBacktop.offsetWidth;
      const elementHeight = this.$refs.draggableBacktop.offsetHeight;

      // 保持在窗口范围内
      if (newLeft < 0) {
        newLeft = 0;
      } else if (newLeft > windowWidth - elementWidth) {
        newLeft = windowWidth - elementWidth;
      }

      if (newTop < 0) {
        newTop = 0;
      } else if (newTop > windowHeight - elementHeight) {
        newTop = windowHeight - elementHeight;
      }


      // For all-direction dragging
      this.$refs.draggableBacktop.style.left = `${newLeft}px`;
      this.$refs.draggableBacktop.style.top = `${newTop}px`;

      // Uncomment for horizontal only
      // this.$refs.draggableBacktop.style.left = `${newLeft}px`;
      
      // Uncomment for vertical only
      // this.$refs.draggableBacktop.style.top = `${newTop}px`;

      // For fixed position on left or right
      const parentWidth = this.$refs.draggableBacktop.parentElement.clientWidth;
      if (newLeft < parentWidth / 2) {
        this.$refs.draggableBacktop.style.left = `0px`;
      } else {
        this.$refs.draggableBacktop.style.left = `${parentWidth - this.$refs.draggableBacktop.offsetWidth}px`;
      }
    },
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
    },
    handleTouchEnd() {
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchend', this.handleTouchEnd);
    },
  },
};
</script>

<style>
.draggable-backtop {
  width: 40px;
  height: 40px;
  background-color: #409eff;
  color: white;
  text-align: center;
  line-height: 40px;
  border-radius: 4px;
  position: fixed;
  cursor: grab;
  user-select: none;
}
</style>
```

### 解释

1. **模板部分**：
   - 使用 `el-backtop` 组件并嵌入一个 `div` 元素来作为可拖动的元素。
   - 添加 `mousedown` 和 `touchstart` 事件监听器来初始化拖动。

2. **脚本部分**：
   - `handleMouseDown` 和 `handleTouchStart` 方法在拖动开始时调用，记录初始位置。
   - `initDrag` 方法记录拖动的初始位置。
   - `handleMouseMove` 和 `handleTouchMove` 方法在拖动过程中不断调用，更新元素的位置。
   - `drag` 方法计算新位置并更新元素的 `left` 和 `top` 样式。
   - `handleMouseUp` 和 `handleTouchEnd` 方法在拖动结束时移除事件监听器。

3. **样式部分**：
   - 为可拖动元素设置样式，使其固定在页面右下角，初始宽高为 40px，背景色为 `#409eff`。

### 拓展

- **仅水平拖动**：注释掉 `drag` 方法中更新 `top` 样式的代码。
- **仅垂直拖动**：注释掉 `drag` 方法中更新 `left` 样式的代码。
- **固定位置靠边**：在 `drag` 方法的最后添加逻辑，根据元素的水平位置来决定其固定在左边或右边。

这样，你可以根据具体需求调整拖动方向和位置固定逻辑，使其在 PC 端和 H5 端都能兼容。

### 拖动时 不能超出 屏幕边界

### 使用 @click.stop了为什么  @mousedown和  @touchstart可以正常执行，并且 click返回顶部事件不受影响

### 在拖动时，判断鼠标或触摸的位置，只有在非按钮区域内拖动才生效。
如果需要 `el-backtop` 组件支持拖动，同时又需要保留其默认的返回顶部功能，并且希望拖动功能与返回顶部功能不冲突，可以使用以下方法：

1. 在 `el-backtop` 组件上添加拖动功能，并确保拖动区域与返回顶部按钮区域不重叠。
2. 在拖动时，判断鼠标或触摸的位置，只有在非按钮区域内拖动才生效。

下面是一个示例代码，演示了如何实现这种方法：

```html
<template>
  <div id="app">
    <div class="content">
      <p>Scroll down to see the Backtop button.</p>
      <div style="height: 2000px;"></div>
    </div>
    <el-backtop
      :visibility-height="200"
      :right="100"
      :bottom="100"
      ref="backtopRef"
      @click="handleBacktopClick"
    >
      <!-- 在 el-backtop 组件上添加返回顶部功能 -->
    </el-backtop>
    <div
      class="draggable-backtop"
      ref="draggableBacktop"
      @mousedown="handleMouseDown"
      @touchstart="handleTouchStart"
      @click.stop
    >
      <!-- 在拖动区域上添加拖动功能 -->
      <!-- 这里放置拖动区域的内容 -->
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleBacktopClick() {
      // 处理返回顶部按钮的点击事件
    },
    handleMouseDown(e) {
      // 拖动区域的 mousedown 事件处理逻辑
      // 需要判断鼠标位置是否在返回顶部按钮区域内
      const backtopRect = this.$refs.backtopRef.$el.getBoundingClientRect();
      const draggableRect = this.$refs.draggableBacktop.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      if (
        mouseX >= backtopRect.left &&
        mouseX <= backtopRect.right &&
        mouseY >= backtopRect.top &&
        mouseY <= backtopRect.bottom
      ) {
        // 在返回顶部按钮区域内点击，不执行拖动操作
        return;
      }
      // 在拖动区域外点击，执行拖动操作
      // 拖动逻辑...
    },
    handleTouchStart(e) {
      // 拖动区域的 touchstart 事件处理逻辑
      // 需要判断触摸点位置是否在返回顶部按钮区域内，方法与mousedown类似
    },
    // 其他拖动逻辑方法...
  },
};
</script>

<style>
.draggable-backtop {
  width: 40px;
  height: 40px;
  background-color: transparent;
  position: fixed;
  cursor: grab;
  user-select: none;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh;
}
</style>
```

在这个示例中，拖动区域（`div.draggable-backtop`）上添加了拖动功能，并且通过判断鼠标或触摸点的位置，避免了与返回顶部按钮区域的冲突。如果点击事件发生在返回顶部按钮区域内，则不执行拖动操作，保留返回顶部功能。
