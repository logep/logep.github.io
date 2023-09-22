以下是使用Zig编程语言请求一个API接口并将响应数据显示在控制台或存储到文件中的示例代码：

```zig
const std = @import("std");
const http = @import("std").net.http;

fn main() !void {
    const allocator = std.testing.allocator;
    
    // 定义API URL
    const url = "https://jsonplaceholder.typicode.com/posts/1";

    // 创建HTTP客户端
    const client = try http.open("example_client");

    // 创建HTTP请求
    const request = http.Request.init();
    try request.addMethod("GET");
    try request.addUrl(url);

    // 发送HTTP请求并获取响应
    const response = try client.request(request);

    if (response.status_code != http.StatusOK) {
        const errorMsg = try std.fmt.allocPrint(allocator, "HTTP请求失败，状态码: {}", .{response.status_code});
        defer allocator.free(errorMsg);
        std.debug.print(errorMsg);
        return error.Error{ .Standard = error.Status.Unavailable };
    }

    // 获取响应体数据
    const body = try response.getBodyAlloc();

    // 将响应数据显示在控制台
    std.debug.print("{s}", .{body});

    // 将响应数据保存到文件
    const filePath = "response_data.txt";
    const file = try std.fs.cwd().createFile(filePath, .{ .create = true, .write = true, .truncate = true });
    try file.writeAll(body);

    const successMsg = "API响应数据已保存到文件";
    std.debug.print(successMsg);
}
```

上述代码中，我们使用Zig的标准库中的`std.net.http`模块来进行HTTP请求，并将响应数据显示在控制台上，同时也将响应数据保存到了名为`response_data.txt`的文件中。你可以根据需要修改API的URL和文件保存路径。在运行代码之前，请确保已经安装并配置好Zig编程环境。


上述示例使用的是Zig 0.9.0 版本编写的。请注意，Zig 是一个快速发展的编程语言，新的版本可能会带来一些改变和增强。如果你使用的是较新的 Zig 版本，示例代码应该仍然适用，但可能会有一些细微的语法或库的变化。建议查看 Zig 的官方文档和更新日志以获取有关最新版本的信息。
