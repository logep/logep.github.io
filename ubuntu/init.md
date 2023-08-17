redis

mongodb

mysql
java
docker
api
node
##
删除文件不需要确认
要在删除文件夹时不需要确认，可以使用rm命令的-r选项结合-f选项。-f选项用于强制删除，而不会提示确认

## 
redis  安装  redis


####
eladmin-web or 
        location /unimall_el {
            alias /www/el-admin/;

            eladmin
        location /api {
            proxy_pass http://127.0.0.1:8087;
        }


## 权限管理系统  iview https://github.com/logep/view-ui-admin
        location /unimall {
            alias /www/unimall/;
##  unimall admin
                   location /unimall_Ali {
            alias /www/unimall-admin/;
 
### 在线编辑 可不考虑使用 https://github.com/logep/h5xiu
    location / {
            alias /www/h5xiu/;
            #index  index.html index.htm;
        }

### chat
        listen 80;
        server_name chat.9ping.cn;
        location / {
            proxy_pass http://127.0.0.1:3400/;
            #index  index.html index.htm;
        }
