# Node.js HTTP 响应常见错误解决方案

## 1. ERR_INVALID_ARG_TYPE 错误

### 错误原因

```javascript
// ❌ 错误：直接传递对象
res.end({ key: "value" });

// ❌ 错误：传递数字
res.end(123);

// ❌ 错误：传递数组
res.end(["item1", "item2"]);
```

### 正确做法

```javascript
// ✅ 正确：传递字符串
res.end("Hello World");

// ✅ 正确：传递JSON字符串
res.end(JSON.stringify({ key: "value" }));

// ✅ 正确：传递Buffer
res.end(Buffer.from("Hello World"));
```

## 2. 设置正确的 Content-Type

```javascript
// JSON响应
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify(data));

// HTML响应
res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
res.end("<h1>Hello HTML</h1>");

// 纯文本响应
res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
res.end("Hello Text");

// 文件下载
res.writeHead(200, {
  "Content-Type": "application/octet-stream",
  "Content-Disposition": 'attachment; filename="file.txt"',
});
res.end(fileBuffer);
```

## 3. 错误处理最佳实践

```javascript
const server = http.createServer((req, res) => {
  try {
    // 你的逻辑代码
    const data = { message: "success" };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Server error:", error);

    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      })
    );
  }
});
```

## 4. 异步操作处理

```javascript
const server = http.createServer(async (req, res) => {
  try {
    // 异步获取数据
    const data = await fetchDataFromDatabase();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Database error" }));
  }
});
```

## 5. 常用工具函数

```javascript
// 发送JSON响应的工具函数
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data));
}

// 发送错误响应的工具函数
function sendError(res, statusCode, message) {
  sendJSON(res, statusCode, {
    error: true,
    message: message,
  });
}

// 使用示例
const server = http.createServer((req, res) => {
  if (req.url === "/api/data") {
    sendJSON(res, 200, { success: true, data: "some data" });
  } else {
    sendError(res, 404, "Not Found");
  }
});
```
