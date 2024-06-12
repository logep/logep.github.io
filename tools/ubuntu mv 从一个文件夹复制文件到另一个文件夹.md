在Ubuntu上，如果你已经挂载了一个移动硬盘，并且需要将一个文件夹中的文件移动到另一个文件夹，可以使用 `mv` 命令。以下是具体的操作步骤：

1. **挂载移动硬盘**：
   假设你的移动硬盘已经挂载到 `/media/username/external-drive`。

2. **使用 `mv` 命令移动文件**：
   - **语法**：`mv [选项] 源 目标`
   - **示例**：将 `/media/username/external-drive/source-folder` 中的所有文件移动到 `/media/username/external-drive/destination-folder` 中。

```bash
mv /media/username/external-drive/source-folder/* /media/username/external-drive/destination-folder/
```

3. **具体说明**：
   - `/media/username/external-drive/source-folder/*`：表示 `source-folder` 中的所有文件。
   - `/media/username/external-drive/destination-folder/`：表示目标文件夹。

4. **注意事项**：
   - 确保目标文件夹存在。如果不存在，可以先创建目标文件夹：
     ```bash
     mkdir -p /media/username/external-drive/destination-folder/
     ```
   - 如果想移动整个文件夹而不是文件夹中的所有文件，可以使用：
     ```bash
     mv /media/username/external-drive/source-folder /media/username/external-drive/destination-folder/
     ```

这样，`source-folder` 文件夹以及其中的所有内容都将移动到 `destination-folder` 之下。
