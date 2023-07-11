```
        location / {
            proxy_buffering off;
            proxy_cache off;
            proxy_redirect off;
            proxy_pass http://127.0.0.1:2346/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

        location ~ .* {
            proxy_buffering off;
            proxy_cache off;
            proxy_pass http://127.0.0.1:2346;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
server {
listen 80;
server_name 主机ip地址;
location / {
root C:\Users\Administrator\Desktop\pandora-master\src\pandora\flask\templates;
index chat.html chat.htm;
proxy_pass http://0.0.0.0:80/;
}
```
