var segmento='';
var base;
var site='http://livemusicapp.com.br/livemusicapp/';
$( document ).ready(function() {
	new WOW().init();
	navigator.splashscreen.show();
});

function inicioIndex(){
	base=JSON.parse(localStorage.getItem("base"));
	
	menu();
	header();
	$('.corpo').load('visaoEstabelecimento-home.html',function(){
		destaques();
		fnContratados();
		fnCategorias();
	});
	
	//$('.panel').css('height',$('.content').css('height'));
	//pageTransition();
}
function inicioBanda(id){
	base=JSON.parse(localStorage.getItem("base"));

	infoBanda(id);
	mapaBanda(id);
}

function inicioCategoria(id,nome){
	base=JSON.parse(localStorage.getItem("base"));
	$('#divNomeCategoria').html('<h2>' + nome + '</h2>');
	gerarLista(id);
}

// ----------------------- CATEGORIA ------------------------//

function gerarLista(id){
	var arr=getLista(id);
	var str='';
	var classe=0;
	for(var i=0;i<arr.length;i++){
		if(classe==0){
			classe=1;
			cor='listaCategoria';
		}else{
			cor='listaCategoriaTransparente';
			classe=0;
		}
		str+='<div class="row ' + cor + '" onclick="detalhesBanda(' + arr[i].id + ')">'
			str+='<div class="col-xs-8"><div class="img-responsive img-thumbnail img-rounded ftBanda"><img src="' + arr[i].logo + '" style="width:100%;height:100%;"></div></div>';
			str+='<p><div class="col-xs-4 nomeInfoBanda">' + arr[i].nome + '</div></p>';
			str+='<p><div class="col-xs-4 nomeInfoBanda">' + estrelas(arr[i].pontos) + '</div></p>';
		str+='</div>';
	}
	$('#divlistaCategoria').html(str);
}

function getLista(id){
	var arrBandas=base.todas;
	var arr=new Array();
	for(var i=0;i<arrBandas.length;i++){
		if(arrBandas[i].categoria==id){
			arr.push(arrBandas[i]);
		}
	}
	return arr;
}

// ----------------------- BANDA ----------------------------//

function infoBanda(id){
	var arrBanda=getBandaId(id);
	var arrVideo=getVideos(id);

    var str='<div class="row">';
	    str+='<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 text-left">';
		    str+='<div class="fotoNome">';
		    	str+='<img src="' + arrBanda.logo + '" class="img-responsive img-thumbnail img-rounded wow bounceIn" data-wow-delay="0s">';
		    str+='</div>';
	    str+='</div>';
	    str+='<div class="col-xs-6 nomeInfoBanda"><p>' + arrBanda.nome + '</p><p>' + estrelas(arrBanda.pontos) + '</p></div>';
    str+='</div>';
    str+='<div class="row">';
    	str+='<div class="col-xs-6 text-center siteInfoBanda">&nbsp;</div>';
    str+='</div>';
    
	var divVideo='';
    $('#divVideos').html('');
	$('#divNomeVideos').html('');
    if(arrVideo.length>0){
    	
    	$('#divNomeVideos').html('<div class="row"><div class="col-xs-12 siteInfoBanda">Videos</div></div>');

    	for(var i=0;i<arrVideo.length;i++){
    		var divVideo='';
	        divVideo+='<div class="row">';
	        divVideo+='<param name="autoplay" value="false">';
	        	divVideo+='<div class="col-xs-8 text-left">';
	        		divVideo+='<video controls="controls" id="myVideo' + i + '" autoplay="false" setVolume="1.0" autostart="false" name="media"><source src="' + site + 'videos/' + arrVideo[i].arquivo + '" type="video/mp4"></video>';
	        	divVideo+='</div>';
	        	divVideo+='<div class="col-xs-4 nomeInfoBanda">';
	        	divVideo+=arrVideo[i].nome;
	        	divVideo+='</div>';
	        divVideo+='</div>';

			$('#divVideos').append(divVideo);

	        var vid = document.getElementById("myVideo" + i);
			vid.autoplay = false;
			vid.controls=true;
			vid.poster=arrBanda.logo;
			$(vid).css('width','100%');
			vid.load();
    	}
    }

    $('#infoBanda').html(str);
}

function mapaBanda(id){
	var map;
    var onSuccess = function(position) {
      var map = new GMaps({
        el: '#map',
        lat: position.coords.latitude,
		lng: position.coords.longitude
      });
	};

    function onError(error) {
        //alert('code: '    + error.code    + '\n' + 'mensagem: ' + error.message + '\n');
        navigator.notification.alert('Verifique se seu gps está ativo', function(){}, 'Live Music');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true});

}

