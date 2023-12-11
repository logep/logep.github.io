在每个 Docker 服务的配置文件中配置 DNS 通常是为了确保容器内的应用程序能够正确解析域名。如果你已经在 Docker 中安装了 AdGuard Home，并希望其他容器使用 AdGuard Home 提供的 DNS 服务，你需要在其他容器中的配置文件中指定 AdGuard Home 容器的 IP 地址作为 DNS 服务器。

以下是一些常见的方式，具体取决于你的容器配置和应用程序：

1. **使用 Docker 宿主机的 DNS 配置：**
   - 让其他容器继承 Docker 宿主机的 DNS 配置。在启动容器时，不指定 `--dns` 选项，容器将默认使用 Docker 宿主机的 DNS 设置。

2. **显式指定 AdGuard Home 的 DNS 服务：**
   - 在其他容器的启动命令中，使用 `--dns` 选项指定 AdGuard Home 容器的 IP 地址。这样其他容器将使用 AdGuard Home 提供的 DNS 服务。示例：
     ```bash
     docker run -d --name my_container --dns=<AdGuard_Home_Container_IP> my_image
     ```
     将 `<AdGuard_Home_Container_IP>` 替换为 AdGuard Home 容器的实际 IP 地址。

3. **使用 Docker Compose 进行配置：**
   - 如果你使用 Docker Compose 管理多个容器，你可以在 `docker-compose.yml` 文件中为每个服务指定 DNS 配置。示例：
     ```yaml
     services:
       my_service:
         image: my_image
         dns: <AdGuard_Home_Container_IP>
     ```
     将 `<AdGuard_Home_Container_IP>` 替换为 AdGuard Home 容器的实际 IP 地址。

确保在配置 DNS 时考虑网络环境和具体容器的需要。在某些情况下，应用程序可能还有自己的 DNS 配置选项，你可能需要根据应用程序的文档或配置来进行设置。
