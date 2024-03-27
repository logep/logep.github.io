以下是一个使用 JavaScript 实现的简单的请求重试逻辑示例：

```javascript
function retryRequest(url, maxRetries, delay) {
  return new Promise((resolve, reject) => {
    let retries = 0;

    function doRequest() {
      fetch(url)
        .then(response => {
          if (response.ok) {
            resolve(response);
          } else {
            throw new Error('Request failed');
          }
        })
        .catch(error => {
          retries++;
          console.log(`Request failed, retrying (${retries}/${maxRetries})`);

          if (retries < maxRetries) {
            setTimeout(doRequest, delay);
          } else {
            reject(new Error('Max retries exceeded'));
          }
        });
    }

    doRequest();
  });
}

// Example usage:
const url = 'https://example.com/api/data';
const maxRetries = 3; // Maximum number of retries
const delay = 1000; // Delay between retries in milliseconds (1 second in this case)

retryRequest(url, maxRetries, delay)
  .then(response => {
    console.log('Request succeeded:', response);
  })
  .catch(error => {
    console.error('Request failed after max retries:', error);
  });
```

在这个示例中，`retryRequest` 函数接受三个参数：`url`（请求的 URL）、`maxRetries`（最大重试次数）和 `delay`（重试之间的延迟时间）。它返回一个 Promise，该 Promise 在请求成功时解析，或者在达到最大重试次数后拒绝。

`doRequest` 函数是一个内部函数，用于执行实际的请求。如果请求成功，则解析 Promise；如果请求失败，则增加重试计数器并根据当前重试次数决定是否继续重试。重试采用指数退避策略，即每次重试之间的延迟时间会逐渐增加。
