

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
