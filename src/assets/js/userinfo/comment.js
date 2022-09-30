$(function() {
    user_id = $_GET.user_id;
    key = $.cookie('Huluxia-Web-_key');
    if (user_id == "" || user_id == null) {
        lgourl();
    } else {
        $('.bf')
            .click(function() {
            $(this)
                .text("Loading···");
            $.getJSON('http://floor.huluxia.com/comment/create/list/ANDROID/4.1.8?jsoncallback=?', {
                user_id: user_id,
                start: $(this)
                    .attr('start'),
                count: 20,
                _key: key
            }, function(data) {
                let str = '', comments = data.comments, start = data.start;
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
                    post = comments[i].post.title;
                    post_id = comments[i].post.postID;
                    category = comments[i].category.title;
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
                                $(".bf")
                                    .before('<div post_id="' + post_id + '" class="comment isClickBackground"><div class="up flex"><div><img class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div class="info"><div class="post">原贴：' + post + '</div><div class="category">板块：' + category + '</div></div></div></div><hr>');
                            } else {
                                $(".bf")
                                    .before('<div post_id="' + post_id + '" class="comment isClickBackground"><div class="up flex"><div><img class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div></div><div style="padding-bottom:10px;" class="down flex1"><div class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div>' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div class="info"><div class="post">原贴：' + post + '</div><div class="category">板块：' + category + '</div></div></div></div><hr>');
                            }
                        } else {
                            str = '';
                            for (let i = 0; i < images.length; i++) {
                                str += '<img src="' + images[i] + '">';
                            }
                            if (refComment == null) {
                                $(".bf")
                                    .before('<div post_id="' + post_id + '" class="comment isClickBackground"><div class="up flex"><div><img class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div class="flex comment-img">' + str + '</div><div class="info"><div class="post">原贴：' + post + '</div><div class="category">板块：' + category + '</div></div></div></div><hr>');
                            } else {
                                $(".bf")
                                    .before('<div post_id="' + post_id + '" class="comment isClickBackground"><div class="up flex"><div><img class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div></div><div style="font-size:10px;">' + createTime + '</div></div></div><div style="padding-bottom:10px;" class="down flex1"><div class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div>' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div class="flex comment-img">' + str + '</div><div class="info"><div class="post">原贴：' + post + '</div><div class="category">板块：' + category + '</div></div></div></div><hr>');
                            }
                        }
                    } else {
                        /*判断是评论否有图片,有则增加*/
                        if (images.length == 0) {
                            if (refComment == null) {
                                $(".bf")
                                    .before('<div post_id="' + post_id + '" class="comment isClickBackground"><div class="up flex"><div><img class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div class="info"><div class="post">原贴：' + post + '</div><div class="category">板块：' + category + '</div></div></div></div><hr>');
                            } else {
                                $(".bf")
                                    .before('<div post_id="' + post_id + '" class="comment isClickBackground"><div class="up flex"><div><img class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div></div><div style="padding-bottom:10px;;" class="down flex1"><div class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div>' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div class="info"><div class="post">原贴：' + post + '</div><div class="category">板块：' + category + '</div></div></div></div><hr>');
                            }
                        } else {
                            str = '';
                            for (let i = 0; i < images.length; i++) {
                                str += '<img src="' + images[i] + '">';
                            }
                            if (refComment == null) {
                                $(".bf")
                                    .before('<div post_id="' + post_id + '" class="comment isClickBackground"><div class="up flex"><div><img class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div></div><div style="padding-bottom:10px;" class="down flex1"><div style="white-space:pre-line;" class="text">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div><div class="info"><div class="post">原贴：' + post + '</div><div class="category">板块：' + category + '</div></div></div></div><hr>');
                            } else {
                                $(".bf")
                                    .before('<div post_id="' + post_id + '" class="comment isClickBackground"><div class="up flex"><div><img class="comment-icon" src="' + avatar + '"></div><div class="flex1"><div>' + nick + '</div><div class="flex"><div style="background:' + levelColor + ';" class="levelTag">LV' + level + '</div>&nbsp;<div style="background:' + ageColor + ';" class="ageTag">' + age + '</div>&nbsp;<div style="background:' + rgba2hex(identityColor) + ';" class="identityTitleTag">' + identityTitle + '</div></div><div style="font-size:10px;">' + createTime + '</div></div></div><div style="padding-bottom:10px;" class="down flex1"><div class="ref"><div>回复&nbsp;' + refComment.nick + '</div><div>' + refComment.text + '</div></div><div style="white-space:pre-line;" class="text">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div><div class="info"><div class="post">原贴：' + post + '</div><div class="category">板块：' + category + '</div></div></div></div><hr>');
                            }
                        }
                    }
                }
                if (user_id == $.cookie('Huluxia-Web-userID')) {
                    $('.backTitle')
                        .text("我的回复");
                } else {
                    $('.backTitle')
                        .text("Ta的回复");
                }
                $(".htmlLoading")
                    .slideUp("slow");
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
                });
                $('.comment')
                    .click(function() {
                    location.href = "../post_content/?post_id=" + $(this)
                        .attr("post_id") + "#" + location.href;
                });
                $(".bf")
                    .text("加载更多");
                $(".bf")
                    .attr("start", start);
            });
        });
        $('.bf')
            .click();
    }
});