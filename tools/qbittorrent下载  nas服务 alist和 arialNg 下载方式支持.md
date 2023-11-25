qbittorrent 下载
frp 内网穿透
syncthing 文件同步
seafile 个人云盘
jellyfin 个人影院
nas-tools PT 助手以及个人影院资源索引，整理等
ddns 为了公网域名访问（ 80 ，443 已封）
rocketchat 个人聊天服务器 （ tg + discord ）
dashy 仪表盘（方便查看 NAS 状态，以及作为首页来用）
gitlab 这个不解释
gitea+drone 轻量化 git 仓库和 cicd

aria2 下载

jellyfin 影音
~ docker ps | cut -d " " -f4-5

IMAGE
hectorqin/reader:latest
containrrr/watchtower
deluan/navidrome:latest
bpatrik/pigallery2:latest
bpatrik/pigallery2:latest
matrixdotorg/synapse:latest
tracker_ml
mysql/mysql-server:5.7.28
minio/minio:RELEASE.2021-11-24T23-19-33Z
portainer/portainer:latest
benbusby/whoogle-search:latest
sigoden/dufs
fireflyiii/data-importer:latest
fireflyiii/core:latest
mariadb
lscr.io/linuxserver/plex:latest
ghcr.io/requarks/wiki:2
postgres:11-alpine
imagestored/autoimport
imagestored/backend
postgres:11
mattermost/mattermost-enterprise-edition:release-7.4
postgres:13-alpine
cloudreve/cloudreve:latest
excalidraw-excalidraw
superng6/aria2
ifm:latest
linuxserver/calibre-web
lscr.io/linuxserver/syncthing
ugeek/webdav:amd64
lscr.io/linuxserver/mariadb:latest
lscr.io/linuxserver/phpmyadmin:latest
gitea/gitea:1.17.1
mysql:5.7
chocobozzz/peertube:v4.1.1-bullseye
mwader/postfix-relay
postgres:13-alpine
redis:6-alpine
ugeek/webdav:amd64
ghcr.io/advplyr/audiobookshelf
hurlenko/filebrowser
whyour/qinglong:latest
restyaplatform/restyaboard:v1.7
postgres:12-alpine
pawelmalak/flame
viktorstrate/photoview:2
mariadb:10.5
linuxserver/heimdall
leonismoe/ariang
wireguard 虚拟内网
预计还有：
RSSHub 、bitwarden
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
部署 plex
注册 plex
在 plex 官网注册一个帐号,不详细说明了.

获取 claim token
在浏览器打开以下地址,登录你的 plex 帐号,然后复制 claim token,类似这种claim-xxxxxxxxxxxxxxxxx https://www.plex.tv/claim

部署 plex
docker run -d \
--name plex \
--network=host \
-e TZ="Aisa/Shanghai" \
-e PLEX_CLAIM="claim-xxxxxxxxxxxxxxxxx" \
-v /mnt/user/config-cache/plex-config:/config \
-v /mnt/user/media/plex/transcode:/transcode \
-v /mnt/user/media:/data/media \
-v /mnt/alist:/data/alist \
plexinc/pms-docker
/mnt/user/config-cache/plex-config - 用来保存 plex 配置的位置,需要替换成你自己 NAS 中的某个目录
/mnt/user/media/plex/transcode - 用来保存 plex 转码缓存的位置,需要替换成你自己 NAS 中的某个目录
/mnt/user/media - 用来保存 plex 媒体库的位置,需要替换成你自己 NAS 中储存媒体资源的目录
/mnt/alist - 用来保存 alist 挂载的网盘的位置,需要替换成你自己 NAS 中 alist 挂载的目录
容器启动后需要初始化一小段时间,初始化完成后可以用浏览器打开http://your-nas-ip:32400/web访问 plex,按照提示登录即可.

配置 plex
plex 启动后,使用浏览器打开http://your-nas-ip:32400/web访问 plex,点击设置 -> 管理 -> 媒体库 -> 添加资料库.我一般是分为电影,电视剧,音乐三个资料库,每个资料库都可以添加多个文件夹,每个文件夹都可以设置为自动扫描,这样就可以自动把文件夹中的内容添加到资料库中了.

这里主要说一下文件夹的添加: 核心就在于将我们之前映射的 alist 的各种网盘的目录以及 NAS 中储存媒体资源的目录添加到媒体库中.例如我这里:
/data/alist/baidu/movie - /data/alist是我们在启动 docker 容器时将/mnt/alist映射到了这个目录,所以在这里可以找到 alist 映射的网盘文件,baidu是 alist 中配置的百度网盘的挂在路径,movie是百度网盘中的一个目录,我把所有电影资源会转存到这个目录.

plex-path

按照以上方式配置完资料库后等待 plex 扫描资源即可,大部分资源都能刮削到正确的信息,刮削不到的可能需要手动匹配一下,就不赘述了.

最后
在你的各个客户端安装 plex 客户端并登录你的帐号就可以观看了 plex John Wick

### plex
我就是 nas 上建 plex ，手机电脑端用 infuse 接 plex ，电视端用 kodi 接 plex 。
## fileball
根本不是一个定位啊，Fileball 更像是 nPlayer ，更像是文件管理的应用，播放器体验很差，比 n 年不更新的 nPlayer 都要差。
比如播放器刚打开文件竟然拖不动进度，即使拖动了还会跳回；字幕支持较差，缩放画面后字幕跑到画面外去了；解码较弱，很多原盘看起来掉帧，也不支持 DV ；很容易出现花屏。

UI 就更不用提了，一个文件管理器，一个专业视频库应用，更不用说 Apple TV 上的体验不可同日而语。

唯一的用处，我感觉就是很多人用来挂公益服，因为 Infuse 扫库较慢，比较耗资源，公益服大都禁用 Infuse 。而 Fileball 不会。
