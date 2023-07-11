> 原文地址 [zhuanlan.zhihu.com](https://zhuanlan.zhihu.com/p/635418114)

### 潘多拉 (Pandora)，一个让你呼吸顺畅的 ChatGPT，同步 gpt 官方历史所有消息记录，和官方使用是一样的，只是去除了国内需要魔法才可以使用的问题

潘多拉 (Pandora)，一个让你呼吸顺畅的 ChatGPT - 首次登入需要魔法！  
不想部署的直接用下方我部署好的就行了！！！！

vps 推荐地址：[http://www.naiyun.net](https://link.zhihu.com/?target=http%3A//www.naiyun.net)  
使用地址：[https://chat.kze.one](https://link.zhihu.com/?target=https%3A//chat.kze.one)  
这是一个 gibhub 大佬的项目：[https://github.com/pengzhile/pandora](https://link.zhihu.com/?target=https%3A//github.com/pengzhile/pandora)  
潘多拉实现了网页版 ChatGPT 的主要操作。后端优化，绕过 Cloudflare，速度喜人。  
最新拿 Access Token 的技术原理，我记录在这里了。  
可以访问 这里 拿 Access Token  
也可以官方登录，然后访问 这里 拿 Access Token  
Access Token 有效期 14 天，期间访问不需要梯子。这意味着你在手机上也可随意使用。  
这个页面上还包含一个共享账号的链接，没有账号的可以点进去体验一下。

### 部署命令：

docker 安装命令：

# 最新

```
docker run -d --name pandoraGPT --restart unless-stopped -e PANDORA_SERVER=0.0.0.0:3000 -e PANDORA_CLOUD=true -p 3000:3000 -v /home/pandora/data:/data pengzhile/pandora:latest

version: "3.9"
services:
  pandora:
    image: pengzhile/pandora:latest
    container_name: pandoraGPT
    restart: unless-stopped
    environment:
      - PANDORA_SERVER=0.0.0.0:3000
      - PANDORA_CLOUD=true
    ports:
      - 3000:3000
    volumes:
      - /home/pandora/data:/data
```


```
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

启动 docker 命令：

```
sudo systemctl start docker
```

潘多拉部署命令：

```
docker pull pengzhile/pandora
docker run -e PANDORA_CLOUD=cloud -e PANDORA_SERVER=0.0.0.0:8899 -p 8899:8899 -d pengzhile/pandora
```

访问地址：ip+8899 端口形式

例子：192.6.4.101:8899

域名访问：自行解析域名到服务器并添加反向代理即可
