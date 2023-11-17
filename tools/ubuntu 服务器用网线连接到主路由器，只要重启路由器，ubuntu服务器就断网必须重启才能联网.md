NetworkManager 是一个在很多 Linux 发行版中用于管理网络连接的工具，包括 Ubuntu。你可以使用 `nmcli` 命令行工具或者图形界面的 NetworkManager 配置工具来进行操作。下面是一些基本的 `nmcli` 操作：

### 使用 nmcli 命令行工具：

1. **查看网络连接信息：**

   ```bash
   nmcli connection show
   ```

2. **创建一个 Ethernet 连接：**

   ```bash
   nmcli connection add con-name "MyConnection" ifname eth0 type ethernet
   ```

   请将 `"MyConnection"` 替换为你想要的连接名，`eth0` 替换为你的网络接口名。

3. **设置连接使用 DHCP：**

   ```bash
   nmcli connection modify "MyConnection" ipv4.method auto
   ```

   如果你想使用静态 IP 地址，可以使用以下命令：

   ```bash
   nmcli connection modify "MyConnection" ipv4.method manual ipv4.addresses "192.168.1.2/24" ipv4.gateway "192.168.1.1" ipv4.dns "8.8.8.8, 8.8.4.4"
   ```

   请根据你的网络配置进行相应的修改。

4. **启用自动连接：**

   ```bash
   nmcli connection modify "MyConnection" connection.autoconnect yes
   ```

5. **删除连接（如果需要重新创建）：**

   ```bash
   nmcli connection delete "MyConnection"
   ```

   请谨慎使用此命令，因为它将删除相应的网络连接配置。

### 使用图形界面工具：

你还可以使用图形界面工具 `nm-connection-editor` 进行更直观的配置：

```bash
nm-connection-editor
```

这将打开一个窗口，其中你可以添加、编辑和删除连接，设置连接的详细信息，包括自动连接选项。确保 "Connect automatically" 选项被勾选。

完成配置后，NetworkManager 应该会自动检测网络状态并尝试连接。




如果你的 Ubuntu 服务器在路由器重启后失去连接，并且需要服务器重启才能重新连接，这可能是由于网络配置问题导致的。以下是一些建议的解决方法：

1. **DHCP 配置：** 确保服务器的网络接口配置使用 DHCP，以便能够动态获取IP地址、网关和DNS。在 netplan 配置文件中，你可以这样配置：

    ```yaml
    network:
      version: 2
      renderer: networkd
      ethernets:
        eth0:
          dhcp4: true
    ```

   然后执行 `sudo netplan apply` 应用更改。

2. **静态 IP 地址：** 如果你使用了静态 IP 地址，请确保配置正确。在 netplan 配置文件中，你可以这样配置：

    ```yaml
    network:
      version: 2
      renderer: networkd
      ethernets:
        eth0:
          addresses:
            - 192.168.1.2/24
          gateway4: 192.168.1.1
          nameservers:
            addresses: [8.8.8.8, 8.8.4.4]
    ```

   执行 `sudo netplan apply` 应用更改。

3. **重启网络服务：** 在路由器重启后，尝试重启服务器的网络服务，而不是整个服务器。可以使用以下命令：

    ```bash
    sudo systemctl restart networking
    ```

   或者：

    ```bash
    sudo service networking restart
    ```

4. **查看网络状态：** 使用以下命令查看网络接口的状态，以便确定是否获取到正确的 IP 地址和配置：

    ```bash
    ip a
    ip route
    ```

   确保网络接口状态正常，并且有正确的 IP 地址、网关和 DNS 配置。

如果上述方法无法解决问题，你可能需要查看服务器和路由器的系统日志以获取更多信息，以便更好地诊断问题。



如果你希望服务器能够在路由器重启后自动重新连接，而不需要手动执行命令，可以考虑以下几个方法：

1. **设置自动连接：** 在 Ubuntu 中，你可以使用 NetworkManager 来设置自动连接。确保 NetworkManager 已经安装，然后可以使用 nmcli 或者图形化界面工具 nm-connection-editor 来配置自动连接。

   使用 nmcli 的例子：

   ```bash
   sudo nmcli con add con-name "MyConnection" ifname eth0 type ethernet autoconnect yes
   ```

   以上命令创建了一个名为 "MyConnection" 的连接，并配置它在启动时自动连接。请根据你的网络接口名称和连接类型进行相应的修改。

   使用图形界面工具 `nm-connection-editor`：

   ```bash
   nm-connection-editor
   ```

   在弹出的窗口中，选择你的连接，然后编辑连接属性，确保选中 "Connect automatically"（自动连接）选项。

2. **配置 systemd 自动连接服务：** 使用 systemd 的网络服务也可以配置自动连接。在这种情况下，你需要创建一个 systemd service 文件。例如，在 `/etc/systemd/system/` 目录下创建一个文件，比如 `auto-connect.service`：

   ```ini
   [Unit]
   Description=Auto Connect to Network

   [Service]
   Type=oneshot
   ExecStart=/usr/sbin/ifup -a
   ExecStop=/usr/sbin/ifdown -a
   RemainAfterExit=yes

   [Install]
   WantedBy=multi-user.target
   ```

   保存并退出后，执行以下命令启用服务：

   ```bash
   sudo systemctl enable auto-connect.service
   ```

   这将使服务在系统启动时自动运行，尝试连接网络接口。

确保在进行这些配置之前备份重要的网络配置文件，以免不小心导致网络连接问题。
