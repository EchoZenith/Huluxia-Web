$(function(){
    /*
    This code by PeterCoast
    */
    $("#loginBut").click(function(){
        let account = $("#account").val(),password=$("#password").val();
        $.getJSON("../../php/account/login/ANDROID/4.0.php",{account:account,password:password},function(data){
            if(data.code==1102||data.code==1101){
                /*账号或密码错误*/
                alert(data.msg);
            } else if(data.code==104){
                /*账号被锁定*/
                alert(data.msg);
            } else if(data._key!=null){
                /*登录成功*/
                let _key=data._key, userID=data.user.userID,nick=data.user.nick,avatar=data.user.avatar;
                $.cookie("Huluxia-Web-_key",_key,{ expires: 30,path:'/' });
                $.cookie("Huluxia-Web-userID",userID,{ expires: 30,path:'/' });
                $.cookie("Huluxia-Web-nick",nick,{ expires: 30,path:'/' });
                $.cookie("Huluxia-Web-avatar",avatar,{ expires: 30,path:'/' });
                window.location.href="../"+getOrigin();
            } else if(data.code==102) {
                /*参数不合法*/
                alert(data.msg+"\n请检查账号或密码是否正确");
            } else if(data.code==101) {
                /*参数不能为空*/
                alert(data.msg);
            } else {
                /*未知错误*/
                alert(data.msg+"\ncode："+data.code);
            }
        });
    });
});