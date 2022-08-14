$(function() {
    /*
    This code by PeterCoast
    */
    if ($_GET["cat_id"] == "" || $_GET["cat_id"] == null) {
        window.location.href = "../category/";
    }
    $.getJSON("http://floor.huluxia.com/sgin/list/ANDROID/2.2?jsoncallback=?", {
        cat_id: $_GET["cat_id"],
        start: 0,
        count: 20
    }, function(data) {
        let sign = data.sign;
        let user, seq, nick, avatar, age, gender, identityTitle, weektotal;
        for (let i = 0; i < sign.length; i++) {
            seq = sign[i].seq;
            user = sign[i].user;
            weektotal = sign[i].weektotal;
            avatar = user.avatar;
            nick = user.nick;
            user_id = user.userID;
            age = user.age;
            gender = user.gender;
            identityTitle = user.identityTitle;
            identityColor = user.identityColor;
            if (gender == 2) {
                age = "♂" + age;
                ageColor = "#00CCF5";
            } else {
                age = "♀" + age;
                ageColor = "#FF41A5";
            }
            if (identityTitle == "") {
                $(".signin .flex .flex .bf")
                    .before('<div user_id="' + user_id + '" class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span></div></div><div class="weektotal">签到<span>' + weektotal + '</span>天</div></div><hr>');
            } else {
                $(".signin .flex .flex .bf")
                    .before('<div user_id="' + user_id + '" class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span>&nbsp;<span style="background:' + rgba2hex(identityColor) + '" class="identityTitleTag">' + identityTitle + '</span></div></div><div class="weektotal">签到<span>' + weektotal + '</span>天</div></div><hr>');
            }
            $(".item")
                .click(function() {
                window.location.href = "../userinfo/?user_id=" + $(this)
                    .attr("user_id") + "&cat_id=" + $_GET["cat_id"] + "&origin=daren/;cat_id";
            });
        }
        $(".item-list")
            .slideDown("slow");
        $(".signin .flex .flex .bf")
            .attr("start", "20");
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
        count: 20
    }, function(data) {
        let sign = data.sign;
        let user, seq, nick, avatar, age, gender, identityTitle, weektotal;
        for (let i = 0; i < sign.length; i++) {
            seq = sign[i].seq;
            user = sign[i].user;
            weektotal = sign[i].weektotal;
            avatar = user.avatar;
            nick = user.nick;
            user_id = user.userID;
            age = user.age;
            gender = user.gender;
            identityTitle = user.identityTitle;
            identityColor = user.identityColor;
            if (gender == 2) {
                age = "♂" + age;
                ageColor = "#00CCF5";
            } else {
                age = "♀" + age;
                ageColor = "#FF41A5";
            }
            if (identityTitle == "") {
                $(".signin .flex .flex .bf")
                    .before('<div user_id="' + user_id + '" class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span></div></div><div class="weektotal">签到<span>' + weektotal + '</span>天</div></div><hr>');
            } else {
                $(".signin .flex .flex .bf")
                    .before('<div user_id="' + user_id + '" class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span>&nbsp;<span style="background:' + rgba2hex(identityColor) + '" class="identityTitleTag">' + identityTitle + '</span></div></div><div class="weektotal">签到<span>' + weektotal + '</span>天</div></div><hr>');
            }
            $(".item")
                .click(function() {
                window.location.href = "../userinfo/?user_id=" + $(this)
                    .attr("user_id") + "&cat_id=" + $_GET["cat_id"] + "&origin=daren/;cat_id";
            });
        }
        $(".signin .flex .flex .bf")
            .attr("start", parseInt($(".signin .flex .flex .bf")
            .attr("start")) + 20);
        $(".signin .flex .flex .bf")
            .text("加载更多");
    });
});