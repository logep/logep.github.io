要了解 Element UI 中 `before-upload` 钩子是如何实现的，我们需要查看 `el-upload` 组件的源码。在 Element UI 的源码中，`before-upload` 钩子是在文件上传之前执行的，决定是否继续上传文件。

以下是解析 Element UI 源代码中 `before-upload` 钩子实现的详细步骤和关键代码片段。

### 1. 下载和查看源码

首先，确保你已经下载了 Element UI 的源码。你可以在 GitHub 上找到 Element UI 的源码：https://github.com/ElemeFE/element

### 2. 查找 `el-upload` 组件的源码

`el-upload` 组件的源码位于 `packages/upload/src` 目录下。关键文件是 `upload.vue` 和 `upload-list.vue`。

### 3. 解析 `before-upload` 钩子

我们主要关注 `upload.vue` 文件中的代码。在该文件中，可以找到 `before-upload` 的实现。

#### `upload.vue` 代码解析

```javascript
// packages/upload/src/upload.vue

methods: {
  handleStart(rawFile) {
    // 处理上传开始
    rawFile.uid = Date.now() + rawFile.name;

    const { beforeUpload } = this;
    if (!beforeUpload) {
      // 如果没有 beforeUpload 钩子，直接添加文件
      this.post(rawFile);
      return;
    }

    const before = beforeUpload(rawFile);
    if (before && before.then) {
      before.then(processedFile => {
        if (Object.prototype.toString.call(processedFile) === '[object File]') {
          this.post(processedFile);
        } else {
          this.post(rawFile);
        }
      }).catch(() => {
        // Promise 被 reject，不上传文件
        this.onRemove(null, rawFile);
      });
    } else if (before !== false) {
      // 如果 beforeUpload 返回 true 或 undefined
      this.post(rawFile);
    } else {
      // 如果 beforeUpload 返回 false，不上传文件
      this.onRemove(null, rawFile);
    }
  },

  post(rawFile) {
    // 实际上传文件的实现
    this.$refs.input.value = null;
    if (!this.httpRequest) {
      console.error('The httpRequest is required.');
      return;
    }
    // 上传文件逻辑
  },

  onRemove(file, raw) {
    // 移除文件的实现
    if (raw) {
      raw.uid = Date.now() + raw.name;
    }
    this.abort(raw);
  },

  abort(file) {
    // 中止上传的实现
    const { reqs } = this;
    if (file) {
      const uid = file.uid ? file.uid : file;
      if (reqs[uid]) {
        reqs[uid].abort();
      }
      delete reqs[uid];
    } else {
      Object.keys(reqs).forEach(uid => {
        if (reqs[uid]) reqs[uid].abort();
        delete reqs[uid];
      });
    }
  }
}
```

### 关键步骤解析

1. **`handleStart` 方法**：
   - 当开始上传文件时，首先为文件生成一个唯一的 `uid`。
   - 检查 `beforeUpload` 钩子是否存在。如果不存在，直接调用 `post` 方法上传文件。
   - 如果 `beforeUpload` 存在，调用 `beforeUpload(rawFile)` 并获取返回值。

2. **`beforeUpload` 返回值处理**：
   - 如果 `beforeUpload` 返回一个 Promise，则通过 `then` 和 `catch` 处理 Promise 结果。
     - 如果 Promise 解析成功，检查返回值是否为 `File` 对象。如果是，则上传该文件；否则，上传原始文件。
     - 如果 Promise 被拒绝，则调用 `onRemove` 方法移除文件，不上传。
   - 如果 `beforeUpload` 返回 `true` 或 `undefined`，则继续上传文件。
   - 如果 `beforeUpload` 返回 `false`，则调用 `onRemove` 方法移除文件，不上传。

3. **`post` 方法**：
   - `post` 方法包含实际的文件上传逻辑，包括重置文件输入和检查 `httpRequest` 方法。

4. **`onRemove` 和 `abort` 方法**：
   - 这些方法用于移除文件和中止上传请求。

### 总结

通过查看 Element UI 源码，可以看到 `before-upload` 钩子是在上传文件前的关键一步。它的实现依赖于返回值的不同处理方式，包括直接返回 `false`、返回 Promise 以及其他类型的值。这使得 `before-upload` 钩子非常灵活，可以处理各种异步和同步的上传前逻辑。
