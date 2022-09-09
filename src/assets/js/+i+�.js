$(function() {
    let key = $.cookie("Huluxia-Web-_key"), user_id = $.cookie("Huluxia-Web-userID");
    if (key == "" || key == null) {
        //无key
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
                        window.location.href = "../userinfo/?origin=空间/&user_id=" + user_id;
                    });
                    $("#signature")
                        .show()
                        .text(signature);
                    $("#following")
                        .text(followingCount)
                        .parent()
                        .click(function() {
                        window.location.href = "../user_follow/?type=1&user_id=" + user_id;
                    });
                    $("#follower")
                        .text(followerCount)
                        .parent()
                        .click(function() {
                        window.location.href = "../user_follow/?type=2&user_id=" + user_id;
                    });
                    $("#post")
                        .click(function() {
                        window.location.href = "../user_post_list/?origin=空间/&user_id=" + user_id;
                    });
                    $("#favorite")
                        .click(function() {
                        window.location.href = "../user_post_list/?type=favorite&origin=空间/&user_id=" + user_id;
                    });
                    $("#comment")
                        .click(function() {
                        window.location.href = "../user_comment/?user_id=" + user_id + "&origin=userInfo/;;;user_id;;" + user_id;
                    })
                    break;
                case 0:
                    $("#nick")
                        .text("登录");
                    $("#avatar,#follow,#post,#favorite")
                        .click(function() {
                        window.location.href = "../login/?origin=空间/";
                    });
                    break;
            }
        });
    }
});