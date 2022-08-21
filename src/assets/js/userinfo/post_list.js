$(function() {
    if ($_GET["user_id"] == null || $_GET["user_id"] == "") {
        if ($_GET["origin"] != null && $_GET["origin"] != "") {
            window.location.href = "../" + getOrigin();
        } else {
            window.location.href = "../category/";
        }
    } else {
        switch ($_GET["type"]) {
                case "favorite":
                    url = "http://floor.huluxia.com/post/favorite/list/ANDROID/4.1.8?jsoncallback=?";
                    break;
                default:
                    url = "http://floor.huluxia.com/post/create/list/ANDROID/4.1.8?jsoncallback=?";
                    break;
            }
        $(".bf")
            .click(function() {
            $(this)
                .text("Loading···")
            let str = '', title, detail, images, nick, posts, postID, weightAndTopPost;
            $.getJSON(url, {
                user_id: $_GET["user_id"],
                start: $(this)
                    .attr("start")
            }, function(data) {
                console.log(data);
                start = data.start;
                for (let i = 0; i < data.posts.length; i++) {
                    if(data.posts[i].state==2) continue;
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
                if (data.more == 0) {
                    $(".bf")
                        .hide();
                } else {
                    $(".bf")
                        .text("加载更多");
                    $(".bf")
                        .attr("start", start);
                }
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
    }
});