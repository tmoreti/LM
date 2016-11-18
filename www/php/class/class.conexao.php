<?php
class conexao{
	public function runSQL($sqlstr){
		$cn=mysqli_connect('db_bancoteste.mysql.dbaas.com.br','db_bancoteste','moreti30','db_bancoteste') or die(mysql_error());
		//mysql_select_db('db_bancoteste') or die(mysql_error());
		$sqlstr=mysqli_query($cn,$sqlstr);
		return $sqlstr;
	}
}
?>