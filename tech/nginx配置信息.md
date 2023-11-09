关键词； 反向代理 原文：https://blog.csdn.net/anrangesi/article/details/126853592

nginx.conf 基础文件

#这是nginx服务器并发处理服务的关键配置，它的值越大，可以支持的并发处理量也越多，但是会受到硬件、软件等设备的制约。
#开启一个nginx工作进程，一般cpu几核就写几
worker_processes  auto;
events 块涉及的指令**主要影响 Nginx 服务器与用户的网络连接，常用的设置包括是否开启对多 work process 下的网络连接进行序列化，是否 允许同时接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个 word process 可以同时支持的最大连接数。
上述例子就表示每个 work process 支持的最大连接数为 1024.
这部分的配置对 Nginx 的性能影响较大，在实际中应该灵活配置。
events {
    #一个worker进程可以同时处理1024个请求
    #支持的最大连接数为1024，这部分配置对于nginx的性能影响较大，在实际中应灵活配置
    worker_connections  1024;
}

#这是nginx配置中最频繁的一部分，代理、缓存和日志定义等绝大多数功能和第三方模块的配置都在这里，需要注意的是，http块包括http全局块、server块
# 提供 http 服务相关的配置参数，一般默认配置就可以，主要配置在于 http 上下文里的 server 上下文
http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
 
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';
 
    access_log  /var/log/nginx/access.log  main;
 
    sendfile        on;
    #tcp_nopush     on;
 
    keepalive_timeout  65;
 
    #gzip  on;
    #可以配置多个单独的*.conf文件，最终都会在http块里被执行，也可直接写在当前http块下
    #一个http块下面可以有多个server块，这些server块可以单独配置在单独的*.conf文件里面
    include /etc/nginx/conf.d/*.conf;
}



default.conf 基础文件

  server_name  localhost;#域名配置项，匹配所有就用“_”下划线
  #location 块
    #一个 server 块可以配置多个 location 块。
    #这块的主要作用是基于 Nginx 服务器接收到的请求字符串（例如 server_name/uri-string），对虚 
    #拟主机名称 （也可以是IP 别名）之外的字符串（例如 前面的 /uri-string）进行匹配，对特定的请 
    #求进行处理。 地址定向、数据缓 存和应答控制等功能，还有许多第三方模块的配置也在这里进行。
    location / {
        root   /usr/share/nginx/html/boke;#资源路径
        index  index.html index.htm;#寻找路径下的index.html和index.htm
    }

可以写多个 server 块。
 #server {
#     listen 82;
#}
 
 
 
 location ~* \.(gif|jpg|jpeg|png|css|js|ttf|woff2)$ {

        gzip_static on;
        root  /nginx/html;
        expires 1d;
		  add_header 'Access-Control-Allow-Origin' *;
        add_header Cache-Control "public";
    }

    location / {
 add_header Cache-Control "no-cache";
  add_header 'Access-Control-Allow-Origin' *;
        root   /usr/share/nginx/html;
        index  index.html index.htm;
      try_files $uri $uri/ /index.html; 
    }
location /mobile/ {
   alias /usr/share/nginx/html/;
index m.html;
   try_files $uri $uri/ /m.html;
 }

location =/m.html {
   root  /usr/share/nginx/html;
index m.html;
   try_files $uri $uri/ /m.html;
 }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
	
	
	
	
###  反向代理 

反向代理示例：

一、通过路径访问两台服务器：

在192.168.48.128服务器上安装tomcat并启动，

在192.168.48.129上配置server块（server要在http块中），或者在conf.d目录中单独创建*.conf文件

我在conf.d目录下创建了82.conf文件，在里面做了如下配置

#当用户访问nginx服务器localhost:82时，将跳转到指向的tomcat服务器，并显示tomcat页面
server {
     #监听82端口
     listen 82;
     #下划线表示适配网址和ip
     server_name _;
 
     location / {
            #使用proxy_pass指向到代理的tomcat服务器地址
            proxy_pass http://192.168.48.128:8081;
            index index.html index.htm;
       }
二、通过指定不同的后缀来访问不同的服务器

分别访问以下两个不同后缀的链接到不同的服务器

http://192.168.48.129:82/linboke/

http://192.168.48.129:82/winboke/

#在server块里定义多个location块
server {
     listen 82;
     server_name _;
     #在linux上启动一个tomcat，在tomcat webapps目录下创建linboke目录
     location ~/linboke/ {
            #指定跳转到linboke目录所在的服务器和端口
            proxy_pass http://192.168.48.128:8081;
            index index.html index.htm;
       }
      #在windows上启动一个tomcat，在tomcat webapps目录下创建winboke目录
      location ~/winboke/ {
            #指定跳转到winboke目录所在的服务器和端口
            proxy_pass http://192.168.0.234:8080;
            index index.html index.htm;


### location正确使用方法
以上配置了两个location，也可配置多个，下面看下location语法

location [=|~|~*|^~] /uri/ { … }
 
=         严格匹配。如果请求匹配这个location，那么将停止搜索并立即处理此请求
 
~         区分大小写匹配(可用正则表达式)
 
~*        不区分大小写匹配(可用正则表达式)
 
!~        区分大小写不匹配
 
!~*       不区分大小写不匹配
 
^~        如果把这个前缀用于一个常规字符串,那么告诉nginx 如果路径匹配那么不测试正则表达式
#示例1：匹配任意请求
location  / { }
 
#示例2：
#不区分大小写匹配任何以gif、jpg、jpeg结尾的请求，并将该请求重定向到 /logo.png请求
location ~* .(gif|jpg|jpeg)$ ｛
    rewrite .(gif|jpg|jpeg)$ /logo.png;
｝
 
#示例3：
#区分大小写匹配以.txt结尾的请求，并设置此location的路径是/usr/local/nginx/html/。
#也就是以.txt结尾的请求将访问/usr/local/nginx/html/ 路径下的txt文件
location ~ ^.+\.txt$ {
    root /usr/local/nginx/html/;



负载均衡示例：

在linux和Windows 的tomcat的webapps目录下创建共同目录linboke，在linboke目录下创建index.html文件，可以写入不同内容以作区分

#在http块中的全局块中配置
#upstream是固定写法，myserver可以自定义
#负载均衡，当前未配置负载均衡规则，所以目前是默认的轮询规则
upstream myserver {
   #linux中的tomcat服务器
   server 192.168.48.128:8081;
   #windows中的tomcat服务器
   server 192.168.0.234:8080;
}
 
server {
     #监听82端口
     listen 82;
     location / {
            #定向到自定义的myserver
            proxy_pass http://myserver;
       }
}
访问nginx服务器192.168.48.129:82/linboke 页面，刷新第一次出现页面1再刷新一次页面出现页面2，多次刷新后随着页面内容的交替变化，发现此时nginx的负载均衡轮询规则已经生效

1、轮询（默认）

每个客户端的请求会按照时间顺序逐个分配到不同的后端服务器，如何myserver块中的某一台服务器挂了，那么nginx会自动剔除出问题的机器，保证业务正常

2、weight权重

这里经过实验权重为1的服务器，刷新两次或者3次页面都还在，

权重为2的服务器往往只刷新一次就结束了，往往只能等待权重大的服务器被使用多次后才能再次被使用一次

upstream myserver {
   #weight=1 默认权重为1，权重越高被使用的次数越高
   server 192.168.48.128:8081 weight=1;
   server 192.168.0.234:8080 weight=2;
}
 
server {
     listen 82;
     location / {
            proxy_pass http://myserver;
       }
}
3、ip_hash

我这边配置了ip_hash后，多次刷新后页面始终不变，一直停留在192.168.0.234:8080服务器的页面，可真是逮着一个小可爱就可劲儿薅啊！

当然，如果我在另一台电脑上进入页面，很可能会一直停留在另一个页面

upstream myserver {
   server 192.168.48.128:8081;
   server 192.168.0.234:8080;
   ip_hash;
}
 
server {
     listen 82;
     location / {
            proxy_pass http://myserver;
       }
}
4、fair模块（第三方）

fair 采用的不是内建负载均衡使用的轮换的均衡算法，而是可以根据页面大小、响应时间智能的进行负载均衡 。

upstream myserver {
   server 192.168.48.128:8081;
   server 192.168.0.234:8080;
   fair;
}
 
server {
     listen 82;
     location / {
            proxy_pass http://myserver;
       }
}
由于是fair是第三方模块，需要额外安装配置


### 配置扩展

配置扩展

server块

server {       
        #如果你使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
        #这样http和https的链接都可以用，防止http请求发送到https端口后报400错误
        #配置HTTPS的默认访问端口为443，443后面跟ssl
        listen       443 ssl;
        #配置证书绑定的域名
        server_name  cx.com;
        #以下属性中，以ssl开头的属性表示与证书配置有关。
        #配置.pem文件地址（证书文件）
        ssl_certificate      cert/1234522_cx.com.pem;
        #配置.key文件地址（私钥文件）
        ssl_certificate_key  cert/1234522_cx.com.key;
----------------------------------------------------------------------------------------
        #ssl_session_cache：用于缓存 https建立连接后的session key，减少后续因为断开后需要重新建连造成的性能损耗。
        #ssl_session_cache，就是缓存ssl会话状态的缓存，它有4种模式可选，分别是：
        #off：严格的禁止使用会话缓存
        #none：宽松的禁止使用会话缓存，即虽然nginx不说不允许使用会话缓存，但实际不会将会话缓存下来
        #builtin：openssl的内置缓存，只有一个工作进程可以使用该缓存，官方指出，内置缓存，会导致内存碎片
        #shared：共享缓存，所有worker进程共享
        #设置为使用1m内存。 1m ~= 4000 connections
        ssl_session_cache    shared:SSL:1m;
        #缓存的时间由ssl_session_timeout决定，默认是5分钟
        ssl_session_timeout  5m;
        #在 nginx 中设置ssl_session_cache之后，就开启了TLS缓存复用
        #客户端Client Hello的时候，会带一个Session ID
        #服务端和客户端协商建立连接，确认Session ID
        #然后客户端将Session ID保存在本地，再次发起连接的时候，Client Hello会带上这个ID
        #因为服务端开启了ssl_session_cache，则在缓存中查找对应的Session ID，如果存在则接受并恢复会话，返回相同的Session ID
        #如果在缓存中，未找到对应的Session ID，则转换成完整的TLS握手
        #TLS通过复用ssl来优化TLS连接过程，tls的复用由服务端决定是否可复用，包括session的过期时间，在nginx中，通过开启ssl_session_cache来开启缓存和复用，性能会有极大提升。
----------------------------------------------------------------------------------------
        #ssl_ciphers配置项的可选值由openssl 的ciphers定义
        #配置加密套件，写法遵循openssl标准，nginx 默认配置是 HIGH:!aNULL:!MD5
        ssl_ciphers  HIGH:!aNULL:!MD5;
        ###ssl_protocols TLSv1 TLSv1.1 TLSv1.2;#密码加密方式
        #启用特定的加密协议
        ssl_prefer_server_ciphers  on;
#B<HIGH>：“high”加密算法套件。目前意味着密钥长度值大于128位，目前一些算法套件是128字节的密钥。
#题外：如果使用字符“!”，则从算法列表中禁用该算法。根据明确的规定，禁用了的算法将不会再出现。
 


### 题外话
主要的方式有两种，这两种都是设定请求头中的某一个字段来实现的：
1、Expires；
2、Cache-Control。由于Cache-Control设置后优先级比前者高，这次作者就先说下通过Cache-Control来控制缓存。
常见取值：
no-cache
如果request headers中，Cache-Control为no-cache。表示不管服务端有没有设置Cache-Control，都必须从重新去获取请求。
max-age=xxx:缓存的内容将在 xxx 秒后失效
max-age=0
max-age=0表示不管response怎么设置，在重新获取资源之前，先检验ETag/Last-Modified
不管是max-age=0还是no-cache，都会返回304（资源无修改的情况下），no-store才是真正的不进行缓存。
private: 客户端可以缓存（默认）
public: 客户端和代理服务器都可缓存（前端的同学，可以认为public和private是一样的）
no-store: 所有内容都不会缓存，强制缓存，对比缓存都不会触发（对于前端开发来说，缓存越多越好，so...基本上和它说886



location块

#根据location的匹配优先级如下
#(location =) > (location 完整路径) > (location ^~ 路径) > (location ~,~* 正则顺序)(location 部分起始路径) > (/)
location / {
            ## 配置页面不缓存html和htm结尾的文件
            #$request_filename:当前连接请求的文件路径，由root或alias指令与URI请求生成。
            #匹配所有以htm或html结尾的文件，~* 开头表示不区分大小写的正则匹配
            if ($request_filename ~* .*\.(?:htm|html)$)  
                {
                   #如果匹配到htm或html结尾的文件，那么就不缓存
                 #private(默认): 只能在浏览器中缓存, 只有在第一次请求的时候才访问服务器, 若有max-age, 则缓存期间不访问服务器
                 #no-store: 不仅不能缓存, 连暂存也不可以(即: 临时文件夹中不能暂存该资源)
                 #no-cache: 数据内容不能被缓存, 每次请求都重新访问服务器, 若有max-age, 则缓存期间不访问服务器
                 #must-revalidate：缓存必须在使用之前验证旧资源的状态，并且不可使用过期资源。表示如果页面过期，则去服务器进行获取。
                 #proxy-revalidate：与must-revalidate作用相同，但它仅适用于共享缓存（例如代理），并被私有缓存忽略。
                   add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
                   #注：Cache-Control设置为  max-age=no-cache  服务端还是会返回304，只有设置成  no-store  才是强制不缓存。
                   #
                }
            root   app1;
            index  index.html index.htm;
 
            #try_files 一般是location路径找不到资源，才会到try_files
            #try_files去尝试到网站目录读取用户访问的文件，如果第一个变量存在，就直接返回；
            #不存在继续读取第二个变量，如果存在，直接返回；不存在直接跳转到第三个参数上。
            try_files $uri $uri/ /index.html;
        }
-----------------------------------------------------------------------------------
 location /test/ {
            #alias的处理结果是：使用alias路径替换location路径
            alias /root/yxx/nginx/yj/test/;
            index  index.html index.htm;
            #$uri 如果请求为127.0.0.1:82/test/a.jpg那么$uri就是a.jpg
            #$uri/ 访问的目录
            #尝试解析文件（$uri），文件夹（$uri/），解析到就返回
            try_files $uri $uri/ /yj/test/index.html;
        }
#location ~/boke/ {
#           #root的处理结果是：root路径＋location路径，这里起到的是把链接拼合的作用
            #并且root在nginx配置文件的server、http和location中都可以使用
            #/usr/share/nginx/html/ + /boke/ + index.html
#           root /usr/share/nginx/html/;
#           index index.html index.htm;
#      }
###~~~~~~~~~~~~~~~~~~~~alias示例~~~~~~~~~~~~~~~~~~~~~###
#--alias只能在location块中使用--+
#当请求为“192.168.48.128:82/boke2/”时，location的/boke2/会被替换为alias的内容，紧接着去找index.html”。
#linux资源目录完整路径：/usr/share/nginx/html/boke2/index.html
location /boke2/ {#效果同下，location /boke2/的这个值完全就是自定义
            alias /usr/share/nginx/html/boke2/;
            index index.html index.htm;
       }
#效果同上，哪怕我随便定一个/b/,nginx会忽略/b/，/b/只起引导作用，最终也只会去找alias路径下的资源
location /b/ {
            alias /usr/share/nginx/html/boke2/;
            index index.html index.htm;
       }
 
#--alias--+
#配合 location 的正则表达式使用
#匹配到静态图片资源就进入alias下的路径
location ~ ^/u/(.+\.(?:gif|jpe?g|png))$ {
    alias /usr/share/nginx/html/boke2/$1;
}
#请求为“/u/33.png”时， 返回文件“/usr/share/nginx/html/boke2/33.png”。
 
#--alias--+
 
###~~~~~~~~~~~~~~~~~~~~alias end~~~~~~~~~~~~


-----------------------------------------------------------------------------------
#nginx使用proxy模块时，默认的读取超时时间是60s。
#proxy_set_header的语法: proxy_set_header field value;
location ^~ /app2/{
             #反向代理：转发
             proxy_pass http://127.0.0.1:8000/app2/app2/;
 
             #后端服务器数据回传时间_就是在规定时间之内后端服务器必须传完所有的数据
             #是向后端写数据的超时时间，两次写操作的时间间隔大于这个值，也就是过了这么长时间后端还是没有收到数据，连接会被关闭。如果超时，Nginx 的返回码是504
             proxy_send_timeout 1800;# 秒 默认值 60s 发送请求给upstream服务器的超时时间   
 
             #连接成功后等候后端服务器响应时间其实已经进入后端的排队之中等候处理（也可以说是后端服务器处理请求的时间）
             #是从后端读取数据的超时时间，两次读取操作的时间间隔如果大于这个值，和后端的连接会被关闭。如果一个请求时间时间非常大，要把这个值设大点。如果超时，Nginx 的返回码是 504
             proxy_read_timeout 1800;# 秒 默认值 60s nginx会等待多长时间来获得请求的响应
 
             #后端服务器连接的超时时间_发起握手等候响应超时时间
             #是和后端建立连接的超时时间，记住不要超过 75s 。如果超时，Nginx 的返回码是504
             #这里设置1800明显超出了75的限制，这个75s是针对nginx本身的，这里的1800s是针对前端的，这里1800大致意思是有大文件需要上传，故定义时间较大
             proxy_connect_timeout 1800;# 秒 默认值 60s 与upstream server的连接超时时间
 
             #nginx对上传文件大小有要求，默认1m，如果很大，还要适当调整上传超时时间
             #限制请求体的大小，若超过所设定的大小，返回413错误
             #客户端请求服务器最大允许大小，如果超过设定值，肯定就报错了
             client_max_body_size 2048m;#默认1m
             #设置http协议版本为1.1
             proxy_http_version 1.1;
###~~~~~~~~~~~~~~~~~~~~proxy_set_header ~~~~~~~~~~~~~~~~~~~~###
             #proxy_set_header:就是可设置请求头-并将头信息传递到服务器端。不属于请求头的参数中也需要传递时 重定义下就行
             #Upgrade通用标头允许客户端指定其支持的其他通信协议，并在服务器认为适合切换协议时使用。
             #Upgrade标头字段旨在提供一种从HTTP/1.1过渡到其他不兼容协议的简单机制。
             proxy_set_header Upgrade $http_upgrade;
             #设置Connection为长连接（默认为no）
             proxy_set_header Connection "Upgrade";
             #这个博主的帖子有详细解释：https://www.cnblogs.com/faberbeta/p/nginx008.html
             #设置 proxy_set_header Host $http_host 时，浏览器直接访问 nginx，获取到的 Host 包含浏览器请求的 IP 和端口
             #设置 proxy_set_header Host $host 时，浏览器直接访问 nginx，获取到的 Host 是 $host 的值，没有端口信息。此时代码中如果有重定向路由，那么重定向时就会丢失端口信息，导致 404
             proxy_set_header  Host              $http_host;   # required for docker client's sake
             #X-Real-IP 客户端或上一级代理ip，X-Real-Port 客户端或上一级端口
             #nginx的自带变量 $remote_addr 代表客户端的IP
             #remote_addr代表客户端的IP，但它的值不是由客户端提供的，而是服务端根据客户端的ip指定的
             #当你的浏览器访问某个网站时，假设中间没有任何代理，那么网站的web服务器（Nginx，Apache等）就会把remote_addr设为你的机器IP
             #如果你用了某个代理，那么你的浏览器会先访问这个代理，然后再由这个代理转发到网站，这样web服务器就会把remote_addr设为这台代理机器的IP。
#有一本名叫《实战nginx》的书，作者张晏，这本书上有这么一段话“经过反向代理后，由于在#客户端和web服务器之间增加了中间层，因此web服务器无法直接拿到客户端的ip，通过$remote_addr变量拿#到的将是反向代理服务器的ip地址”。这句话的意思是说，当你使用了nginx反向服务器后，在web端使用#request.getRemoteAddr()（本质上就是获取$remote_addr），取得的是nginx的地址，即$remote_addr变量中封装的是nginx的地址，当然是没法获得用户的真实ip的，
#但是，nginx是可以获得用户的真实ip的，也就是说nginx使用$remote_addr变量时获得的是用户的真实ip，#如果我们想要在web端获得用户的真实ip，就必须在nginx这里作一个赋值操作
#其中这个X-real-ip是一个自定义的变量名，名字可以随意取，这样做完之后，用户的真实ip就被放在X-real-ip这个变量里了，然后，在web端可以这样获取：request.getAttribute(“X-real-ip”)
             proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
###----------------------------------------------
#后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
#X-Forwarded-For 包含了客户端和各级代理ip的完整ip链路
#X-Forwarded-For: 客户端ip， 一级代理ip， 二级代理ip...
#在获取客户端ip的过程中虽然X-Forwarded-For是选填的，但是个人建议还是保留，以便出现安全问题的时候，可以根据日志文件回溯来源。
#下面来分析请求头到达Nginx负载均衡服务器的情况；在默认情况下，Nginx并不会对X-Forwarded-For头做任何的处理，除非用户使用proxy_set_header 参数设置：
#proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for; 
#$proxy_add_x_forwarded_for变量包含客户端请求头中的"X-Forwarded-For"，与$remote_addr用逗号分#开，如果没有"X-Forwarded-For" 请求头，则$proxy_add_x_forwarded_for等于$remote_addr。#$remote_addr变量的值是客户端的IP。
#当Nginx设置X-Forwarded-For于$proxy_add_x_forwarded_for后会有两种情况发生：
#1、如果从CDN过来的请求没有设置X-Forwarded-For头（通常这种事情不会发生），而到了我们这里Nginx设#置将其设置为$proxy_add_x_forwarded_for的话，X-Forwarded-For的信息应该为CDN的IP，因为相对于#Nginx负载均衡来说客户端即为CDN，这样的话，后端的web程序时死活也获得不了真实用户的IP的。
#2、CDN设置了X-Forwarded-For，我们这里又设置了一次，且值为$proxy_add_x_forwarded_for的话，那么X-Forwarded-For的内容变成 ”客户端IP,Nginx负载均衡服务器IP“如果是这种情况的话，那后端的程序通过X-Forwarded-For获得客户端IP，则取逗号分隔的第一项即可。
#如上两点所说，如果我们知道了CDN设置了X-Forwarded-For信息，且只有客户端真实的IP的话，那么我#们的Nginx负载均衡服务器可以不必理会该头，让它默认即可。
#其实Nginx中还有一个$http_x_forwarded_for变量，这个变量中保存的内容就是请求中的X-Forwarded-For信息。如果后端获得X-Forwarded-For信息的程序兼容性不好的话（没有考虑到X-Forwarded-For含有多个IP的情况），最好就不要将X-Forwarded-For设置为$proxy_add_x_forwarded_for。应该设置为$http_x_forwarded_for或者干脆不设置！
proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
###----------------------------------------------
             #配置X-Forwarded-Proto 就是为了正确地识别实际用户发出的协议是 http 还是 https
             #$scheme：表示HTTP 方法（如http，https）
             proxy_set_header  X-Forwarded-Proto $scheme;
###~~~~~~~~~~~~~~~~~~~~proxy_set_header end~~~~~~~~~~~~~~~~~~~~###
        }
location /xxx{
		
		   proxy_pass http://www.123.cn:8888/xxx;
		   #Proxy Settings
           #proxy_redirect 该指令用来修改被代理服务器返回的响应头中的Location头域和“refresh”头域。
           #默认：default 
           #关闭重定向：off 参数off将在这个字段中禁止所有的proxy_redirect指令
           #proxy_redirect 旧地址 新地址;
           #在代替的字段中可以不写服务器名：proxy_redirect http://localhost:8888/b/ /;
		   proxy_redirect    off;
           #如果不想改变请求头“Host”的值，可以这样来设置:proxy_set_header Host $http_host;
           #这里设置Host的值：cx.com
		   proxy_set_header   Host             cx.com;
		   proxy_set_header   X-Real-IP        $remote_addr;#记录访问网站的客户端IP地址
		   proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
           
           #Accept属于http请求头，描述客户端希望接收的响应body 数据类型。就是希望服务器返回什么类型的数据。
           #使用Accept请求头可以指定客户端/浏览器能处理的数据类型和优先顺序
           #text/html：HTML格式
           #application/xhtml+xml：XHTML格式
           #application/xml：XML数据格式
		   proxy_set_header   Accept  text/html,application/xhtml+xml,application/xml;
		   proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
           #设置临时文件的总大小，默认值：1024m
		   proxy_max_temp_file_size 0;
		   proxy_connect_timeout      90;
		   proxy_send_timeout         90;
		   proxy_read_timeout         90;
 
           #该指令设置缓冲区大小,从代理后端服务器取得的第一部分的响应内容,会放到这里.小的响应header通常位于这部分响应内容里边.
           #默认来说,该缓冲区大小等于指令 proxy_buffers所设置的;但是,你可以把它设置得更小
           #默认值4k/8k
		   proxy_buffer_size          4k;
           
           #该指令设置缓冲区的大小和数量,从被代理的后端服务器取得的响应内容,会放置到这里
           #默认情况下,一个缓冲区的大小等于内存页面大小,可能是4K也可能是8K,这取决于平台
           #语法：proxy_buffers  数量  大小
		   proxy_buffers              4 32k;
 
           #默认值：proxy_busy_buffers_size  proxy_buffer_size*2
		   proxy_busy_buffers_size    64k;
 
#buffer 工作原理
#1. 所有的proxy buffer参数是作用到每一个请求的。每一个请求会安按照参数的配置获得自己的buffer。proxy buffer不是global而是per request的。
 
#2. proxy_buffering 是为了开启response buffering of the proxied server，开启后proxy_buffers和proxy_busy_buffers_size参数才会起作用。
 
#3. 无论proxy_buffering是否开启，proxy_buffer_size（main buffer）都是工作的，proxy_buffer_size所设置的buffer_size的作用是用来存储upstream端response的header。
 
#4. 在proxy_buffering 开启的情况下，Nginx将会尽可能的读取所有的upstream端传输的数据到buffer，直到proxy_buffers设置的所有buffer们 被写满或者数据被读取完(EOF)。此时nginx开始向客户端传输数据，会同时传输这一整串buffer们。同时如果response的内容很大的 话，Nginx会接收并把他们写入到temp_file里去。大小由proxy_max_temp_file_size控制。如果busy的buffer 传输完了会从temp_file里面接着读数据，直到传输完毕。
 
#5. 一旦proxy_buffers设置的buffer被写入，直到buffer里面的数据被完整的传输完（传输到客户端），这个buffer将会一直处 在busy状态，我们不能对这个buffer进行任何别的操作。所有处在busy状态的buffer size加起来不能超过proxy_busy_buffers_size，所以proxy_busy_buffers_size是用来控制同时传输到客户 端的buffer数量的。
 
		}
		
		location ^~ /abc-admin{
             proxy_pass http://127.0.0.1:8000/abc-admin/abc-admin;
             proxy_send_timeout 1800;
             proxy_read_timeout 1800;
             proxy_connect_timeout 1800;
             client_max_body_size 2048m;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "Upgrade";
             proxy_set_header  Host              $http_host;   # required for docker client's sake
             proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
             proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
             proxy_set_header  X-Forwarded-Proto $scheme;
        }
		
		location ^~ /abc-yyy/{
             proxy_pass http://127.0.0.1:8059;
             proxy_send_timeout 1800;
             proxy_read_timeout 1800;
             proxy_connect_timeout 1800;
             client_max_body_size 2048m;
             proxy_http_version 1.1;
             proxy_set_header Upgrade $http_upgrade;
             proxy_set_header Connection "Upgrade";
             proxy_set_header  Host              $http_host;   # required for docker client's sake
             proxy_set_header  X-Real-IP         $remote_addr; # pass on real client's IP
             proxy_set_header  X-Forwarded-For   $proxy_add_x_forwarded_for;
             proxy_set_header  X-Forwarded-Proto $scheme;
         }
		
		
		location / {
           ## 配置页面不缓存html和htm结尾的文件
           if ($request_filename ~* .*\.(?:htm|html)$)  
                {
                   add_header Cache-Control "private, no-store, no-cache, must-revalidate, proxy-revalidate";
               }
            root   admin;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        } 
#proxy_set_header也可以自定义参数，如：proxy_set_header test paroxy_test;
#如果想要支持下划线的话，需要增加如下配置：
#underscores_in_headers on;
#可以加到http或者server中
#语法：underscores_in_headers on|off
#默认值：off
#使用字段：http, server
#是否允许在header的字段中带下划线
#在java端，需要获取proxy_set_header的参数时，需要使用request.getHeader(field)，一般用来获取真实ip地址

## 大文件上传 怎么时刻保持网络连接不会断的


实例配置

【2022-09-26】nginx在页面显示目录结构

server {
    listen       80;
    server_name  localhost;
 
    #access_log  /var/log/nginx/host.access.log  main;
 
    location / {
       root /app/;
       autoindex on; # 开启目录文件列表
       autoindex_exact_size on; # 显示出文件大小，单位bytes
       autoindex_localtime on; # 显示文件时间为文件的服务器时间
       charset utf-8,gbk; # 防止中文乱码
 
       #另外，如果希望请求文件是下载而不是显示内容，可以通过添加下面参数实现：
       #add_header Content-Disposition attachment;
        }
 
    }
修改完成，nginx -s reload刷新nginx配置文件

浏览器直接输入IP，出现以下页面



为文件目录页面配置账户密码

location /a/ {
       alias /app/;
       autoindex on; # 开启目录文件列表
       autoindex_exact_size off; # 显示出文件的确切大小，单位是bytes
       autoindex_localtime on; # 显示的文件时间为文件的服务器时间
       charset utf-8,gbk; # 避免中文乱码
       #仅限授权用户，这一行没有就不会生效，用户登录弹框也不会出来
       auth_basic "Authorized users only";
       #md5passwd文件，是我基于htpasswd生成的 http 基本认证的密码文件。
       #htpasswd生成链接：https://tool.oschina.net/htpasswd
       #账密输入后会从这个文件中验证账密 ## https://blog.csdn.net/weixin_43083074/article/details/108355385
       auth_basic_user_file /etc/nginx/md5Passwd/md5passwd;
 
        #另外，如果希望请求文件是下载而不是显示内容，可以通过添加下面参数实现：
        #add_header Content-Disposition attachment;
    }


