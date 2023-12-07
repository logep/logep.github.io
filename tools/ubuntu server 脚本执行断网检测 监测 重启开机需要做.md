1.adguard home dns服务重新启动
2.路由器网络重启后，需要重新启动ubuntu 或者连接显示器重新执行 重启网络 sudo systemctl restart networking  or sudo service networking restart

可以使用`ping`命令来检测网络连接是否正常。以下是一个简单的脚本，它会定期检测与路由器的连接，并在检测到断网时重启网络服务：

```bash
#!/bin/bash

# 路由器的IP地址
router_ip="192.168.1.1"

# 定义ping的超时时间，单位为秒
timeout=5

# 循环检测网络连接
while true; do
    # 执行ping命令，等待timeout秒
    if ping -c 1 -W $timeout $router_ip >/dev/null 2>&1; then
        # 网络连接正常，等待一段时间后再次检测
        sleep 10
    else
        # 网络连接断开，重启网络服务
        sudo systemctl restart networking
        echo "网络连接已断开，已重启网络服务。"
        # 等待一段时间后再次检测
        sleep 10
    fi
done
```

请注意，此脚本会在后台无限循环运行，并每隔一段时间执行一次ping命令。如果检测到网络连接断开，则会使用`sudo systemctl restart networking`命令重启网络服务。你可以根据实际情况调整脚本中的IP地址、超时时间以及等待时间。

保存脚本为一个文件（例如`network_monitor.sh`），然后使用`chmod +x network_monitor.sh`命令添加执行权限。最后，可以使用`./network_monitor.sh`命令运行脚本。如果需要在后台运行，可以使用`nohup ./network_monitor.sh &`。


是的，你可以将这个脚本制作成一个系统服务，并配置为开机自动启动。以下是一个简单的步骤：

1. **创建服务脚本文件**

创建一个新的服务脚本文件，例如 `/etc/systemd/system/network-monitor.service`：

```bash
sudo nano /etc/systemd/system/network-monitor.service
```

将以下内容粘贴到文件中：

```ini
[Unit]
Description=Network Monitor Service
After=network.target

[Service]
ExecStart=/path/to/your/script.sh
Restart=always
User=your_username

[Install]
WantedBy=multi-user.target
```

请替换 `/path/to/your/script.sh` 为你之前创建的监控脚本的实际路径，以及 `your_username` 为你的用户名。

2. **保存并关闭文件**

使用 `Ctrl + X`，然后按 `Y` 保存，最后按 `Enter` 关闭文件。

3. **重新加载系统服务**

执行以下命令以重新加载 systemd 服务：

```bash
sudo systemctl daemon-reload
```

4. **启动服务**

启动服务并设置为开机自动启动：

```bash
sudo systemctl start network-monitor
sudo systemctl enable network-monitor
```

现在，你的网络监控服务将在系统启动时自动启动。

如果需要检查服务状态，可以使用：

```bash
sudo systemctl status network-monitor
```

请确保将脚本的路径正确替换，并确保你有执行脚本和服务的权限。
