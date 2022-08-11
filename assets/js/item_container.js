$(function() {
    /*
    begin run code
    This code by PeterCoast
    */
    if ($_GET["cat_id"] == "" || $_GET["cat_id"] == null || $_GET["fum_id"] == "" || $_GET["fum_id"] == null) {
        window.location.href = "../category/";
    }
    $("#daren")
        .click(function() {
        window.location.href = "../daren/?cat_id=" + $_GET["cat_id"];
    });
    $.getJSON("../../post/list/ANDROID/4.1.8.php", {
        cat_id: $_GET["cat_id"]
    }, function(data) {
        let category = data.category, weightAndTopPost = data.weightAndTopPost, title, postID, notice;
        for (let i = 0; i < weightAndTopPost.length; i++) {
            title = weightAndTopPost[i].title;
            postID = weightAndTopPost[i].postID;
            notice = weightAndTopPost[i].notice;
            if (notice == 1) {
                $(".notice-board")
                    .append('<div post_id="' + postID + '"class="flex weightAndTop"><div class="NoticeName">公告</div><div class="flex1">' + title + '</div></div><hr>');
            } else {
                $(".notice-board")
                    .append('<div post_id="' + postID + '"class="flex weightAndTop"><div class="TopName">置顶</div><div class="flex1">' + title + '</div></div><hr>');
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
            .text("Loading···")
        let str = '', title, detail, images, nick, posts, postID, weightAndTopPost;
        $.getJSON("../../post/list/ANDROID/4.1.8.php", {
            cat_id: $_GET["cat_id"],
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
                    str += '<div post_id="' + postID + '" class="flex post-list-item"><div class="flex post-title flex-column"><div style="padding:10px 10px" class="flex1">' + title + '</div><div style="padding:10px 10px">' + nick + '</div></div></div><hr>';
                } else {
                    str += '<div post_id="' + postID + '" class="flex post-list-item"><div><img class="post-icon" src="' + images + '" /></div><div class="flex post-title flex-column"><div style="margin:10px 0" class="flex1">' + title + '</div><div style="margin:10px 0" height="20px">' + nick + '</div></div></div><hr>';
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