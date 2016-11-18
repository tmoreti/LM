<?php
require_once('class.conexao.php');
class bandas extends conexao{
	public function todas(){
		$sqlstr="select * from tbl_bandas where fl_ativo=1";
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}
	public function destaques(){
		$sqlstr="select id from tbl_bandas where fl_destaque=1 and fl_ativo=1";
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}
	public function categorias(){
		$sqlstr="select id,nome from tbl_categorias where fl_ativo=1";
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}
	public function videos(){
		$sqlstr="select * from tbl_videos";
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}
	public function negocios(){
		$sqlstr="select * from tbl_negocios";
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}
	public function contratados(){
		$sqlstr="select a.id, count(b.id)*a.pontos as tt from tbl_bandas a left join tbl_negocios b on a.id=b.id_banda group by a.id order by 2 desc";
		$sqlstr=$this->runSQL($sqlstr);
		return $sqlstr;
	}

}
?>