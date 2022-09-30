var $_GET = (function() {
    var url = document.location.search;
    var param = url.split("?");
    var get = {};
    if ("string" == typeof(param[1])) {
        var pair = param[1].split("&");
        for (var i in pair) {
            var j = pair[i].split("=");
            get[j[0]] = j[1] ? j[1] : "";
        }
    }
    return get;
})();
// 时间转换
function timestampToTime(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '年';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
    var D = date.getDate() + '日 ';
    var h = date.getHours() + ':';
    var m = date.getMinutes() + ':';
    var s = date.getSeconds();
    return Y + M + D + h + m + s;
}

function getOrigin() {
    if ($_GET["origin"] != null && $_GET["origin"] != "") {
        let originlink = $_GET["origin"].replace(/;;;/g, '?')
            .replace(/;;/g, '=')
            .replace(/;/g, '&');
        return originlink;
    } else {
        return '';
    }
}
var getAllPar = (function() {
    let u = window.location.href;
    let p = u.split('?')[1];
    if (p != null) {
        return p;
    } else {
        return "";
    }
})();

function rgba2hex(rgba) {
    var hex = rgba.toString(16);
    var color = '#' + hex.slice(hex.length - 6);
    return color;
}
//界面toast提示
/*
    msg弹窗信息
    duration弹窗时间
*/
function Toast(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement('div');
    m.innerHTML = msg;
    m.style.cssText = "font-family:siyuan;max-width:60%;min-width: 150px;padding:0 10px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 14px;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
        m.style.opacity = '0';
        setTimeout(function() {
            document.body.removeChild(m)
        }, d * 1000);
    }, duration);
}
//返回上一页
function lgourl() {
    var returnUrl = window.location.hash;
    if (returnUrl != "") {
        window.location.href = returnUrl.slice(1);
    } else {
        window.location.href = '/main/index.html';
    }
}