
$( window ).scroll(function() {
	if($(window).scrollTop()>133){
				
		$('#blocoMenu').addClass("menuFixo"); 
		
	}else{
		$('#blocoMenu').removeClass("menuFixo"); 
	}
});




