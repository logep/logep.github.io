

https://github.com/Microsoft/vcpkg
vcpkg  C++ Library Manager for Windows, Linux, and MacOS
To install the libraries for your project, run:
> .\vcpkg\vcpkg install [packages to install]
/////////////////////////////////////////////////////////////////////////


在 Windows 上搭建和运行 C++ 开发环境通常需要安装一个 C++ 编译器和集成开发环境（IDE），例如 Visual Studio 或 Code::Blocks。以下是在 Windows 上搭建 C++ 开发环境的一般步骤：

**安装 C++ 编译器：**

1. **MinGW-w64**: MinGW-w64 是一个 Windows 上的开源 C/C++ 编译器集合，可在 Windows 上编译和运行 C++ 程序。你可以前往 MinGW-w64 官网下载安装程序（https://mingw-w64.org/doku.php/download/mingw-builds）。

2. **Visual C++**: 如果你计划使用 Microsoft Visual Studio（VS）作为开发环境，那么 Visual C++ 编译器将自动安装。你可以下载并安装 Visual Studio Community Edition（https://visualstudio.microsoft.com/visual-cpp-build-tools/）。

**选择一个集成开发环境（IDE）：**

你可以选择一个适合你的 C++ 开发的集成开发环境。以下是一些常见的选择：

1. **Visual Studio**: Visual Studio 是一个强大的 IDE，支持多种编程语言，包括 C++。它具有强大的调试和代码分析工具。你可以使用 Visual Studio Community Edition（免费版本）。

2. **Code::Blocks**: Code::Blocks 是一个开源的 C/C++ 集成开发环境，适用于 Windows、Linux 和 macOS。它是一个轻量级的 IDE，易于使用。

3. **CLion**: JetBrains 的 CLion 是一个专为 C++ 开发而设计的跨平台 IDE。它提供了强大的代码分析和智能代码补全功能。

4. **Eclipse CDT**: Eclipse 是一个开源的 IDE，CDT 插件可以用于 C/C++ 开发。它支持多种编译器，包括 MinGW。

**配置环境变量：**

1. 如果你选择使用 MinGW-w64，需要将 MinGW-w64 的 `bin` 目录添加到系统的 PATH 环境变量中。这样你就可以从命令行中运行 `g++` 或 `gcc` 命令。

2. 如果你使用 Visual C++，则无需手动配置环境变量，因为 Visual Studio 将自动设置。

**创建和运行 C++ 程序：**

1. 打开你选择的 IDE，创建一个新的 C++ 项目或文件。

2. 编写你的 C++ 代码。

3. 构建和运行你的程序。IDE 通常提供了构建和调试工具，使你能够轻松构建和运行代码。

以上是一般的步骤，你可以根据你的需求和喜好选择适合你的 C++ 开发环境和工具。不同的 IDE 提供了不同的功能和集成，所以你可以根据你的项目需求来选择。




C++ 文件不能直接通过命令运行，因为 C++ 是一种编译型语言，需要将源代码编译成可执行文件，然后才能运行。以下是在常见操作系统上如何编译和运行 C++ 程序的一般步骤：

1. **编写 C++ 代码**：

   创建一个以 `.cpp` 扩展名结尾的 C++ 源代码文件，例如 `main.cpp`，并在其中编写 C++ 代码。

2. **使用 C++ 编译器编译代码**：

   打开终端，并在终端中导航到包含 C++ 代码的目录。

   使用 C++ 编译器（例如 g++、clang++、MSVC）编译源代码并生成可执行文件。通常，编译命令的格式如下：

   ```bash
   g++ -o output_filename source_filename.cpp
   ```

   其中 `output_filename` 是您希望生成的可执行文件的名称，`source_filename.cpp` 是您的源代码文件的名称。

   例如，要将 `main.cpp` 编译为名为 `myprogram` 的可执行文件，您可以运行以下命令：

   ```bash
   g++ -o myprogram main.cpp
   ```

   在 Windows 上，使用 MSVC 编译器的命令可能如下：

   ```bash
   cl /EHsc main.cpp
   ```

