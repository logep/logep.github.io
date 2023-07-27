第一步:增加 _config.yml文件
第二步：增加Gemfile文件

当使用 Jekyll 构建博客时， `_config.yml` 是一个非常重要的配置文件，它包含了许多 Jekyll 的配置选项。以下是一个简单的 `_config.yml` 示例，供你参考：

```yaml
# Site settings
title: My Awesome Blog
description: A blog about all things awesome!
baseurl: "" # The subpath of your site, e.g. /blog
url: https://example.com # The base hostname & protocol for your site

# Build settings
markdown: kramdown
theme: minima
plugins:
  - jekyll-feed

# Collections
collections:
  posts:
    output: true
    permalink: /posts/:year/:month/:title

# Exclude files
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
  - _site
  - .sass-cache

# SEO settings
meta_description: A blog about all things awesome!
author: John Doe
twitter_username: johndoe
```

在这个示例中，我们定义了一些常用的配置项：

- `title` 和 `description`：站点的标题和描述，这将用于生成站点的元数据和显示在浏览器标签栏上。
- `baseurl` 和 `url`：用于配置站点的根路径和基本 URL 地址。
- `markdown`：指定使用 kramdown 作为 Markdown 引擎，你也可以选择其他 Markdown 引擎。
- `theme`：指定使用 minima 主题，你可以选择其他 Jekyll 主题或自定义自己的主题。
- `plugins`：指定要加载的 Jekyll 插件，这里我们加载了 `jekyll-feed` 插件用于生成 RSS 订阅。

接下来是 Collections 的配置：

- `collections`：我们定义了一个名为 `posts` 的集合，用于存放博客文章。
- `output`：指定该集合是否输出生成的页面。
- `permalink`：指定生成页面的链接格式，这里使用了年、月和标题作为链接格式。

最后是一些其他配置项：

- `exclude`：用于指定哪些文件或目录在构建时不会被包含在最终的静态网站中。
- `meta_description` 和 `author`：用于配置站点的元描述和作者信息。
- `twitter_username`：用于配置 Twitter 用户名。

这只是一个简单的示例，实际使用中你可以根据自己的需求添加更多配置和自定义主题。更多的 Jekyll 配置选项可以在 Jekyll 的官方文档中找到：https://jekyllrb.com/docs/configuration/


错误信息 "The minima theme could not be found. (Jekyll::Errors::MissingDependencyException)" 表示 Jekyll 在构建过程中找不到所需的 Minima 主题，因此导致了错误。Minima 是 Jekyll 默认的主题，如果在构建过程中找不到它，通常是由于项目缺少必要的依赖或配置问题所致。

要解决这个问题，请尝试以下步骤：

1. **确认 Gemfile 中的依赖**：在你的项目根目录中的 `Gemfile` 文件中，确保已经正确添加了 Jekyll 和 Minima 主题的依赖，并且指定了正确的版本。例如：

   ```ruby
   source "https://rubygems.org"
   gem "jekyll", "~> 4.3"
   gem "minima", "~> 2.5"
   
   ```

   确保运行了 `bundle install` 命令来安装依赖。

2. **检查 _config.yml 配置**：确保你的 `_config.yml` 配置文件中指定了正确的主题。在 `_config.yml` 文件中应该有类似以下的配置：

   ```yaml
   theme: minima
   ```

   如果你使用了其他主题，请确保相应的主题名称正确。

3. **检查主题文件夹**：在项目中，确认是否存在 `_sass` 和 `_layouts` 等文件夹，并且这些文件夹中应该包含了 Minima 主题的相关文件。

4. **清除缓存**：如果你之前运行过构建，并且出现了主题缺失的问题，尝试清除本地的缓存和 `_site` 文件夹，然后重新运行 `bundle exec jekyll build`。

5. **检查 Vercel 配置**：如果你在 Vercel 上部署，确保 Vercel 构建环境中也正确安装了 Jekyll 和 Minima 主题的依赖。可以在 Vercel 控制台的构建日志中查看是否有任何依赖安装错误。

请注意，如果你使用了其他主题而不是 Minima，那么错误信息中提到的主题名称将不是 Minima。确保在项目中配置的主题名称与实际使用的主题名称一致。

如果上述步骤都无法解决问题，请检查 Jekyll 和主题的版本兼容性，以及可能存在的其他配置问题。尽量在本地进行充分的测试，确保项目在本地正常工作后再部署到生产环境。
