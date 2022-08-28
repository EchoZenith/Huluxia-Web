$(function() {
    $("#avatar")
        .attr("src", $_GET["avatar"]);
    $("#nick div")
        .text(decodeURI($_GET["nick"]));
    switch ($_GET["gender"]) {
        case "1":
            $("#age div")
                .text("♀" + $_GET["age"])
                .css("background", "#FF41A5");
            break;
        case "2":
            $("#age div")
                .text("♂" + $_GET["age"])
                .css("background", "#00CCF5");
            break;
    }
    if ($_GET["type"] == "c") {
        $("#c")
            .show();
        $("#rightInfo")
            .text($_GET["integral"] + "贡献值");
    } else if ($_GET["type"] == "g") {
        $("#gourd")
            .show();
        $("#rightInfo")
            .text($_GET["credits"] + "葫芦数");
    } else {
        if ($_GET["origin"] != null || $_GET["origin"] != "") {
            window.location.href = "../" + $_GET["origin"] + "/?origin=cgourd";
        } else {
            window.location.href = "../category/?origin=cgourd";
        }
    }
});