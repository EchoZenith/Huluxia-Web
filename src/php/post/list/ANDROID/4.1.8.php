<?php
$cat_id=$_GET["cat_id"];
$start=$_GET["start"];
$count=20;
print_r(file_get_contents("http://floor.huluxia.com/post/list/ANDROID/4.1.8?sort_by=1&start=".$start."&count=".$count."&cat_id=".$cat_id));
?>