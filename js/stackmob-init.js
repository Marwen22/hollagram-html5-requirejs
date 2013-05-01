define(['stackmob'], function(StackMob) {
    StackMob.init({
	    publicKey:  "454b65bb-ad94-4699-9f3f-5e3b90b13370",
	    apiVersion: 0
	});
    // return a particular StackMob that we've initialised
    return StackMob;
});