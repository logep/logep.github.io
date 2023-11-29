使用沙盒（sandbox）可以在 iframe 中创建一个受限制的环境，以防止对主页面的影响。以下是一个简单的示例，演示如何使用 iframe 和沙盒来打印页面：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Print Page with Sandbox</title>
  <style>
    /* Your main page styles here */
    body {
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div>
    <p>Main page content here.</p>
    <!-- Your main page content -->

    <!-- Button to trigger printing -->
    <button onclick="printPage()">Print Page</button>
  </div>

  <!-- Hidden iframe with sandbox -->
  <iframe id="print-iframe" style="display: none;" sandbox="allow-same-origin allow-scripts">
    <!-- Your iframe content here -->
    <p>Content inside the iframe</p>
  </iframe>

  <script>
    function printPage() {
      // Get the iframe element
      const iframe = document.getElementById('print-iframe');

      // Clone the iframe content
      const contentClone = iframe.contentDocument.body.cloneNode(true);

      // Create a new window for printing
      const printWindow = window.open('', '_blank');

      // Append the cloned content to the new window
      printWindow.document.body.appendChild(contentClone);

      // Trigger the print dialog
      printWindow.print();
    }
  </script>
</body>
</html>
```

在这个示例中，我们创建了一个包含 iframe 的页面，并设置了 `sandbox` 属性，以限制其访问权限。在点击 "Print Page" 按钮时，通过克隆 iframe 的内容，并将其附加到新的打印窗口中，然后触发打印对话框。这样可以确保打印的内容受到沙盒的保护，不会对主页面造成影响。

请注意，`sandbox` 属性的具体设置可能需要根据你的实际需求进行调整。确保在实际应用中测试并适应你的需求。

在打印页面时，处理包含iframe的情况确实需要一些技术手段，以确保页面样式不冲突。使用Shadow DOM和沙盒隔离是一种有效的方法。

下面是一个基本的示例，演示如何使用Shadow DOM和iframe来实现这一目标。请注意，这只是一个概念演示，具体实现可能需要更复杂的逻辑，根据你的应用程序需求进行调整。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Print Page</title>
  <style>
    /* Your main page styles here */
    body {
      font-family: Arial, sans-serif;
    }
    #print-container {
      display: none;
    }
  </style>
</head>
<body>
  <div>
    <p>Main page content here.</p>
    <!-- Your main page content -->

    <!-- Button to trigger printing -->
    <button onclick="printPage()">Print Page</button>
  </div>

  <!-- Print container using Shadow DOM -->
  <div id="print-container">
    <script>
      // Function to copy iframe content to print container
      function copyIframeContent() {
        const iframe = document.getElementById('my-iframe');
        const iframeContent = iframe.contentDocument.body.innerHTML;

        // Create a shadow DOM
        const shadowRoot = document.getElementById('print-container').attachShadow({mode: 'open'});

        // Copy the iframe content into the shadow DOM
        shadowRoot.innerHTML = iframeContent;
      }

      // Function to print the page
      function printPage() {
        // Copy iframe content to print container
        copyIframeContent();

        // Show the print container
        const printContainer = document.getElementById('print-container');
        printContainer.style.display = 'block';

        // Print the page
        window.print();

        // Hide the print container after printing
        printContainer.style.display = 'none';
      }
    </script>
  </div>

  <!-- Hidden iframe containing content to be printed -->
  <iframe id="my-iframe" style="display: none;">
    <!-- Your iframe content here -->
    <p>Content inside the iframe</p>
  </iframe>
</body>
</html>
```

这个示例中，当你点击“Print Page”按钮时，它会显示一个包含iframe内容的Shadow DOM，并将其打印。请注意，这只是一个简单的示例，具体情况可能需要更多的调整和优化。确保在实际应用中测试并适应你的需求。


