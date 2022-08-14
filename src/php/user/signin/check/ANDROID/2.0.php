<?php
    $key = $_GET["_key"];
    $user_id = $_GET["user_id"];
    $cat_id = $_GET["cat_id"];
    print_r(file_get_contents("http://floor.huluxia.com/user/signin/check/ANDROID/2.0?user_id=".$user_id."&cat_id=".$cat_id."&_key=".$key));
?>