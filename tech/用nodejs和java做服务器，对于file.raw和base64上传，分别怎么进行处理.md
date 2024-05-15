在Node.js和Java服务器上处理文件上传（包括file.raw和base64）的方法略有不同。下面我将分别介绍在Node.js和Java服务器上如何处理这两种文件上传。

### 在Node.js服务器上处理文件上传：

#### 处理file.raw：

对于file.raw，你可以直接将其保存到文件系统中或者将其发送到其他服务器或存储服务。以下是一个简单的示例，将file.raw保存到本地文件系统中：

```javascript
const fs = require('fs');

// 接收文件上传请求的路由处理函数
function handleFileUpload(req, res) {
  const file = req.file; // 假设使用multer中间件处理文件上传

  fs.writeFile('uploaded_file.jpg', file.buffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error uploading file');
    } else {
      res.status(200).send('File uploaded successfully');
    }
  });
}
```

#### 处理base64：

对于base64，你可以先将其解码成二进制数据，然后保存到文件系统中或者处理其他逻辑。

```javascript
const fs = require('fs');

// 接收base64上传请求的路由处理函数
function handleBase64Upload(req, res) {
  const base64Data = req.body.base64Data; // 假设base64数据在请求体中

  const dataBuffer = Buffer.from(base64Data, 'base64');

  fs.writeFile('uploaded_file.jpg', dataBuffer, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error uploading file');
    } else {
      res.status(200).send('File uploaded successfully');
    }
  });
}
```

### 在Java服务器上处理文件上传：

#### 处理file.raw：

在Java中，你可以使用流来处理文件上传。以下是一个使用Spring Framework的示例：

```java
import org.springframework.web.multipart.MultipartFile;

// 处理文件上传请求的Controller方法
public String handleFileUpload(@RequestParam("file") MultipartFile file) {
    try {
        byte[] bytes = file.getBytes();
        Path path = Paths.get("uploaded_file.jpg");
        Files.write(path, bytes);
        return "File uploaded successfully";
    } catch (IOException e) {
        e.printStackTrace();
        return "Error uploading file";
    }
}
```

#### 处理base64：

对于base64，你可以先将其解码成二进制数据，然后处理。

```java
import java.util.Base64;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.io.IOException;

// 处理base64上传请求的Controller方法
public String handleBase64Upload(@RequestParam("base64Data") String base64Data) {
    try {
        byte[] bytes = Base64.getDecoder().decode(base64Data);
        Path path = Paths.get("uploaded_file.jpg");
        Files.write(path, bytes);
        return "File uploaded successfully";
    } catch (IOException e) {
        e.printStackTrace();
        return "Error uploading file";
    }
}
```

这些是基本的示例，具体的实现可能因框架和业务逻辑而有所不同。
