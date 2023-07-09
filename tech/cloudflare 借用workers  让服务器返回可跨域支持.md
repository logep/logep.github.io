在cloundflare上建立tunnels，配置，然后进行下一步
```
export default {
  async fetch(request, env, ctx) {
    const response = await fetch(request);

    // 创建新的头部对象，并设置允许跨域请求的请求头
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');

    // 创建新的响应，将新的头部对象与原始响应一起返回
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: headers,
    });

    return newResponse;
  },
};

```

请求 服务器数据：

  fetch("https://a**.in/jsonrpc", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: data
      });
