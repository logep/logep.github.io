如果您只想编写一个 Rust 脚本来获取数据并将其保存到本地，您可以使用标准库中的功能来执行这些任务。以下是一个示例 Rust 脚本，演示如何从URL获取数据并将其保存到本地文件：

```rust
use std::fs::File;
use std::io::{self, Write};
use reqwest;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    // 发送 HTTP GET 请求并获取响应
    let response = reqwest::get("https://example.com").await?;

    // 检查响应状态码是否为 200 OK
    if !response.status().is_success() {
        eprintln!("HTTP request failed with status code: {:?}", response.status());
        return Ok(());
    }

    // 读取响应体的字节数据
    let bytes = response.bytes().await?;

    // 指定本地文件路径
    let file_path = "output.txt";

    // 打开或创建文件并写入响应数据
    let mut file = File::create(file_path)?;

    // 将字节数据写入文件
    file.write_all(&bytes)?;

    println!("Data saved to {}", file_path);

    Ok(())
}
```

在这个示例中，我们使用了 `reqwest` 库来发送 HTTP GET 请求并获取响应。然后，我们检查响应的状态码是否为 200 OK，如果不是，就打印错误消息并退出。接着，我们读取响应体的字节数据，并将其写入本地文件中。

要运行这个脚本，您需要将 `reqwest` 添加到您的 `Cargo.toml` 文件中，如下所示：

```toml
[dependencies]
reqwest = "0.11"
tokio = { version = "1", features = ["full"] }
```

然后，可以使用 `cargo run` 命令来执行脚本。

请注意，这个示例使用了异步 Rust，因此我们使用了 `tokio` 来运行异步任务。如果您不需要异步功能，可以删除异步部分并直接使用同步 HTTP 请求。
