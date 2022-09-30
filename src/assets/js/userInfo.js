$(function() {
    /*
    This code by PeterCoast
    */
    let _key = $.cookie('Huluxia-Web-_key'), userID = $.cookie('Huluxia-Web-userID');
    if (_key != null && userID != null) {
        if ($_GET["user_id"] == null || $_GET["user_id"] == "") {
            lgourl();
        } else {
            $.getJSON('http://floor.huluxia.com/user/info/ANDROID/4.1.8?jsoncallback=?', {
                _key: _key,
                user_id: $_GET["user_id"]
            }, function(data) {
                if (data.code == 103) {
                    //key已失效
                    alert("未登录");
                    location.href = "../login/index.html#" + location.href;
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
                    levelColor = data.levelColor; //等级颜色
                    integral = data.integral; //贡献值
                    integralNick = data.integralNick; //贡献名
                    credits = data.credits; //葫芦数
                    ipAddr = data.ipAddr; //ip属地
                    identityTitle = data.identityTitle; //称号
                    identityColor = data.identityColor; //称号颜色
                    medalList = data.medalList; //勋章列表
                    photos = data.photos; //照片列表
                    signature = data.signature; //个性签名
                    hometown = data.hometown; //家乡
                    school = data.schoolInfo; //学校
                    tags = data.tags; //标签
                    beenLocations = data.beenLocations; //去过的地方
                    lastLoginTime = (Date.parse(new Date()) - data.lastLoginTime) / 60000; //最后登录的时间（单位分）
                    if (lastLoginTime > 525960) {
                        lastLoginTime /= 525960;
                        lastLoginTime = Math.round(lastLoginTime) + "年前";
                    } else if (lastLoginTime > 43830) {
                        lastLoginTime /= 43830;
                        lastLoginTime = Math.round(lastLoginTime) + "月前";
                    } else if (lastLoginTime > 1461) {
                        lastLoginTime /= 1800;
                        lastLoginTime = Math.round(lastLoginTime) + "天前";
                    } else if (lastLoginTime > 60) {
                        lastLoginTime /= 60;
                        lastLoginTime = Math.round(lastLoginTime) + "时前";
                    } else if (lastLoginTime > 15) {
                        lastLoginTime = Math.round(lastLoginTime) + "分前";
                    } else {
                        lastLoginTime = "刚刚";
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
                    if ($_GET["user_id"] == $.cookie("Huluxia-Web-userID")) {
                        $("#lastTime")
                            .hide();
                    } else {
                        $("#lastTime")
                            .text(lastLoginTime);
                    }
                    if (gender == 2) {
                        $("#age")
                            .text("♂" + age)
                            .css("background", "#00CCF5");
                    } else {
                        $("#age")
                            .text("♀" + age)
                            .css("background", "#FF41A5");
                    }

                    if (identityTitle == "") {
                        $("#identity")
                            .hide();
                    } else {
                        $("#identity")
                            .text(identityTitle)
                            .css("background", rgba2hex(identityColor));
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
                        if (space.id == 0) {
                            $("#null")
                                .css({
                                'background-image': 'url("' + space.imgurl + '")',
                                'background-size': 'cover'
                            });
                            $("#userinfo,#tags,#beenLocations,#perInfo,#photos,#medalList")
                                .css({
                                "background": "rgb(255,255,255)"
                            });
                            $(".color-white")
                                .each(function() {
                                $(this)
                                    .removeClass("color-white");
                                $(this)
                                    .addClass("color-black");
                            });
                            $(".userInfo")
                                .css({
                                "background": "rgb(240,240,240)"
                            });
                        } else {
                            $(".userInfo")
                                .css({
                                'background-image': 'url("' + space.imgurl + '")',
                                'background-size': 'cover'
                            });
                        }
                    } else if (space == null) {
                        $(".userInfo")
                            .css({
                            'background-image': 'url("../../assets/img/bg_profile.png")',
                            'background-size': 'cover'
                        });
                    }
                    if (hometown != null && hometown.hometown_city != "无") {
                        $("#hometown")
                            .text(hometown.hometown_city + "-" + hometown.hometown_province);
                    }
                    if (school != null && school.school_enteryear != 0 && school.school_name != "") {
                        $("#school")
                            .text(school.school_name + "-" + school.school_enteryear);
                    }
                    if (tags.length != 0) {
                        $("#tags")
                            .show();
                        $("#tags div span")
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
                    
                    $("#post").click(function(){
                        location.href = "../user_post_list/index.html?user_id="+$_GET["user_id"]+"#"+location.href;
                    });//帖子按钮点击
                    $("#following").click(function(){
                        location.href = "../user_follow/index.html?type=1&user_id="+$_GET["user_id"]+"#"+location.href;
                    });//关注按钮点击
                    $("#follower").click(function(){
                        location.href = "../user_follow/index.html?type=2&user_id="+$_GET["user_id"]+"#"+location.href;
                    });//粉丝按钮点击
                    $("#comment").click(function(){
                        location.href = "../user_comment/index.html?user_id="+$_GET["user_id"]+"#"+location.href;
                    });//回复按钮点击
                    $("#favorite").click(function(){
                        location.href = "../user_post_list/index.html?type=favorite&user_id="+$_GET["user_id"]+"#"+location.href;
                    });//收藏按钮点击
                    
                    $(".content")
                        .show("slow");
                    $("#integral").click(function(){
                        location.href="../cgourd/index.html?user_id="+$_GET["user_id"]+"&type=c&nick="+nick+"&age="+age+"&gender="+gender+"&avatar="+avatar+"&integral="+integral+"#"+location.href;
                    });
                    $("#credits").click(function(){
                        location.href="../cgourd/index.html?type=g&nick="+nick+"&age="+age+"&gender="+gender+"&avatar="+avatar+"&credits="+credits+"#"+location.href;
                    });
                    if ($.cookie("Huluxia-Web-userID") != $_GET["user_id"]) {
                        $(".ftools")
                            .show();
                        $.getJSON("http://floor.huluxia.com/friendship/check/ANDROID/2.1?jsoncallback=?", {
                            _key: _key,
                            user_id: $_GET["user_id"]
                        }, function(data) {
                            switch (data.friendship) {
                                case 0:
                                    //对方关注了你
                                    $(".follow")
                                        .text("关注")
                                        .attr("ship", "0")
                                        .css("color", "rgb(249,183,0)");
                                    break;
                                case 1:
                                    //你关注了对方
                                    $(".follow")
                                        .text("已关注")
                                        .attr("ship", "1")
                                        .css("color", "rgb(172,172,172)");
                                    break;
                                case 2:
                                    //互关
                                    $(".follow")
                                        .text("互相关注")
                                        .attr("ship", "2")
                                        .css("color", "rgb(25,212,105)");
                                    break;
                                case 3:
                                    //互不关
                                    $(".follow")
                                        .text("关注")
                                        .attr("ship", "3")
                                        .css("color", "rgb(249,183,0)");
                                    break;
                            }
                            $(".follow")
                                .click(function() {
                                switch ($(this)
                                    .attr("ship")) {
                                    case "0":
                                        $.getJSON("http://floor.huluxia.com/friendship/follow/ANDROID/2.0?jsoncallback=?",{_key:_key,user_id:$_GET["user_id"]});
                                        $(".follow")
                                        .text("互相关注")
                                        .attr("ship", "2")
                                        .css("color", "rgb(25,212,105)");
                                        Toast("关注成功",500);
                                        break;
                                    case "1":
                                        $.getJSON("http://floor.huluxia.com/friendship/unfollow/ANDROID/2.0?jsoncallback=?",{_key:_key,user_id:$_GET["user_id"]});
                                        $(".follow")
                                        .text("关注")
                                        .attr("ship", "3")
                                        .css("color", "rgb(249,183,0)");
                                        Toast("取消关注成功",500);
                                        break;
                                    case "2":
                                        $.getJSON("http://floor.huluxia.com/friendship/unfollow/ANDROID/2.0?jsoncallback=?",{_key:_key,user_id:$_GET["user_id"]});
                                        $(".follow")
                                        .text("关注")
                                        .attr("ship", "0")
                                        .css("color", "rgb(249,183,0)");
                                        Toast("取消关注成功",500);
                                        break;
                                    case "3":
                                    $.getJSON("http://floor.huluxia.com/friendship/follow/ANDROID/2.0?jsoncallback=?",{_key:_key,user_id:$_GET["user_id"]});
                                    $(".follow")
                                        .text("已关注")
                                        .attr("ship", "1")
                                        .css("color", "rgb(172,172,172)");
                                        Toast("关注成功",500);
                                        break;
                                }
                            });
                            $(".complaint").click(function(){
                                $.getJSON("http://floor.huluxia.com/complaint/ANDROID/4.0?jsoncallback=?",{_key,_key,file_id:$_GET["user_id"]},function() {
                                    Toast("举报成功",500);
                                });
                            });
                        });
                    }
                } else if (data.code == 104) {
                    alert("用户不存在");
                    lgourl();
                }
            });
        }
    } else {
        alert("未登录");
        location.href = "../login/index.html#" + location.href;
    }
});