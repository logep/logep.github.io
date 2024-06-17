在 JavaScript 中处理千位符和文本框输入的问题时，我们可以采用以下步骤：

1. **输入时允许用户正常输入**。
2. **在显示时将数字格式化为带有千位符的形式**。
3. **在提交表单或将数据传输到后台时，将格式化的字符串转换回纯数字形式**。

### 实现步骤

1. **监听输入框的输入事件，格式化显示值**。
2. **在提交数据时去掉千位符，传递纯数字值**。

### 示例代码

下面是一个实现此功能的示例代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>千位符格式化输入框</title>
</head>
<body>
  <form id="myForm">
    <label for="numberInput">请输入数字：</label>
    <input type="text" id="numberInput" name="numberInput">
    <button type="submit">提交</button>
  </form>

  <script>
    // 格式化数字为千位符形式
    function formatNumberWithCommas(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // 移除千位符，转换回纯数字形式
    function removeCommas(formattedNumber) {
      return formattedNumber.replace(/,/g, '');
    }

    const numberInput = document.getElementById('numberInput');
    const form = document.getElementById('myForm');

    // 监听输入框的输入事件
    numberInput.addEventListener('input', function (e) {
      // 获取当前输入的值，移除千位符，保持光标位置
      const cursorPosition = e.target.selectionStart;
      const rawValue = removeCommas(e.target.value);

      // 格式化输入的值
      const formattedValue = formatNumberWithCommas(rawValue);
      e.target.value = formattedValue;

      // 恢复光标位置
      e.target.selectionStart = cursorPosition;
      e.target.selectionEnd = cursorPosition;
    });

    // 监听表单提交事件
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const rawValue = removeCommas(numberInput.value);
      const numberValue = parseFloat(rawValue);

      // 传递纯数字值到后台
      console.log('提交的数字值:', numberValue);

      // 此处可以进行实际的表单提交或Ajax请求
    });
  </script>
</body>
</html>
```

### 代码解释

1. **格式化和去除千位符的函数**：
    - `formatNumberWithCommas(number)`：将数字转换为带有千位符的格式。
    - `removeCommas(formattedNumber)`：去除字符串中的千位符。

2. **输入框的输入事件监听**：
    - 监听 `input` 事件，在用户输入时，移除现有的千位符，重新格式化并显示带有千位符的值。
    - 保持光标位置，使得用户输入体验更好。

3. **表单提交事件监听**：
    - 监听 `submit` 事件，在提交表单时，将输入框中的值去除千位符并转换为数字。
    - 在实际应用中，可以将该数值通过表单或Ajax请求传递到后台。

通过这种方式，用户可以在输入框中正常输入数字，同时显示带有千位符的格式，而后台接收到的是纯数字形式的数据。
