<?php
$post_id = $_GET["post_id"];
$page_no = $_GET["page_no"];
$page_size==20;
print_r(file_get_contents("http://floor.huluxia.com/post/detail/ANDROID/4.1.8?post_id=".$post_id."&page_no=".$page_no."&page_size=".$page_size));
?>