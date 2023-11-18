首先需要干掉  这个系统服务 sudo systemctl stop systemd-resolved
才能正常启动  adguard home 的服务 不然端口号会冲突
sudo lsof -i :53
找到 53端口号 （这个就不需要做了）

#todo
需要 把 adguard home 的dns 服务作为系统服务 替换掉 systemd-resolved 

在 Ubuntu 等系统中，`systemd-resolved` 服务通常使用 53 端口提供 DNS 服务。如果你想将 AdGuard Home 的 DNS 服务替换为系统的 DNS 服务，你可以尝试以下步骤：

1. **停止并禁用 systemd-resolved 服务：**

    ```bash
    sudo systemctl stop systemd-resolved
    sudo systemctl disable systemd-resolved
    ```

    这将停止并禁用 systemd-resolved 服务。请注意，禁用 systemd-resolved 可能会影响系统的一些网络功能，因此在执行此操作之前，请确保了解它可能引起的影响。

2. **启动并配置 AdGuard Home 服务：**

    在确保 systemd-resolved 已停用的情况下，启动并配置 AdGuard Home 服务。确保 AdGuard Home 的 DNS 服务监听在 53 端口或其他未被占用的端口上。

3. **修改系统的 DNS 设置：**

    在网络设置中，将系统的 DNS 设置修改为 AdGuard Home 主机的 IP 地址和端口号（如果端口号不是默认的 53）。

    ```bash
    sudo nano /etc/resolv.conf
    ```

    将文件中的 `nameserver` 行更改为 AdGuard Home 主机的 IP 地址，保存并退出。确保 DNS 请求将被发送到 AdGuard Home。

4. **重启网络服务：**

    ```bash
    sudo systemctl restart networking
    ```

    或者，你可以尝试重启整个系统。

请注意，这样的配置变更可能会影响到系统的一些网络功能，因此在进行此类更改之前请确保对系统有充分的了解。此外，AdGuard Home 服务和 systemd-resolved 服务的并发使用可能需要额外的配置，以确保它们不会相互干扰。







实现 AdGuard Home 服务和 systemd-resolved 服务的并发配置，以确保它们不会相互干扰，通常需要注意以下几点：

1. **选择不同的端口：** 确保 AdGuard Home 的 DNS 服务监听在一个不同于 systemd-resolved 的端口上。这可以在 AdGuard Home 的配置文件中完成。修改 AdGuard Home 的配置文件（通常是 `AdGuardHome.yaml`）中的 `dns` 部分，将 `listen_addr` 设置为其他端口。

    ```yaml
    dns:
      - listen_addr: "127.0.0.1:5353"
    ```

    这将使 AdGuard Home 的 DNS 服务在 5353 端口上监听。

2. **修改系统 DNS 设置：** 在系统的网络设置中，将系统的 DNS 设置修改为 AdGuard Home 主机的 IP 地址和配置的端口号。这可以在 `/etc/resolv.conf` 中手动修改，也可以通过网络管理工具进行配置。

3. **避免端口冲突：** 确保其他系统服务或进程不会与 AdGuard Home 或 systemd-resolved 使用的端口发生冲突。使用 `netstat` 或 `lsof` 命令检查端口占用情况。

4. **防火墙规则：** 如果系统上使用了防火墙，确保防火墙规则允许 AdGuard Home 配置的端口通过。适当配置防火墙规则可以帮助防止端口的冲突和干扰。

5. **服务启动顺序：** 在配置中确保 AdGuard Home 在 systemd-resolved 之前启动。这可以通过在 systemd 配置文件中指定服务之间的依赖性来实现。

在考虑这些因素时，你应该能够在系统上同时运行 AdGuard Home 和 systemd-resolved，而它们不会相互干扰。记得在进行任何更改之前，创建系统的备份，以防不时之需。




在 systemd 中，可以通过设置服务单元之间的依赖性来控制启动顺序。你可以使用 `After` 和 `Wants` 选项来确保 AdGuard Home 的 DNS 服务在 systemd-resolved 之前启动。

以下是一个简单的示例，演示如何修改 AdGuard Home 的 systemd 服务单元配置文件：

```ini
# /etc/systemd/system/adguardhome.service

[Unit]
Description=AdGuard Home DNS and Web server
After=network.target systemd-resolved.service
Wants=network.target systemd-resolved.service

[Service]
ExecStart=/path/to/adguardhome

[Install]
WantedBy=default.target
```

这个例子中：

- `After=network.target systemd-resolved.service` 指定了 AdGuard Home 服务应该在 `network.target` 和 `systemd-resolved.service` 启动之后启动。

- `Wants=network.target systemd-resolved.service` 表示 AdGuard Home 服务是 `network.target` 和 `systemd-resolved.service` 的一个强依赖，即它们都应该在 AdGuard Home 之前启动。

确保替换配置中的 `/path/to/adguardhome` 为实际的 AdGuard Home 可执行文件路径。之后，重新加载 systemd 配置并重新启动 AdGuard Home 服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart adguardhome
```

通过这样配置，你可以确保 AdGuard Home 在 systemd-resolved 之前启动。请注意，如果 `network.target` 或 `systemd-resolved.service` 发生变化，你可能需要相应地更新 `After` 和 `Wants` 的配置。




你的理解是正确的，如果 AdGuard Home 在 systemd-resolved 之前启动，那么 `After` 的配置是正确的。可能是 `Wants` 部分的配置可能导致了问题。

在 `Wants` 中，如果你希望 AdGuard Home 在 `network.target` 和 `systemd-resolved.service` 启动之前启动，你可以分别指定这两个依赖项：

```ini
Wants=network.target
After=network.target

Wants=systemd-resolved.service
After=systemd-resolved.service
```

或者，你可以将两者合并为一个单独的 `Wants` 和 `After` 部分：

```ini
Wants=network.target systemd-resolved.service
After=network.target systemd-resolved.service
```

确保 systemd 配置文件的语法是正确的，然后重新加载 systemd 配置并重新启动 AdGuard Home 服务：

```bash
sudo systemctl daemon-reload
sudo systemctl restart adguardhome
```

在配置文件中，`After` 和 `Wants` 应该在 `[Unit]` 部分内。如果有多个 `Wants` 或 `After` 条目，请确保每个服务单元都有其自己的行。

如果问题仍然存在，请检查 systemd 日志以获取更详细的信息：

```bash
sudo journalctl -xe
```

这将显示系统日志，你可以查看是否有与 AdGuard Home 或 systemd-resolved 服务启动顺序相关的错误或警告。
