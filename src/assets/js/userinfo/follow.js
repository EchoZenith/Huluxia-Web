$(function() {
    if ($_GET["user_id"] == null || $_GET["user_id"] == "") {
        lgourl();
    } else {
        $(".bf")
            .click(function() {
            $(this)
                .text("Loading···")
            switch ($_GET["type"]) {
                case "2":
                    $(".backTitle")
                        .text("粉丝列表");
                    $.getJSON("http://floor.huluxia.com/friendship/follower/list/ANDROID/4.1.8?jsoncallback=?", {
                        user_id: $_GET["user_id"],
                        start: $(this)
                            .attr("start")
                    }, function(data) {
                        start = data.start;
                        for (let i = 0; i < data.friendships.length; i++) {
                            user = data.friendships[i].user;
                            nick = user.nick;
                            avatar = user.avatar;
                            user_id = user.userID;
                            gender = user.gender;
                            age = user.age;
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
                                $(".bf")
                                    .before('<div user_id="' + user_id + '" class="flex isClickBackground item"><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span></div></div></div><hr>');
                            } else {
                                $(".bf")
                                    .before('<div user_id="' + user_id + '" class="flex isClickBackground item"><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span>&nbsp;<span style="background:' + rgba2hex(identityColor) + '" class="identityTitleTag">' + identityTitle + '</span></div></div></div><hr>');
                            }
                        }
                        if (data.more == 0) {
                            $(".bf")
                                .hide();
                        } else {
                            $(".bf")
                                .text("加载更多");
                            $(".bf")
                                .attr("start", start);
                        }
                        $(".item")
                            .click(function() {
                            location.href = "../userInfo/?user_id=" + $(this)
                                .attr("user_id") + "#" + location.href;
                        });
                    });
                    break;
                default:
                    $(".backTitle")
                        .text("关注列表");
                    $.getJSON("http://floor.huluxia.com/friendship/following/list/ANDROID/4.1.8?jsoncallback=?", {
                        user_id: $_GET["user_id"],
                        start: $(this)
                            .attr("start")
                    }, function(data) {
                        start = data.start;
                        for (let i = 0; i < data.friendships.length; i++) {
                            user = data.friendships[i].user;
                            nick = user.nick;
                            avatar = user.avatar;
                            user_id = user.userID;
                            gender = user.gender;
                            age = user.age;
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
                                $(".bf")
                                    .before('<div user_id="' + user_id + '" class="flex isClickBackground item"><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span></div></div></div><hr>');
                            } else {
                                $(".bf")
                                    .before('<div user_id="' + user_id + '" class="flex isClickBackground item"><div class="img"><img src="' + avatar + '"></div><div class="flex flex1 info flex-column"><div id="nick">' + nick + '</div><div style><span style="background:' + ageColor + ';" class="ageTag">' + age + '</span>&nbsp;<span style="background:' + rgba2hex(identityColor) + '" class="identityTitleTag">' + identityTitle + '</span></div></div></div><hr>');
                            }
                        }
                        if (data.more == 0) {
                            $(".bf")
                                .hide();
                        } else {
                            $(".bf")
                                .text("加载更多");
                            $(".bf")
                                .attr("start", start);
                        }
                        $(".item")
                            .click(function() {
                            location.href = "../userInfo/?user_id=" + $(this)
                                .attr("user_id") + "#" + location.href;
                        });
                    });
                    break;
            }
        });
        $(".content")
            .show("slow");
        $(".bf")
            .click();
    }
});