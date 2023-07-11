> 本文原文地址 [github.com](https://github.com/pengzhile/pandora/discussions/1063)

1. 建立目录
-------

```
# 最终目录结构
.
├── data
├── docker-compose.yml
├── .env
└── nginx
    ├── .htpasswd
    └── default.conf

```

建议先自行建立一个根目录，以存放所有内容，方便管理。例如

```
mkdir ~/pandora && cd ~/pandora

```

再执行以下命令

```
mkdir data nginx
touch .env docker-compose.yml nginx/default.conf

```

2. `docker compose` 文件
----------------------

编辑`docker-compose.yml`文件，并将以下内容粘贴进去。

```
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

```

并根据实际需求修改端口号（`8888`改为你想要的，其它地方不懂的话不要修改）

3. 配置`Pandora`参数
----------------

`Pandora`的参数通过`Docker`环境变量指定，上一步指定了`.env`文件存放这些变量。

编辑`.env`文件，写入以下内容，并将`Access Token`字符串粘贴到文件内（替换掉`xxx`)。

```
PANDORA_SERVER=0.0.0.0:8000
PANDORA_ACCESS_TOKEN=xxx

```

在此仅配置了部分必需的参数，其它参数及用途可以在[文档](https://github.com/pengzhile/pandora/blob/master/doc/wiki.md#docker%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F)中查看。

4. 添加简单的安全验证
------------

由于服务本身是无任何安全验证的，通过`ip:port`即可访问到自己搭建的`Pandora`服务，如果暴露在公网端口上可能会泄露给陌生人。

所以使用`nginx`添加一个简单的密码验证进行保护。

### 4.1 指定用户名和密码

执行以下命令，注意自行指定用户名（修改`user`部分)，并在命令行中输入密码。

```
htpasswd -c nginx/.htpasswd user

```

如果提示没有`htpasswd`命令，请使用以下命令进行安装。

```
# Ubuntu
sudo apt-get install -y apache2-utils

# CentOS
sudo yum install -y httpd

```

### 4.2 配置`nginx`代理

修改`nginx/default.conf`文件，并复制粘贴以下内容。

```
server {
    listen 80;
    listen [::]:80;
    server_name localhost;

    access_log /var/log/nginx/host.access.log main;

    proxy_headers_hash_max_size 51200;
    proxy_headers_hash_bucket_size 6400;

    location / {
        auth_basic 'Protected service';
        auth_basic_user_file /etc/nginx/conf.d/.htpasswd;
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

```

5. 启动容器
-------

运行以下命令

```
# 拉取镜像
docker compose pull

# 生成并后台运行容器
docker compose up -d

# 查看容器日志
docker compose logs

```

> 如果`docker`版本较旧，可能需要使用`docker-compose`命令。

如果查看日志类似下方内容，即为成功运行

```
pandoraProxy  | /docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
pandoraProxy  | /docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
pandoraProxy  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh
pandoraProxy  | 10-listen-on-ipv6-by-default.sh: info: Getting the checksum of /etc/nginx/conf.d/default.conf
pandoraProxy  | 10-listen-on-ipv6-by-default.sh: info: /etc/nginx/conf.d/default.conf differs from the packaged version
pandoraProxy  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/20-envsubst-on-templates.sh
pandoraProxy  | /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
pandoraProxy  | /docker-entrypoint.sh: Configuration complete; ready for start up
pandoraProxy  | 2023/07/04 07:10:08 [notice] 1#1: using the "epoll" event method
pandoraProxy  | 2023/07/04 07:10:08 [notice] 1#1: nginx/1.24.0
pandoraProxy  | 2023/07/04 07:10:08 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)
pandoraProxy  | 2023/07/04 07:10:08 [notice] 1#1: OS: Linux 5.4.0-126-generic
pandoraProxy  | 2023/07/04 07:10:08 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1048576:1048576
pandoraProxy  | 2023/07/04 07:10:08 [notice] 1#1: start worker processes
pandoraProxy  | 2023/07/04 07:10:08 [notice] 1#1: start worker process 27
pandoraGPT    |
pandoraGPT    |             Pandora - A command-line interface to ChatGPT
pandoraGPT    |             Github: https://github.com/pengzhile/pandora
pandoraGPT    |             Get access token: https://ai-20230703.fakeopen.com/auth
pandoraGPT    |             Version: 1.2.5, Mode: server, Engine: free
pandoraGPT    | 
pandoraGPT    | 2023-07-04 07:10:09.365 | WARNING  | pandora.bots.server:run:76 - Serving on http://0.0.0.0:8000


```

通过浏览器访问，并验证用户名密码后，查看能否进入聊天页面。

6. 后续更新`access token`
---------------------

更新`access token`需要先移除容器

```
docker compose down -t 3

```

然后修改`.env`文件，用新的`access token`替换旧的

```
PANDORA_ACCESS_TOKEN=NewToken

```

然后重新生成容器

```
# 生成并后台运行容器
docker compose up -d

# 查看容器日志
docker compose logs

```

~7. 其它~
-------

创建完所有文件后，如果不想使用`docker compose`进行管理，只通过`docker`启动的命令如下

```
# 创建docker network
docker network create pandora-net

# Pandora容器
docker run -it -d --name pandoraGPT -v data:/data --env-file .env --restart unless-stopped --network pandora-net pengzhile/pandora:latest

# Nginx容器
docker run -it -d --name pandoraProxy -v nginx:/etc/nginx/conf.d -p 8888:80 --restart unless-stopped --network pandora-net nginx:latest

```
