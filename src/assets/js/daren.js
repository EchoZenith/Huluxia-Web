$(function() {
    $(".master")
        .load("../daren_master/", function() {
        $(".htmlLoading")
            .slideUp("slow", function() {
            $(".signin")
                .load("../daren_signin/");
        });
    });
});
$("#master")
    .click(function() {
    $(".signin")
        .hide();
    $(".master")
        .show();
    $("#master")
        .css("color", "#008800");
    $("#signin")
        .css("color", "#000000");
});
$("#signin")
    .click(function() {
    $(".master")
        .hide();
    $(".signin")
        .show();
    $("#signin")
        .css("color", "#008800");
    $("#master")
        .css("color", "#000000");
});