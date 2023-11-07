### adguard home 服务 一些设置

上游一些dns服务
tls://dns.pub
https://dns.pub/dns-query
tls://dns.alidns.com
https://dns.alidns.com/dns-query

bootstrap dns 服务器

119.29.29.29
119.28.28.28
223.5.5.5
223.6.6.6



 如果你尝试使用 `systemctl restart network-manager` 命令，但出现 "Unit network-manager.service not found" 的错误消息，这通常意味着 `network-manager` 服务没有安装或未正确配置。

`network-manager` 是 Ubuntu 上负责管理网络连接的服务，通常应该是已经安装并正在运行的。但有时出现这个错误可能有以下几种原因：

1. `network-manager` 未安装：首先确保 `network-manager` 已经安装在你的系统上。你可以使用以下命令来安装它：

   ```bash
   sudo apt install network-manager
   ```

2. `network-manager` 服务未正确配置：如果 `network-manager` 已安装但未正确配置，你可以尝试重新配置它：

   ```bash
   sudo dpkg-reconfigure network-manager
   ```

3. `network-manager` 服务已被卸载或替代：有时，系统可能使用其他网络管理工具替代了 `network-manager`。在这种情况下，你需要查找系统使用的网络管理工具，以便恢复网络管理功能。

4. 服务名称错误：确保你使用的是正确的服务名称。服务名称是大小写敏感的，所以确保拼写正确。

如果上述方法仍然无法解决问题，你可能需要提供更多关于你的系统配置和错误消息的信息，以便更准确地诊断问题并提供帮助。



 
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




如果你尝试使用 `sudo systemctl stop domain` 命令来停止名为 `domain` 的服务，但出现 "Unit domain.service not loaded" 的错误消息，那意味着 `domain` 服务并没有以 systemd 服务的形式在系统上加载。这通常意味着该服务不存在或未安装为 systemd 服务。

如果你想停止某个已知服务，你应该使用该服务的正确名称。如果你不确定服务的名称，可以使用 `systemctl` 命令来列出当前正在运行的服务以查找你要停止的服务。例如：

```bash
systemctl list-units --type=service
```

然后，找到你要停止的服务的名称，然后使用 `systemctl stop` 命令来停止它。如果你是在寻找某个与 DNS 或域名相关的服务，通常不会有一个名为 `domain` 的系统服务，因此你需要确定确切的服务名称。

如果你能提供更多关于要停止的服务的信息，我将尽力提供更详细的帮助。



根据你提供的信息，`systemd-resolve` 服务正在监听端口 53，这是 DNS 服务的默认端口。如果你想停止 `systemd-resolve` 服务，可以使用以下命令：

```bash
sudo systemctl stop systemd-resolved
```

然后，你可以禁用 `systemd-resolved` 服务，以确保它不会在系统启动时重新启动：

```bash
sudo systemctl disable systemd-resolved
```

这些命令将停止并禁用 `systemd-resolved` 服务，这样它将不再监听端口 53，并且不会影响 DNS 解析。如果你打算使用其他的 DNS 服务，例如 AdGuard Home，确保在配置和启动该服务之前，你已经停用了 `systemd-resolved`。



在Ubuntu上安装AdGuard Home之前停止`systemd-resolved`服务通常不是必须的，但可以是一个好的做法，因为它可以避免与系统DNS服务发生冲突。

`systemd-resolved`是Ubuntu的默认DNS解析服务，它监听端口53，处理DNS查询。如果你计划使用AdGuard Home作为你的DNS服务器，你可以选择停用`systemd-resolved`以避免端口占用和冲突。这可以通过以下步骤完成：

1. 停用`systemd-resolved`服务：

```bash
sudo systemctl stop systemd-resolved
```

2. 禁用`systemd-resolved`服务，以确保它在系统启动时不会重新启动：

```bash
sudo systemctl disable systemd-resolved
```

3. 启动AdGuard Home并将其配置为DNS服务器。

如果你选择不停用`systemd-resolved`，它仍然可以继续运行，并处理DNS查询。在这种情况下，确保AdGuard Home监听不同的端口，以避免端口冲突。 AdGuard Home通常默认监听在`53`端口之外的其他端口，因此不会与`systemd-resolved`冲突。





在华为安卓手机上，你可以为特定的Wi-Fi网络设置自定义DNS服务器。这允许你使用不同的DNS服务器来改善网络性能或访问特定的内容过滤服务。以下是在华为安卓手机上设置自定义DNS的一般步骤：

1. 打开手机的设置应用。

2. 滚动并找到"网络和互联网"或类似的选项，然后点击它。

3. 在"网络和互联网"下，找到"Wi-Fi"并点击它。

4. 找到并点击你要设置自定义DNS的Wi-Fi网络。

5. 在Wi-Fi网络详细信息页面，通常有一个"高级选项"或类似的选项。点击这个选项。

6. 在高级选项中，你应该看到"IP设置"或"IP配置"。点击这个选项。

7. 在IP设置中，选择"静态"或"手动"（取决于你的手机版本）。

8. 现在你可以手动输入自定义的DNS服务器地址。通常，你需要输入两个DNS服务器的地址。这些地址通常由你的DNS服务提供商提供，例如，Google DNS的地址是8.8.8.8和8.8.4.4。如果你想使用AdGuard Home作为DNS服务器，请输入相应的IP地址。

9. 输入完自定义DNS服务器地址后，点击"保存"或"应用"以保存更改。

10. 返回到Wi-Fi设置页面，确保你的Wi-Fi连接是开启状态。

现在，你的手机将使用你为这个特定Wi-Fi网络配置的自定义DNS服务器进行DNS解析。请注意，这些设置仅适用于所选择的Wi-Fi网络，如果你切换到其他网络，你需要重复这些步骤来为其他网络配置自定义DNS。
