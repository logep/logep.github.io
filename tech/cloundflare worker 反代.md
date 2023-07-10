
> 需要一个反向代理用于家里的一些服务，又苦于国内服务器需要备案，国外服务器价格、延迟感人，所以白嫖一波 cloudflare。 延迟能接受，可以反代带端口的地址。

需要一个反向代理用于家里的一些服务，又苦于国内服务器需要备案，国外服务器价格、延迟感人，所以白嫖一波 cloudflare。  
延迟能接受，可以反代带端口的地址。

### 先上效果

![](https://blog.instartlove.com/upload/2022/12/image-1670144941914.png)

### 教程如下：

#### 打开 workers 点击创建服务

![](https://blog.instartlove.com/upload/2022/12/image-1670145077013.png)  
![](https://blog.instartlove.com/upload/2022/12/image-1670145157403.png)

#### 点击快速编辑

![](https://blog.instartlove.com/upload/2022/12/image-1670145209616.png)

#### 编写入以下代码

```
// 需要反代的地址const hostname = "http://xxxxxxx.xxx:xxx" function handleRequest(request) {    let url = new URL(request.url);    return fetch(new Request(hostname + url.pathname,request));} addEventListener("fetch", event => {  event.respondWith(handleRequest(event.request));})
```

#### 点击预览查看效果，没问题就点击`保存并部署`

![](https://blog.instartlove.com/upload/2022/12/image-1670145417737.png)

#### 返回服务面板点击`Custom Domains - 查看`

![](https://blog.instartlove.com/upload/2022/12/image-1670145538078.png)

#### 点击添加路由

![](https://blog.instartlove.com/upload/2022/12/image-1670145592311.png)

#### 按照提示填写，使用自己的域名访问

![](https://blog.instartlove.com/upload/2022/12/image-1670145637780.png)

#### 解析生效后即可使用域名访问
