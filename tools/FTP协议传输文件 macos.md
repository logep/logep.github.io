https://cyberduck.io/
在 Ubuntu 上开启 FTP 服务，并且只允许在局域网内访问，可以使用 vsftpd（Very Secure FTP Daemon）服务器。以下是一些基本的步骤：

### 安装 vsftpd：

```bash
sudo apt update
sudo apt install vsftpd
```

### 配置 vsftpd：

1. 编辑 vsftpd 配置文件：

   ```bash
   sudo nano /etc/vsftpd.conf
   ```

2. 确保以下配置项的值如下：

   ```plaintext
   listen=YES
   listen_ipv6=NO
   anonymous_enable=NO
   local_enable=YES
   write_enable=YES
   local_umask=022
   dirmessage_enable=YES
   use_localtime=YES
   xferlog_enable=YES
   connect_from_port_20=YES
   chroot_local_user=YES
   secure_chroot_dir=/var/run/vsftpd/empty
   pam_service_name=vsftpd
   rsa_cert_file=/etc/ssl/certs/ssl-cert-snakeoil.pem
   rsa_private_key_file=/etc/ssl/private/ssl-cert-snakeoil.key
   ssl_enable=NO
   pasv_enable=YES
   pasv_min_port=40000
   pasv_max_port=40100
   ```

   这些设置将允许本地用户登录，并在 40000-40100 端口范围内启用被动模式传输。

3. 保存并关闭文件。

### 重启 vsftpd 服务：

```bash
sudo systemctl restart vsftpd
```

### 配置防火墙：

如果您的系统启用了防火墙（比如 `ufw`），请确保打开 FTP 所使用的端口：

```bash
sudo ufw allow 20/tcp
sudo ufw allow 21/tcp
sudo ufw allow 40000:40100/tcp
sudo ufw reload
```

### 仅允许局域网访问：

1. 打开 `/etc/vsftpd.conf` 文件：

   ```bash
   sudo nano /etc/vsftpd.conf
   ```

2. 添加以下行，其中 `192.168.1.0/24` 应该替换为您的局域网地址范围：

   ```plaintext
   listen_address=192.168.1.100
   ```

   这将指定 FTP 服务器只监听指定的 IP 地址。

3. 保存并关闭文件，然后重新启动 vsftpd 服务：

   ```bash
   sudo systemctl restart vsftpd
   ```

现在，您的 vsftpd 服务器应该只允许局域网内的访问。请根据您的网络配置调整 IP 地址和其他设置。
