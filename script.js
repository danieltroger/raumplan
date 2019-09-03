//timer Label stuff
var slider = document.getElementById("timeRange");
var label = document.getElementById("label");
var play = document.getElementById("playButton");
var radios = document.getElementsByName("days");
var fillColor = "#b40000";

var date = new Date();

var fach = 0;
var found = 0;

// table coloring stuff
var table = document.getElementById("stundenplan");

updateT();

slider.oninput = function() {
	updateT();
};

function updateT() {
	var hours = Math.floor(slider.value / 60);
	var minutes = slider.value % 60;

	if (hours < 10 && minutes < 10) {
		label.innerHTML = "0" + hours + ":0" + minutes + " Uhr";
	} else if (hours < 10) {
		label.innerHTML = "0" + hours + ":" + minutes + " Uhr";
	} else if (minutes < 10) {
		label.innerHTML = hours + ":0" + minutes + " Uhr";
	} else {
		label.innerHTML = hours + ":" + minutes + " Uhr";
	}

	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			day = radios[i].value * 14;
			//console.log(day);
			break;
		}
	}

	var roomNums = [
		"3/0/32",
		"3/0/31",
		"3/1/2",
		"3/1/3",
		"3/1/4",
		"3/1/6",
		"3/1/9",
		"3/1/10",
		"3/1/15",
		"3/1/20",
		"3/1/21",
		"3/1/22",
		"3/1/23",
		"3/1/24",
		"3/2/2",
		"3/2/3",
		"3/2/4",
		"3/2/8",
		"3/2/11",
		"3/2/16",
		"3/2/17",
		"3/2/21",
		"3/2/24",
		"3/2/23",
		"3/2/22",
		/*"3/2/25",*/ 
		"3/2/26",
		"3/2/27",
		"3/3/1",
		"3/3/2",
		"3/3/6",
		"3/3/8",
		"3/3/11",
		"3/3/13",
		"3/3/10",
		"5/0/6",
		"5/0/7",
		"5/0/8",
		"5/1/1",
		"5/1/2",
		"5/1/6",
		"5/1/5",
		"4/1/14",
		"4/1/26",
		"4/1/24",
		"4/1/20",
		"4/1/19",
		"4/1/15",
		"4/1/25"
	];

	function highlAll() {
		for (var i = 0; i < roomNums.length; i++) {
			highlightRoom(roomNums[i]);
		}
	}

	highlAll();

	fach = hours - 8;

	function highlightRoom(room) {
		for (var i = 0, col; (col = table.rows[1].cells[i]); i++) {
			if (col.innerHTML.toLowerCase() == room) {
				for (var j = 0; j <= 13; j++) {
					table.rows[3 + day + j].cells[i].style.background = "none";
				}
				document.getElementById(room).style.fill = "rgba(0,0,0,0.01)";

				var current = table.rows[3 + fach + day].cells[i];
				if (
					current.innerHTML != "&nbsp;" &&
					current.innerHTML != " " &&
					current.innerHTML != ""
				) {
					current.style.background = "cyan";
					document.getElementById(room).style.fill = fillColor;
				}
			}
		}
	}
}
//time label stuff end

var tableB = document.getElementById("toggleTable");

var sp = document.getElementById("stundenplan").style;


if (sp.display == "none") {
	tableB.value = "Raumplan verstecken";
} else {
	tableB.value = "Raumplan anzeigen";
}

tableB.onclick = function() {
	if (sp.display == "none") {
		sp.display = "block";
		this.value = "Raumplan verstecken";
	} else {
		sp.display = "none";
		this.value = "Raumplan anzeigen";
	}
};

var nowB = document.getElementById("nowB");

nowB.onclick = function() {
	currentTime();
	updateT();
	highlAll();
};

function currentTime() {
	var hrs = date.getHours();
	var mins = date.getMinutes();
	slider.value = hrs * 60 + mins;
	updateT();
}


var playB = document.getElementById("playB");
var animating;

playB.onclick = function(){
  animating = !animating;
  animate();
}

function animate(){
  if(!animating){return;}
  var value = parseInt(slider.value);
  var min = parseInt(slider.min);
  var max = parseInt(slider.max);	
	
  if(value < max){
    slider.value = (value+1);
  } else {
    var wasChecked = 0;
		for(var i=0; i<radios.length; i++) {
			if(radios[i].checked) {
				wasChecked = i;
			radios[i].checked = false;
			}
		}
    var newDay = wasChecked+1;
    if(newDay > radios.length-1) {
			newDay = 0
		};
    radios[newDay].checked = true;
    slider.value = min;
  }
  updateT();
  setTimeout(animate,5);
}
