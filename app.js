(function() {
	var config = {
	    apiKey: "AIzaSyBoKs-oTpicUz_Juz4ZEIxt5KwkpJT5kZI",
	    authDomain: "gradwork-38c06.firebaseapp.com",
	    databaseURL: "https://gradwork-38c06.firebaseio.com",
	    projectId: "gradwork-38c06",
	    storageBucket: "gradwork-38c06.appspot.com",
	    messagingSenderId: "99475487448"
	};

	firebase.initializeApp(config);

	// const preObject = document.getElementById('object');
	// const ulList = document.getElementById('list');

	const dbRefObject = firebase.database().ref().child('order');

	dbRefObject.on('child_added', snap => {
		var a = snap.val();
		console.log(a);
		console.log(a['time']);
	});
}());

var order = 1;

function speak(userId){
	firebase.database().ref('order/'+order 
		).set({
		username: userId,
		time: 120
	});
	order += 1;
}