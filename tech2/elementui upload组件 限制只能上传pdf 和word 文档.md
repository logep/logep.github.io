在使用 Element UI 的 `Upload` 组件时，可以通过设置 `accept` 属性来限制上传文件的类型。此外，还可以使用 `before-upload` 钩子函数进行进一步的文件类型验证。以下是一个限制只能上传 PDF 和 Word 文档的完整示例：

### 示例代码

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Element UI Upload 示例</title>
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>
<body>
    <div id="app">
        <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"  <!-- 此 URL 仅为示例，需替换为实际的上传端点 -->
            :before-upload="beforeUpload"
            accept=".pdf,.doc,.docx"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button type="primary" size="small" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
    </div>

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script>
        new Vue({
            el: '#app',
            data() {
                return {
                    fileList: []
                };
            },
            methods: {
                beforeUpload(file) {
                    const isPDF = file.type === 'application/pdf';
                    const isWord = file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                    const isAllowedType = isPDF || isWord;
                    
                    if (!isAllowedType) {
                        this.$message.error('上传文件只能是 PDF 或 Word 文档!');
                    }
                    
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    
                    if (!isLt2M) {
                        this.$message.error('上传文件大小不能超过 2MB!');
                    }
                    
                    return isAllowedType && isLt2M;
                },
                handleRemove(file, fileList) {
                    console.log(file, fileList);
                },
                submitUpload() {
                    this.$refs.upload.submit();
                }
            }
        });
    </script>
</body>
</html>
```

### 解释

1. **`accept` 属性**：设置为 `".pdf,.doc,.docx"`，以限制文件选择器只显示 PDF 和 Word 文件。
2. **`before-upload` 钩子函数**：在上传文件前执行。此函数验证文件类型和大小，并返回布尔值来确定是否允许上传。
   - `file.type` 检查文件的 MIME 类型。
   - `isAllowedType` 变量确定文件是否为 PDF 或 Word 文档。
   - `isLt2M` 检查文件大小是否小于 2MB。
3. **`action` 属性**：指定文件上传的 URL，需要替换为实际的上传端点。
4. **`el-upload` 组件的其他属性**：
   - `:on-remove` 处理文件移除事件。
   - `:file-list` 绑定当前上传的文件列表。
   - `submitUpload` 方法调用 `submit` 函数上传文件。

这种方法确保用户只能选择和上传 PDF 或 Word 文档，并在上传前进行进一步的验证，提供更好的用户体验和文件上传控制。



在限制文件上传时，特别是对于 Word 文档，有几种常见的 MIME 类型可以考虑。以下是与 Word 文档相关的 MIME 类型：

1. **旧版 Word 文档（.doc）**：
   - `application/msword`

2. **新版 Word 文档（.docx）**：
   - `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

3. **Word 宏启用文档（.docm）**：
   - `application/vnd.ms-word.document.macroEnabled.12`

4. **Word 模板文件（.dot）**：
   - `application/msword`

5. **Word 模板文件（.dotx）**：
   - `application/vnd.openxmlformats-officedocument.wordprocessingml.template`

6. **Word 宏启用模板文件（.dotm）**：
   - `application/vnd.ms-word.template.macroEnabled.12`

综合考虑这些 MIME 类型，可以更全面地限制用户只能上传与 Word 相关的文件。下面是更新后的 `beforeUpload` 方法，包含这些类型的检查：

### 更新后的示例代码

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Element UI Upload 示例</title>
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
</head>
<body>
    <div id="app">
        <el-upload
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"  <!-- 此 URL 仅为示例，需替换为实际的上传端点 -->
            :before-upload="beforeUpload"
            accept=".pdf,.doc,.docx,.docm,.dot,.dotx,.dotm"
            :on-remove="handleRemove"
            :file-list="fileList">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button type="primary" size="small" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
    </div>

    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/element-ui/lib/index.js"></script>
    <script>
        new Vue({
            el: '#app',
            data() {
                return {
                    fileList: []
                };
            },
            methods: {
                beforeUpload(file) {
                    const isPDF = file.type === 'application/pdf';
                    const isWordDoc = file.type === 'application/msword';
                    const isWordDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
                    const isWordDocm = file.type === 'application/vnd.ms-word.document.macroEnabled.12';
                    const isWordDot = file.type === 'application/msword';
                    const isWordDotx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.template';
                    const isWordDotm = file.type === 'application/vnd.ms-word.template.macroEnabled.12';

                    const isAllowedType = isPDF || isWordDoc || isWordDocx || isWordDocm || isWordDot || isWordDotx || isWordDotm;

                    if (!isAllowedType) {
                        this.$message.error('上传文件只能是 PDF 或 Word 文档!');
                    }

                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isLt2M) {
                        this.$message.error('上传文件大小不能超过 2MB!');
                    }

                    return isAllowedType && isLt2M;
                },
                handleRemove(file, fileList) {
                    console.log(file, fileList);
                },
                submitUpload() {
                    this.$refs.upload.submit();
                }
            }
        });
    </script>
</body>
</html>
```

### 解释

1. **`accept` 属性**：更新为 `".pdf,.doc,.docx,.docm,.dot,.dotx,.dotm"`，以包含所有相关的 Word 文件类型。
2. **`beforeUpload` 方法**：增加对更多 Word 文件类型的检查，包括 `.docm`, `.dot`, `.dotx`, `.dotm`。

通过这种方式，用户可以上传更广泛的 Word 文件类型，同时确保文件类型和大小的验证。
