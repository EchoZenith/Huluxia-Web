$(function() {
    cat_id = $_GET.cat_id;
    $.getJSON('http://floor.huluxia.com/category/detail/ANDROID/2.0?jsoncallback=?', {
        cat_id: cat_id
    }, function(data) {
        console.log(data);
        title = data.title;
        icon = data.icon;
        rule = data.rule;
        moderator = data.moderator;
        description = data.description;
        $("#title")
            .text(title);
        $("#description")
            .text(description);
        $("#icon")
            .attr('src', icon);
        $("#rules")
            .text(rule);
        $(".htmlLoading")
            .slideUp("slow");
        $(".content")
            .fadeToggle("slow");
        for (let i = 0; i < moderator.length; i++) {
            user_id = moderator[i].userID;
            avatar = moderator[i].avatar;
            $("#moderator")
                .append('<img user_id="' + moderator[i].userID + '" src="' + moderator[i].avatar + '">')
        }
        $("#moderator img")
            .click(function() {
            window.location.href = "../userinfo/?origin=item_container/fum_info.html;;;cat_id;;" + cat_id + "&user_id=" + $(this)
                .attr("user_id");
        });
    });
});