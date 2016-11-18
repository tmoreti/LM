<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once('class/class.bandas.php');
	
$bandas=new bandas;



$sqlstr=$bandas->destaques();
$destaques=array();

while($row = mysqli_fetch_array($sqlstr,MYSQLI_ASSOC)){
	$destaques[]=$row;
}

// ---------------------------------- //

$sqlstr=$bandas->todas();
$todas=array();

while($row = mysqli_fetch_array($sqlstr,MYSQLI_ASSOC)){
	$todas[]=$row;
}

// ---------------------------------- //

$sqlstr=$bandas->videos();
$videos=array();

while($row = mysqli_fetch_array($sqlstr,MYSQLI_ASSOC)){
	$videos[]=$row;
}


// ---------------------------------- //

$sqlstr=$bandas->negocios();
$negocios=array();

while($row = mysqli_fetch_array($sqlstr,MYSQLI_ASSOC)){
	$negocio[]=$row;
}

// ---------------------------------- //

$sqlstr=$bandas->contratados();
$contratados=array();

while($row = mysqli_fetch_array($sqlstr,MYSQLI_ASSOC)){
	$contratados[]=$row;
}

// ---------------------------------- //

$sqlstr=$bandas->categorias();
$categorias=array();

while($row = mysqli_fetch_array($sqlstr,MYSQLI_ASSOC)){
	$categorias[]=$row;
}

	$arr=array('destaques'=>$destaques,'todas'=>$todas,'videos'=>$videos,'negocios'=>$negocios, 'contratados'=>$contratados, 'categorias'=>$categorias);
	echo json_encode($arr);
	


?>