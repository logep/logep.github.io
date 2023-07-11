```
docker run -d
-p 86:86
-e PANDORA_SERVER=0.0.0.0:86
-e OPENAI_MFA_CODE=false
-e OPENAI_EMAIL=账号
 -e OPENAI_MFA_CODE=false
-e OPENAI_PASSWORD=登录密码 \
--restart unless-stopped \
--name PandoraGPT
-v /mnt/mmcblk2p4/docker/panduora/:/usr/src/app/data
pengzhile/pandora:latest


# docker 安装命令
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun

# 启动 docker
sudo systemctl start docker

# docker 部署命令1 或者下面
docker pull pengzhile/pandora
docker run -e PANDORA_CLOUD=cloud  --restart unless-stopped -e -v /home/pandora/data:/data PANDORA_SERVER=0.0.0.0:8899 -p 8899:8899 -d pengzhile/pandora

# docker 直接部署
docker run -d --name pandoraGPT --restart unless-stopped -e PANDORA_SERVER=0.0.0.0:3000 -e PANDORA_CLOUD=true -p 3000:3000 -v /home/pandora/data:/data pengzhile/pandora:latest

# docker 一些常见命令
# 拉取镜像  在有 compose.yml文件的目录 执行
docker compose pull

# 生成并后台运行容器 在有 compose.yml文件的目录 执行
docker compose up -d

# 查看容器日志 在有 compose.yml文件的目录 执行
docker compose logs

# 如果accessToken 写在文件里 要更新文件内容时
docker compose down -t 3
# 改完后 生成并后台运行容器
docker compose up -d
# 查看容器日志
docker compose logs



##***************************************************************
# 这个让nginx 和 pandora 处于同一个网络  然后可以直接启动 这个直接用docker 方式运行
# 创建docker network
docker network create pandora-net

# Pandora容器
docker run -it -d --name pandoraGPT -v data:/data --env-file .env --restart unless-stopped --network pandora-net pengzhile/pandora:latest

# Nginx容器
docker run -it -d --name pandoraProxy -v nginx:/etc/nginx/conf.d -p 8888:80 --restart unless-stopped --network pandora-net nginx:latest
##***************************************************************

##-------------------------------------------------------------------------
##无论哪种方式实现 nginx  加密 访问 这个采用docker-compose
## .env文件内容
PANDORA_SERVER=0.0.0.0:8000
PANDORA_ACCESS_TOKEN=xxx


## 针对 nginx 添加密码验证步骤
htpasswd -c nginx/.htpasswd user
# Ubuntu  如果没有htpasswd 安装
sudo apt-get install -y apache2-utils
# CentOS 如果没有htpasswd 安装
sudo yum install -y httpd


# nginx default.conf里内容
server {
    listen 80;
    listen [::]:80;
    server_name localhost;

    access_log /var/log/nginx/host.access.log main;

    proxy_headers_hash_max_size 51200;
    proxy_headers_hash_bucket_size 6400;

    location / {
        auth_basic 'Protected service';
        auth_basic_user_file /etc/nginx/conf.d/.htpasswd; //重点内容
        proxy_pass http://pandoraGPT:8000/;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
    }
}


version: '3.5'
services:
  pandora:
    image: pengzhile/pandora:latest
    container_name: pandoraGPT
    volumes:
      - ./data:/data
    env_file:
      - .env
    restart: unless-stopped

  proxy:
    image: nginx:latest
    container_name: pandoraProxy
    volumes:
      - ./nginx:/etc/nginx/conf.d
    ports:
      - "8888:80"
    restart: unless-stopped

networks:
  default:
    name: pandora-net
##-------------------------------------------------------------------------



#不想暴漏ip到公网上
docker run -it \
    --name=pandoraGPT \
    -v /pigpan:/data \
    -e Accesstoken \
    -e PANDORA_CLOUD \
    -e PANDORA_SERVER=0.0.0.0:8018 \
    -p 127.0.0.1:8018:8018 \   # 主要是修改这句话
    --restart unless-stopped \
pengzhile/pandora


# 这个可以使用

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



version: '3.3'
services:
  pandora:
    image: pengzhile/pandora
    container_name: pandoraGPT
#这里host模式是为用本机设置的cf-warp代理
    network_mode: host
    volumes:
      - ./data:/data
    environment:
      - PANDORA_SERVER=0.0.0.0:23460
      - PANDORA_PROXY=socks5://127.0.0.1:40000
      - PANDORA_ACCESS_TOKEN={获取的accessToken}
      - PANDORA_API=true
    restart: unless-stopped
```
