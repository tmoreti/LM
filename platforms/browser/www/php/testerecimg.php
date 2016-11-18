<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once('class/class.bandas.php');
$bandas=new bandas;
$sqlstr=$bandas->todas();
	$arr=array();
	
	$row = mysqli_fetch_array($sqlstr);
			echo '<img src="data:image/gif;base64,' . $row['img64'] . '" />';
	
	
	


?>