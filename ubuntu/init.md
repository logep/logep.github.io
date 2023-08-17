redis

mongodb

mysql
java
docker
api
node
##
查询端口占用的服务和pid 
netstat -nlp | grep :80
删除文件不需要确认
要在删除文件夹时不需要确认，可以使用rm命令的-r选项结合-f选项。-f选项用于强制删除，而不会提示确认

## 
redis  安装  redis



#### eladmin 重要，重要，重要
eladmin-web or 
        location /unimall_el {
            alias /www/el-admin/;

            eladmin
        location /api {
            proxy_pass http://127.0.0.1:8087;
        }


## 权限管理系统  iview https://github.com/logep/view-ui-admin  重要，重要，重要
        location /unimall {
            alias /www/unimall/;
##  unimall admin
                   location /unimall_Ali {
            alias /www/unimall-admin/;

###  8085端口号 后台接口 需要   重要，重要，重要 （需要支持 m.api和upload两种方式）
         location /m.api {
            proxy_pass http://127.0.0.1:8085;
                    location /upload {
            proxy_pass http://127.0.0.1:8085;
### chat 重要，重要，重要
        listen 80;
        server_name chat.9ping.cn;
        location / {
            proxy_pass http://127.0.0.1:3400/;
            #index  index.html index.htm;
        }

#### 我需要起一个服务做一个测试页面使用 重要，重要，重要
  location / {
            alias /www/vueblog/public/;
            # index index.html index.htm;
            add_header Cache-Control no-store;
            #try_files $uri $uri/ /index.html;
        }
        location /frame/ {
            alias /www/vueblog/frame/;
            #index  index.html index.htm;
        }
        location /blog/ {
            alias /www/vueblog/public/;
            #index  index.html index.htm;
        }






### 在线编辑 可不考虑使用 https://github.com/logep/h5xiu
    location / {
            alias /www/h5xiu/;
            #index  index.html index.htm;
        }
## 这个应该也没用上 https://github.com/logep/node-middle-api

        location ^~ /node/ {

            proxy_pass http://127.0.0.1:3000/;

## 这个应该也没用上 https://github.com/logep/node-api-mongodb
     location ^~ /napi/ {
            proxy_pass http://127.0.0.1:1337/;
        } 
## 不知道什么服务没有用上
         location /auth {
            proxy_pass http://127.0.0.1:8087;
        }
