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
function getOrigin() {
    if($_GET!=null) {
        let originObj = $_GET["origin"].split(";");
        if(originObj.length>1) {
            let obj = originObj[1].split(","),str = '',c;
            for(let i=0;i<obj.length;i++){
                if(obj[i] in $_GET){
                    c = obj[i];
                    str += obj[i]+"="+$_GET[c]+"&";
                }
            }
            return originObj[0]+"?"+str;
        } else {
            return originObj[0];
        }
    } else {
        return "";
    }
}
var getAllPar = (function(){
        let u = window.location.href;
        let p=u.split('?')[1];
        if(p!=null){
            return p;
        }else{
            return "";
        }
})();

function rgba2hex(rgba) {
    var hex = rgba.toString(16);
    var color = '#' + hex.slice(2);
    return color;
}