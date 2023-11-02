要在本地安装并执行 Jekyll，你可以按照以下步骤操作：

1. **安装 Ruby**: Jekyll 是基于 Ruby 构建的，因此首先需要安装 Ruby。你可以前往 [Ruby 官方网站](https://www.ruby-lang.org/en/documentation/installation/) 根据你的操作系统下载并安装 Ruby。

2. **安装 RubyGems**: RubyGems 是 Ruby 的包管理器，它通常随 Ruby 一起安装。你可以验证 RubyGems 是否已安装，通过在终端运行以下命令：

   ```shell
   gem --version
   ```

3. **安装 Jekyll**: 一旦 Ruby 和 RubyGems 安装好，你可以使用 RubyGems 安装 Jekyll。在终端中运行以下命令：

   ```shell
   gem install jekyll
   ```

4. **创建 Jekyll 项目**: 在你的终端中，进入你想要创建 Jekyll 项目的目录，然后运行以下命令以创建一个新的 Jekyll 项目：

   ```shell
   jekyll new my-site
   ```

   这将创建一个名为 `my-site` 的新 Jekyll 项目。

5. **进入项目目录**: 切换到新创建的项目目录：

   ```shell
   cd my-site
   ```

6. **运行 Jekyll**: 最后，运行以下命令以启动 Jekyll 本地服务器：

   ```shell
   jekyll serve
   ```

   这将启动 Jekyll 本地服务器，你可以在浏览器中访问 `http://localhost:4000` 查看你的网站。

现在，你已经在本地安装并执行了 Jekyll。你可以编辑 Jekyll 项目中的文件，包括配置文件、布局文件、页面文件等，然后在本地服务器上查看更改。当你满意时，你可以将 Jekyll 项目部署到你的主机或托管平台上。
