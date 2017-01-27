var segmento='';
var base;
var site='https://www.livemusicapp.com.br/livemusicapp/';
$( document ).ready(function() {
	new WOW().init();
	//navigator.splashscreen.show();
});
function irpara(url){
	if(url=='index.html'){
		$('.hd').fadeOut('slow');
		$('#sidebar').fadeOut('slow');
	}
	if($('#sidebar').css('left')=='0px'){
		toggle_sidebar();
	}
	$.mobile.changePage(url, { transition: "slide", changeHash: false });
}