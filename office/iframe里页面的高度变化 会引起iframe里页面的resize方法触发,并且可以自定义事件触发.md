在大多数情况下，iframe 内的页面高度变化不会自动触发 iframe 内部页面的 `resize` 事件。`resize` 事件通常由窗口大小变化而触发，而不是由 iframe 内容的高度变化而触发。

如果您希望在 iframe 内的页面高度变化时触发某些操作，您需要手动监测 iframe 内容的高度变化，并在需要时触发相应的事件。这可以通过在 iframe 内部页面中添加 JavaScript 代码来完成。

以下是一个示例，演示如何在 iframe 内部页面中检测内容高度的变化并触发自定义事件：

```html
<!-- 父页面 -->
<iframe id="myFrame" src="your-iframe-page.html"></iframe>

<script>
const iframe = document.getElementById("myFrame");

// 监听 iframe 内容的加载完成事件
iframe.onload = function () {
  // 获取 iframe 内部页面的文档对象
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

  // 获取 iframe 内部页面的内容高度
  const iframeContentHeight = iframeDoc.documentElement.scrollHeight;

  // 监听 iframe 内容高度的变化
  setInterval(function () {
    const newHeight = iframeDoc.documentElement.scrollHeight;
    if (newHeight !== iframeContentHeight) {
      // 内容高度发生变化，触发自定义事件
      iframeContentHeight = newHeight;
      const event = new Event("iframeResize");
      iframe.dispatchEvent(event);
    }
  }, 1000); // 定时检测高度变化，可以根据需要调整间隔
};

// 在父页面中监听自定义事件
iframe.addEventListener("iframeResize", function () {
  // 在这里执行需要的操作，当 iframe 内容高度变化时触发
});
</script>
```

上述示例中，我们首先在父页面中创建了一个 iframe，并在 iframe 内部页面加载完成后开始监听内容高度的变化。当内容高度发生变化时，我们手动触发了一个自定义事件 `"iframeResize"`。然后，在父页面中，我们可以监听这个自定义事件，以便在 iframe 内容高度变化时执行相应的操作。

请注意，上述示例是一个简单的示范，实际应用中可能需要更复杂的逻辑来适应您的需求和情况。
