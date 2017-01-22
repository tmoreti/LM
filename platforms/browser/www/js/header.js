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