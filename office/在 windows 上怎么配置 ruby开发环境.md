在 Windows 上配置Ruby开发环境通常需要以下步骤：

1. **下载Ruby Installer**：

   首先，你需要下载适用于Windows的Ruby Installer。建议使用[RubyInstaller](https://rubyinstaller.org/)官方网站提供的安装程序。访问该网站并下载最新版本的Ruby Installer。

2. **安装Ruby**：

   运行下载的Ruby Installer安装程序。在安装过程中，你可以选择安装DevKit（开发工具包），这是一个可选组件，通常用于编译一些Ruby gem，但不是必需的。在安装过程中，你可以根据需要自定义安装选项，但通常保持默认选项即可。

3. **设置环境变量**：

   安装完成后，需要将Ruby的执行路径添加到系统的环境变量中，以便你可以在命令提示符或PowerShell中访问Ruby。以下是设置环境变量的步骤：

   - 右键单击“此电脑”（或“计算机”），然后选择“属性”。
   - 在系统窗口的左侧，选择“高级系统设置”。
   - 在“高级”选项卡下，点击“环境变量”按钮。
   - 在“系统变量”部分，找到名为“Path”的变量，然后双击它。
   - 在编辑窗口中，点击“新建”，然后添加Ruby的安装目录路径（通常是`C:\Ruby27-x64\bin`，具体路径可能因安装版本而异）。
   - 确认所有窗口，保存更改。

4. **验证安装**：

   打开命令提示符或PowerShell，并运行以下命令来验证Ruby是否成功安装：

   ```bash
   ruby -v
   ```

   这将显示Ruby的版本信息。如果成功显示版本号，说明Ruby已成功安装。

5. **安装RubyGems**：

   RubyGems是Ruby的包管理器，用于安装和管理Ruby库和工具。通常，Ruby Installer已经包含了RubyGems，但你可以运行以下命令来确保它是最新的：

   ```bash
   gem update --system
   ```

现在，你已经在Windows上成功配置了Ruby开发环境。你可以使用Ruby来运行脚本、开发应用程序，以及安装Ruby gem来扩展其功能。如果你计划使用Ruby on Rails或其他Ruby框架，还需要安装相应的框架和工具，具体取决于你的项目需求。
