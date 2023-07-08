要在 Git 的提交中排除某些文件或文件夹，你可以使用 `.gitignore` 文件来指定需要忽略的文件或文件夹。`.gitignore` 文件中列出的模式将告诉 Git 忽略匹配的文件或文件夹，不会将其包括在提交中。

在你的项目根目录下创建一个名为 `.gitignore` 的文件，并在其中指定你想要忽略的文件或文件夹。例如，假设你想要忽略名为 `dist` 的文件夹和名为 `config.ini` 的文件，你可以在 `.gitignore` 文件中添加以下内容：

```
dist/
config.ini
```

这样，当你运行 `git add .` 时，Git 将忽略 `dist` 文件夹和 `config.ini` 文件。它们不会被包括在提交中。

确保在执行 `git add .` 之前，将 `.gitignore` 文件添加到版本控制中（即将它提交到仓库中）。

如果你已经提交了某些文件或文件夹，但想要将它们添加到 `.gitignore` 中，可以按照以下步骤进行：

1. 将要忽略的文件或文件夹从本地仓库中删除，使用命令：`git rm --cached <file>` 或 `git rm --cached -r <folder>`。这将保留本地文件或文件夹，但从版本控制中移除。
2. 更新 `.gitignore` 文件并将要忽略的文件或文件夹添加到其中。
3. 提交更新的 `.gitignore` 文件到仓库中，使用命令：`git add .gitignore` 和 `git commit -m "Update .gitignore"`。

这样，之后提交时，指定的文件或文件夹将被忽略。
