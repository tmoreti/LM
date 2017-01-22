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