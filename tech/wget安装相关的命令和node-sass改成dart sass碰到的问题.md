1、下载相对应版本的wget二进制安装包或者wget.exe，地址：https://eternallybored.org/misc/wget/
2、解压安装包，将wget.exe 拷贝到C:\Program Files\Git\mingw64\bin\ 下面；（或者解压之后将解压文件中wget.exe的路径添加到环境变量中）

https://github.com/sass/node-sass/releases/download/v4.13.0/win32-x64-64_binding.node
下载下来后 直接设置环境变量

set SASS_BINARY_PATH=C:\Users\saper\safe_node_module\win32-x64-64_binding.node
## node-sass相关的命令

  https://github.com/sass/node-sass/issues/2773

  ### node-sass

  把 node-sass 改成 dart sass 后，代码里的 /deep/ 写法都报错了
  当你将 `node-sass` 更改为 Dart Sass 时，可能会遇到 `/deep/` 的写法报错的问题。这是因为 `/deep/` 是一种 Vue.js 特有的语法，而 Dart Sass 不会将其解析为 `::v-deep`。

在使用 Dart Sass 时，你应该使用 `::v-deep` 或者 `:deep()` 语法来达到穿透样式作用域的效果。

示例：

```css
/* 使用 ::v-deep */
.parent-class ::v-deep .child-class {
  color: red;
}

/* 或者使用 :deep() */
.parent-class :deep .child-class {
  color: red;
}
```

这样的写法能够在 Dart Sass 中正确穿透样式作用域，取代了 Vue.js 中使用的 `/deep/` 语法。确保你的样式表中使用了这些 Dart Sass 支持的语法，以正确处理样式穿透。
