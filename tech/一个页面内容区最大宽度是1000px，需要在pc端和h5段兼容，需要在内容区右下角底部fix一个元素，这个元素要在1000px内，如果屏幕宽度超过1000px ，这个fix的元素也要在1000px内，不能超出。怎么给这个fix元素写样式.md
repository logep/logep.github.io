为了在内容区宽度最大为 1000px 的情况下，确保一个固定元素（fixed element）在页面右下角，并且始终保持在 1000px 内，无论是 PC 端还是 H5 端，都可以使用 CSS 样式来实现。这里提供一个通用的解决方案：

1. 使用 CSS 媒体查询来确保在不同设备上都能适应。
2. 计算固定元素的位置，使其在内容区宽度为 1000px 时，始终在右下角。

### 示例代码

#### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fixed Element in Content Area</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="content">
    <!-- 页面内容 -->
    <p>Your main content here...</p>
  </div>
  <div class="fixed-element">
    <!-- 固定元素 -->
    Fixed Element
  </div>
</body>
</html>
```

#### CSS (`styles.css`)

```css
/* 基本样式设置 */
body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: 100%;
}

.content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f0f0;
  min-height: 100vh; /* 确保内容区域至少与视口一样高 */
}

.fixed-element {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007BFF;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

@media (min-width: 1000px) {
  .fixed-element {
    right: calc((100% - 1000px) / 2 + 20px);
  }
}
```

### 解释

1. **基础样式**:
   - `body, html` 的 `margin` 和 `padding` 设置为 `0`，以确保整个页面没有默认的间距。
   - `box-sizing: border-box` 确保所有元素的宽度和高度包括内边距和边框。
   - `min-height: 100vh` 确保内容区域至少与视口一样高。

2. **内容区**:
   - `.content` 设置最大宽度为 `1000px`，并居中显示（`margin: 0 auto`）。

3. **固定元素**:
   - `.fixed-element` 设置为 `position: fixed`，使其固定在视口的右下角。
   - `bottom: 20px` 和 `right: 20px` 用于初步定位。

4. **媒体查询**:
   - 使用媒体查询，当视口宽度大于或等于 `1000px` 时，调整 `.fixed-element` 的 `right` 值。
   - `calc((100% - 1000px) / 2 + 20px)` 计算出固定元素在内容区的右边距。`(100% - 1000px) / 2` 计算出内容区与视口边缘的空白距离，加上 `20px` 确保元素在内容区内。

这样，无论是在 PC 端还是 H5 端，固定元素都会在内容区的右下角，并且在宽度大于 1000px 时，仍然保持在 1000px 的内容区内，而不会超出边界。
