$(function() {
    /*
    This code by PeterCoast
    */
    if ($_GET["post_id"] == "" || $_GET["post_id"] == null) {
        window.location.href = "../category/";
    }
    let voice, title, detail, images, post, updateTime, hit, commentCount, comments, postType, recommendTopics;
    $.getJSON("../../php/post/detail/ANDROID/4.1.8.php", {
        post_id: $_GET["post_id"]
    }, function(data) {
        post = data.post;
        comments = data.comments;
        window.totalPage = data.totalPage;
        window.currPageNo = data.currPageNo;
        voice = post.voice;
        detail = post.detail;
        title = post.title;
        images = post.images;
        hit = post.hit;
        postType = post.postType;
        commentCount = post.commentCount;
        updateTime = timestampToTime(post.updateTime);
        recommendTopics = post.recommendTopics;
        detail = detail.replace(/<image>/g, "<img src=")
            .replace(/<\/image>/g, ">");
        $(".middle")
            .text(currPageNo + "/" + totalPage);
        $(".body")
            .html(detail);
        $(".head")
            .html('<div>' + title + '</div><div style="font-size:10px;">' + updateTime + '</div><div><span style="font-size:10px;">阅读：</span><span style="font-size:10px;">' + hit + '</span><span style="font-size:10px;"> 评论：</span><span style="font-size:10px;">' + commentCount + '</span></div>');
        $(".commentCount")
            .text(commentCount);
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
        $(".content")
            .fadeToggle("slow");
        $("recommendtopics")
            .click(function() {
            window.location.href = "../post_content/?post_id=" + $(this)
                .attr("post_id");
        });
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
        /*加载评论*/
        let str = '', text, seq, createTime, nick, avatar;
        $(".footer")
            .html("");
        for (let i = 0; i < comments.length; i++) {
            text = comments[i].text;
            createTime = timestampToTime(comments[i]["createTime"]);
            nick = comments[i].user.nick;
            avatar = comments[i].user.avatar;
            seq = comments[i].seq;
            images = comments[i].images;
            refComment = comments[i].refComment;
            text = text.replace(/\[/g, "<face>[<writeface>")
                .replace(/\]/g, "</writeface>]</face>");
            /*判断是评论否有图片,有则增加*/
            if (images.length == 0) {
                if (refComment == null) {
                    $(".footer")
                        .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="white-space:pre-line;">' + text + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                } else {
                    $(".footer")
                        .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="width:100%;background:#F0F0F0;padding:5px 10px;border-radius:10px"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;">' + text + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                }
            } else {
                str = '';
                for (let i = 0; i < images.length; i++) {
                    str += '<img src="' + images[i] + '">';
                }
                if (refComment == null) {
                    $(".footer")
                        .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="white-space:pre-line;">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                } else {
                    $(".footer")
                        .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="width:100%;background:#F0F0F0;padding:5px 10px;border-radius:10px"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                }
            }
        }
        $(".htmlLoading")
            .slideUp("slow");
        /*处理表情*/
        $.getJSON("../../assets/json/face.json", function(data) {
            window.face = data;
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
        });
        $(".comment-img img,.body img")
            .click(function() {
            $("#myModal")
                .show();
            $("#img01")
                .attr("src", $(this)
                .attr("src"));
        });
        $(".close,.modal-content,#myModal")
            .click(function() {
            $("#myModal")
                .hide();
        });
    });
});
/*评论左翻页*/
$(".left")
    .click(function() {
    if (currPageNo > 1) {
        $(".middle")
            .text("Loading···");
        $(".footer")
            .stop()
            .fadeToggle();
        $.getJSON("../../php/post/detail/ANDROID/4.1.8.php", {
            post_id: $_GET["post_id"],
            page_no: currPageNo - 1
        }, function(data) {
            let comments = '', text = '', createTime = '', nick = '', avatar = '', str = '';
            comments = data["comments"];
            currPageNo = data["currPageNo"];
            $(".middle")
                .text(currPageNo + "/" + totalPage);
            $(".footer")
                .html("");
            for (let i = 0; i < comments.length; i++) {
                text = comments[i].text;
                createTime = timestampToTime(comments[i].createTime);
                nick = comments[i].user.nick;
                avatar = comments[i].user.avatar;
                seq = comments[i].seq;
                refComment = comments[i].refComment;
                images = comments[i].images;
                text = text.replace(/\[/g, "<face>[<writeface>")
                    .replace(/\]/g, "</writeface>]</face>");
                /*判断是评论否有图片,有则增加*/
                if (images.length == 0) {
                    if (refComment == null) {
                        $(".footer")
                            .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="white-space:pre-line;">' + text + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                    } else {
                        $(".footer")
                            .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="width:100%;background:#F0F0F0;padding:5px 10px;border-radius:10px"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;">' + text + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                    }
                } else {
                    str = '';
                    for (let i = 0; i < images.length; i++) {
                        str += '<img src="' + images[i] + '">';
                    }
                    if (refComment == null) {
                        $(".footer")
                            .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="white-space:pre-line;">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                    } else {
                        $(".footer")
                            .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="width:100%;background:#F0F0F0;padding:5px 10px;border-radius:10px"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
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
            $(".comment-img img")
                .click(function() {
                $("#myModal")
                    .show();
                $("#img01")
                    .attr("src", $(this)
                    .attr("src"));
            });
            $(".close,.modal-content,#myModal")
                .click(function() {
                $("#myModal")
                    .hide();
            });
            $('.content')
            .animate({
            scrollTop: 0
        },0);
        });
        $(".footer")
            .stop()
            .fadeToggle();
        if (currPageNo == 2) {
            $(".body")
                .show();
        }
    }
});
/*评论右翻页*/
$(".right")
    .click(function() {
    $(".body")
        .hide();
    if (currPageNo < totalPage) {
        $(".middle")
            .text("Loading···");
        $(".footer")
            .stop()
            .fadeToggle();
        $.getJSON("../../php/post/detail/ANDROID/4.1.8.php", {
            post_id: $_GET["post_id"],
            page_no: currPageNo + 1
        }, function(data) {
            let comments = '', text = '', createTime = '', nick = '', avatar = '', str = '';
            comments = data["comments"];
            currPageNo = data["currPageNo"];
            $(".middle")
                .text(currPageNo + "/" + totalPage);
            $(".footer")
                .html("");
            for (let i = 0; i < comments.length; i++) {
                text = comments[i].text;
                createTime = timestampToTime(comments[i].createTime);
                nick = comments[i].user.nick;
                avatar = comments[i].user.avatar;
                seq = comments[i].seq;
                images = comments[i].images;
                refComment = comments[i].refComment;
                text = text.replace(/\[/g, "<face>[<writeface>")
                    .replace(/\]/g, "</writeface>]</face>");
                /*判断是评论否有图片,有则增加*/
                if (images.length == 0) {
                    if (refComment == null) {
                        $(".footer")
                            .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="white-space:pre-line;">' + text + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                    } else {
                        $(".footer")
                            .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="width:100%;background:#F0F0F0;padding:5px 10px;border-radius:10px"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;">' + text + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                    }
                } else {
                    str = '';
                    for (let i = 0; i < images.length; i++) {
                        str += '<img src="' + images[i] + '">';
                    }
                    if (refComment == null) {
                        $(".footer")
                            .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="white-space:pre-line;">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
                    } else {
                        $(".footer")
                            .append('<div class="flex"><div><img class="comment-icon" src="' + avatar + '"></div><div style="overflow:hidden;" class="flex1"><div>' + nick + '</div><div style="font-size:10px;">' + createTime + '</div><div style="width:100%;background:#F0F0F0;padding:5px 10px;border-radius:10px"><div>回复&nbsp;' + refComment.nick + '</div><div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">' + refComment.text + '</div></div><div style="white-space:pre-line;">' + text + '</div><div style="overflow-x:scroll;" class="flex comment-img">' + str + '</div></div><div style="padding:10px 0;color:#008800;"><span>' + seq + '</span>楼</div></div><hr>');
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
            $(".comment-img img")
                .click(function() {
                $("#myModal")
                    .show();
                $("#img01")
                    .attr("src", $(this)
                    .attr("src"));
            });
            $(".close,.modal-content,#myModal")
                .click(function() {
                $("#myModal")
                    .hide();
            });
            $('.content')
            .animate({
            scrollTop: 0
        },0);
        });
        $(".footer")
            .stop()
            .fadeToggle();
    }
});