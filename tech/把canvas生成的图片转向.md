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



## 第二种方式 直接 base64图片 rotate 90

要在 HTML5 中使用 Canvas 将 base64 图片旋转 90 度，你可以执行以下步骤：

1. 创建一个新的图像对象。
2. 将 base64 图片赋值给图像对象的 `src` 属性。
3. 在 Canvas 上绘制这个图像对象，并在绘制时对其进行旋转。

下面是一个示例代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>旋转 base64 图片</title>
</head>
<body>

<canvas id="canvas"></canvas>

<script>
window.onload = function() {
    // 1. 创建 Canvas 和 图像对象
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image();

    // 2. 加载 base64 图片
    img.onload = function() {
        // 3. 将图像旋转 90 度并绘制到 Canvas 上
        canvas.width = img.height; // 旋转后的宽度为原高度
        canvas.height = img.width; // 旋转后的高度为原宽度
        ctx.translate(canvas.width, 0); // 将原点移到右上角
        ctx.rotate(Math.PI / 2); // 顺时针旋转 90 度
        ctx.drawImage(img, 0, 0); // 绘制旋转后的图像
    };

    img.src = 'data:image/png;base64,你的base64编码'; // 替换成你的 base64 图片编码
};
</script>

</body>
</html>
```

请注意，替换代码中的 `'data:image/png;base64,你的base64编码'` 部分为你实际的 base64 编码字符串。这样就能在 Canvas 中将 base64 图片顺时针旋转 90 度并绘制出来。



要在 JavaScript 中将 base64 图片旋转 90 度并返回新的 base64 字符串，你可以使用 Canvas 来实现。以下是一个示例代码：

```javascript
function rotateBase64Image(base64String) {
    return new Promise((resolve, reject) => {
        // 创建一个图像对象
        const img = new Image();
        img.onload = function() {
            // 创建一个 Canvas 元素
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // 设置 Canvas 的尺寸
            canvas.width = img.height; // 旋转后的宽度为原高度
            canvas.height = img.width; // 旋转后的高度为原宽度

            // 将图像旋转 90 度并绘制到 Canvas 上
            ctx.translate(canvas.width, 0); // 将原点移到右上角
            ctx.rotate(Math.PI / 2); // 顺时针旋转 90 度，如果要将图像旋转270度，你需要在代码中更改旋转角度。在 JavaScript 的代码中，将 rotate(Math.PI / 2) 改为 rotate(3 * Math.PI / 2) 即可实现270度的旋转。
            // ctx.rotate(-Math.PI / 2); // 顺时针旋转 -90 度

    ctx.drawImage(img, 0, 0); // 绘制旋转后的图像

            // 将 Canvas 中的图像转换为 base64 字符串
            const rotatedBase64 = canvas.toDataURL('image/png');

            // 返回旋转后的 base64 字符串
            resolve(rotatedBase64);
        };
        img.onerror = reject;
        // 加载 base64 图片
        img.src = base64String;
    });
}

// 用法示例
const base64String = 'data:image/png;base64,你的base64编码'; // 替换成你的 base64 图片编码
rotateBase64Image(base64String)
    .then(rotatedBase64 => {
        console.log(rotatedBase64); // 输出旋转后的 base64 字符串
    })
    .catch(error => {
        console.error(error);
    });
```

这个函数接受一个 base64 字符串作为输入，并返回一个 Promise，该 Promise 在旋转操作完成后解析为旋转后的 base64 字符串。你可以将其嵌入到你的应用程序中，并根据需要使用旋转后的 base64 图片。
