define(['stackmob'], function(StackMob) {
    
    var str = window.location.href;
	var n=str.search("http://hollagram_html5_requirejs.stackmob339.stackmobapp.com");
	
	if(n === 0) {
		StackMob.init({
	    	publicKey:  "e3cbec6f-4ecc-4b2f-88e2-e8f4d4f13731",
	    	apiVersion: 1
		});
		console.log('init production');
	} else {
		StackMob.init({
		    publicKey:  "454b65bb-ad94-4699-9f3f-5e3b90b13370",
		    apiVersion: 0
		});
		console.log('init dev');
	}
    
    // return a particular StackMob that we've initialised
    return StackMob;
});