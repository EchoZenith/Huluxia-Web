$(function() {
    /*
    This code by PeterCoast
    */
    if ($_GET["post_id"] == "" || $_GET["post_id"] == null) {
        lgourl();
    }
    $.getJSON("../../php/post/detail/ANDROID/4.1.8.php", {
        post_id: $_GET["post_id"]
    }, function(data) {
        console.log(data);
        post = data.post;
        category = post.category;
        comments = data.comments;
        window.totalPage = data.totalPage;
        window.currPageNo = data.currPageNo;
        voice = post.voice;
        user = post.user;
        state = post.state; //帖子状态1正常,2删除,3锁定
        auser_id = user.userID
        anick = user.nick;
        aavatar = user.avatar;
        aidentityTitle = user.identityTitle;
        aidentityColor = user.identityColor;
        alevel = user.level;
        alevelColor = user.levelColor;
        aage = user.age;
        agender = user.gender;
        detail = post.detail;
        title = post.title;
        images = post.images;
        hit = post.hit;
        postType = post.postType;
        commentCount = post.commentCount;
        updateTime = timestampToTime(post.updateTime);
        recommendTopics = post.recommendTopics;
        scorelist = post.scorelist; //葫芦相关（以后实现）
        detail = detail.replace(/<image>/g, "<img src=")
            .replace(/<\/image>/g, ">");
        $(".backTitle")
            .text(category.title);
        $(".middle")
            .text(currPageNo + "/" + totalPage);
        $(".author")
            .attr("user_id", auser_id);
        $(".author #img img")
            .attr("src", aavatar);
        $("#info #nick")
            .text(anick);
        $("#info .tag .level")
            .css("background", rgba2hex(alevelColor));
        $("#info .tag .level span")
            .text(alevel);
        if (agender == 2) {
            $("#info .tag .age")
                .text("♂" + aage)
                .css("background", "#00CCF5");
        } else if (agender == 1) {
            $("#info .tag .age")
                .text("♀" + aage)
                .css("background", "#FF41A5");
        }
        if (aidentityTitle == "") {
            $("#info .tag .identityTitle")
                .hide();
        } else {
            $("#info .tag .identityTitle")
                .text(aidentityTitle)
                .css("background", rgba2hex(aidentityColor));
        }
        $(".author")
            .click(function() {
            location.href = "../userinfo/?user_id=" + $(this)
                .attr("user_id") + "#" + location.href;
        });
        $(".body")
            .html(detail);
        $(".head")
            .html('<div>' + title + '</div><div style="font-size:10px;">' + updateTime + '</div><div><span style="font-size:10px;">阅读：</span><span style="font-size:10px;">' + hit + '</span><span style="font-size:10px;"> 评论：</span><span style="font-size:10px;">' + commentCount + '</span></div>');
        $(".commentCount")
            .text(commentCount);
        if (state == 1) {
            if (postType == 4 || postType == 1) {
                /*图文混编*/
                /*处理帖子中的链接,表情,图片*/
                $(".body text")
                    .each(function() {
                    $(this)
                        .html($(this)
                        .html()
                        .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>')
                        .replace(/\[/g, "<face>[<writeface>")
                        .replace(/\]/g, "</writeface>]</face>"));

                });
                $(".body img")
                    .each(function() {
                    let pic = $(this)
                        .attr('src');
                    $(this)
                        .attr('src', pic.substring(0, pic.indexOf(",")));
                });
                if (recommendTopics != null) {
                    for (let i = 0; i < recommendTopics.length; i++) {
                        $(".body text")
                            .each(function() {
                            $(this)
                                .html($(this)
                                .html()
                                .replace("&lt;", "&amp;lt;")
                                .replace("&gt;", "&amp;gt;")
                                .replace(recommendTopics[i].title.replace("<", "&amp;lt;")
                                .replace(">", "&amp;gt;"), '<recommendTopics post_id="' + recommendTopics[i].postID + '">' + recommendTopics[i].title.replace("&amp;lt;", "&lt;")
                                .replace("&amp;gt;", "&gt;") + '</recommendTopics>')
                                .replace("&amp;lt;", "&lt;")
                                .replace("&amp;gt;", "&gt;"));
                        });
                    }
                }
            } else if (postType == 0 || postType == 3) {
                /*普通模式*/
                /*处理帖子中的链接,表情,图片*/
                $(".body")
                    .each(function() {
                    $(this)
                        .html($(this)
                        .html()
                        .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>')
                        .replace(/\[/g, "<face>[<writeface>")
                        .replace(/\]/g, "</writeface>]</face>"));

                });
                if (recommendTopics != null) {
                    for (let i = 0; i < recommendTopics.length; i++) {
                        $(".body")
                            .html($(".body")
                            .html()
                            .replace("&lt;", "&amp;lt;")
                            .replace("&gt;", "&amp;gt;")
                            .replace(recommendTopics[i].title.replace("<", "&amp;lt;")
                            .replace(">", "&amp;gt;"), '<recommendTopics post_id="' + recommendTopics[i].postID + '">' + recommendTopics[i].title + '</recommendTopics>')
                            .replace("&amp;lt;", "&lt;")
                            .replace("&amp;gt;", "&gt;"));
                    }
                }
            }
            /*判断是否有视频，有就添加视频播放器*/
            if (voice == "") {
                for (let i = 0; i < images.length; i++) {
                    $(".body")
                        .append('<img src="' + images[i] + '">');
                }
            } else {
                voice = JSON.parse(voice);
                $(".video-player video")
                    .attr("src", voice["videohost"] + voice["videofid"]);
                $(".video-player video")
                    .slideDown("slow");
                $(".video-player video")
                    .attr("poster", voice["imghost"] + voice["imgfid"]);
            }
        } else if (state == 2) {
            $("#comment")
                .text("已删除");
        } else if (state == 3) {
            $("#comment")
                .text("已锁定");
        }
        $(".content")
            .fadeToggle("slow");
        $("recommendtopics")
            .click(function() {
            location.href = "../post_content/?post_id=" + $(this)
                .attr("post_id") + "#" + location.href;
        });
        /*加载评论*/
        let str = '', text, seq, createTime, nick, avatar;
        $(".footer")
            .html("");
        for (let i = 0; i < comments.length; i++) {
            text = comments[i].text;
            createTime = timestampToTime(comments[i]["createTime"]);
            nick = comments[i].user.nick;
            user_id = comments[i].user.userID;
            age = comments[i].user.age;
            level = comments[i].user.level;
            levelColor = comments[i].user.levelColor;
            gender = comments[i].user.gender;
            identityColor = comments[i].user.identityColor;
            identityTitle = comments[i].user.identityTitle;
            avatar = comments[i].user.avatar;
            seq = comments[i].seq;
            images = comments[i].images;
            refComment = comments[i].refComment;
            text = text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>')
                .replace(/\[/g, "<face>[<writeface>")
                .replace(/\]/g, "</writeface>]</face>");
            if (gender == 2) {
                age = "♂" + age;
                ageColor = "#00CCF5";
            } else if (gender == 1) {
                age = "♀" + age;
                ageColor = "#FF41A5";
            }
            if (levelColor == 0) {
                levelColor = '#19D469';
            } else {
                levelColor = rgba2hex(levelColor);
            }
            if (identityTitle == "") {
                /*判断是评论否有图片,有则增加*/
                if (images.length == 0) {
                    if (refComment == null) {
                        $(".footer")
                            .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                    } else {
                        $(".footer")
                            .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                    }
                } else {
                    str = '';
                    for (let i = 0; i < images.length; i++) {
                        str += '<img src="' + images[i] + '">';
                    }
                    if (refComment == null) {
                        $(".footer")
                            .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div class="flex comment-img">' + str + '</div></div></div><hr>');
                    } else {
                        $(".footer")
                            .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div class="flex comment-img">' + str + '</div></div></div><hr>');
                    }
                }
            } else {
                /*判断是评论否有图片,有则增加*/
                if (images.length == 0) {
                    if (refComment == null) {
                        $(".footer")
                            .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                    } else {
                        $(".footer")
                            .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                    }
                } else {
                    str = '';
                    for (let i = 0; i < images.length; i++) {
                        str += '<img src="' + images[i] + '">';
                    }
                    if (refComment == null) {
                        $(".footer")
                            .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div></div><hr>');
                    } else {
                        $(".footer")
                            .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div></div><hr>');
                    }
                }
            }
        }
        $(".comment-icon")
            .click(function() {
            location.href = "../userinfo/?user_id=" + $(this)
                .attr("user_id") + "#" + location.href;
        });
        /*处理表情*/
        $.getJSON("../../assets/json/face.json", function(data) {
            window.face = data;
            $("writeface")
                .each(function() {
                for (let i = 0; i < face.count; i++) {
                    if (face["text"][i] == $(this)
                        .text()) {
                        $(this)
                            .parent()
                            .html("<img class='writeface' style='width:20px;' src='" + face.png[i] + "'>");
                        break;
                    }
                }
            });
            let str = '';
            for (let i = 0; i < face.count; i++) {
                str += '<img class="face" name="' + face.text[i] + '" src="' + face.png[i] + '"/>';
            }
            $(".emotion")
                .html(str);
            $(".face")
                .click(function() {
                var r, re;
                var s = $("#input")
                    .val();
                re = /\[?\]/ig;
                r = s.match(re);
                if (r == null || r.length < 14) {
                    $("#input")
                        .val($("#input")
                        .val() + "[" + $(this)
                        .attr("name") + "]");
                } else {
                    Toast("一次最多发送15个表情噢~", 1000);
                }
            });
        });
        $(".comment-img img,.body img")
            .click(function() {
            $(".bigimg")
                .attr("src", $(this)
                .attr('src'));
            $(".maskweap")
                .fadeIn();
        });
        $("#comment")
            .click(function() {
            if (state == 1) {
                $(".page-turn")
                    .fadeOut();
                $("#commentInput")
                    .fadeIn();
                $("#input")
                    .focus();
            }
        });
        $(document)
            .mousedown(function(e) {
            $(".maskweap")
                .fadeOut();
            if ($(e.target)
                .parent(".emotion")
                .length == 0) {
                $(".emotion")
                    .parent()
                    .hide(0);
            }
            if ($(e.target)
                .parent("#commentInput div")
                .length == 0) {
                $("#commentInput")
                    .fadeOut();
                $(".page-turn")
                    .fadeIn();
            }
        });
        $("#emotion")
            .click(function() {
            $(".emotion")
                .parent()
                .show(0);
        });
        $.getJSON("http://floor.huluxia.com/post/praise/check/ANDROID/2.1?jsoncallback=?", {
            _key: $.cookie('Huluxia-Web-_key'),
            post_id: $_GET["post_id"]
        }, function(data) {
            switch (data.isPraise) {
                case 1:
                    /*已点赞*/
                    $("#like")
                        .attr("src", "../../assets/img/btn_comment_praised.png")
                    break;
                case 0:
                    /*未点赞*/
                    $("#like")
                        .attr("src", "../../assets/img/btn_comment_praise.png");
                    break;
            }
        });
        $.getJSON("http://floor.huluxia.com/post/favorite/check/ANDROID/2.0?jsoncallback=?", {
            _key: $.cookie('Huluxia-Web-_key'),
            post_id: $_GET["post_id"]
        }, function(data) {
            switch (data.isFavorite) {
                case 1:
                    /*已收藏*/
                    $("#favorite")
                        .attr("isFavorite", "1")
                        .attr("src", "../../assets/img/ic_home_favoriteed.png")
                    break;
                case 0:
                    /*未收藏*/
                    $("#favorite")
                        .attr("isFavorite", "0")
                        .attr("src", "../../assets/img/ic_home_favorite.png");
                    break;
            }
        });
    });
});
$("#floor")
    .click(function() {
    switch ($(this)
        .attr("isFloor")) {
        case "0":
            $("#floor")
                .attr("isFloor", "1")
                .attr("src", "../../assets/img/icon_topic_detail_floor_selected.png");
            break;
        case "1":
            $("#floor")
                .attr("isFloor", "0")
                .attr("src", "../../assets/img/icon_topic_detail_floor.png");
            break;
    }
    currPageNo = 2;
    $(".left")
        .click();
});
$("#like")
    .click(function() {
    /*点赞*/
    $.getJSON("http://floor.huluxia.com/post/praise/ANDROID/2.1?jsoncallback=?", {
        _key: $.cookie('Huluxia-Web-_key'),
        post_id: $_GET["post_id"]
    }, function(data) {
        switch (data.status) {
            case 1:
                switch (data.praise) {
                    case 1:
                        /*点赞成功*/
                        $("#like")
                            .attr("src", "../../assets/img/btn_comment_praised.png");
                        break;
                    case 2:
                        /*取消点赞成功*/
                        $("#like")
                            .attr("src", "../../assets/img/btn_comment_praise.png");
                        break;
                }
                break;
            case 0:
                switch (data.code) {
                    case 103:
                        /*未登录*/
                        location.href = "../login/index.html#" + location.href;
                        break;
                    default:
                        Toast(data.msg, 500);
                        break;
                }
                break;
        }
    });
});
$("#favorite")
    .click(function() {
    /*收藏*/
    switch ($(this)
        .attr("isFavorite")) {
        case "0":
            /*未收藏*/
            Furl = "../../php/post/favorite/create/ANDROID/4.1.8.php";
            break;
        case "1":
            /*已收藏*/
            Furl = "http://floor.huluxia.com/post/favorite/destroy/ANDROID/4.1.8?jsoncallback=?";
            break;
    }
    $.getJSON(Furl, {
        _key: $.cookie('Huluxia-Web-_key'),
        post_id: $_GET["post_id"]
    }, function(data) {
        switch (data.status) {
            case 1:
                switch ($("#favorite")
                    .attr("isFavorite")) {
                    case "0":
                        /*收藏成功*/
                        $("#favorite")
                            .attr("isFavorite", "1")
                            .attr("src", "../../assets/img/ic_home_favoriteed.png");
                        break;
                    case "1":
                        /*取消收藏成功*/
                        $("#favorite")
                            .attr("isFavorite", "0")
                            .attr("src", "../../assets/img/ic_home_favorite.png");
                        break;
                }
                break;
            case 0:
                switch (data.code) {
                    case 103:
                        /*未登录*/
                        location.href = "../login/index.html#" + location.href;
                        break;
                    default:
                        Toast(data.msg, 500);
                        break;
                }
                break;
        }
    });
});
$(".left")
    .click(function() {
    /*评论左翻页*/
    if (currPageNo > 1) {
        /*$(".middle")
            .text("Loading···");*/
        $(".footer")
            .stop()
            .hide();
        switch ($("#floor")
            .attr("isFloor")) {
            case "0":
                Furl = "../../php/post/detail/ANDROID/4.1.8.php";
                break;
            case "1":
                Furl = "http://floor.huluxia.com/post/detail/floor/ANDROID/4.1.8?jsoncallback=?";
                break;
        }
        $.getJSON(Furl, {
            post_id: $_GET["post_id"],
            page_no: currPageNo - 1
        }, function(data) {
            let comments = '', text = '', createTime = '', nick = '', avatar = '', str = '';
            comments = data["comments"];
            currPageNo = data["currPageNo"];
            totalPage = data["totalPage"];
            $(".middle")
                .text(currPageNo + "/" + totalPage);
            $(".footer")
                .html("");
            for (let i = 0; i < comments.length; i++) {
                text = comments[i].text;
                createTime = timestampToTime(comments[i].createTime);
                nick = comments[i].user.nick;
                user_id = comments[i].user.userID;
                age = comments[i].user.age;
                level = comments[i].user.level;
                levelColor = comments[i].user.levelColor;
                gender = comments[i].user.gender;
                identityColor = comments[i].user.identityColor;
                identityTitle = comments[i].user.identityTitle;
                avatar = comments[i].user.avatar;
                seq = comments[i].seq;
                refComment = comments[i].refComment;
                images = comments[i].images;
                text = text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>')
                    .replace(/\[/g, "<face>[<writeface>")
                    .replace(/\]/g, "</writeface>]</face>");
                if (gender == 2) {
                    age = "♂" + age;
                    ageColor = "#00CCF5";
                } else if (gender == 1) {
                    age = "♀" + age;
                    ageColor = "#FF41A5";
                }
                if (levelColor == 0) {
                    levelColor = '#19D469';
                } else {
                    levelColor = rgba2hex(levelColor);
                }
                if (identityTitle == "") {
                    /*判断是评论否有图片,有则增加*/
                    if (images.length == 0) {
                        if (refComment == null) {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                        } else {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                        }
                    } else {
                        str = '';
                        for (let i = 0; i < images.length; i++) {
                            str += '<img src="' + images[i] + '">';
                        }
                        if (refComment == null) {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div class="flex comment-img">' + str + '</div></div></div><hr>');
                        } else {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div class="flex comment-img">' + str + '</div></div></div><hr>');
                        }
                    }
                } else {
                    /*判断是评论否有图片,有则增加*/
                    if (images.length == 0) {
                        if (refComment == null) {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                        } else {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                        }
                    } else {
                        str = '';
                        for (let i = 0; i < images.length; i++) {
                            str += '<img src="' + images[i] + '">';
                        }
                        if (refComment == null) {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div></div><hr>');
                        } else {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div></div><hr>');
                        }
                    }
                }
                $("writeface")
                    .each(function() {
                    for (let i = 0; i < face["count"]; i++) {
                        if (face["text"][i] == $(this)
                            .text()) {
                            $(this)
                                .parent()
                                .html("<img class='writeface' style='width:20px;' src='" + face["png"][i] + "'>");
                            break;
                        }
                    }
                });
            }
            $(".comment-icon")
                .click(function() {
                location.href = "../userinfo/?user_id=" + $(this)
                    .attr("user_id") + "#" + location.href;
            });
            $(".comment-img img,.body img")
                .click(function() {
                $(".bigimg")
                    .attr("src", $(this)
                    .attr('src'));
                $(".maskweap")
                    .fadeIn();
            });
            $(document)
                .mousedown(function(e) {
                $(".maskweap")
                    .fadeOut(); //弹窗关闭
            });
            $('.content')
                .animate({
                scrollTop: 0
            }, 0);
        });
        $(".footer")
            .stop()
            .show();
        if (currPageNo == 2) {
            $(".body,.author")
                .show();
        }
    }
});
$(".right")
    .click(function() {
    /*评论右翻页*/
    if (currPageNo < totalPage) {
        /*$(".middle")
            .text("Loading···");*/
        $(".footer")
            .stop()
            .fadeToggle();
        $(".body,.author")
            .hide();
        switch ($("#floor")
            .attr("isFloor")) {
            case "0":
                Furl = "../../php/post/detail/ANDROID/4.1.8.php";
                break;
            case "1":
                Furl = "http://floor.huluxia.com/post/detail/floor/ANDROID/4.1.8?jsoncallback=?";
                break;
        }
        $.getJSON(Furl, {
            post_id: $_GET["post_id"],
            page_no: currPageNo + 1
        }, function(data) {
            let comments = '', text = '', createTime = '', nick = '', avatar = '', str = '';
            comments = data["comments"];
            currPageNo = data["currPageNo"];
            totalPage = data["totalPage"];
            $(".middle")
                .text(currPageNo + "/" + totalPage);
            $(".footer")
                .html("");
            for (let i = 0; i < comments.length; i++) {
                text = comments[i].text;
                createTime = timestampToTime(comments[i].createTime);
                nick = comments[i].user.nick;
                user_id = comments[i].user.userID;
                age = comments[i].user.age;
                level = comments[i].user.level;
                levelColor = comments[i].user.levelColor;
                gender = comments[i].user.gender;
                identityColor = comments[i].user.identityColor;
                identityTitle = comments[i].user.identityTitle;
                avatar = comments[i].user.avatar;
                seq = comments[i].seq;
                images = comments[i].images;
                refComment = comments[i].refComment;
                text = text.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, '<a href="$1">$1</a>')
                    .replace(/\[/g, "<face>[<writeface>")
                    .replace(/\]/g, "</writeface>]</face>");
                if (gender == 2) {
                    age = "♂" + age;
                    ageColor = "#00CCF5";
                } else if (gender == 1) {
                    age = "♀" + age;
                    ageColor = "#FF41A5";
                }
                if (levelColor == 0) {
                    levelColor = '#19D469';
                } else {
                    levelColor = rgba2hex(levelColor);
                }
                if (identityTitle == "") {
                    //判断是评论否有图片,有则增加
                    if (images.length == 0) {
                        if (refComment == null) {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                        } else {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                        }
                    } else {
                        str = '';
                        for (let i = 0; i < images.length; i++) {
                            str += '<img src="' + images[i] + '">';
                        }
                        if (refComment == null) {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div class="flex comment-img">' + str + '</div></div></div><hr>');
                        } else {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div class="flex comment-img">' + str + '</div></div></div><hr>');
                        }
                    }
                } else {
                    //判断是评论否有图片,有则增加
                    if (images.length == 0) {
                        if (refComment == null) {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                        } else {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div></div></div><hr>');
                        }
                    } else {
                        str = '';
                        for (let i = 0; i < images.length; i++) {
                            str += '<img src="' + images[i] + '">';
                        }
                        if (refComment == null) {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div></div><hr>');
                        } else {
                            $(".footer")
                                .append('<div class="isClickBackground"><div class="up flex"><div><img user_id="' + user_id + '" class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div><div style="padding:10px 10px 10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><div style="padding-bottom:10px;" class="down flex1"><div style="background:#F0F0F0;padding:5px 10px;border-radius:10px" class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div></div><hr>');
                        }
                    }
                }
                $("writeface")
                    .each(function() {
                    for (let i = 0; i < face["count"]; i++) {
                        if (face["text"][i] == $(this)
                            .text()) {
                            $(this)
                                .parent()
                                .html("<img class='writeface' style='width:20px;' src='" + face["png"][i] + "'>");
                            break;
                        }
                    }
                });
            }
            $(".comment-icon")
                .click(function() {
                location.href = "../userinfo/?user_id=" + $(this)
                    .attr("user_id") + "#" + location.href;
            });
            $(".comment-img img,.body img")
                .click(function() {
                $(".bigimg")
                    .attr("src", $(this)
                    .attr('src'));
                $(".maskweap")
                    .fadeIn();
            });
            $(document)
                .mousedown(function(e) {
                $(".maskweap")
                    .fadeOut(); //弹窗关闭
            });
            $('.content')
                .animate({
                scrollTop: 0
            }, 0);
        });
        $(".footer")
            .stop()
            .fadeToggle();
    }
});