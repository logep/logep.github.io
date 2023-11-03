### 浏览器 上使用 （Headers, fetch）

在使用 Fetch API 调用接口时，可以通过设置请求头来包含 cookie。你可以使用 `Headers` 对象创建一个包含 cookie 的请求头，并将它传递给 `fetch` 函数。以下是一个示例：

```javascript
// 创建一个 Headers 对象，包含需要发送的 cookie
const headers = new Headers();
headers.append('Cookie', 'cookieName=cookieValue');

// 设置 Fetch 请求的选项，包括请求头
const requestOptions = {
  method: 'GET', // 或其他 HTTP 方法
  headers: headers,
  // 其他选项，如 body、mode、credentials 等
};

// 发起 Fetch 请求
fetch('https://example.com/api', requestOptions)
  .then(response => {
    if (response.ok) {
      // 请求成功处理
      return response.json();
    } else {
      // 请求失败处理
      throw new Error('Network response was not ok');
    }
  })
  .then(data => {
    // 处理从接口返回的数据
    console.log(data);
  })
  .catch(error => {
    // 处理请求错误
    console.error('Fetch error:', error);
  });
```

在上面的示例中，我们首先创建了一个 `Headers` 对象，使用 `append` 方法添加了一个 cookie。然后，我们将这个头部对象与其他请求选项一起传递给 `fetch` 函数。这将使 Fetch 请求包含指定的 cookie 信息。请根据你的实际需求替换 `'cookieName=cookieValue'` 为你的实际 cookie 值。
### node上使用

如果你需要在 Node.js 环境中发起包含 Cookie 的跨域请求，你可以使用第三方库如 `node-fetch` 来模拟浏览器中的 Fetch 行为。以下是一个示例：

首先，确保你已安装 `node-fetch`，如果没有，可以使用以下命令进行安装：

```bash
npm install node-fetch
```

然后，使用以下代码在 Node.js 中进行 Fetch 请求：

```javascript
const fetch = require('node-fetch');

const url = 'https://example.com/api'; // 替换为你的目标 API 地址
const cookie = 'cookieName=cookieValue'; // 替换为你的 Cookie

const requestOptions = {
  method: 'GET', // 或其他 HTTP 方法
  headers: {
    'Cookie': cookie,
    // 可以在这里添加其他请求头
  },
};

fetch(url, requestOptions)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
```

在上述示例中，我们使用 `node-fetch` 库进行 Fetch 请求，与在浏览器中的 Fetch 请求类似。请确保替换 `url` 和 `cookie` 变量为你的目标 API 地址和实际的 Cookie。如果需要，你也可以在请求头中添加其他自定义请求头。这个示例可以在 Node.js 环境中模拟包含 Cookie 的跨域请求。
