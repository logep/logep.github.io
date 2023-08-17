redis

mongodb

mysql
java
docker
api
node

####
eladmin-web or 
        location /unimall_el {
            alias /www/el-admin/;

            eladmin
        location /api {
            proxy_pass http://127.0.0.1:8087;
        }
