$(function() {
    cat_id = $_GET.cat_id;
    $.getJSON('http://floor.huluxia.com/category/detail/ANDROID/2.0?jsoncallback=?', {
        cat_id: cat_id
    }, function(data) {
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
        $(".backTitle")
            .text(title);
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
            location.href = "../userinfo/?user_id=" + $(this)
                .attr("user_id") + "#" + location.href;
        });
    });
});