// ----------------------- LOGIN FACEBOOK ----------------------------//
function logoffFace(){
	toggle_sidebar();
	$('.corpo').fadeOut(500,function(){
		facebookConnectPlugin.logout(function(){
			document.location="index.html";
		})	
	});
}
function loginFace(){
	facebookConnectPlugin.login(["public_profile", "user_birthday", "email"],function(){
		document.location="index.html";
	})
}
function verificarLogin(){
	facebookConnectPlugin.getLoginStatus(
		function(response){
			if(response.status=='connected'){
				// logado
				facebookConnectPlugin.api('/me?fields=id,name,email', null,
					 function(response) {
						 window.localStorage["nome"]=response.name;
						 window.localStorage["id"]=response.id;
						 window.localStorage["email"]=response.email;
						 window.localStorage["logado"]='1';
						 window.localStorage["modo_login"]='facebook';
						 gravarInfoFace(response.name,response.id,response.email);
					 }
				);
				$('#mnConfiguracoes').show();
				$('#mnLogin').hide();
				$('#nmLogoff').show();
				$('#minhaBanda').show();
			}else{
				// deslogado 
				$('#minhaBanda').hide();
				$('#mnConfiguracoes').hide();
				$('#mnLogin').show();
				$('#mnLogoff').hide();
			}
		}
	);
}
function gravarInfoFace(nome,id,email){
	$.ajax({
		method: "POST",
	  	url: site + "loginFace.php",
	  	cache: false,
	  	data: {nome:nome, id: id, email: email}
	});
}
// ----------------------- VISAO ESTABELECIMENTO ----------------------------//

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

function quantidadeFotos(obj){
	var qtdd = $(obj).find('.fotoNome');
	return qtdd.length;
}
function exibirMaisContratados(){
	var rankingContratos=base.contratados;
	var qtdExibidos=quantidadeFotos('#divContratados');
	var qtd=rankingContratos.length;
	var fim=qtdExibidos+5;
	//console.log('exibido: ' + qtdExibidos);
	//console.log('qtdtotal: ' + qtd);
	if(qtdExibidos+5>qtd){
		fim=parseInt(qtdExibidos)+(parseInt(qtd)-parseInt(qtdExibidos));
	}
	//console.log(fim);
	var str='';
	for(var i=qtdExibidos;i<fim;i++){
		var arrBanda=getBandaId(rankingContratos[i].id);
		str+='<div class="fotoNome" style="padding:5px; min-width:170px;" onclick="detalhesBanda(\'' + arrBanda.id + '\')">';
            str+='<div class="divFoto">';
                str+='<img src="' + arrBanda.logo + '" class="img-responsive img-thumbnail img-rounded ftBanda" style="display: none;">';
            str+='</div>';
            str+='<p>' + arrBanda.nome + '</p>';
            str+='<p>' + estrelas(arrBanda.pontos) + '</p>';
        str+='</div>';
	}
	$('#divContratados > .listaBandas').append(str);
	$('#divContratados').waitForImages(function() {
	    
	}, function(loaded, count, success) {
		if(success){
			$(this).fadeIn('fast');
		}else{
			$(this).attr('src','imagens/logoAlta.png');
		}
	   
	});
}

function fnContratados(){
	var rankingContratos=base.contratados;
	var qtdExibidos=quantidadeFotos('#divContratados');
	var qtd=rankingContratos.length;
	
	var str='<div class="listaBandas">';
	for(var i=0;i<qtd;i++){
		var arrBanda=getBandaId(rankingContratos[i].id);
		str+='<div class="fotoNome" style="padding:5px; min-width:170px;" onclick="detalhesBanda(\'' + arrBanda.id + '\')">';
            str+='<div class="divFoto">';
                str+='<img src="' + arrBanda.logo + '" class="img-responsive img-thumbnail img-rounded ftBanda" style="display: none;">';
            str+='</div>';
            str+='<p>' + arrBanda.nome + '</p>';
            str+='<p>' + estrelas(arrBanda.pontos) + '</p>';
        str+='</div>';
	}
	str+='</div>';
	$('#divContratados').html(str);
	$('#divContratados').waitForImages(function() {
		//funcao para add mais contratados na lista quando chegar no fim do scroll   
		/*$('#divContratados .listaBandas').scroll(function(){
		 	var tm=document.getElementsByClassName('listaBandas')[0].scrollWidth
			//console.log($(this).scrollLeft());
			if($(this).scrollLeft() + $(this).width() >= tm-5){
				exibirMaisContratados();
			}
		})*/
	}, function(loaded, count, success) {
		if(success){
			$(this).fadeIn('fast');
		}else{
			$(this).attr('src','imagens/logoAlta.png');
		}
	   
	});

	
	while(qtdExibidos*170<$(window).width()){
		qtdExibidos=quantidadeFotos('#divContratados');
		exibirMaisContratados();
	}
}
function abrirBanda(id){
	//document.location="visaoEstabelecimento.html#banda";
	setTimeout(inicioBanda(id),2000);

}
function fnCategorias(){
	var arrCategorias=base.categorias;
	var qtd=arrCategorias.length;
	var str='';
	for(var i=0;i<qtd;i++){
		str+='<button type="button" class="btn btn-md botaoCategoria" onclick="abrirCategoria(' + arrCategorias[i].id + ',\'' + arrCategorias[i].nome + '\')">' + arrCategorias[i].nome + '</button>';
	}
	$('#divCategorias').html(str);
}

