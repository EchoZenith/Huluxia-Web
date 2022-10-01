$(function() {
    let key = $.cookie("Huluxia-Web-_key"), user_id = $.cookie("Huluxia-Web-userID");

    if (key == "" || key == null) {
        //无key
        $("#avatar,#follow,#post,#favorite")
            .click(function() {
            location.href = "../login/index.html#" + location.href;
        });
    } else {
        $.getJSON('http://floor.huluxia.com/user/info/ANDROID/4.1.8?jsoncallback=?', {
            _key: key,
            user_id: user_id
        }, function(data) {
            console.log(data);
            switch (data.status) {
                case 1:
                    avatar = data.avatar;
                    signature = data.signature;
                    nick = data.nick;
                    followingCount = data.followingCount;
                    followerCount = data.followerCount;
                    $("#nick")
                        .text(nick);
                    $("#avatar")
                        .attr("src", avatar)
                        .click(function() {
                        location.href = "../userinfo/index.html?user_id=" + user_id + "#" + location.href;
                    });
                    $("#signature")
                        .show()
                        .text(signature);
                    $("#following")
                        .text(followingCount)
                        .parent()
                        .click(function() {
                        location.href = "../user_follow/index.html?type=1&user_id=" + user_id + "#" + location.href;
                    });
                    $("#follower")
                        .text(followerCount)
                        .parent()
                        .click(function() {
                        location.href = "../user_follow/index.html?type=2&user_id=" + user_id + "#" + location.href;
                    });
                    $("#post")
                        .click(function() {
                        location.href = "../user_post_list/index.html?user_id=" + user_id + "#" + location.href;
                    });
                    $("#favorite")
                        .click(function() {
                        location.href = "../user_post_list/index.html?type=favorite&user_id=" + user_id + "#" + location.href;
                    });
                    $("#comment")
                        .click(function() {
                        location.href = "../user_comment/index.html?user_id=" + user_id + "#" + location.href;
                    })
                    break;
                case 0:
                    $("#nick")
                        .text("登录");
                    $("#avatar,#follow,#post,#favorite")
                        .click(function() {
                        location.href = "../login/index.html#" + location.href;
                    });
                    break;
            }
        });
    }
});