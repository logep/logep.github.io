如果你想自己实现一个类似 `confirm` 的弹出框，你可以使用 JavaScript 中的 `Promise` 和 HTML 的 `window.confirm` 函数。以下是一个简单的实现：

```html
<template>
  <div>
    <el-button @click="showCustomConfirm">显示自定义确认框</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    showCustomConfirm() {
      this.customConfirm('确定要执行操作吗？')
        .then(() => {
          // 用户点击了确定按钮时执行的逻辑
          console.log('用户点击了确定按钮');
        })
        .catch(() => {
          // 用户点击了取消按钮时执行的逻辑
          console.log('用户点击了取消按钮');
        });
    },
    customConfirm(message) {
      return new Promise((resolve, reject) => {
        const result = window.confirm(message);
        if (result) {
          resolve();
        } else {
          reject();
        }
      });
    }
  }
};
</script>
```

在上面的代码中，`customConfirm` 方法返回一个 `Promise`，通过调用 `resolve` 处理用户点击确定按钮的逻辑，而调用 `reject` 处理用户点击取消按钮的逻辑。这样你就可以在 `then` 和 `catch` 方法中执行相应的操作。



如果你想自己实现一个类似于 Element UI 的 `MessageBox` 的确认框，可以使用 Vue.js 的组件和 Promise。以下是一个简单的实现示例：

```html
<template>
  <div>
    <el-button @click="showCustomConfirm">显示自定义确认框</el-button>
    <custom-confirm v-if="showDialog" @confirm="onConfirm" @cancel="onCancel" />
  </div>
</template>

<script>
Vue.component('custom-confirm', {
  template: `
    <div class="custom-confirm">
      <div class="confirm-content">
        <p>{{ message }}</p>
        <button @click="confirm">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  `,
  props: ['message'],
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
});

export default {
  data() {
    return {
      showDialog: false
    };
  },
  methods: {
    showCustomConfirm() {
      this.showDialog = true;
    },
    onConfirm() {
      // 用户点击了确定按钮时执行的逻辑
      console.log('用户点击了确定按钮');
      this.showDialog = false;
    },
    onCancel() {
      // 用户点击了取消按钮时执行的逻辑
      console.log('用户点击了取消按钮');
      this.showDialog = false;
    }
  }
};
</script>

<style scoped>
.custom-confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-content {
  background: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.confirm-content button {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

在这个例子中，我们创建了一个名为 `custom-confirm` 的全局组件，用于展示自定义的确认框。`showCustomConfirm` 方法用于显示这个确认框，而 `onConfirm` 和 `onCancel` 方法用于处理用户点击确定和取消按钮的逻辑。





理论上，你可以尝试将自定义确认框的调用方式设计成与 Element UI 的 `MessageBox` 一样，以实现类似的语法。然而，由于 Element UI 的 `MessageBox` 是一个全局组件，可以通过 Vue 的 `prototype` 直接调用，而自定义组件通常需要在某个特定的 Vue 实例中注册，这两者在调用方式上可能存在一些差异。

下面是一个尝试将调用方式设计成与 Element UI 类似的例子：

```html
<template>
  <div>
    <el-button @click="showCustomConfirm">显示自定义确认框</el-button>
  </div>
</template>

<script>
Vue.component('custom-confirm', {
  template: `
    <div class="custom-confirm" v-if="visible">
      <div class="confirm-content">
        <p>{{ message }}</p>
        <button @click="confirm">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  `,
  props: ['message', 'visible'],
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  }
});

export default {
  methods: {
    showCustomConfirm(message) {
      return new Promise((resolve, reject) => {
        const confirmDialog = this.$createElement('custom-confirm', {
          props: {
            message,
            visible: true
          },
          on: {
            confirm: () => {
              resolve();
              confirmDialog.componentInstance.visible = false;
            },
            cancel: () => {
              reject();
              confirmDialog.componentInstance.visible = false;
            }
          }
        });
        confirmDialog.$mount();
        document.body.appendChild(confirmDialog.$el);
      });
    }
  }
};
</script>

<style scoped>
.custom-confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-content {
  background: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.confirm-content button {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

在这个例子中，`showCustomConfirm` 方法返回一个 Promise，当用户点击确定或取消按钮时，通过 resolve 或 reject 来处理。在方法内部，我们动态创建了 `custom-confirm` 组件的实例，并将其挂载到 `body` 元素上，以模拟全局弹窗的效果。需要注意的是，由于是手动挂载，可能需要自行处理销毁组件的逻辑。





在处理销毁组件的时候，你可以考虑在确认框关闭的时候，手动从 DOM 中移除组件的元素，同时销毁组件实例。这样可以确保组件不再占用资源并防止潜在的内存泄漏。

下面是一个简单的例子，演示了如何在确认框关闭时销毁组件：

```html
<template>
  <div>
    <el-button @click="showCustomConfirm">显示自定义确认框</el-button>
  </div>
</template>

<script>
Vue.component('custom-confirm', {
  template: `
    <div class="custom-confirm" v-if="visible">
      <div class="confirm-content">
        <p>{{ message }}</p>
        <button @click="confirm">确定</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  `,
  props: ['message', 'visible'],
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    }
  },
  destroyed() {
    // 在组件销毁时移除 DOM 元素
    this.$el.parentNode.removeChild(this.$el);
  }
});

export default {
  methods: {
    showCustomConfirm(message) {
      return new Promise((resolve, reject) => {
        const confirmDialog = this.$createElement('custom-confirm', {
          props: {
            message,
            visible: true
          },
          on: {
            confirm: () => {
              resolve();
              this.destroyConfirmDialog(confirmDialog);
            },
            cancel: () => {
              reject();
              this.destroyConfirmDialog(confirmDialog);
            }
          }
        });
        confirmDialog.$mount();
        document.body.appendChild(confirmDialog.$el);
      });
    },
    destroyConfirmDialog(confirmDialog) {
      // 销毁组件实例
      confirmDialog.componentInstance.$destroy();
    }
  }
};
</script>

<style scoped>
.custom-confirm {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.confirm-content {
  background: #fff;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
}

.confirm-content button {
  margin: 0 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
```

在 `custom-confirm` 组件的 `destroyed` 钩子中，我们添加了移除 DOM 元素的逻辑。在 `showCustomConfirm` 方法中，调用 `destroyConfirmDialog` 来销毁组件实例。这样，在用户点击确定或取消按钮时，都会触发销毁操作，确保不再使用的组件得到正确清理。







