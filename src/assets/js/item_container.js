$(function() {
    /*
    This code by PeterCoast
    */
    if ($_GET.cat_id == "" || $_GET.cat_id == null || $_GET.fum_id == "" || $_GET.fum_id == null) {
        window.location.href = "../category/";
    }
    $.getJSON("../../php/user/signin/check/ANDROID/2.0.php", {
        cat_id: $_GET.cat_id,
        user_id: $.cookie("Huluxia-Web-userID"),
        _key: $.cookie("Huluxia-Web-_key")
    }, function(data) {
        if (data.signin == 0) {
            /*未签到*/
            $("#signin")
                .attr("signin", "no");
            $("#signinText")
                .text("签到");
        } else if (data.signin == 1) {
            /*已签到*/
            $("#signin")
                .attr("signin", "yes");
            $("#signinText")
                .text("已签到");
        }
    });
    $(".head")
        .click(function() {
        window.location.href = "../item_container/cat_info.html?origin=item_container/;;;fum_id;;" + $_GET.fum_id + ";cat_id;;" + $_GET.cat_id + "&cat_id="+$_GET.cat_id;
    });
    $("#daren")
        .click(function() {
        window.location.href = "../daren/?cat_id=" + $_GET.cat_id;
    });
    $("#signin")
        .click(function() {
        if ($(this)
            .attr("signin") == "yes") {
            Toast("已经签到过了", 500);
        } else if ($(this)
            .attr("signin") == "no") {
            _key = $.cookie("Huluxia-Web-_key");
            if (_key == null) {
                //Toast("未登录",500);
                window.location.href = "../login/?origin=item_container/;;;cat_id;;" + $_GET.cat_id;
            } else {
                $.getJSON("../../php/user/signin/ANDROID/4.0.php", {
                    _key: _key,
                    cat_id: $_GET.cat_id
                }, function(data) {
                    if (data.code == 103 || data.msg == "未登录") {
                        /*_key失效*/
                        $.removeCookie("Huluxia-Web-_key", {
                            path: '/'
                        });
                        $.removeCookie("Huluxia-Web-userID", {
                            path: '/'
                        });
                        //Toast("未登录",500);
                        window.location.href = "../login/?origin=item_container/;;;cat_id;;" + $_GET.cat_id;
                    } else {
                        $("#signin")
                            .attr("signin", "yes");
                        $("#signinText")
                            .text("已签到");
                        Toast("签到成功", 500);
                    }
                });
            }
        }
    });
    $.getJSON("../../php/post/list/ANDROID/4.1.8.php", {
        cat_id: $_GET.cat_id
    }, function(data) {
        let category = data.category, weightAndTopPost = data.weightAndTopPost, title, postID, notice;
        for (let i = 0; i < weightAndTopPost.length; i++) {
            title = weightAndTopPost[i].title;
            postID = weightAndTopPost[i].postID;
            notice = weightAndTopPost[i].notice;
            if (notice == 1) {
                $(".notice-board")
                    .append('<div post_id="' + postID + '"class="flex isClickBackground weightAndTop"><div class="NoticeName">公告</div>&nbsp;<div class="flex1">' + title + '</div></div><hr>');
            } else {
                $(".notice-board")
                    .append('<div post_id="' + postID + '"class="flex isClickBackground weightAndTop"><div class="TopName">置顶</div>&nbsp;<div class="flex1">' + title + '</div></div><hr>');
            }
        }
        $(".weightAndTop")
            .click(function() {
            window.location.href = '../post_content/?post_id=' + $(this)
                .attr("post_id");
        });
        $("#icon")
            .attr("src", category.icon);
        $("#view")
            .text(category.viewCountFormated);
        $("#post")
            .text(category.postCountFormated);
        $("#title")
            .text(category.title);
    });
    $(".bf")
        .click(function() {
        $(this)
            .text("Loading···");
        let str = '';
        $.getJSON("../../php/post/list/ANDROID/4.1.8.php", {
            cat_id: $_GET.cat_id,
            start: $(this)
                .attr("start")
        }, function(data) {
            start = data.start;
            for (let i = 0; i < data.posts.length; i++) {
                posts = data.posts[i];
                title = posts.title;
                images = posts.images[0];
                nick = posts.user.nick;
                postID = posts.postID;
                if (posts.images.length == 0) {
                    str += '<div post_id="' + postID + '" class="flex isClickBackground post-list-item"><div class="flex flex-column post-title"><div class="flex1">' + title + '</div><div height="20px">' + nick + '</div></div></div><hr>';
                } else {
                    str += '<div post_id="' + postID + '" class="flex isClickBackground post-list-item"><div><img class="post-icon" src="' + images + '"></div><div class="flex flex-column post-title"><div class="flex1">' + title + '</div><div height="20px">' + nick + '</div></div></div><hr>';
                }
            }
            $(".bf")
                .before(str);
            $(".bf")
                .text("加载更多");
            $(".bf")
                .attr("start", start);
            $(".post-list-item")
                .click(function() {
                window.location.href = "../post_content/?post_id=" + $(this)
                    .attr("post_id");
            });
        });
    });
    $(".htmlLoading")
        .slideUp("slow");
    $(".content")
        .fadeToggle("slow");
    $(".bf")
        .click();
});