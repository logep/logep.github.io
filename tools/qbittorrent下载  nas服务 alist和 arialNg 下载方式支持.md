https://fast.v2ex.com/t/975089
docker安装
 image: wahyd4/aria2-ui:latest

 ## 配置

    volumes:
      - /mnt/nas/files/aria2:/data
      - /home/aria2conf:/app/conf

      ## 配置

      <img width="931" alt="image" src="https://github.com/logep/logep.github.io/assets/6442945/0a31fcf8-dbdc-4f27-bbc2-8552333cd82e">
## 配合 alist 观看下载的文件
alist
如果访问webdav
路径需加上 dav 路径 才能访问成功
获取 AList 的 WebDAV 地址和凭据：用户和密码就是登录alist的密码和用户
在 AList 或 WebDAV 服务器的设置中查找 WebDAV 服务的地址（通常是一个 URL，类似于 http://your-alist-server/webdav）以及访问所需的用户名和密码。


有些地址必须带上 header 才能正常下载 比如bilibili
let id=new Date().getTime()+""
let outName="2018文件输出需要修改.mp4"
let downUrl="你要下载的文件地址,只能一个"
let options2 = { //下载配置文件
				"dir":"",
    "out":outName,
    "split":"4","piece-length":"4M",
				"max-connection-per-server": "16",
				"header":["User-Agent:"+navigator.userAgent+"", "Cookie:"+document.cookie+"", "Referer:"+window.location.href+""]
			}
let data={"jsonrpc":"2.0","id":id,"method":"aria2.addUri","params":["token:admin2",[downUrl],options2]}

        fetch("https://aria2.win/jsonrpc", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
   body:JSON.stringify(data)
  });


  ## 或者直接打开alist官网直接输入地址也可以下载 
  <img width="388" alt="image" src="https://github.com/logep/logep.github.io/assets/6442945/7e85517c-2324-4919-b2d2-4f6654032f82">


部署 qbittorrent
docker run -d \
  --name=qbittorrent \
  -e PUID=0 \
  -e PGID=0 \
  -e TZ=Asia/Shanghai \
  -e WEBUI_PORT=8090 \
  -p 8090:8090 \
  -p 6881:6881 \
  -p 6881:6881/udp \
  -v /mnt/user/media/qbittorrent/config:/config \
  -v /mnt/user/media:/downloads \
  --restart unless-stopped \
  lscr.io/linuxserver/qbittorrent:latest
/mnt/user/media/qbittorrent/config - 用来保存 qbittorrent 配置的位置,需要替换成你自己 NAS 中的某个目录
/mnt/user/media - 用来保存下载内容的位置,需要替换成你自己 NAS 中的某个目录
部署完成后用浏览器打开http://your-nas-ip:8090即可访问 qbittorrent,默认用户名密码为admin和adminadmin,配置和使用都比较简单,就不详细介绍了.

