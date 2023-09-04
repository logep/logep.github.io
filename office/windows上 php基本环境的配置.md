在 Windows 上配置 PHP 环境并创建一个简单的 "Hello, World!" 示例非常简单。以下是一些步骤：

**安装 PHP:**

1. 前往 PHP 的官方网站下载 Windows 版本的 PHP 安装程序。你可以从以下链接下载最新版本：https://windows.php.net/download/

2. 下载完毕后，运行安装程序并按照提示完成安装。

3. 安装完成后，PHP 将会被安装到默认目录（例如 `C:\Program Files\PHP`）。你可以在命令行中运行 `php -v` 来验证 PHP 是否已经成功安装。

**创建一个 "Hello, World!" 文件:**

1. 打开文本编辑器（例如 Notepad++ 或 Visual Studio Code）。

2. 创建一个新文件，然后输入以下代码：

```php
<?php
echo "Hello, World!";
?>
```

3. 保存文件，将其命名为 `hello.php` 并保存在一个你希望的目录中。

**运行 "Hello, World!" 文件:**

1. 打开命令提示符（Command Prompt）。

2. 使用 `cd` 命令切换到包含 `hello.php` 文件的目录。例如：

```
cd C:\path\to\your\directory
```

3. 运行以下命令来执行 `hello.php` 文件：

```
php hello.php
```

你应该会在命令提示符中看到 "Hello, World!" 的输出。

这就完成了一个简单的 "Hello, World!" PHP 示例的配置和运行。你可以在此基础上继续开发 PHP 应用程序。如果你需要配置一个 Web 服务器（例如 Apache 或 Nginx）来运行 PHP 文件，还需要进行额外的设置。
