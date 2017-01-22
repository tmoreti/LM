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
				$('#ftPerfil').html('<img src="http://graph.facebook.com/' + response.id + '/picture">');
			}else{
				// deslogado 
				$('#minhaBanda').hide();
				$('#mnConfiguracoes').hide();
				$('#mnLogin').show();
				$('#mnLogoff').hide();
				$('#ftPerfil').html('');
			}
		}
	);
}
function toggle_sidebar(){
    var sidebar = document.getElementById("sidebar");    
    if(sidebar.style.left != "0px"){
        sidebar.style.left = "0px";
    }else{
        sidebar.style.left = "-85%";
    }
}
function gravarInfoFace(nome,id,email){
	$.ajax({
		method: "POST",
	  	url: site + "loginFace.php",
	  	cache: false,
	  	data: {nome:nome, id: id, email: email}
	});
}