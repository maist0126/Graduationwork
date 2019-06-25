(function() {
	var config = {
	    apiKey: "AIzaSyBBMtBr_iQnw2I94KB3u1GVdbhUpWHobdk",
	    authDomain: "gradworktest.firebaseapp.com",
	    databaseURL: "https://gradworktest.firebaseio.com",
	    projectId: "gradworktest",
	    storageBucket: "gradworktest.appspot.com",
	    messagingSenderId: "16389860011",
	    appId: "1:16389860011:web:2b0ee6a6afa590da"
	};
	firebase.initializeApp(config);
}());

///서버와 연결///

function reset(){
	firebase.database().ref().set(null);
	firebase.database().ref('order/0').set({
		order: 1,
		real_order: 0,
		time: 0,
		username: 0
	});
	firebase.database().ref('setting').set({
		add: 'no'
	});
}