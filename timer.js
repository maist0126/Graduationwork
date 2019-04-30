// $(document).ready(function(){
//   if (start_status == 1){
//     console.log("s");
//     tid=setInterval('msg_time()',1000);
//   } // 타이머 1초간격으로 수행
// });

var start_status = 1;
var RemainDate = 1000*60*60*1;


function msg_time() {
  var hours = Math.floor((RemainDate % (1000 * 60 * 60 * 24)) / (1000*60*60));
  var minutes = Math.floor((RemainDate % (1000 * 60 * 60)) / (1000*60));
  var seconds = Math.floor((RemainDate % (1000 * 60)) / 1000);

  m = hours + ":" +  minutes + ":" + seconds ; // 남은 시간 text형태로 변경
  
  document.all.timer.innerHTML = m;   // div 영역에 보여줌 
  
  var hd = document.getElementById("header");
  hd.style.backgroundColor = '#aaaaaa' ;

  if (RemainDate < 0) {      
    // 시간이 종료 되었으면..
    clearInterval(tid);   // 타이머 해제
  }else{
    RemainDate = RemainDate - 1000; // 남은시간 -1초
  }
}

function start(){
  if (start_status == 1){
    start_status = 0;
    console.log("s");
    tid=setInterval('msg_time()',1000);
  }
}

function add(){
	RemainDate = RemainDate + 1000*10;
  var hd = document.getElementById("header");
  hd.style.backgroundColor = '#0000ff' ;
}

function subtract(){
	RemainDate = RemainDate - 1000*10;
  var hd = document.getElementById("header");
  hd.style.backgroundColor = 'red' ;
}