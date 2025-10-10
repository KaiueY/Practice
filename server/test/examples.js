const http = require('http');

// 示例1: 发送JSON响应（推荐用于API）
function sendJSONResponse(res, data) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    res.end(JSON.stringify(data));
}

// 示例2: 发送HTML响应
function sendHTMLResponse(res, htmlContent) {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });
    res.end(htmlContent);
}

// 示例3: 发送纯文本响应
function sendTextResponse(res, text) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
    });
    res.end(text);
}

// 示例4: 根据URL路径返回不同响应
const server = http.createServer((req, res) => {
    const url = req.url;
    
    if (url === '/api/user') {
        // 返回JSON数据
        sendJSONResponse(res, {
            name: 'John Doe',
            age: 30,
            city: 'New York'
        });
    } else if (url === '/') {
        // 返回HTML页面
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>主页</title>
        </head>
        <body>
            <h1>欢迎访问我的服务器</h1>
            <p><a href="/api/user">获取用户信息 (JSON)</a></p>
        </body>
        </html>
        `;
        sendHTMLResponse(res, html);
    } else {
        // 返回404错误
        res.writeHead(404, {
            'Content-Type': 'text/plain; charset=utf-8'
        });
        res.end('页面未找到');
    }
});

// 如果你想运行这个示例，取消下面的注释
// server.listen(3001, () => {
//     console.log('Examples server running at http://localhost:3001/');
// });

module.exports = { sendJSONResponse, sendHTMLResponse, sendTextResponse };
