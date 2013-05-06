define(['stackmob'], function(StackMob) {
    
	if(window.location.href === "http://hollagram_html5_requirejs.stackmob339.stackmobapp.com") {
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