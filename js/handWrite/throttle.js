/**
 * 节流函数 - 限制函数在一定时间内只能执行一次
 * @param func 需要节流的函数
 * @param delay 节流延迟时间（毫秒）
 * @returns 返回一个包装后的节流函数
 */
function throttle(func, delay) {
    var lastTime;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var nowTime = Date.now();
        if (!lastTime || nowTime - lastTime >= delay) {
            func.apply(this, args);
            lastTime = nowTime;
        }
    };
}
// 测试用例
// 1. 基础节流测试
var logMessage = function (message) {
    console.log("".concat(Date.now(), ": ").concat(message));
};
var throttledLog = throttle(logMessage, 1000);
// 连续调用多次，每秒只会执行一次
console.log('开始基础节流测试...');
throttledLog('测试1');
throttledLog('测试2');
throttledLog('测试3');
