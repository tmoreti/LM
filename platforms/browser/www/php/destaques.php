<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once('class/class.bandas.php');
$bandas=new bandas;
$sqlstr=$bandas->destaques();
	$arr=array();
	
	while($row = mysqli_fetch_array($sqlstr)){
		$arr[]=$row;
	}
	echo json_encode($arr);
	


?>