var $_GET = (function() {
    var url = document.location.href;
    var param = url.split("?");
    var get = {};
    if ("string" == typeof(param[1])) {
        var pair = param[1].split("&");
        for (var i in pair) {
            var j = pair[i].split("=");
            get[j[0]] = j[1]? j[1]: "";
        }
    }
    return get;
})();
// 时间转换
function timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '年';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        var D = date.getDate() + '日 ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y+M+D+h+m+s;
}
