`fetch` 是一种现代的 JavaScript API，用于进行网络请求。它在 Web 和移动浏览器上都有广泛的支持，但具体的支持情况会根据操作系统和浏览器的版本而有所不同。以下是关于 `fetch` 在手机端最低支持的安卓和 iOS 系统版本的信息：

### Android

- **Chrome for Android**: `fetch` API 在 Chrome 40 及以上版本开始支持。因为 Chrome 40 发布于 2015 年初，大多数运行 Android 4.4 (KitKat) 或更高版本的设备都可以使用 `fetch` API。
- **WebView**: 对于使用 WebView 的应用，`fetch` API 支持从 Android 5.0 (Lollipop) 开始引入的 Android System WebView 44 版本开始。

### iOS

- **Safari on iOS**: `fetch` API 在 iOS 10 及以上版本的 Safari 浏览器中支持。iOS 10 于 2016 年发布，因此大多数现代 iOS 设备都支持 `fetch` API。
- **WebView (WKWebView)**: 对于使用 WKWebView 的应用，同样在 iOS 10 及以上版本支持 `fetch` API。

### 支持总结

- **Android**: 最低支持 Android 4.4 及以上版本（Chrome 40+），WebView 需要 Android 5.0 及以上版本。
- **iOS**: 最低支持 iOS 10 及以上版本（Safari 和 WKWebView）。

对于需要在更旧版本的 Android 或 iOS 上支持 `fetch` API 的情况，可以使用 polyfill，如 `whatwg-fetch`，来增加对 `fetch` 的支持。

### 代码示例

如果需要使用 polyfill，可以按如下方式引入：

```html
<!-- 引入 polyfill 以支持旧版浏览器 -->
<script src="https://cdn.jsdelivr.net/npm/whatwg-fetch@3.0.0/dist/fetch.umd.js"></script>

<script>
  // 使用 fetch API 进行网络请求
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
</script>
```

通过这种方式，即使在不支持 `fetch` API 的旧版本浏览器上也能使用 `fetch` 进行网络请求。




虽然 `fetch` API 在现代浏览器中的支持非常好，但仍有很多开发者选择使用 `axios`。原因如下：

### 1. 更好的错误处理
`fetch` 只在网络错误（如断网）时拒绝 Promise，而对 HTTP 状态码 404 或 500 等错误不会自动抛出异常，仍然会被视为成功的响应。开发者需要手动检查 `response.ok` 来处理这些情况。

```javascript
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch(error => console.error('Fetch error:', error));
```

相比之下，`axios` 自动处理这些错误：

```javascript
axios.get('https://api.example.com/data')
  .then(response => console.log(response.data))
  .catch(error => console.error('Axios error:', error));
```

### 2. 更简洁的 API
`axios` 提供了更简洁和直观的 API，尤其是在处理请求配置和响应拦截方面：

```javascript
axios.get('/user', {
  params: {
    ID: 12345
  }
})
.then(response => console.log(response))
.catch(error => console.log(error));
```

### 3. 默认支持 JSON
`axios` 默认处理 JSON 数据，而 `fetch` 需要手动解析 JSON：

```javascript
// axios
axios.get('/user')
  .then(response => console.log(response.data));

// fetch
fetch('/user')
  .then(response => response.json())
  .then(data => console.log(data));
```

### 4. 支持请求和响应拦截器
`axios` 提供了请求和响应拦截器，方便在请求或响应前后执行一些操作，比如添加认证信息、处理错误等：

```javascript
axios.interceptors.request.use(config => {
  // 在请求发送前做一些处理
  config.headers.Authorization = 'Bearer token';
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  // 在响应到达后做一些处理
  return response;
}, error => {
  return Promise.reject(error);
});
```

### 5. 更好的浏览器兼容性
虽然现代浏览器普遍支持 `fetch`，但在某些情况下（如需要支持更旧版本的浏览器），使用 `axios` 可以避免额外的 polyfill。

### 6. 更好的文件上传和下载支持
`axios` 在处理文件上传和下载时更为简单和高效：

```javascript
// 文件上传
const formData = new FormData();
formData.append('file', file);

axios.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

综合以上原因，尽管 `fetch` 是一个功能强大且原生支持的 API，但 `axios` 由于其更丰富的功能和简洁的用法，仍然受到许多开发者的青睐。
