var segmento='';
var base;
$( document ).ready(function() {
  new WOW().init();
  navigator.splashscreen.show();
  	//pageTransition();
  //StatusBar.backgroundColorByName("red");
});
function inicioIndex(){
	//localStorage.setItem("pref1", "val1");
	base=JSON.parse(localStorage.getItem("base"));
	
	menu();
	header();
	destaques();

	//$('.panel').css('height',$('.content').css('height'));
	//pageTransition();
}
function inicioBanda(id){
	base=JSON.parse(localStorage.getItem("base"));
	
	menu();
	header();
	infoBanda(id);
	mapaBanda(id);
	$('.corpo').fadeIn(1000);

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
    if(arrVideo.length>0){
    	
    	divVideo+='<div class="row">';
        	divVideo+='<div class="col-xs-12 siteInfoBanda">Videos</div>';
        divVideo+='</div>';

    	for(var i=0;i<arrVideo.length;i++){
	        divVideo+='<div class="row">';
	        divVideo+='<param name="autoplay" value="false">';
	        	divVideo+='<div class="col-xs-8 text-left">';
	        		divVideo+='<video controls="controls" id="myVideo' + i + '" autoplay="false" setVolume="1.0" autostart="false" name="media"><source src="http://www.grpet.com.br/php/videos/' + arrVideo[i].arquivo + '" type="video/mp4"></video>';
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
        alert('code: '    + error.code    + '\n' +
              'mensagem: ' + error.message + '\n');
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError, {timeout: 10000, enableHighAccuracy: true});

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

function abrirBanda(id){
	//document.location="visaoEstabelecimento.html#banda";
	setTimeout(inicioBanda(id),2000);

}

// ----------------------- SISTEMA ----------------------------//
function menu(){
	$.ajax({
		method: "POST",
	  	url: "menu.html",
	  	cache: false,
		dataType: 'html'
	}).done(function( html ) {
	    $('#sidebar').html(html);
	});
}
function irpara(url){
	$('.corpo').addClass('animated slideOutLeft');
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

function detalhesBanda(id){
	$('.corpo').fadeOut(1000,function(){
		setTimeout(function(){ document.location='banda.html?id=' + id; }, 1000);
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
	$.ajax({
		method: "POST",
	  	url: "http://grpet.com.br/php/load.php",
	  	cache: false,
	  	dataType: 'html'
	}).done(function( html ) {
	    localStorage.setItem("base",html);
	});
}