$(function() {
    $(".master")
        .load("../daren_master/index.html", function() {
        $(".signin")
            .load("../daren_signin/index.html");
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