// ----------------------- SISTEMA ----------------------------//
function validarCelular(nr){
	var c1 = $('#c1').val();
	var c2 = $('#c2').val();
	var c3 = $('#c3').val();
	var c4 = $('#c4').val();
	var code=c1.toString() + c2.toString() + c3.toString() + c4.toString();
	var email=window.localStorage["email"];
	var numero=nr;
	$.ajax({
		method: "POST",
	  	url: site + "validarCelular.php",
	  	cache: false,
	  	data: {
	  			email: email
	  			,numero: numero
	  			,code: code
	  		},
		dataType: 'html'
	}).done(function(html){
		if(html==1){
			$( "#dialog" ).dialog( "close" );
			window.localStorage["celular"]=nr;
			navigator.notification.alert('Celular confirmado com sucesso!', function(){}, 'Live Music');
		}else{
			navigator.notification.alert('Houve um problema para confirmar seu celular. Por favor, tente novamente!', function(){}, 'Live Music');
		}
	})
}
function confirmarCelular(nr){
	var email=window.localStorage["email"];
	window.localStorage["celular"]='';
	$.ajax({
		method: "POST",
	  	url: site + "confirmarCelular.php",
	  	cache: false,
	  	data: {
	  			numero: nr 
	  			,email: email
	  		},
		dataType: 'html'
	}).done(function( html ) {
	    // abrir popup para confirmar
	    //if(html==1){
	    	$( "div" ).remove( "#dialog" );

	    	$('body').append('<div id="dialog" title="Codigo SMS"><div class="row"><div class="col-xs-3 text-center"><input type="number" pattern="[0-9]*" min="0" max="1" onkeypress="" class="form-control" placeholder="0" id="c1"></div><div class="col-xs-3 text-center"><input type="number" pattern="[0-9]*" maxlength="1" min="0" max="1" class="form-control" placeholder="0" id="c2"></div><div class="col-xs-3 text-center"><input type="number" pattern="[0-9]*" maxlength="1" min="0" max="1" class="form-control" placeholder="0" id="c3"></div><div class="col-xs-3 text-center"><input type="number" pattern="[0-9]*" min="0" max="1" maxlength="1" class="form-control" placeholder="0" id="c4"></div></div><div class="row"><div class="col-xs-12 text-center"><button id="btValidarCel" class="btn btn-default btn-block" style="margin-top:5px;" onclick="validarCelular(\'' + nr + '\')">Confirmar</button></div></div></div>');
		    $( "#dialog" ).dialog({
		    		width:$(window).width(),
		    		height:$(window).height(),
		    		position: { my: "0 0"},
		    		show: { effect: "folde", duration: 1000, function(){
		    			$('#c1').focus();
		    		}},
		    		hide: {
				        effect: "fold",
				        duration: 1000
				    }
		    });	

		    $('#c1').keyup( function(e){
			    var max = $('#c1').attr('max').length;
			    if ($(this).val().length >= max) {
			    	$('#c2').focus();
			        $(this).val($(this).val().substr(0, max));
			    }
			});
		   	$('#c2').keyup( function(e){
			    var max = $('#c2').attr('max').length;
			    if ($(this).val().length >= max) {
			    	$('#c3').focus();
			        $(this).val($(this).val().substr(0, max));
			    }
			});
			$('#c3').keyup( function(e){
			    var max = $('#c3').attr('max').length;
			    if ($(this).val().length >= max) {
			    	$('#c4').focus();
			        $(this).val($(this).val().substr(0, max));
			    }
			});
			$('#c4').keyup( function(e){
			    var max = $('#c4').attr('max').length;
			    if ($(this).val().length >= max) {
			    	$('#btValidarCel').focus();
			        $(this).val($(this).val().substr(0, max));
			    }
			});
	    //}
	});
}
function menu(){
	$.ajax({
		method: "POST",
	  	url: "menu.html",
	  	cache: false,
		dataType: 'html'
	}).done(function( html ) {
	    $('#sidebar').html(html);
	    verificarLogin();
	});
}
function selIni(url){
	localStorage.setItem("urlInicial",url);
	document.location=url;
}
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    if(networkState==Connection.NONE){
    	return false;
    }else{
    	return true;
    }
    //alert('Connection type: ' + states[networkState]);
}



