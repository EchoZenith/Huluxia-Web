$(function() {
    /*
    This code by PeterCoast
    */
    if ($_GET["cat_id"] == "" || $_GET["cat_id"] == null) {
        window.location.href = "../category/";
    }
    $.getJSON("http://floor.huluxia.com/big/shot/list/ANDROID/4.1?jsoncallback=?", {
        cat_id: $_GET["cat_id"],
        start: 0,
        count: 20
    }, function(data) {
        let bigShot = data.bigShot;
        let user, seq, nick, avatar, age, gender, identityTitle, weektotal;
        for (let i = 0; i < bigShot.length; i++) {
            seq = bigShot[i].seq;
            user = bigShot[i].user;
            weektotal = bigShot[i].weektotal;
            avatar = user.avatar;
            nick = user.nick;
            age = user.age;
            user_id = user.userID;
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
                $(".master .flex .flex .bf")
                    .before('<div user_id="' + user_id + '" class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span></div></div><div class="weektotal"><span>' + weektotal + '</span>分</div></div><hr>');
            } else {
                $(".master .flex .flex .bf")
                    .before('<div user_id="' + user_id + '" class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span>&nbsp;<span style="background:'+rgba2hex(identityColor)+'" class="identityTitleTag">' + identityTitle + '</span></div></div><div class="weektotal"><span>' + weektotal + '</span>分</div></div><hr>');
            }
        }
        $(".item-list")
            .slideDown("slow");
        $(".master .flex .flex .bf")
            .attr("start", "20");
        $(".item")
            .click(function() {
            window.location.href = "../userinfo/?user_id=" + $(this)
                .attr("user_id") + "&cat_id=" + $_GET["cat_id"] + "&origin=daren/;cat_id";
        });

    });
});
$(".master .flex .flex .bf")
    .click(function() {
    $(this)
        .text("Loading···");
    $.getJSON("http://floor.huluxia.com/big/shot/list/ANDROID/4.1?jsoncallback=?", {
        cat_id: $_GET["cat_id"],
        start: $(this)
            .attr("start"),
        count: 20
    }, function(data) {
        let bigShot = data.bigShot;
        let user, seq, nick, avatar, age, gender, identityTitle, weektotal;
        for (let i = 0; i < bigShot.length; i++) {
            seq = bigShot[i].seq;
            user = bigShot[i].user;
            weektotal = bigShot[i].weektotal;
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
                $(".master .flex .flex .bf")
                    .before('<div user_id="' + user_id + '" class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span></div></div><div class="weektotal"><span>' + weektotal + '</span>分</div></div><hr>');
            } else {
                $(".master .flex .flex .bf")
                    .before('<div user_id="' + user_id + '" class="flex item"><div style="text-align:center;width:30px" class="seq">' + seq + '</div><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span>&nbsp;<span style="background:'+rgba2hex(identityColor)+'" class="identityTitleTag">' + identityTitle + '</span></div></div><div class="weektotal"><span>' + weektotal + '</span>分</div></div><hr>');
            }
        }
        $(".master .flex .flex .bf")
            .attr("start", parseInt($(".master .flex .flex .bf")
            .attr("start")) + 20);
        $(".item")
            .click(function() {
            window.location.href = "../userinfo/?user_id=" + $(this)
                .attr("user_id") + "&cat_id=" + $_GET["cat_id"] + "&origin=daren/;cat_id";
        });
        $(".master .flex .flex .bf")
            .text("加载更多");
    });
});