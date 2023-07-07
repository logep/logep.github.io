要将自己在 GitHub 上的仓库自动同步到 Gitee 上，你可以使用以下步骤进行设置：

1. 在 Gitee 上创建一个新的空白仓库，用于存储从 GitHub 同步的代码。

2. 在本地计算机上，使用终端（Terminal）或命令提示符（Command Prompt）导航到你的 GitHub 仓库所在的目录。

3. 运行以下命令将 GitHub 仓库与 Gitee 仓库进行关联：
```bash
git remote add gitee <Gitee_Repository_URL>
```
将 `<Gitee_Repository_URL>` 替换为你在 Gitee 上创建的仓库的 URL。

4. 运行以下命令将本地的代码推送到 GitHub 仓库：
```bash
git push origin
```
这将确保你的代码更新在 GitHub 上。

5. 创建一个名为 `sync.sh` 的 shell 脚本文件，并添加以下内容：
```bash
#!/bin/sh

git pull origin

git push gitee
```
这个脚本将从 GitHub 拉取最新的更改，并将其推送到 Gitee。

6. 将 `sync.sh` 文件添加到仓库，并进行提交。

7. 在本地设置一个定时任务，定期运行 `sync.sh` 脚本，以实现自动同步。你可以使用操作系统提供的定时任务工具（如 cron）或第三方工具来设置定时任务。

通过以上步骤，你可以将 GitHub 上的仓库与 Gitee 进行自动同步。定时运行 `sync.sh` 脚本将自动拉取 GitHub 上的最新更改并推送到 Gitee 上。这样可以保持两个平台上的代码同步。

请注意，在进行同步操作时，确保你具有适当的权限，并且在脚本中提供了正确的仓库 URL。


要通过 GitHub Actions 实现自动将仓库同步到 Gitee 上，你可以按照以下步骤进行设置：

1. 在 Gitee 上创建一个新的空白仓库，用于存储从 GitHub 同步的代码。

2. 在 GitHub 仓库中，点击上方的 "Settings"（设置）选项卡。

3. 在左侧菜单中，选择 "Secrets"（秘密）。

4. 点击 "New repository secret"（新建存储库秘密）按钮，创建一个新的秘密。

5. 设置秘密的名称为 `GITEE_TOKEN`，并在值字段中输入你在 Gitee 上生成的个人访问令牌（PAT）。确保勾选 "Enable repository secret for all branches"（为所有分支启用存储库秘密）选项，并点击 "Add secret"（添加秘密）保存。

6. 在 GitHub 仓库中，点击上方的 "Actions"（操作）选项卡。

7. 选择 "Set up a workflow yourself"（自定义工作流程）或在现有的工作流程文件中添加下面的代码。

```yaml
name: Sync to Gitee

on:
  push:
    branches:
      - main  # 设置你的默认分支

jobs:
  sync:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
        
      - name: Sync to Gitee
        run: |
          git remote add gitee <Gitee_Repository_URL>
          git fetch gitee
          git push gitee ${GITHUB_REF}
```

请将 `<Gitee_Repository_URL>` 替换为你在 Gitee 上创建的仓库的 URL。

8. 提交并推送上述更改到 GitHub 仓库。

现在，每当你将更改推送到 GitHub 仓库的主分支（默认为 `main` 分支）时，GitHub Actions 将自动运行工作流程。工作流程将会将代码同步到 Gitee 仓库，使用你提供的 Gitee 个人访问令牌进行身份验证。

请注意，这个工作流程会在每次推送到主分支时运行，并将所有的更改推送到 Gitee 仓库。确保你在 GitHub 上设置的默认分支和工作流程中指定的分支名称一致。

通过以上步骤，你可以通过 GitHub Actions 实现自动将仓库同步到 Gitee 的功能。在每次推送到主分支时，GitHub Actions 将自动触发同步操作，确保两个平台上的代码保持同步。

请确保在工作流程中提供了正确的 Gitee 仓库 URL，并妥善保管你的 Gitee 个人访问令牌。