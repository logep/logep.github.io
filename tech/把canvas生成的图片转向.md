要在 canvas 上生成的图像旋转 90 度并将其转换为 Base64 字符串，你可以按照以下步骤操作：

1. 将 canvas 上的图像绘制到一个临时 canvas 上。
2. 在临时 canvas 上进行旋转。
3. 将旋转后的图像转换为 Base64 字符串。

下面是一个简单的 JavaScript 示例代码：

```javascript
function rotateBase64Img(canvas, degrees) {
    // 创建一个临时 canvas
    var tempCanvas = document.createElement('canvas');
    var tempCtx = tempCanvas.getContext('2d');

    // 设置临时 canvas 的尺寸
    tempCanvas.width = canvas.height;
    tempCanvas.height = canvas.width;

    // 在临时 canvas 上旋转图像
    tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
    tempCtx.rotate(degrees * Math.PI / 180);
    tempCtx.drawImage(canvas, -canvas.width / 2, -canvas.height / 2);

    // 将旋转后的图像转换为 Base64 字符串
    var rotatedBase64 = tempCanvas.toDataURL();

    return rotatedBase64;
}

// 使用示例
var canvas = document.getElementById('yourCanvasId'); // 你的 canvas 元素
var rotatedBase64Img = rotateBase64Img(canvas, 90);
```

在这个示例中，`rotateBase64Img` 函数接受一个 canvas 元素和旋转角度作为参数，然后返回旋转后的图像的 Base64 字符串。你需要将 `'yourCanvasId'` 替换为你的 canvas 元素的 ID。
