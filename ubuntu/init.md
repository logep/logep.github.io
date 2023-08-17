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

####
eladmin-web or 
        location /unimall_el {
            alias /www/el-admin/;

            eladmin
        location /api {
            proxy_pass http://127.0.0.1:8087;
        }
