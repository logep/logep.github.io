当你在 SSH 终端上执行命令时，如果关闭了 SSH 终端，默认情况下，该命令也会终止。这是因为 SSH 连接的中断会导致会话中的所有进程被终止。

然而，有几种方法可以确保命令在你关闭 SSH 终端后继续在远程服务器上执行：

### 方法 1：使用 `nohup`

`nohup` 命令用于在你退出后继续运行程序。你可以将命令放在 `nohup` 前面，并将输出重定向到文件。

```bash
nohup your_command &> output.log &
```

示例：

```bash
nohup long_running_command &> output.log &
```

- `nohup`：忽略挂起（HUP）信号。
- `&> output.log`：将输出重定向到 `output.log` 文件。
- `&`：将命令放入后台运行。

### 方法 2：使用 `screen`

`screen` 是一个终端多路复用器，允许你创建多个会话并在其中运行命令。你可以在会话中运行命令，关闭 SSH 终端后再次连接并重新进入会话。

安装 `screen`：

```bash
sudo apt-get install screen
```

使用 `screen`：

```bash
screen
your_command
```

然后按 `Ctrl+A` 后按 `D` 键，将 `screen` 会话分离。你可以使用 `screen -r` 命令重新连接到该会话。

### 方法 3：使用 `tmux`

`tmux` 是另一个终端多路复用器，类似于 `screen`。它也允许你创建多个会话并在其中运行命令。

安装 `tmux`：

```bash
sudo apt-get install tmux
```

使用 `tmux`：

```bash
tmux
your_command
```

然后按 `Ctrl+B` 后按 `D` 键，将 `tmux` 会话分离。你可以使用 `tmux attach` 命令重新连接到该会话。

### 方法 4：使用 `disown`

如果你已经在前台运行了一个命令，并且希望在关闭 SSH 会话时让它继续运行，可以使用 `disown` 命令。

将命令放入后台：

```bash
your_command &
```

获取作业号（通常是 `[1]`，`[2]` 等）：

```bash
jobs
```

使用 `disown` 来让命令在会话关闭后继续运行：

```bash
disown %1
```

### 选择方法

- **简单任务**：使用 `nohup`。
- **需要重连和管理多个任务**：使用 `screen` 或 `tmux`。
- **已经启动的任务**：使用 `disown`。

### 示例总结

假设你正在执行一个长时间运行的命令 `long_running_command`。

1. 使用 `nohup`：

   ```bash
   nohup long_running_command &> output.log &
   ```

2. 使用 `screen`：

   ```bash
   screen
   long_running_command
   # 按 Ctrl+A，然后按 D 键分离会话
   screen -r  # 重新连接到会话
   ```

3. 使用 `tmux`：

   ```bash
   tmux
   long_running_command
   # 按 Ctrl+B，然后按 D 键分离会话
   tmux attach  # 重新连接到会话
   ```

4. 使用 `disown`（如果命令已经在运行）：

   ```bash
   long_running_command &
   jobs
   disown %1
   ```

通过这些方法，你可以确保在关闭 SSH 终端后命令继续在远程服务器上执行。
