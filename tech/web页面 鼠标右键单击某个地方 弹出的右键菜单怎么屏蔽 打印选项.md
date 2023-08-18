在大多数情况下，网页的右键菜单是由浏览器提供的默认行为控制的，而无法直接通过网页代码来完全屏蔽或修改。然而，你可以通过一些方法来限制或修改右键菜单的行为。请注意，这些方法可能会因浏览器的不同而有所不同，而且可能会影响用户体验。

以下是一些可能的方法：

1. **禁用右键菜单的默认行为：** 你可以通过JavaScript代码来阻止浏览器默认的右键菜单弹出行为。例如，你可以使用以下代码：

```javascript
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});
```

这将阻止默认的右键菜单弹出，但也会影响用户的其他操作。

2. **自定义右键菜单：** 你可以通过在网页中创建自定义的上下文菜单来替代浏览器默认的右键菜单。这需要使用一些HTML、CSS和JavaScript代码来实现。以下是一个简单的示例：

HTML:
```html
<div id="custom-menu" class="custom-menu">
    <div class="menu-item">选项1</div>
    <div class="menu-item">选项2</div>
</div>
```

CSS:
```css
.custom-menu {
    display: none;
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 5px;
}

.menu-item {
    padding: 5px;
    cursor: pointer;
}

/* 根据需要设置菜单的样式 */
```

JavaScript:
```javascript
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const customMenu = document.getElementById('custom-menu');
    customMenu.style.left = e.clientX + 'px';
    customMenu.style.top = e.clientY + 'px';
    customMenu.style.display = 'block';
});

document.addEventListener('click', function() {
    const customMenu = document.getElementById('custom-menu');
    customMenu.style.display = 'none';
});
```

这将创建一个自定义的右键菜单，其中包含选项1和选项2。当用户右键单击时，将显示自定义菜单，当用户单击其他地方时，菜单将隐藏。
如果你只想屏蔽右键菜单中的“打印”选项，而保留其他默认选项，你可以使用以下方法：

```javascript
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    const customMenu = document.createElement('div');
    customMenu.style.display = 'none';
    document.body.appendChild(customMenu);

    const printOption = document.createElement('div');
    printOption.textContent = '打印';
    printOption.style.display = 'none';
    customMenu.appendChild(printOption);

    document.addEventListener('click', function(event) {
        if (event.target === printOption) {
            // 屏蔽打印操作，可以在这里添加你的逻辑
            console.log("打印操作已屏蔽");
        }
        customMenu.style.display = 'none';
    });

    customMenu.style.position = 'absolute';
    customMenu.style.left = e.clientX + 'px';
    customMenu.style.top = e.clientY + 'px';
    customMenu.style.display = 'block';
});
```

在这段代码中，我们创建了一个临时的自定义右键菜单，只包含一个名为“打印”的选项。当用户右键单击时，会弹出这个自定义菜单，但是当用户点击“打印”选项时，不会有任何实际操作，而是显示一条消息表示打印操作已屏蔽。

请注意，这只是一种简单的模拟屏蔽操作，实际效果可能因浏览器行为的变化而有所不同。用户仍然可以通过其他手段来执行打印操作，因此这并不能完全阻止所有可能的打印行为。
请注意，这些方法可能会受到浏览器安全策略的限制，用户仍然可以通过禁用JavaScript或其他手段来绕过这些限制。在实现时，需要权衡用户体验和安全性。最好的做法是尊重用户的操作习惯，并避免过于干扰他们的操作。
