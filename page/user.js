var order;
var real_order;
var alert;

var current_username;
var next_username;
var more_username;

var RemainDate;
var alarm_state;

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

	setInterval('sync()',10);
	time_push();

	firebase.database().ref('setting/').set({
		add: 'no'
	});
}());

///서버와 연결///

function sync(){
  	firebase.database().ref().child('order').on('value', syncData);
  	firebase.database().ref().child('setting').on('value', syncData2);
}

function time_push(){
	firebase.database().ref('order/'+ real_order).set({
		username: current_username,
		time: RemainDate,
		order: real_order
	});
}

function order_push(){
	firebase.database().ref('order/0').set({
		order: order,
		real_order: real_order,
		username: 0,
		time: 0
	});
}

///서버와 연결 - 부수///

function gotTime(data){
	RemainDate = data.val()[real_order].time;
}

function syncData(data){
	order = data.val()[0].order;
	real_order = data.val()[0].real_order;
	try {
		current_username = data.val()[real_order].username;
		next_username = data.val()[real_order+1].username;
		more_username = data.val()[real_order+2].username;
		document.getElementById("current").innerHTML="유저 " + current_username;
		document.getElementById("next").innerHTML="유저 " + next_username;
		document.getElementById("more").innerHTML="유저 " + more_username;
	} catch (e) {
  		try{		
  			current_username = data.val()[real_order].username;
  			next_username = data.val()[real_order+1].username;
			document.getElementById("current").innerHTML="유저 " + current_username;
			document.getElementById("next").innerHTML="유저 " + next_username;
			document.getElementById("more").innerHTML="없음"; 
  		} catch (e) {
  			try{		
  			current_username = data.val()[real_order].username;
			document.getElementById("current").innerHTML="유저 " + current_username;
			document.getElementById("next").innerHTML="없음"; 
			document.getElementById("more").innerHTML="없음"; 
	  		} catch (e) {
	  		}
  		}
	}
	var currentTime = data.val()[real_order].time;
	var hours = Math.floor((currentTime % (1000 * 60 * 60 * 24)) / (1000*60*60));
	var minutes = Math.floor((currentTime % (1000 * 60 * 60)) / (1000*60));
	var seconds = Math.floor((currentTime % (1000 * 60)) / 1000);

	m = hours + ":" +  minutes + ":" + seconds ; // 남은 시간 text형태로 변경
	  
	document.all.timer.innerHTML = m;   // div 영역에 보여줌 
}

function syncData2(data){
	alert = data.val().add;
	if(alert == 'blue')
	{
		var hd = document.getElementById("footer");
  		hd.style.backgroundColor = 'blue' ;
  		hd.style.color = '#ffffff' ; 
  		setTimeout("original()", 500);
  		firebase.database().ref('setting/').set({
			add: 'no'
		});	
	}else if(alert == 'red'){
		var hd = document.getElementById("footer");
  		hd.style.backgroundColor = 'red' ;
  		hd.style.color = '#ffffff' ; 
  		setTimeout("original()", 500);
  		firebase.database().ref('setting/').set({
			add: 'no'
		});	
	}
}

function gotData1(data){
	try {
		current_username = data.val()[real_order].username;
		next_username = data.val()[real_order+1].username;
		more_username = data.val()[real_order+2].username;
		document.getElementById("current").innerHTML="유저 " + current_username;
		document.getElementById("next").innerHTML="유저 " + next_username;
		document.getElementById("more").innerHTML="유저 " + more_username;
	} catch (e) {
  		try{		
  			current_username = data.val()[real_order].username;
  			next_username = data.val()[real_order+1].username;
			document.getElementById("current").innerHTML="유저 " + current_username;
			document.getElementById("next").innerHTML="유저 " + next_username;
			document.getElementById("more").innerHTML="없음"; 
  		} catch (e) {
  			try{		
  			current_username = data.val()[real_order].username;
			document.getElementById("current").innerHTML="유저 " + current_username;
			document.getElementById("next").innerHTML="없음"; 
			document.getElementById("more").innerHTML="없음"; 
	  		} catch (e) {
	  			real_order += -1;
  				order_push();
	  		}
  		}
	}
}

///발언 시작, 종료///

function speak(userId){
	firebase.database().ref('order/'+ order).set({
		username: userId,
		time: 60000,
		order: order
	});
	sync();
	order += 1;
	order_push();
}

function start(){
  	if (start_status == 1){
  		start_status = 0;
  		sync();
  		real_order += 1;
		order_push();

  		firebase.database().ref().child('order').on('value', gotData1);
  		firebase.database().ref().child('order').on('value', gotTime);
    	tid=setInterval('msg_time()',1000);
  	}
}

function stop(){
	firebase.database().ref().child('order').on('value', gotTime);
	time_push();
	clearInterval(tid);	
	start_status = 1;
}

///타이머///

function msg_time() {
	if (RemainDate <= 0) {      
		stop();
	} else if (RemainDate >= 1000*16) {
		alarm_state = 1;
		RemainDate = RemainDate - 1000;
	    time_push();
	} else if (RemainDate <= 1000*15) {
		if (alarm_state == 1){
		    play();
		    alarm_state = 0;
		}
		RemainDate = RemainDate - 1000;
	    time_push();
	}
	else{
	    RemainDate = RemainDate - 1000;
	    time_push();
	}
}

///더듣, 그만듣///

function original(){
  var hd = document.getElementById("footer");
  hd.style.backgroundColor = '#e9e9e9' ;  
  hd.style.color = '#000000' ;  
}

function add(){
	firebase.database().ref().child('order').on('value', gotTime);
	// RemainDate = RemainDate + 1000*10;
	// time_push();
	firebase.database().ref('setting/').set({
		add: 'blue'
	});
}

function subtract(){
	firebase.database().ref().child('order').on('value', gotTime);
	// RemainDate = RemainDate - 1000*5;
	// time_push();
	firebase.database().ref('setting/').set({
		add: 'red'
	});
}

//audio//

function play() { 
    var audio = document.getElementById('audio_play'); 
    if (audio.paused) { 
        audio.play(); 
    }else{ 
        audio.pause(); 
        audio.currentTime = 0;
    } 
}

