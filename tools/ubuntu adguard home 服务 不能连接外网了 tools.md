在 Ubuntu 系统上，`/etc/resolv.conf` 文件通常由 systemd-resolved 进程动态生成和管理。手动编辑 `/etc/resolv.conf` 并不是推荐的做法，因为该文件会被系统动态更新。

如果你希望 Ubuntu 使用 AdGuard Home 提供的 DNS 服务，以下是一种可能的方法：

1. **在 `systemd-resolved` 中配置 DNS：**

    打开 `/etc/systemd/resolved.conf` 文件以编辑：

    ```bash
    sudo nano /etc/systemd/resolved.conf
    ```

    确保以下配置项被设置：

    ```ini
    [Resolve]
    DNS=127.0.0.1
    DNSStubListener=no
    ```

    这里的 `DNS=127.0.0.1` 表示将 DNS 设置为 AdGuard Home 的 IP 地址。`DNSStubListener=no` 禁用 `systemd-resolved` 自带的 DNSStubListener，以避免与 AdGuard Home 产生冲突。

2. **重启 `systemd-resolved` 服务：**

    ```bash
    sudo systemctl restart systemd-resolved
    ```

3. **检查 `/etc/resolv.conf`：**

    检查 `/etc/resolv.conf` 文件以确保它动态更新为正确的配置。文件中的 DNS 地址应该指向 AdGuard Home 的 IP 地址：

    ```bash
    cat /etc/resolv.conf
    ```

请注意，这是一种配置方式，适用于特定情况。确保你的网络环境和系统配置适用于这种方式。如果你的系统和网络环境较为复杂，可能需要更详细的配置和调整。在进行这些更改之前，请确保对系统的更改有充分的了解，并备份重要的配置。






如果你是通过 Docker 安装 AdGuard Home 服务，你需要使用容器的 IP 地址来配置 `systemd-resolved`。Docker 容器的 IP 地址可以通过 `docker inspect` 命令获取。

下面是一种获取 AdGuard Home 容器 IP 地址并更新 `systemd-resolved` 配置的方式：

1. **获取 AdGuard Home 容器的 IP 地址：**

    ```bash
    # 替换 <adguard_home_container_id_or_name> 为你的 AdGuard Home 容器的 ID 或名称
    docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <adguard_home_container_id_or_name>
    ```

2. **编辑 `systemd-resolved` 配置文件：**

    ```bash
    sudo nano /etc/systemd/resolved.conf
    ```

    在文件中确保以下配置项被设置：

    ```ini
    [Resolve]
    DNS=<AdGuard_Home_Container_IP>
    DNSStubListener=no
    ```

    将 `<AdGuard_Home_Container_IP>` 替换为你在第一步中获取到的 AdGuard Home 容器的 IP 地址。

3. **重启 `systemd-resolved` 服务：**

    ```bash
    sudo systemctl restart systemd-resolved
    ```

4. **检查 `/etc/resolv.conf`：**

    检查 `/etc/resolv.conf` 文件以确保它动态更新为正确的配置。文件中的 DNS 地址应该指向 AdGuard Home 容器的 IP 地址：

    ```bash
    cat /etc/resolv.conf
    ```

这样，`systemd-resolved` 应该使用 AdGuard Home 容器的 DNS 服务。请确保你已经获取到正确的容器 IP 地址，并相应地更新配置。
