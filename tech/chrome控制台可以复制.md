在 Chrome 浏览器的控制台中，你可以右键点击控制台中打印的内容，然后选择 "Store as global variable" 或 "Store as global variable 1"（取决于是否已经有全局变量），之后你可以在控制台中输入 `$0`，它将引用最近选中的元素。然后，你可以通过右键点击 `$0` 并选择 "Copy"，将其复制到剪贴板中。

具体步骤如下：

1. 在控制台中执行 `console.log(document.querySelector(".node1"));`。

2. 右键点击控制台中输出的结果。

3. 选择 "Store as global variable" 或 "Store as global variable 1"。

4. 在控制台中输入 `$0` 并回车，它将引用最近选中的元素。

5. 右键点击 `$0`，选择 "Copy"，然后可以将其粘贴到其他地方。

请注意，这种方法在你还没有进行其他操作之前有效。如果你在控制台中执行了其他操作，可能会导致 `$0` 引用的不再是之前选中的元素。