3. **运行可执行文件**：

   编译成功后，您将在当前目录中找到生成的可执行文件。您可以运行它，例如：

   ```bash
   ./myprogram   # 在 Linux/macOS 上
   myprogram.exe  # 在 Windows 上
   ```

   如果您使用了不同的输出文件名，请相应地更改运行的文件名。

请注意，上述步骤是一般的工作流程，具体的命令和操作可能会因您所使用的编译器和操作系统而异。您需要根据您的编译器和平台来调整命令。如果您正在使用集成开发环境（IDE），通常可以使用 IDE 的构建和运行功能来简化这些步骤。





在 MSYS2 中安装 `g++`（GNU C++编译器）需要使用其包管理器 `pacman`。以下是安装 `g++` 的步骤：

1. **打开 MSYS2 终端**：

   启动 MSYS2，打开其终端。您可以通过在 Windows 开始菜单中搜索 "MSYS2" 来找到它。

2. **更新包管理器数据库**：

   在终端中运行以下命令，以确保包管理器数据库是最新的：

   ```bash
   pacman -Syu
   ```

   这会更新系统的包列表和软件包管理器本身。

3. **安装 g++**：

   运行以下命令来安装 `g++`：

   ```bash
   pacman -S mingw-w64-x86_64-gcc
   ```

   如果您想安装 32 位版本的 `g++`，可以使用以下命令：

   ```bash
   pacman -S mingw-w64-i686-gcc
   ```

   根据您的需求选择其中一个命令。

4. **等待安装完成**：

   `pacman` 将自动下载并安装 `g++` 及其依赖项。请等待安装完成。

5. **验证安装**：

   安装完成后，您可以验证 `g++` 是否正确安装。在终端中运行以下命令：

   ```bash
   g++ --version
   ```

   如果成功安装，您应该能够看到 `g++` 的版本信息。

现在，您已经成功在 MSYS2 中安装了 `g++`。您可以使用 `g++` 编译和运行 C++ 程序了。




MinGW（Minimalist GNU for Windows）是一套适用于 Windows 平台的 GNU 工具链，包括 `g++`（GNU C++ 编译器）。以下是在 Windows 上安装 MinGW 并使用 `g++` 的步骤：

1. **下载 MinGW 安装管理器**：

   首先，您需要下载 MinGW 安装管理器（MinGW-w64），它是 MinGW 的一个现代化分支，支持 64 位和 32 位 Windows。您可以从官方网站下载安装管理器：

   - [MinGW-w64 下载页面](https://mingw-w64.org/doku.php/download)

   根据您的系统选择适当的版本（32 位或 64 位）。建议选择 "win32" 或 "win64" 构建，这些构建提供了对 Windows API 的广泛支持。

2. **运行安装管理器**：

   下载并运行 MinGW 安装管理器（通常是一个可执行文件，例如 `mingw-w64-install.exe`）。在安装过程中，您将被要求选择要安装的组件。确保至少选择了 "gcc" 和 "g++" 组件，以便安装 C 和 C++ 编译器。

3. **选择安装目录**：

   在安装管理器中，您需要选择 MinGW 的安装目录。默认情况下，它可能会建议一个路径，但您可以根据需要进行更改。确保选择的路径不包含特殊字符或空格，以避免可能的问题。

4. **完成安装**：

   继续安装过程，然后等待安装完成。一旦安装完成，MinGW 就会包含在您选择的安装目录中。

5. **添加 MinGW 到 PATH 环境变量**（可选）：

   为了能够在命令提示符中直接运行 `g++`，您可以将 MinGW 的 `bin` 目录添加到系统的 PATH 环境变量中。在安装目录中找到 `bin` 子目录，然后将其路径添加到 PATH 中。例如，如果 MinGW 安装在 `C:\MinGW`，则将 `C:\MinGW\bin` 添加到 PATH。

6. **验证安装**：

   打开命令提示符或 PowerShell，运行以下命令来验证 `g++` 安装：

   ```bash
   g++ --version
   ```

   如果成功安装，您应该能够看到 `g++` 的版本信息。

现在，您已经成功在 Windows 上安装了 MinGW 中的 `g++`，可以使用它来编译和运行 C++ 程序。请注意，MinGW 提供了一个较轻量级的方式在 Windows 上进行 C/C++ 开发，与 MSYS2 相比，它更适合在纯粹的 Windows 开发环境中使用。
