<?php
/**
  * 发送post请求
  * @param string $url 请求地址
  * @param array $post_data post键值对数据
  * @return string
  */
function send_post( $url , $post_data ) {
    $postdata = http_build_query( $post_data );
    $options = array (
        'http' => array (
            'method' => 'POST' ,
            'header' => 'Content-type:application/x-www-form-urlencoded' ,
            'content' => $postdata ,
            'timeout' => 15 * 60 // 超时时间（单位:s）
        )
    );
    $context = stream_context_create( $options );
    $result = file_get_contents ( $url , false, $context );
    return $result ;
}
$post_data = array (
'device_code'=>rand(1,999),
    'login_type'=>2,
    'account' => $_GET["account"],
    'password' => md5($_GET["password"])
);
echo(send_post( 'http://floor.huluxia.com/account/login/ANDROID/4.0' , $post_data ));
?>