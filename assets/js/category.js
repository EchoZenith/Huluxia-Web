$(function() {
    /*
    begin run code
    This code by PeterCoast
    */
    $.getJSON("http://floor.huluxia.com/category/forum/list/ANDROID/2.0?jsoncallback=?", function(data) {
        let categoryforum = data["categoryforum"], str = '', fum_id, title;
        for (let i = 0; i < categoryforum.length; i++) {
            fum_id = categoryforum[i].id;
            title = categoryforum[i].title;
            str += '<div fum_id="' + fum_id + '" class="getItem">' + title + '</div>';
        }
        $(".cate-container")
            .html(str);
        $(".htmlLoading")
            .slideUp("slow");
        $(".content")
            .fadeToggle("slow");
        $(".getItem")
            .click(function() {
            let fum_id = $(this).attr("fum_id");
            $.getJSON("http://floor.huluxia.com/category/forum/list/all/ANDROID/2.0?jsoncallback=?", {
                fum_id: fum_id
            }, function(data) {
                $(".zone-content")
                    .hide();
                let categories = data["categories"], str = '', title, icon, cat_id, viewCountFormated, postCountFormated;
                for (let i = 0; i < categories.length; i++) {
                    title = categories[i]["title"];
                    icon = categories[i]["icon"];
                    cat_id = categories[i]["categoryID"];
                    viewCountFormated = categories[i]["viewCountFormated"];
                    postCountFormated = categories[i]["postCountFormated"];
                    str += '<div fum_id="' + fum_id + '" cat_id="' + cat_id + '" class="flex toFum"><div><img src="' + icon + '"/></div><div class="flex info flex-column"><div>' + title + '</div><div><span>热度：</span><span>' + viewCountFormated + '</span><span> 话题：</span><span>' + postCountFormated + '</span></div></div></div><hr>';
                }
                $(".zone-content")
                    .html(str);
                $(".zone-content")
                    .show(500);
                $(".toFum")
                    .click(function() {
                    window.location.href = "../item_container/?fum_id=" + $(this)
                        .attr("fum_id") + "&cat_id=" + $(this)
                        .attr("cat_id");
                });
            });
        });
        /*显示默认板块列表*/
        $(".getItem")[0].click();
    });
});
