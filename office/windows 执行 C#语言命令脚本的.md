以下是一个使用 C# 编写的脚本，用于通过命令行请求并获取指定 URL（https://weibo.com/ajax/side/hotSearch）的内容：

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        string url = "https://weibo.com/ajax/side/hotSearch";

        try
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(url);

                if (response.IsSuccessStatusCode)
                {
                    string content = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(content);
                }
                else
                {
                    Console.WriteLine($"HTTP request failed with status code: {response.StatusCode}");
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred: {ex.Message}");
        }
    }
}
```

您可以将上述代码保存到一个名为 `GetWeiboHotSearch.cs` 的文件中。然后，通过以下步骤在命令行中执行该脚本：

1. 打开命令提示符（Command Prompt）或 PowerShell。

2. 导航到包含 `GetWeiboHotSearch.cs` 文件的目录。

3. 使用 C# 编译器（通常是 `csc`）编译代码。在命令提示符中运行以下命令：

   ```shell
   csc GetWeiboHotSearch.cs
   ```

   这将生成一个可执行文件，通常是 `GetWeiboHotSearch.exe`。

4. 运行生成的可执行文件，通过以下命令：

   ```shell
   GetWeiboHotSearch.exe
   ```

   执行后，该程序将向指定 URL 发送请求并显示返回的内容。

请确保您的计算机上已安装 .NET SDK 或 .NET Framework，以便编译和运行 C# 程序。如果您没有安装，请从 Microsoft 的官方网站下载并安装：https://dotnet.microsoft.com/download/dotnet
