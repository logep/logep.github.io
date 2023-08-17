在 Ubuntu 上安装 Redis 并设置密码可以通过以下步骤完成：

**注意：** 在执行以下步骤之前，请确保你具有管理员权限（使用 `sudo`），并谨慎操作。

步骤 1：更新软件包列表
打开终端，并执行以下命令来更新系统的软件包列表：

```bash
sudo apt update
```

步骤 2：安装 Redis
在终端中执行以下命令来安装 Redis：

```bash
sudo apt install redis-server
```

安装完成后，Redis 服务将自动启动。

步骤 3：编辑 Redis 配置文件
打开 Redis 的配置文件以进行编辑：

```bash
sudo nano /etc/redis/redis.conf
```

在配置文件中，查找并修改以下行：

```plaintext
# 找到并取消注释下面的行，以侦听所有网络接口的连接
# bind 127.0.0.1 ::1

# 将下面的行注释掉，禁用保护模式
# protected-mode yes
```

步骤 4：设置 Redis 密码
在配置文件中，找到并取消注释下面的行，然后将 `yourpassword` 替换为你要设置的实际密码：

```plaintext
requirepass yourpassword
```

保存并关闭配置文件（使用 Ctrl + O 保存，Ctrl + X 退出 nano 编辑器）。

步骤 5：重启 Redis 服务
执行以下命令来重启 Redis 服务以应用配置更改：

```bash
sudo service redis-server restart
```

现在，你的 Redis 服务器已经安装并设置了密码。在使用 `redis-cli` 命令连接到 Redis 服务器时，你需要提供密码才能进行访问：

```bash
redis-cli -a yourpassword
```

将 `yourpassword` 替换为你设置的实际密码。这样就可以通过命令行连接到 Redis 并进行操作了。

请记住，Redis 密码是安全性的一部分，务必妥善保管好密码，不要将其泄露。
