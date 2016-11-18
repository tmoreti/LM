<?php

$dados = array('fields' => array( 'Cidade', 'Bairro', 'ValorVenda','imagem'));

$key='c9fdd79584fb8d369a6a579af1a8f681';
$postFields=json_encode($dados);
$url='http://sandbox-rest.vistahost.com.br/imoveis/listar?key=' . $key;
$url.='&pesquisa=' . $postFields;
$ch=curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,CURLOPT_HTTPHEADER, array('Accept: application/json'));
$result=curl_exec($ch);
$result=json_decode($result,true);
print_r($result);
?>