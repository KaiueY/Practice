const http = require('http');

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>My Simple Server</title>
</head>
<body>
    <h1>Hello, this is your HTML response!</h1>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    console.log('Request received:', req.method, req.url);
    
    // 解析URL
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    
    // 设置响应头
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    
    // 检查是否匹配 /auth/driver/verify/{id}/{phone} 路径
    const authPattern = /^\/auth\/driver\/verify\/(\d+)\/(\d+)$/;
    const match = pathname.match(authPattern);
    
    if (match) {
        // 提取路径参数
        const driverId = match[1];
        const phone = match[2];
        
        // 返回验证响应对象
        const responseData = {
            success: true,
            message: '驾驶员验证成功',
            data: {
                driverId: parseInt(driverId),
                phone: phone,
                status: 'verified',
                timestamp: new Date().toISOString(),
                token: `auth_token_${driverId}_${Date.now()}`,
                expiresIn: 3600
            }
        };
        
        res.end(JSON.stringify(responseData, null, 2));
    } else {
        // 默认响应
        const responseData = {
            name: 'John Doe',
            age: 30,
            city: 'New York',
            availableEndpoints: [
                'GET /auth/driver/verify/{id}/{phone} - 驾驶员验证接口'
            ]
        };
        
        res.end(JSON.stringify(responseData, null, 2));
    }
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});