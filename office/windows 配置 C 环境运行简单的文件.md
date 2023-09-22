在C语言中，你可以使用CMake来快速生成项目结构和配置，类似于C++项目的方法。以下是一个示例，展示如何使用CMake来创建一个简单的C项目：

1. 安装CMake：首先确保你已经安装了CMake。你可以从[CMake官方网站](https://cmake.org/download/)下载适用于你操作系统的安装程序。

2. 创建项目目录：在你的文件系统中创建一个新的项目目录，然后进入该目录。

3. 创建CMakeLists.txt文件：在项目目录中创建一个名为 `CMakeLists.txt` 的文件，该文件将用于配置你的C项目。以下是一个简单的示例 `CMakeLists.txt` 文件：

   ```cmake
   cmake_minimum_required(VERSION 3.0)
   project(MyCProject)

   add_executable(MyApp main.c)
   ```

   上述示例中，`MyCProject` 是项目的名称，`main.c` 是你的C源代码文件。

4. 创建源代码文件：在同一项目目录中创建一个名为 `main.c` 的C源代码文件，编写你的C代码。

   ```c
   #include <stdio.h>

   int main() {
       printf("Hello, World!\n");
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

   这将编译你的C代码并运行生成的可执行文件，你将在终端上看到 "Hello, World!" 输出。

这就是一个快速生成和运行C项目的步骤。你可以根据自己的需要扩展和定制 `CMakeLists.txt` 文件，以添加更多的源文件、依赖项和其他配置。 CMake 的强大之处在于它可以用于各种规模的C项目，并提供了灵活的配置选项。
