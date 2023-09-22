##用Cmake 生成

在C++中，你可以使用CMake来快速生成项目结构和配置。CMake是一个用于管理C++项目的强大工具，它可以帮助你生成项目文件、配置编译器选项以及管理依赖项。以下是一个示例，展示如何使用CMake快速生成一个简单的C++项目：

1. 安装CMake：首先确保你已经安装了CMake。你可以从[CMake官方网站](https://cmake.org/download/)下载适用于你操作系统的安装程序。

2. 创建项目目录：在你的文件系统中创建一个新的项目目录，然后进入该目录。

3. 创建CMakeLists.txt文件：在项目目录中创建一个名为 `CMakeLists.txt` 的文件，该文件将用于配置你的项目。以下是一个简单的示例 `CMakeLists.txt` 文件：

   ```cmake
   cmake_minimum_required(VERSION 3.0)
   project(MyCPlusPlusProject)

   add_executable(MyApp main.cpp)
   ```

   上述示例中，`MyCPlusPlusProject` 是项目的名称，`main.cpp` 是你的C++源代码文件。

4. 创建源代码文件：在同一项目目录中创建一个名为 `main.cpp` 的C++源代码文件，编写你的C++代码。

   ```cpp
   #include <iostream>

   int main() {
       std::cout << "Hello, World!" << std::endl;
       return 0;
   }
   ```

5. 生成项目文件：在项目目录中打开命令行终端，并运行以下命令，以生成项目文件和构建项目：

   ```bash
   mkdir build
   cd build
   cmake ..
   ```

   这将在 `build` 子目录中生成项目文件和构建脚本。

6. 编译和运行：在同一终端中继续运行以下命令，以编译项目并运行生成的可执行文件：

   ```bash
   make
   ./MyApp
   ```

   这将编译你的C++代码并运行生成的可执行文件，你将在终端上看到 "Hello, World!" 输出。

这就是一个快速生成和运行C++项目的步骤。你可以根据自己的需要扩展和定制 `CMakeLists.txt` 文件，以添加更多的源文件、依赖项和其他配置。 CMake 的强大之处在于它可以用于各种规模的C++项目，并提供了灵活的配置选项。





``` shell
$ which g++
/d/msys64/usr/bin/g++

D:\msys64\usr\bin
```
以下是一个简单的 C++ 程序示例，它将输出 "Hello, World!" 到命令行：

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
```

要运行这个程序，首先需要确保你的系统上安装了 C++ 编译器，如 g++（GNU C++ 编译器）或者 clang++（LLVM C++ 编译器）。然后，将上述代码保存到一个以 ".cpp" 为扩展名的文件中，比如 "hello.cpp"。

接下来，打开命令行终端，导航到保存代码的文件夹，并执行以下命令来编译和运行程序：

```bash
g++ -o hello hello.cpp
./hello
```

上述命令将首先使用 g++ 编译器编译 "hello.cpp" 文件，并生成一个可执行文件 "hello"。然后，通过 "./hello" 命令来运行这个可执行文件，你将在命令行上看到 "Hello, World!" 的输出。

请确保你已经正确安装了 C++ 编译器，并且在命令行终端中可以执行上述命令。



出现 "fatal error: cpprest/http_client.h: No such file or directory" 错误通常是因为缺少 C++ REST SDK（也称为 Casablanca）的头文件。要解决这个问题，你需要安装 C++ REST SDK 并确保编译器能够找到这些头文件。

以下是解决该问题的一般步骤：

1. 安装 C++ REST SDK（Casablanca）：
   
   首先，你需要安装 C++ REST SDK。在不同的操作系统上，安装方式可能会有所不同。以下是在一些常见操作系统上的示例：

   - **在 Ubuntu 上**，你可以使用以下命令安装 C++ REST SDK：
     ```
     sudo apt-get install libcpprest-dev
     ```

   - **在 Windows 上**，你可以从官方网站下载 Casablanca 并按照它们的安装说明进行安装。

2. 确保编译器可以找到头文件：
   
   在编译你的 C++ 程序之前，确保编译器能够找到 C++ REST SDK 的头文件。你可以使用 `-I` 标志来指定头文件所在的路径。例如，如果头文件位于 `/path/to/cpprestsdk/Include` 目录下，你可以使用以下命令编译程序：

   ```
   g++ -o myprogram myprogram.cpp -I/path/to/cpprestsdk/Include -lcpprest
   ```

   请根据你系统上 C++ REST SDK 的实际安装位置和你的编译器使用合适的路径。

3. 编译和运行程序：

   完成上述步骤后，你应该能够成功编译和运行你的程序，而不再遇到 "No such file or directory" 错误。

请确保按照操作系统的要求正确安装 C++ REST SDK，并使用正确的头文件路径进行编译。这应该解决你的问题。如果仍然遇到问题，请提供更多详细信息，以便我能够提供更具体的帮助。


C++ REST SDK，也称为 Casablanca，目前由 Microsoft 开发和维护。你可以从 Microsoft 的 GitHub 存储库获取 C++ REST SDK。以下是获取 Casablanca 的 GitHub 存储库的链接：

[C++ REST SDK (Casablanca) GitHub 存储库](https://github.com/microsoft/cpprestsdk)

你可以在 GitHub 存储库页面上找到有关项目的更多信息、文档和下载选项。根据你的需求，你可以通过 Git 克隆存储库，或者从存储库的 Releases 部分下载特定版本的 SDK。

请注意，GitHub 存储库可能会随着时间的推移发生变化，因此请查看存储库的 README 和文档以获取有关安装和使用的详细信息。


## 下面 也可以不操作，直接通过上面的git地址下载下来在window上使用库
在 Windows 上，如果你要编译 C++ 程序并链接 Casablanca (C++ REST SDK)，你需要进行一些额外的设置。以下是一般步骤：

1. 安装 Visual Studio: Casablanca 通常需要使用 Visual Studio 编译。你可以从 Microsoft 的官方网站上下载并安装 Visual Studio Community 版本或更高版本。

2. 安装 vcpkg: vcpkg 是一个 C/C++ 依赖项管理器，可以用来安装 Casablanca。

   - 下载 vcpkg：从 vcpkg 的 GitHub 存储库下载 vcpkg，链接如下：[vcpkg GitHub 存储库](https://github.com/microsoft/vcpkg)。
   - 安装 vcpkg：按照 vcpkg 的文档中的说明安装 vcpkg。

3. 安装 Casablanca 依赖项：使用 vcpkg 安装 Casablanca 依赖项。运行以下命令：

   ```
   vcpkg install cpprestsdk cpprestsdk:x64-windows
   ```

   这将安装 Casablanca 及其相关依赖项。

4. 编写和编译你的 C++ 程序：创建你的 C++ 源代码文件 (e.g., myprogram.cpp)，然后使用 g++ 编译它。在编译时，确保包含 Casablanca 头文件并链接 Casablanca 库。命令如下：

   ```
   g++ -o myprogram myprogram.cpp -I<path-to-vcpkg>\installed\x64-windows\include -L<path-to-vcpkg>\installed\x64-windows\lib -lcpprest
   ```

   请替换 `<path-to-vcpkg>` 为你的 vcpkg 安装路径。

5. 运行程序：编译完成后，你可以运行生成的可执行文件 `myprogram.exe`。

以上步骤中，需要确保正确设置了 vcpkg 的路径和 Casablanca 的路径。这些路径可能会根据你的安装和文件结构而有所不同。如果你遇到问题，请查阅 vcpkg 和 Casablanca 的文档以获取更详细的说明和指导。






这个错误表明编译过程中找不到 boost/asio/ssl.hpp 文件，这是因为 Casablanca (C++ REST SDK) 依赖于 Boost C++ 库的一部分。为了解决这个问题，你需要确保 Boost 库已经正确安装并配置。

以下是一些可能的解决方法：

1. 安装 Boost 库：

   - 在 Windows 上，你可以使用 vcpkg 来安装 Boost 库，方法如下：

     ```
     vcpkg install boost
     ```

     这将安装 Boost 库及其相关依赖项。

   - 如果你选择手动安装 Boost，你需要从 Boost 官方网站下载并安装 Boost C++ 库。下载地址为：[Boost 官方网站](https://www.boost.org/users/download/)。

2. 设置 Boost 库的包含路径和库路径：

   - 在你的 g++ 命令中，确保你设置了正确的包含路径 (`-I`) 和库路径 (`-L`)，以便编译器可以找到 Boost 库。例如：

     ```
     g++ -o myprogram myprogram.cpp -I<path-to-boost-include> -L<path-to-boost-lib> -lcpprest -lboost_system -lboost_thread -lboost_chrono -lboost_date_time -lboost_atomic
     ```

     请将 `<path-to-boost-include>` 替换为 Boost 头文件的路径，将 `<path-to-boost-lib>` 替换为 Boost 库文件的路径。

3. 确保你的代码中正确地包含 Casablanca 和 Boost 的头文件：

   ```cpp
   #include <cpprest/http_client.h>
   #include <boost/asio/ssl.hpp>
   ```

如果你按照以上步骤操作并仍然遇到问题，请确保你的 Boost 库已正确安装，并且路径设置正确。如果问题仍然存在，你可能需要仔细检查你的编译和链接命令，以确保所有依赖项都被正确地包含和链接到你的项目中。
