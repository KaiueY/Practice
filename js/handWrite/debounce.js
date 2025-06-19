function debounce(func, delay) {
    var that = this;
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(function () {
            func.apply(that, args);
        }, delay);
    };
}
var foo = function () {
    console.log('hello');
};
var bat = debounce(foo, 1000);
bat();
