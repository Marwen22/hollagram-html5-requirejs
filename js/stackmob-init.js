define(['stackmob'], function(StackMob) {
    StackMob.init({
		appName: "hollagram_html5",
	    clientSubdomain: "stackmob339",
	    publicKey: "8a473cc4-60b3-4cf6-8667-3f268a1341ec",
	    apiVersion: 0
	});
    // return a particular StackMob that we've initialised
    return StackMob;
});