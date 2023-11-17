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



`dnsmasq` 主要是用于 DNS 转发和 DHCP 服务，而不是网关设置。通常情况下，网关的设置是通过操作系统的网络配置来完成的。在 Ubuntu Server 上，你可以通过修改 `/etc/network/interfaces` 文件或使用 `netplan` 来配置网关。

如果你希望使用 `dnsmasq` 处理网关设置，你可以考虑以下方法：

1. **使用 `dnsmasq` 提供的 DHCP 服务：**

   在 `dnsmasq.conf` 文件中，你可以配置 DHCP 服务，为网络中的设备分配 IP 地址和网关。示例配置：

   ```conf
   interface=eth0
   dhcp-range=192.168.1.50,192.168.1.100,12h
   dhcp-option=option:router,192.168.1.1
   ```

   这里，`dhcp-range` 指定了分配的 IP 地址范围，`dhcp-option` 设置了网关的 IP 地址。

2. **配置网络接口使用 DHCP：**

   在 Ubuntu Server 上，你可以配置网络接口使用 DHCP 来获取 IP 地址和网关。编辑 `/etc/network/interfaces` 文件，将网关设置为 `auto`，然后重启网络服务：

   ```conf
   auto eth0
   iface eth0 inet dhcp
   ```

   或者，如果使用 `netplan`，你可以编辑 `/etc/netplan/` 目录下的配置文件，确保 `renderer` 设置为 `networkd`，然后添加以下配置：

   ```yaml
   network:
     version: 2
     renderer: networkd
     ethernets:
       eth0:
         dhcp4: true
   ```

   之后，应用更改：

   ```bash
   sudo netplan apply
   ```

这些配置将使 `dnsmasq` 提供 DHCP 服务，并为设备分配 IP 地址和网关。请根据你的具体网络配置和需求进行相应的修改。请注意，在生产环境中确保配置的合理性和安全性。

在使用 `dnsmasq` 来设置 DNS 的情况下，你可以通过编辑 `dnsmasq.conf` 文件来配置 DNS。下面是一些常用的配置选项：

1. **基本配置：**

   ```conf
   # 监听的网络接口
   interface=eth0

   # 允许dnsmasq自动选择监听的接口
   bind-interfaces

   # 设置DNS服务器
   server=8.8.8.8
   server=8.8.4.4
   ```

   这里，`interface` 指定了 `dnsmasq` 监听的网络接口，`bind-interfaces` 允许 `dnsmasq` 自动选择监听的接口，`server` 指定了使用的 DNS 服务器。

2. **本地域名解析：**

   ```conf
   # 设置本地域名解析
   domain=local
   expand-hosts
   ```

   这允许 `dnsmasq` 解析本地域名，`expand-hosts` 会自动将单个标签的主机名转换为完全限定域名。

3. **添加自定义域名解析：**

   ```conf
   # 添加自定义域名解析
   address=/example.com/192.168.1.100
   ```

   这里，`example.com` 将被解析到 IP 地址 `192.168.1.100`。

4. **使用本地 hosts 文件：**

   ```conf
   # 使用本地hosts文件
   addn-hosts=/etc/hosts
   ```

   这会使 `dnsmasq` 使用 `/etc/hosts` 文件中的主机名和 IP 地址。

确保在修改 `dnsmasq.conf` 文件后，重新启动 `dnsmasq` 服务以使更改生效：

```bash
sudo service dnsmasq restart
```

这些是一些基本的配置选项，你可以根据自己的需求和网络环境进行调整。请确保你的配置文件符合 `dnsmasq` 的语法规则。


如果你希望在 Ubuntu Server 上通过 Docker 容器来设置 DNS 和网关，你可以考虑使用 `dnsmasq` 来实现这一目标。`dnsmasq` 是一个轻量级的 DNS 转发器和 DHCP 服务器，适用于小型网络环境。

以下是使用 Docker 运行 `dnsmasq` 容器的基本步骤：

1. **创建 dnsmasq 配置文件：**

   创建一个名为 `dnsmasq.conf` 的配置文件，包含你想要设置的 DNS 和网关信息。例如：

   ```conf
   interface=eth0
   listen-address=127.0.0.1
   bind-interfaces
   server=8.8.8.8
   domain-needed
   bogus-priv
   no-resolv
   ```

   在这个例子中，`interface` 是你服务器上的网络接口，`server` 是一个 DNS 服务器的地址（这里使用 Google 的公共 DNS）。

2. **创建 Docker 容器并运行：**

   使用以下命令创建并运行 `dnsmasq` 容器：

   ```bash
   docker run -d \
     --name dnsmasq \
     --restart always \
     --cap-add NET_ADMIN \
     --network host \
     -v /path/to/dnsmasq.conf:/etc/dnsmasq.conf \
     jpillora/dnsmasq
   ```

   - `-d` 表示在后台运行容器。
   - `--name dnsmasq` 指定容器的名称为 "dnsmasq"。
   - `--restart always` 指定容器在启动时自动重启。
   - `--cap-add NET_ADMIN` 添加网络管理权限。
   - `--network host` 使用主机网络模式，容器将共享主机的网络栈。
   - `-v /path/to/dnsmasq.conf:/etc/dnsmasq.conf` 将主机上的 `dnsmasq.conf` 文件映射到容器内部。

3. **验证容器是否运行：**

   使用以下命令查看容器是否正常运行：

   ```bash
   docker ps
   ```

   确保 `dnsmasq` 容器正在运行。

4. **修改 Ubuntu Server 的 DNS 设置：**

   修改服务器的 `/etc/resolv.conf` 文件，将 DNS 设置为 `127.0.0.1`（即 `localhost`）。这样服务器的 DNS 查询将通过 `dnsmasq` 处理。

   ```bash
   sudo nano /etc/resolv.conf
   ```

   将其中的 `nameserver` 修改为 `127.0.0.1`：

   ```plaintext
   nameserver 127.0.0.1
   ```

   保存并退出。

通过以上步骤，你就可以通过 Docker 容器运行 `dnsmasq` 来设置 Ubuntu Server 的 DNS 和网关。请注意，在生产环境中使用这种方式时，确保你的 `dnsmasq` 配置符合你的网络需求。
