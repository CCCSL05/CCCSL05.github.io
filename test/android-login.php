<?php 
error_reporting(0); //去除错误提示
$username = $_GET["username"]; 
$pwd = $_GET["pwd"]; 
if($username=="root"&&$pwd=="123456"){
	echo "success";
}else{
	echo "fail";
}
?>
