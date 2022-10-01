$(function() {
    /*
    This code by PeterCoast
    */
    if (location.search != null && location.search != "") Toast("未登录", 500);
    $("#loginBut")
        .click(function() {
        let account = $("#account")
            .val(), password = $("#password")
            .val();
        if (account.length != 11 || password.length == 0) {
            Toast("请输入正确的账号或密码", 1000);
        } else {
            $.getJSON("../../php/account/login/ANDROID/4.0.php", {
                account: account,
                password: password
            }, function(data) {
                if (data.code == 1102 || data.code == 1101) {
                    /*账号或密码错误*/
                    Toast(data.msg, 1000);
                } else if (data.code == 104) {
                    /*账号被锁定*/
                    Toast(data.msg, 1000);
                } else if (data._key != null) {
                    /*登录成功*/
                    let _key = data._key, userID = data.user.userID, nick = data.user.nick, avatar = data.user.avatar;
                    $.cookie("Huluxia-Web-_key", _key, {
                        expires: 30,
                        path: '/'
                    });
                    $.cookie("Huluxia-Web-userID", userID, {
                        expires: 30,
                        path: '/'
                    });
                    lgourl();
                } else if (data.code == 102) {
                    /*参数不合法*/
                    Toast(data.msg + "\n请检查账号或密码是否正确", 1000);
                } else if (data.code == 101) {
                    /*参数不能为空*/
                    Toast(data.msg, 1000);
                } else {
                    /*未知错误*/
                    Toast(data.msg + "\ncode：" + data.code, 1000);
                }
            });
        }
    });
});