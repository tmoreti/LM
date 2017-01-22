function carregarBase(){
	//if(checkConnection()){
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
		    base=JSON.parse(localStorage.getItem("base"));
		    
		    $('#indexLoad').html('');
		    $('.indexBotao').prop('disabled', false);
		    if(localStorage.getItem("urlInicial")){
		    	//document.location=localStorage.getItem("urlInicial");
		    }
		});
	//}else{
	//	$('#indexLoad').html('Sem conexão com a internet');
	//}
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