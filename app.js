var order;
var real_order;

var current_username;
var next_username;

var RemainDate=20000;

var start_status = 1;


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
		
	// firebase.database().ref('order/0' 
	// 	).set({
	// 	order: order,
	// 	real_order: real_order,
	// 	username: 0
	// });

	firebase.database().ref().child('order').on('value', initialData);
	setInterval('sync()',1000);
	// sync_order();

	// firebase.database().ref('order/'+real_order).set({
	// 	username: current_username,
	// 	time: RemainDate,
	// 	order: real_order
	// });
}());

function speak(userId){
	firebase.database().ref('order/'+order 
		).set({
		username: userId,
		time: 50000,
		order: order
	});
	order += 1;
	sync();
}



function sync(){
  	firebase.database().ref().child('order').on('value', syncData, view_time);
}

function start(){
  	if (start_status == 1){
  		start_status = 0;
  		real_order += 1;
  		firebase.database().ref().child('order').on('value', gotData1);
  		firebase.database().ref().child('order').on('value', gotTime);
    	tid=setInterval('msg_time()',1000);
    	console.log(real_order);
  	}
}

function stop(){
	firebase.database().ref('order/'+real_order).set({
		username: current_username,
		time: RemainDate,
		order: real_order
	});
	firebase.database().ref().child('order').on('value', gotTime);
	clearInterval(tid);	
	start_status = 1;
}

function initialData(data){
	order = data.val()[0].order;
	real_order = data.val()[0].real_order;
}

function gotTime(data){
	RemainDate = data.val()[real_order].time;
}

function syncData(data){
	try {
		current_username = data.val()[real_order].username;
		next_username = data.val()[real_order+1].username;
		document.getElementById("current").innerHTML="유저 " + current_username;
		document.getElementById("next").innerHTML="유저 " + next_username;
	} catch (e) {
  		try{		
  			current_username = data.val()[real_order].username;
			document.getElementById("current").innerHTML="유저 " + current_username;
			document.getElementById("next").innerHTML="없음" 
  		} catch (e) {
  		}
	}
	firebase.database().ref('order/0').set({
		order: order,
		real_order: real_order,
		username: 0,
		time: 0
	});
}

function view_time() {
	var currentTime = data.val()[real_order].time;
	var hours = Math.floor((currentTime % (1000 * 60 * 60 * 24)) / (1000*60*60));
	var minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000*60));
	var seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

	m = hours + ":" +  minutes + ":" + seconds ; // 남은 시간 text형태로 변경
	  
	document.all.timer.innerHTML = m;   // div 영역에 보여줌 
}

function gotData1(data){
	try {
		current_username = data.val()[real_order].username;
		next_username = data.val()[real_order+1].username;
		document.getElementById("current").innerHTML="유저 " + current_username;
		document.getElementById("next").innerHTML="유저 " + next_username;
	} catch (e) {
  		try{		
  			current_username = data.val()[real_order].username;
			document.getElementById("current").innerHTML="유저 " + current_username;
			document.getElementById("next").innerHTML="없음" 
  		} catch (e) {
  			real_order += -1;
  	// 		firebase.database().ref('order/'+0).set({
			// 	order: order,
			// 	real_order: real_order,
			// 	username: 0
			// });
  		}
	}
}




function msg_time() {
	// firebase.database().ref('order/'+real_order).set({
	// 	username: current_username,
	// 	time: RemainDate,
	// 	order: real_order
	// });
	// firebase.database().ref().child('order').on('value', gotTime);
	  var hours = Math.floor((RemainDate % (1000 * 60 * 60 * 24)) / (1000*60*60));
	  var minutes = Math.floor((RemainDate % (1000 * 60 * 60)) / (1000*60));
	  var seconds = Math.floor((RemainDate % (1000 * 60)) / 1000);

	  m = hours + ":" +  minutes + ":" + seconds ; // 남은 시간 text형태로 변경
	  
	  document.all.timer.innerHTML = m;   // div 영역에 보여줌 

	  if (RemainDate <= 0) {      
	    // 시간이 종료 되었으면..
	    stop();  // 타이머 해제
	  }else{
	    RemainDate = RemainDate - 1000;
	 // 남은시간 -1초
	  }
}



function original(){
  var hd = document.getElementById("footer");
  hd.style.backgroundColor = '#aaaaaa' ;  
  hd.style.color = '#000000' ;  
}

function add(){
	RemainDate = RemainDate + 1000*10;
 	var hd = document.getElementById("footer");
  	hd.style.backgroundColor = '#0000ff' ;
  	hd.style.color = '#ffffff' ; 
  	setTimeout("original()", 500);
}

function subtract(){
	RemainDate = RemainDate - 1000*10;
  	var hd = document.getElementById("footer");
  	hd.style.backgroundColor = 'red' ;
  	hd.style.color = '#ffffff' ; 
  	setTimeout("original()", 500);
}