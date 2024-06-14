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
