在Ubuntu上设置一个VPN服务器以供当前电脑使用并为局域网内的其他设备提供翻墙功能，通常需要使用一个VPN服务器软件。OpenVPN是一个常用的开源VPN服务器，下面是设置的一般步骤：

**1. 安装OpenVPN服务器**

首先，安装OpenVPN服务器软件。在终端中执行以下命令：

```
sudo apt update
sudo apt install openvpn
```

**2. 配置OpenVPN**

- 使用OpenVPN软件的`easy-rsa`工具来创建证书和密钥。首先，切换到`easy-rsa`目录：

```
cd /usr/share/easy-rsa
```

- 复制示例配置文件：

```
sudo cp vars.example vars
```

- 编辑`vars`文件，设置证书的信息。找到以下行并修改为适合你的值：

```
export KEY_COUNTRY="US"
export KEY_PROVINCE="CA"
export KEY_CITY="SanFrancisco"
export KEY_ORG="OpenVPN"
export KEY_EMAIL="mail@example.com"
export KEY_OU="IT"
```

- 使用以下命令激活配置：

```
source vars
```

- 清理以前的证书和密钥：

```
./clean-all
```

- 生成CA证书和密钥：

```
./build-ca
```

- 生成服务器证书和密钥：

```
./build-key-server server
```

- 生成Diffie-Hellman参数：

```
./build-dh
```

- 生成TA密钥：

```
openvpn --genkey --secret keys/ta.key
```

**3. 配置OpenVPN服务器**

- 创建OpenVPN服务器配置文件，可以在`/etc/openvpn/server.conf`中创建一个新文件：

```
sudo nano /etc/openvpn/server.conf
```

- 添加以下配置，根据你的需求进行修改：

```shell
port 1194
proto udp
dev tun
ca /usr/share/easy-rsa/keys/ca.crt
cert /usr/share/easy-rsa/keys/server.crt
key /usr/share/easy-rsa/keys/server.key
dh /usr/share/easy-rsa/keys/dh2048.pem
server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt
push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 8.8.8.8"
push "dhcp-option DNS 8.8.4.4"
keepalive 10 120
comp-lzo
user nobody
group nogroup
persist-key
persist-tun
status openvpn-status.log
verb 3
```

- 保存并关闭文件。

**4. 启动OpenVPN服务器**

- 启动OpenVPN服务器：

```
sudo systemctl start openvpn@server
```

**5. 设置IP转发**

为了使局域网内的其他设备能够通过VPN访问互联网，你需要启用IP转发。执行以下命令：

```
echo 1 | sudo tee /proc/sys/net/ipv4/ip_forward
```

你还需要确保IP转发在每次启动时保持开启。你可以编辑`/etc/sysctl.conf`文件，将以下行添加到文件末尾：

```
net.ipv4.ip_forward=1
```

然后使用`sysctl -p`命令使更改生效。

**6. 配置客户端**

现在，你需要为局域网内的设备配置OpenVPN客户端，以便它们能够连接到你的VPN服务器。在每个设备上，你需要安装OpenVPN客户端，并配置一个OpenVPN配置文件，该文件包括服务器的IP地址和证书信息。

**7. 防火墙设置**

确保你的防火墙允许OpenVPN流量通过。你可能需要配置防火墙规则，允许UDP端口1194上的流量通过。

这是一个基本的设置过程，根据你的具体需求和网络环境可能会有所不同。要确保安全性，请在设置OpenVPN服务器之前仔细了解OpenVPN的安全最佳实践，并采取适当的安全措施。
