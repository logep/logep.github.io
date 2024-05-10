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


## 裁剪
要在 Canvas 中对画布上绘制的图像进行裁剪，以去除周围的空白部分，可以通过以下步骤实现：

1. 找到图像非透明区域的边界。
2. 根据边界确定裁剪的区域。
3. 使用裁剪区域重新绘制图像到 Canvas 上。

下面是一个简单的示例代码，演示如何实现这个过程：

```javascript
function cropCanvas(canvas) {
    // 获取 Canvas 上下文
    const ctx = canvas.getContext('2d');

    // 获取图像数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 寻找非透明区域的边界
    let top = canvas.height,
        bottom = 0,
        left = canvas.width,
        right = 0;

    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            const alpha = data[(y * canvas.width + x) * 4 + 3]; // 透明度信息在数据中的位置

            if (alpha > 0) {
                top = Math.min(top, y);
                bottom = Math.max(bottom, y);
                left = Math.min(left, x);
                right = Math.max(right, x);
            }
        }
    }

    // 计算裁剪区域的尺寸
    const croppedWidth = right - left + 1;
    const croppedHeight = bottom - top + 1;

    // 创建新的 Canvas 用于裁剪后的图像
    const croppedCanvas = document.createElement('canvas');
    const croppedCtx = croppedCanvas.getContext('2d');
    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;

    // 裁剪并绘制图像
    croppedCtx.drawImage(canvas, left, top, croppedWidth, croppedHeight, 0, 0, croppedWidth, croppedHeight);

    return croppedCanvas;
}

// 使用示例
const canvas = document.getElementById('canvas');
const croppedCanvas = cropCanvas(canvas);

// 将裁剪后的 Canvas 添加到页面中或进行其他操作
document.body.appendChild(croppedCanvas);
```

这个函数会遍历图像的每个像素，找到非透明区域的边界，然后根据边界信息裁剪图像。最后，它会返回一个新的 Canvas 元素，其中包含裁剪后的图像。



当传入的是 base64 格式的图像时，你可以先将其绘制到一个临时的 Canvas 上，然后再对临时 Canvas 进行裁剪，最后将裁剪后的图像再转换为 base64 格式。以下是一个示例代码：

```javascript
function cropBase64Image(base64String) {
    return new Promise((resolve, reject) => {
        // 创建一个图像对象
        const img = new Image();
        img.onload = function() {
            // 创建一个临时的 Canvas 元素
            const tempCanvas = document.createElement('canvas');
            const tempCtx = tempCanvas.getContext('2d');

            // 设置临时 Canvas 的尺寸与图像相同
            tempCanvas.width = img.width;
            tempCanvas.height = img.height;

            // 在临时 Canvas 上绘制图像
            tempCtx.drawImage(img, 0, 0);

            // 调用之前定义的裁剪函数
            const croppedCanvas = cropCanvas(tempCanvas);

            // 将裁剪后的 Canvas 转换为 base64 字符串
            const croppedBase64 = croppedCanvas.toDataURL('image/png');

            // 返回裁剪后的 base64 字符串
            resolve(croppedBase64);
        };
        img.onerror = reject;
        // 加载 base64 图片
        img.src = base64String;
    });
}

// 使用示例
const base64String = 'data:image/png;base64,你的base64编码'; // 替换成你的 base64 图片编码
cropBase64Image(base64String)
    .then(croppedBase64 => {
        console.log(croppedBase64); // 输出裁剪后的 base64 字符串
    })
    .catch(error => {
        console.error(error);
    });
```

这个函数接受一个 base64 字符串作为输入，并返回一个 Promise，该 Promise 在裁剪操作完成后解析为裁剪后的 base64 字符串。
