使用 `nohup` 启动的命令在执行完成后会自动退出，不需要手动关闭。如果命令是一个长期运行的任务（例如一个服务器进程或守护进程），它会持续运行直到完成任务或被手动终止。

### 检查 `nohup` 任务状态

如果你想检查 `nohup` 启动的任务是否仍在运行，可以使用以下方法：

#### 方法 1：使用 `ps` 命令

```bash
ps aux | grep your_command
```

替换 `your_command` 为你实际运行的命令名称。这将列出所有包含该命令名称的进程。如果命令仍在运行，会出现在列表中。

#### 方法 2：使用 `pgrep` 命令

```bash
pgrep -fl your_command
```

这将直接列出匹配命令名称的所有进程。

#### 方法 3：检查输出文件

查看 `nohup` 输出文件（通常是 `nohup.out` 或你指定的输出文件）的内容和更新时间。

```bash
tail -f nohup.out
```

如果文件没有继续更新，可能意味着命令已经完成。

### 手动终止 `nohup` 任务

如果你需要手动终止 `nohup` 启动的任务，可以使用 `kill` 命令。

1. **找到进程ID（PID）**：
   使用 `ps` 或 `pgrep` 命令找到进程ID。

   ```bash
   ps aux | grep your_command
   ```

2. **终止进程**：
   使用 `kill` 命令终止进程。

   ```bash
   kill PID
   ```

   或者使用 `kill -9 PID` 强制终止进程。

   ```bash
   kill -9 PID
   ```

### 示例

假设你运行了一个长期任务 `long_running_command`：

1. **检查任务状态**：

    ```bash
    ps aux | grep long_running_command
    ```

2. **找到进程ID并终止进程**：

    ```bash
    kill 12345
    ```

    或者强制终止：

    ```bash
    kill -9 12345
    ```

### 总结

- **自动退出**：`nohup` 启动的命令在完成后会自动退出，不需要手动关闭。
- **检查状态**：使用 `ps` 或 `pgrep` 命令检查任务是否仍在运行。
- **手动终止**：使用 `kill` 命令终止正在运行的任务。
