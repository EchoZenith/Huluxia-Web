<?php
include("../../../include/post.php");
$post_data = array (
    'device_code'=>rand(1,999),
    'login_type'=>2,
    'account' => $_GET["account"],
    'password' => md5($_GET["password"])
);
print_r(send_post( 'http://floor.huluxia.com/account/login/ANDROID/4.0' , $post_data ));
?>