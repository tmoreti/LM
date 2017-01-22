function destaques(){
	var destaque=base.destaques;
	var qtd=destaque.length;
	var rdn= Math.floor((Math.random() * qtd) + 1);
	rdn=rdn-1;
	var id=destaque[rdn].id;
	var arrBanda=getBandaId(id);
	//console.log(arrBanda.pontos);
    var str='<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">';
    str+='<div class="fotoNome">';
    str+='<p><img src="' + arrBanda.logo + '" class="img-responsive img-thumbnail img-rounded wow bounceIn" data-wow-delay="0s" onclick="detalhesBanda(\'' + arrBanda.id + '\')"></p><p>' + arrBanda.nome + '</p>';
    //str+='<p><a href="#banda" onclick="abrirBanda(' + id + ')"><img src="' + arrBanda.logo + '" class="img-responsive img-thumbnail img-rounded wow bounceIn" data-wow-delay="0s"></a></p><p>' + arrBanda.nome + '</p>';
    str+='<p>' + estrelas(arrBanda.pontos) + '</p>';
    str+='</div>';
    str+='</div>';
    $('#divDestaque').html(str);
}
function getBandaId(id){
	var jsonBandas=base.todas;
	for(var i=0;i<jsonBandas.length;i++){
		if(jsonBandas[i].id==id){
			return jsonBandas[i];
		}
	}
}

