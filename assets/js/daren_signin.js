$(function() {
    /*
    begin run code
    This code by PeterCoast
    */
    if ($_GET["cat_id"] == "" || $_GET["cat_id"] == null) {
        window.location.href = "../category/";
    }
    $.getJSON("http://floor.huluxia.com/sgin/list/ANDROID/2.2?jsoncallback=?", {
        cat_id: $_GET["cat_id"],
        start: 0,
        count: 50
    }, function(data) {
        let sign = data.sign;
        console.log(data);
        let user, seq, nick, avatar, age, gender, identityTitle,weektotal;
        for (let i = 0; i < sign.length; i++) {
            seq = sign[i].seq;
            user = sign[i].user;
            weektotal=sign[i].weektotal;
            avatar = user.avatar;
            nick = user.nick;
            age = user.age;
            gender = user.gender;
            identityTitle = user.identityTitle;
            if (gender == 1) {
                if (identityTitle == "") {
                    $(".signin .flex .flex .bf")
                        .before('<div class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span class="girlAgeTag">♀' + age + '</span></div></div><div class="weektotal">签到<span>'+weektotal+'</span>天</div></div><hr>');
                } else {
                    $(".signin .flex .flex .bf")
                        .before('<div class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span class="girlAgeTag">♀' + age + '</span>&nbsp;<span class="identityTag">' + identityTitle + '</span></div></div><div class="weektotal">签到<span>'+weektotal+'</span>天</div></div><hr>');
                }
            } else {
                if (identityTitle == "") {
                    $(".signin .flex .flex .bf")
                        .before('<div class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span class="boyAgeTag">♂' + age + '</span></div></div><div class="weektotal">签到<span>'+weektotal+'</span>天</div></div><hr>');
                } else {
                    $(".signin .flex .flex .bf")
                        .before('<div class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span class="boyAgeTag">♂' + age + '</span>&nbsp;<span class="identityTag">' + identityTitle + '</span></div></div><div class="weektotal">签到<span>'+weektotal+'</span>天</div></div><hr>');
                }
            }
        }
        $(".item-list")
            .slideDown("slow");
        $(".signin .flex .flex .bf")
            .attr("start", "50");
        $(".htmlLoading")
            .slideUp("slow");
    });
});
$(".signin .flex .flex .bf")
    .click(function() {
    $(this)
        .text("Loading···");
    $.getJSON("http://floor.huluxia.com/sgin/list/ANDROID/2.2?jsoncallback=?", {
        cat_id: $_GET["cat_id"],
        start: $(this)
            .attr("start"),
        count: 50
    }, function(data) {
        let sign = data.sign;
        let user, seq, nick, avatar, age, gender, identityTitle,weektotal;
        for (let i = 0; i < sign.length; i++) {
            seq = sign[i].seq;
            user = sign[i].user;
            weektotal=sign[i].weektotal;
            avatar = user.avatar;
            nick = user.nick;
            age = user.age;
            gender = user.gender;
            identityTitle = user.identityTitle;
            if (gender == 1) {
                if (identityTitle == "") {
                    $(".signin .flex .flex .bf")
                        .before('<div class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span class="girlAgeTag">♀' + age + '</span></div></div><div class="weektotal">签到<span>'+weektotal+'</span>天</div></div><hr>');
                } else {
                    $(".signin .flex .flex .bf")
                        .before('<div class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span class="girlAgeTag">♀' + age + '</span>&nbsp;<span class="identityTag">' + identityTitle + '</span></div></div><div class="weektotal">签到<span>'+weektotal+'</span>天</div></div><hr>');
                }
            } else {
                if (identityTitle == "") {
                    $(".signin .flex .flex .bf")
                        .before('<div class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span class="boyAgeTag">♂' + age + '</span></div></div><div class="weektotal">签到<span>'+weektotal+'</span>天</div></div><hr>');
                } else {
                    $(".signin .flex .flex .bf")
                        .before('<div class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span class="boyAgeTag">♂' + age + '</span>&nbsp;<span class="identityTag">' + identityTitle + '</span></div></div><div class="weektotal">签到<span>'+weektotal+'</span>天</div></div><hr>');
                }
            }
        }
        $(".signin .flex .flex .bf")
            .attr("start", parseInt($(".signin .flex .flex .bf")
            .attr("start")) + 50);
        $(".signin .flex .flex .bf")
            .text("加载更多");
    });
});