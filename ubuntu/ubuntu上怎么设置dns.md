#####ubuntu上怎么设置dns

要在Ubuntu上设置AdGuard DNS以实现广告屏蔽，你可以考虑安装和配置一个本地DNS服务器，然后将它设置为局域网中的DNS服务器。这将允许你的所有局域网设备，包括电脑、手机和电视，使用AdGuard DNS来屏蔽广告。以下是一些步骤：

1. **安装和配置DNS服务器**：
   - 你可以选择使用Bind9或dnsmasq等DNS服务器软件。在Ubuntu上，你可以使用以下命令来安装Bind9：

     ```
     sudo apt update
     sudo apt install bind9
     ```

   - 配置DNS服务器以将AdGuard DNS服务器作为上游DNS服务器。编辑DNS服务器的配置文件，通常位于`/etc/bind/named.conf.options`。在该文件中，添加AdGuard DNS服务器的IP地址（例如，94.140.14.14和94.140.15.15）作为上游DNS服务器。

2. **更新局域网设备的DNS设置**：
   - 对于每个局域网设备，将它们的DNS设置更改为指向你刚刚配置的Ubuntu DNS服务器的IP地址。这可以在设备的网络设置中完成。

3. **重启DNS服务器**：
   - 在完成配置后，重启DNS服务器以使更改生效：

     ```
     sudo service bind9 restart
     ```

4. **测试广告屏蔽**：
   - 确保广告屏蔽正常工作，尝试访问一些广告含量较多的网站。如果一切设置正确，广告应该会被屏蔽。

通过将AdGuard DNS服务器配置为局域网中的DNS服务器，你可以确保所有连接到网络的设备都受益于广告屏蔽和隐私保护。请记住，这需要对Ubuntu的DNS服务器进行适当的配置，以确保它可以正常工作，并在需要时更新DNS设置以指向你的服务器。



####linux上安装
要在本地搭建AdGuard DNS服务器，你可以使用AdGuard Home。AdGuard Home 是一个免费的开源DNS服务器，旨在提供广告拦截、隐私保护和安全性。以下是设置AdGuard Home的步骤：

1. **准备服务器**：
   - 你需要一台运行Linux、Windows 或 macOS 操作系统的服务器或计算机。AdGuard Home 支持多个操作系统。

2. **下载 AdGuard Home**：
   - 前往 AdGuard Home 的官方网站（https://github.com/AdguardTeam/AdGuardHome），选择适合你操作系统的版本并下载。

3. **安装 AdGuard Home**：
   - 根据你的操作系统，执行相应的安装命令。例如，在Linux上，你可以使用以下命令安装：
     ```
     sudo ./AdGuardHome -s install
     ```

4. **配置 AdGuard Home**：
   - 打开你的终端或命令行工具，运行以下命令以配置AdGuard Home：
     ```
     sudo ./AdGuardHome -s configure
     ```
   - 在配置过程中，你可以选择DNS服务器监听的IP地址和端口，设置上游DNS服务器（通常是AdGuard DNS服务器），以及其他选项。

5. **启动 AdGuard Home**：
   - 一旦配置完成，启动AdGuard Home 服务器：
     ```
     sudo ./AdGuardHome -s start
     ```

6. **访问控制面板**：
   - 打开你的Web浏览器，并在地址栏中输入`http://localhost:3000`，以访问AdGuard Home的控制面板。
   - 在控制面板中，你可以配置广告拦截、隐私保护和其他功能。

7. **设置设备的DNS服务器**：
   - 更改你的路由器或设备的DNS设置，将它们的DNS服务器设置为你的AdGuard Home 服务器的IP地址。

8. **测试广告拦截**：
   - 打开浏览器，访问一些广告含量较高的网站，确保广告已经被拦截。

通过以上步骤，你可以搭建一个本地AdGuard Home DNS服务器，以实现广告拦截、隐私保护和安全性。请注意，AdGuard Home 需要一些基本的命令行知识，以便进行安装和配置。


### 用bind9添加 adguard dns 服务ip地址时，如果adguard home安装在当前电脑上，这个ip地址怎么配置

如果你正在使用AdGuard Home并且希望将其配置为Bind9 DNS服务器的上游DNS服务器，你可以使用本地回环地址（127.0.0.1）来指向AdGuard Home。以下是如何在Bind9配置文件中添加AdGuard Home 的本地回环地址作为上游DNS服务器的步骤：

1. 打开Bind9的配置文件。通常，Bind9的配置文件位于`/etc/bind/named.conf.options`。你可以使用文本编辑器打开这个文件：

   ```
   sudo nano /etc/bind/named.conf.options
   ```

2. 在配置文件中，找到或添加一个`forwarders` 部分，它会列出上游DNS服务器的地址。你的配置文件可能看起来像这样：

   ```
   options {
       ...
       forwarders {
           // 这里是一些DNS服务器地址
           8.8.8.8;
           8.8.4.4;
       };
       ...
   };
   ```

3. 在 `forwarders` 部分中，添加AdGuard Home 的本地回环地址（127.0.0.1）作为上游DNS服务器。确保在分号后面添加新的地址：

   ```
   options {
       ...
       forwarders {
           8.8.8.8;
           8.8.4.4;
           127.0.0.1;
       };
       ...
   };
   ```

