 TCP localhost:domain (LISTEN)
sudo systemctl stop domain  停止掉ubuntu自带的 domain服务 使用 adguardhome的dns 服务可以么
sudo systemctl stop domain
在Ubuntu上，`domain`服务通常不是一个标准服务，因此使用`sudo systemctl stop domain`停止它可能不适用于所有情况。如果你想停用系统的DNS服务并使用AdGuard Home作为你的DNS服务器，你可以采取以下步骤：

1. 确保已经安装了AdGuard Home。你可以按照AdGuard Home的官方文档安装和配置它。

2. 关闭Ubuntu的本地DNS缓存服务，以避免与AdGuard Home发生冲突。你可以使用以下命令来停止和禁用`systemd-resolved`服务：

```bash
sudo systemctl stop systemd-resolved
sudo systemctl disable systemd-resolved
```

3. 启用AdGuard Home服务并配置它为你的DNS服务器。你可以使用AdGuard Home的Web界面或配置文件来设置它为你的DNS服务器，通常默认监听在`127.0.0.1`上，你可以将你的设备DNS设置为`127.0.0.1`或服务器的IP地址。

4. 重启网络服务以确保更改生效：

```bash
sudo systemctl restart network-manager
```

请注意，停用Ubuntu系统的DNS服务可能会影响某些系统功能，因此在进行此更改之前，请确保你了解其可能的影响。如果你在使用VPN或其他网络相关服务，请确保适应性地配置它们以适应更改后的DNS设置。


### 还原方法


如果你想还原之前的设置并重新启用Ubuntu的DNS服务，可以按照以下步骤进行：

1. 启用 `systemd-resolved` 服务：

```bash
sudo systemctl enable systemd-resolved
```

2. 启动 `systemd-resolved` 服务：

```bash
sudo systemctl start systemd-resolved
```

3. 重新启动网络服务：

```bash
sudo systemctl restart network-manager
```

这将还原Ubuntu系统的DNS设置，并使其恢复使用 `systemd-resolved` 服务来处理DNS查询。你的系统将再次使用默认的DNS服务器配置。

如果你之前进行了其他更改，例如更改了网络配置或其他服务设置，你可能需要进一步还原这些更改。确保仔细检查和记录之前的配置更改，以确保一切恢复正常。

如果你使用AdGuard Home来管理DNS服务，你可以停用或卸载它，但这通常不会影响Ubuntu的DNS设置。不过，你可以根据需要停用或卸载AdGuard Home。


在Ubuntu中，系统自带的DNS服务通常是`systemd-resolved`，它有以下用途：

1. DNS解析：`systemd-resolved`负责将主机名（例如网站域名）解析为IP地址。它充当本地DNS缓存服务，以减少DNS查询的延迟，提高性能。

2. mDNS解析：`systemd-resolved`还支持多播DNS（mDNS），用于本地局域网中的设备自动发现和通信。

如果你停止`systemd-resolved`服务或禁用它，会有以下影响：

1. DNS查询延迟：系统将不再使用本地DNS缓存，这可能导致DNS查询的延迟，尤其是在频繁进行DNS查询的情况下。

2. 主机名解析问题：如果系统没有本地DNS服务，你可能会遇到主机名无法解析为IP地址的问题，这会影响访问网站和其他网络服务。

3. mDNS问题：如果你使用多播DNS（mDNS）来发现和通信本地网络中的设备，禁用`systemd-resolved`可能会导致这些功能无法正常工作。

综上所述，停止或禁用Ubuntu系统自带的DNS服务可能会影响网络性能和主机名解析。如果你有特殊需求，可以选择替代的DNS解析服务，但需要确保正确配置和管理，以避免不必要的问题。通常情况下，保持`systemd-resolved`服务处于活动状态是一个良好的做法，因为它有助于提高系统的整体性能。
