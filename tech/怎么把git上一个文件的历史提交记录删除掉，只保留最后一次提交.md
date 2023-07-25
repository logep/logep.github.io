如果你想删除 Git 上一个文件的历史提交记录，只保留最后一次提交，可以使用 `git filter-branch` 或 `git filter-repo` 等工具来重写历史。请注意，重写历史是一项敏感操作，可能会影响其他协作者或团队成员，因此在执行之前请确保你明确了解可能带来的风险和后果，并备份代码。

下面我将分别介绍如何使用 `git filter-branch` 和 `git filter-repo` 进行历史重写，分别选择其中一种方法执行即可。

### 使用 git filter-branch 进行历史重写

1. 首先，确保你已经克隆了 Git 仓库到本地，并进入该仓库的根目录。

2. 执行以下命令来删除文件的历史提交记录，只保留最后一次提交：

```bash
git filter-branch --index-filter 'git rm --cached --ignore-unmatch path/to/your_file' HEAD
```

这里的 `path/to/your_file` 需要替换为你想要删除历史记录的文件路径。

3. 接下来，执行以下命令来清理 Git 重写历史后产生的备份数据：

```bash
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
```

4. 最后，使用 `git push` 强制推送重写的历史到远程仓库：

```bash
git push origin --force --all
```

### 使用 git filter-repo 进行历史重写

1. 首先，确保你已经安装了 `git-filter-repo` 工具。如果没有安装，你可以通过以下方式来安装：

   - 在 Linux 上使用 `apt`（Debian/Ubuntu）：

     ```bash
     sudo apt-get update
     sudo apt-get install git-filter-repo
     ```

   - 在 macOS 上使用 `brew`：

     ```bash
     brew install git-filter-repo
     ```

   - 或者通过 `pip` 安装：

     ```bash
     pip install git-filter-repo
     ```

2. 进入 Git 仓库的根目录，执行以下命令来删除文件的历史提交记录，只保留最后一次提交：

```bash
git filter-repo --path path/to/your_file
```

这里的 `path/to/your_file` 需要替换为你想要删除历史记录的文件路径。

3. 使用 `git push` 强制推送重写的历史到远程仓库：

```bash
git push origin --force --all
```

请注意，在执行完这些操作后，你需要确保所有协作者和团队成员了解并清楚地重新克隆该仓库，以避免历史重写带来的问题。重写历史可能会破坏之前的提交记录，因此谨慎使用，并在执行之前备份你的代码。
