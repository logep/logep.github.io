要在使用 `mv` 命令移动文件时跳过重名的文件，可以结合 `find` 和 `rsync` 等工具来实现。`mv` 本身没有直接提供跳过重名文件的选项，因此需要一些工作来实现这种行为。以下是一个可行的方案：

### 使用 `rsync`
`rsync` 是一个强大的工具，它有选项可以在文件移动时跳过已存在的文件。

假设你要将 `/source-folder` 中的文件移动到 `/destination-folder` 中，并且希望在遇到重名文件时跳过，可以使用以下命令：

```bash
rsync -av --ignore-existing /source-folder/ /destination-folder/
```

- `-a`：归档模式，表示递归且保持文件权限等信息。
- `-v`：详细输出。
- `--ignore-existing`：跳过已存在的文件。

`rsync` 也可以完成移动文件的操作，先复制再删除源文件：

```bash
rsync -av --ignore-existing --remove-source-files /source-folder/ /destination-folder/
```

### 使用 `find` 和 `mv`
如果你坚持使用 `mv` 命令，也可以通过 `find` 和一个循环来实现跳过重名文件的行为：

```bash
cd /source-folder
find . -type f | while read file; do
    if [ -e "/destination-folder/$file" ]; then
        echo "Skipping $file, it already exists."
    else
        mv "$file" "/destination-folder/$file"
    fi
done
```

这个脚本的工作原理如下：
1. 使用 `find` 命令查找所有文件。
2. 对于每个文件，检查目标文件夹中是否已经存在同名文件。
3. 如果存在同名文件，输出跳过的消息；否则，执行 `mv` 命令移动文件。

### 示例脚本
你可以将上述逻辑写入一个脚本文件中，方便以后使用：

```bash
#!/bin/bash

SOURCE_DIR="/path/to/source-folder"
DEST_DIR="/path/to/destination-folder"

cd "$SOURCE_DIR" || exit 1

find . -type f | while read -r file; do
    if [ -e "$DEST_DIR/$file" ]; then
        echo "Skipping $file, it already exists."
    else
        mv "$file" "$DEST_DIR/$file"
    fi
done
```

将 `SOURCE_DIR` 和 `DEST_DIR` 替换为实际的源文件夹和目标文件夹路径，然后保存该脚本并赋予可执行权限：

```bash
chmod +x /path/to/your-script.sh
```

运行脚本：

```bash
/path/to/your-script.sh
```

通过这些方法，你可以在移动文件时跳过已经存在的重名文件。