4. 保存并关闭配置文件。

5. 重启Bind9以使更改生效：

   ```
   sudo service bind9 restart
   ```

现在，你的Bind9 DNS服务器将使用AdGuard Home 本地回环地址（127.0.0.1）作为上游DNS服务器，从而将DNS查询传递给AdGuard Home 进行广告拦截和其他DNS过滤操作。确保AdGuard Home 正在运行，并且已配置为拦截广告和提供DNS服务。





# 要在Ubuntu上安装和配置AdGuard Home

要在Ubuntu上安装和配置AdGuard Home，你可以按照以下步骤进行操作：

1. **下载 AdGuard Home**:
   - 访问 AdGuard Home 的官方网站以获取最新版本的安装包：https://github.com/AdguardTeam/AdGuardHome/releases

2. **下载适用于Ubuntu的二进制文件**:
   - 选择适用于Ubuntu的版本，并下载二进制文件。通常，你会下载一个名为`AdGuardHome`的可执行文件。

3. **将可执行文件移动到合适的位置**:
   - 打开终端，然后移动已下载的`AdGuardHome`可执行文件到一个合适的位置，例如`/usr/local/bin`，以确保你可以在任何目录中执行它。

   ```
   sudo mv AdGuardHome /usr/local/bin/
   ```

4. **创建AdGuard Home配置文件**:
   - 在终端中，创建一个新的AdGuard Home配置文件。可以选择一个合适的目录，例如`/etc/AdGuardHome/`：

   ```
   sudo mkdir /etc/AdGuardHome
   sudo nano /etc/AdGuardHome/AdGuardHome.yaml
   ```

   在配置文件中，你可以定义AdGuard Home 的设置，例如监听的IP地址、上游DNS服务器、广告拦截规则等。以下是一个示例配置文件的一部分：

   ```yaml
   bind_host: 0.0.0.0
   port: 53
   upstream_dns:
     - 94.140.14.14
     - 94.140.15.15
   ```

   修改配置文件以符合你的需求，并保存更改。

5. **运行AdGuard Home**:
   - 在终端中，执行以下命令以启动AdGuard Home：

   ```
   sudo AdGuardHome -c /etc/AdGuardHome/AdGuardHome.yaml
   ```

   这将启动AdGuard Home 并开始拦截广告以及提供DNS服务。

6. **访问控制面板**:
   - 打开你的Web浏览器，然后访问 `http://localhost:3000`，以访问AdGuard Home 的Web控制面板。
   - 在控制面板中，你可以进行更详细的配置，包括广告拦截规则、过滤设置和其他选项。

7. **更新设备的DNS设置**:
   - 更改你的路由器或设备的DNS设置，将它们的DNS服务器设置为AdGuard Home 服务器的IP地址。

8. **测试广告拦截**:
   - 打开浏览器，访问一些广告含量较高的网站，确保广告已经被拦截。

通过以上步骤，你可以在Ubuntu上安装和配置AdGuard Home，实现广告拦截、隐私保护和提供本地DNS服务。 AdGuard Home 提供了一个强大的Web控制面板，使你可以对其进行详细配置。


你可以使用Docker在Ubuntu上安装AdGuard Home，并在局域网中使用它。以下是配置的步骤：

1. **安装Docker**：
   如果你尚未在Ubuntu上安装Docker，请执行以下命令来安装它：

   ```
   sudo apt update
   sudo apt install docker.io
   ```

2. **启动AdGuard Home容器**：
   使用Docker运行AdGuard Home容器。你可以使用以下命令来启动容器：

   ```
   docker run -d --name adguardhome -v /mnt/adguard-work:/opt/adguardhome/work -v /mnt/adguard-config:/opt/adguardhome/conf -p 53:53/udp -p 53:53/tcp -p 67:67/udp -p 68:68/udp -p 68:68/tcp -p 3000:3000/tcp --restart=unless-stopped adguard/adguardhome
   ```

   这将启动一个名为"adguardhome"的容器，映射了必要的端口，并将AdGuard Home的配置和工作数据存储在主机的`/mnt/adguard-config`和`/mnt/adguard-work`目录中。你可以根据需要修改这些目录。

3. **访问控制面板**：
   打开你的Web浏览器，然后访问`http://<你的Ubuntu主机的IP地址>:3000`，以访问AdGuard Home的Web控制面板。

4. **配置AdGuard Home**：
   在控制面板中，你可以配置广告拦截规则、上游DNS服务器、过滤设置等。确保你的配置满足你的需求。

5. **更新设备的DNS设置**：
   更改你的路由器或设备的DNS设置，将它们的DNS服务器设置为AdGuard Home 容器运行的Ubuntu主机的IP地址。

6. **测试广告拦截**：
   打开浏览器，访问一些广告含量较高的网站，确保广告已经被拦截。

现在，你的AdGuard Home容器已在局域网中运行，并为所有设备提供DNS服务。确保Ubuntu主机上的Docker已在开机启动时自动启动容器。请根据需要对AdGuard Home的配置进行微调，以满足你的需求。















