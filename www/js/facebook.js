function logoffFace(){
	toggle_sidebar();
	$('.corpo').fadeOut(500,function(){
		facebookConnectPlugin.logout(function(){
			$.mobile.changePage( "index.html", { transition: "slide", changeHash: false });
		})	
	});
}
function loginFace(){
	facebookConnectPlugin.login(["public_profile", "user_birthday", "email"],function(){
		$.mobile.changePage( "index.html", { transition: "slide", changeHash: false });
	})
}