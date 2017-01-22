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