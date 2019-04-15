var windowW, windowH

// var hw = document.getElementById('hw');
// hw.addEventListener('click', function(){
//     alert('Hello world');
//     initSize();
// })

$(document).ready(function () {
	initSize();
	$(window).resize(function () {
        initSize();
    });
}

function initSize() {
	windowW = window.innerWidth;
	windowH = window.innerHeight;

	$("#top").css("height", windowH/2 + "px");
	$("#top").css("width", windowW + "px");
	// $("#top").height(windowH/2);
 //    $("#top").width(windowW);

	$("#bottom").css("height", windowH/2 + "px");
	$("#bottom").css("width", windowW + "px");
    // $("#bottom").width(windowW);
    // $("#bottom").height(windowH/2);
}