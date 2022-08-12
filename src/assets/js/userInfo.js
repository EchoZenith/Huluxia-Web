$(function() {
    /*
    This code by PeterCoast
    */
    let _key = $.cookie('Huluxia-Web-_key'), userID = $.cookie('Huluxia-Web-userID');
    if (_key != null || _userID == null) {
        if ($_GET["user_id"] == null || $_GET["user_id"] == "") {
            if ($_GET["origin"] != null) {
                window.location.href = "../" + $_GET["origin"];
            } else {
                window.location.href = "../category/";
            }
        } else {
            $.getJSON('http://floor.huluxia.com/user/info/ANDROID/4.1.8?jsoncallback=?', {
                _key: _key,
                user_id: $_GET["user_id"]
            }, function(data) {
                if (data.code == 103) {
                    //key已失效
                    alert("未登录");
                    window.location.href = "../login/";
                } else if (data.code == null) {
                    if ($.cookie("Huluxia-Web-userID") == $_GET["user_id"]) {
                        $(".who")
                            .text("我");
                    } else {
                        $(".who")
                            .text("他");
                    }
                    space = data.space; //背景信息
                    postCount = data.postCount; //帖子数
                    followingCount = data.followingCount; //关注数
                    followerCount = data.followerCount; //粉丝数
                    gameCommentCount = data.gameCommentCount; //游评数
                    commentCount = data.commentCount; //回复数
                    favoriteCount = data.favoriteCount; //收藏数
                    avatar = data.avatar; //头像
                    nick = data.nick; //昵称
                    age = data.age; //年龄
                    gender = data.gender; //性别(1女 2男)
                    level = data.level; //等级
                    integral = data.integral; //贡献值
                    integralNick = data.integralNick; //贡献名
                    credits = data.credits; //葫芦数
                    ipAddr = data.ipAddr; //ip属地
                    identityTitle = data.identityTitle; //称号
                    medalList = data.medalList; //勋章列表
                    photos = data.photos; //照片列表
                    signature = data.signature; //个性签名
                    hometown = data.hometown; //家乡
                    school = data.schoolInfo; //学校
                    tags = data.tags; //标签
                    beenLocations = data.beenLocations; //去过的地方
                    lastLoginTime = (Date.parse(new Date()) - data.lastLoginTime) / 3600000; //最后登录的时间（单位时）
                    if (lastLoginTime > 8766) {
                        lastLoginTime /= 8766;
                        lastLoginTime = Math.round(lastLoginTime) + "年前";
                    } else if (lastLoginTime > 730.5) {
                        lastLoginTime /= 730.5;
                        lastLoginTime = Math.round(lastLoginTime) + "月前";
                    } else if (lastLoginTime > 24.35) {
                        lastLoginTime /= 30;
                        lastLoginTime = Math.round(lastLoginTime) + "天前";
                    } else {
                        lastLoginTime = Math.round(lastLoginTime) + "时前";
                    }
                    $("#post")
                        .text(postCount);
                    $("#following")
                        .text(followingCount);
                    $("#follower")
                        .text(followerCount);
                    $("#gameComment")
                        .text(gameCommentCount);
                    $("#comment")
                        .text(commentCount);
                    $("#favorite")
                        .text(favoriteCount);
                    $("#usericon")
                        .attr("src", avatar);
                    $("#nick")
                        .text(nick);
                    $("#credits")
                        .text(credits);
                    if (integralNick == null) {
                        $("#integral")
                            .text(integral);
                    } else {
                        $("#integral")
                            .text(integralNick);
                    }
                    $("#ipAddr")
                        .text(ipAddr);
                    $("#lastTime")
                        .text(lastLoginTime);
                    if (gender == 1) {
                        age = "♀" + age;
                    } else {
                        age = "♂" + age;
                    }
                    $("#age")
                        .text(age);
                    if (identityTitle == "") {
                        $("#identity")
                            .hide();
                    } else {
                        $("#identity")
                            .text(identityTitle);
                    }
                    $("#level span")
                        .text(level);
                    if (medalList != null) {
                        $("#medalList")
                            .show();
                        for (let i = 0; i < medalList.length; i++) {
                            $("#medalList .flex")
                                .append('<img src="' + medalList[i].url + '">');
                        }
                    }
                    for (let i = 0; i < photos.length; i++) {
                        $("#photos .flex")
                            .append('<img src="' + photos[i].url + '">');
                    }
                    $("#signature")
                        .text(signature);
                    if (space != null) {
                        $(".userInfo")
                            .css({
                            'background-image': 'url("' + space.imgurl + '")',
                            'background-size': 'cover'
                        });
                    }
                    if (hometown != null && hometown.hometown_city != "无") {
                        $("#hometown")
                            .text(hometown.hometown_city + "-" + hometown.hometown_province);
                    }
                    if (school != null && school.school_name != "") {
                        $("#school")
                            .text(school.school_name + "-" + school.school_enteryear);
                    }
                    if (tags.length != 0) {
                        $("#tags")
                            .show();
                        $("#tag div span")
                            .text(tags.length);
                        for (let i = 0; i < tags.length; i++) {
                            $("#tags .flex")
                                .append('<div>' + tags[i].title + '</div>');
                        }
                    }
                    if (beenLocations.length != 0) {
                        $("#beenLocations")
                            .show();
                        $("#beenLocations div span")
                            .text(beenLocations.length);
                        for (let i = 0; i < beenLocations.length; i++) {
                            $("#beenLocations .flex")
                                .append('<div>' + beenLocations[i] + '</div>');
                        }
                    }
                    $(".htmlLoading")
                        .slideUp("slow");
                    $(".content")
                        .show("slow");
                } else if (data.code == 104) {
                    alert("用户不存在");
                    if ($_GET["origin"] != null || $_GET["origin"] != "") {
                        window.location.href = "../" + $_GET["origin"];
                    } else {
                        window.location.href = "../category/";
                    }
                }
            });
        }
    } else {
        alert("未登录");
        window.location.href = "../login/";
    }
});