function irpara(url){
	$('body').addClass('animated fadeOut');
		setTimeout(function(){ document.location=url; }, 1000);
		
}
function playMusic(link){
	window.plugins.html5Video.initialize({
      "video1" : link
  })
	window.plugins.html5Video.play("video1")
}
function abrirLinkExterno(link){
	$('.corpo').load('index.html');
	if (device.platform.toUpperCase() == 'ANDROID') {
		window.open('http://' + link.replace('http://',''), '_blank', 'location=yes');
        //navigator.app.loadUrl(link, {openExternal : true});
    }
    else if (device.platform.toUpperCase() == 'IOS') {
       	window.open('http://' + link.replace('http://',''), '_system');
    }
}

function irparaLoad(url){
	toggle_sidebar();
	$('.corpo').fadeOut(500,function(){
		$('.corpo').load(url,function(){
			$('.corpo').fadeIn(500);
			if(url=='configuracoes.html'){
				$( "#accordion" ).accordion();
				$('#celular').mask('(99) 99999-9999');
				if(window.localStorage["celular"]!=''){
					$('#celular').val(window.localStorage["celular"]);
				}
				alert(window.localStorage["cartao"]);
				if(window.localStorage["cartao"]!=''){
					$('#existeCartao').css('display','');
					$('#btAddCartao').css('display','none');
				}else{
					$('#existeCartao').css('display','none');
					$('#btAddCartao').css('display','');
				}
			}
		});
	});
}
function editarCartao(){
	$('#editCartao').fadeIn('slow');
	$('#cartaoInfo').fadeOut('slow');
}
function detalhesBanda(id){
	$('.corpo').fadeOut(500,function(){
		$('.corpo').load('bandasNovo.html?id=' + id,function(){
			$('.corpo').fadeIn(500);
			inicioBanda(id);
		});
	});
}
function abrirCategoria(id,nome){
	$('.corpo').fadeOut(500,function(){
		$('.corpo').load('categorias.html',function(){
			$('.corpo').fadeIn(500);
			inicioCategoria(id,nome);
		});
	});
}
function estrelas(qtd){
	var str='';
	for(i=1;i<=qtd;i++){
		str+='<span class="glyphicon glyphicon-star"></span> ';
	}
	for(j=i;j<=5;j++){
		str+='<span class="glyphicon glyphicon-star-empty"></span> ';
	}
	return str;
}
function header(){
	$.ajax({
		method: "POST",
	  	url: "header.html",
	  	cache: false,
		dataType: 'html'
	}).done(function( html ) {
	    $('.hd').html(html);
	});
}

function toggle_sidebar(){
    var sidebar = document.getElementById("sidebar");    
    if(sidebar.style.left != "0px"){
        sidebar.style.left = "0px";
    }else{
        sidebar.style.left = "-85%";
    }
}

function banda(json){
	document.location="banda.html"
}

function getBandaId(id){
	var jsonBandas=base.todas;
	for(var i=0;i<jsonBandas.length;i++){
		if(jsonBandas[i].id==id){
			return jsonBandas[i];
		}
	}
}

function getVideos(id){
	var jsonVideo=base.videos;
	var arr=new Array();
	for(var i=0;i<jsonVideo.length;i++){
		if(jsonVideo[i].id_banda==id){
			arr.push(jsonVideo[i]);
		}
	}
	return arr;
}
function carregarBase(){
	if(checkConnection()){
		$.ajax({
			method: "POST",
		  	url: site + "load.php",
		  	cache: false,
		  	dataType: 'html',
		  	beforeSend: function(){
		  		$('#indexLoad').html('Carregando..');
		  	}
		}).done(function( html ) {
		    localStorage.setItem("base",html);
		    $('#indexLoad').html('');
		    $('.indexBotao').prop('disabled', false);
		    if(localStorage.getItem("urlInicial")){
		    	document.location=localStorage.getItem("urlInicial");
		    }
		});
	}else{
		$('#indexLoad').html('Sem conexão com a internet');
	}

}