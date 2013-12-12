//currentLayer keeps track of the floor that is open and gets deleted when a floor is closed
var currentLayer = "";
var currentFloor;
var elements = new Array();
var transparentbox;
var turnonlist = new Array();
var stateofbehindbox;
var moveAbove = new Array();
var moveBelow = new Array();
var today = new Date();
var output = document.getElementById('roomholder');


//this function init gets called once the page loads
var init = function() {
	elements = document.getElementsByClassName('layer');
	transparentbox = document.getElementById('transparentbox'); 
	stateofbehindbox = getstateofbehindbox();
	//checkstatus(1);
	displaydefaulttoday();
	addEL(elements);

	// var roomtester = document.getElementById('roomtester');
	// roomtester.addEventListener( 'click', function() {
	// 	alert("hello work");
	// } , false);
}

var getstateofbehindbox = function() {
	return transparentbox.hasClassName('transparentboxbehind');
}

function addEL(elements) {
	for (var i = 0; i < elements.length; i++) {
	    elements[i].addEventListener( 'click', addtheListeners , false);	
	}
    $( "#datepicker" ).datepicker();
    $('#timepicker').timepicker();

}

function addtheListeners() {
	console.log ("--------------NEW THING CLICKED---------------");
	//console.log("This should be blank if nothing is open or show the room if one is open: " + currentFloor);
	if (currentLayer === this) {
		//console.log("I just clicked the floor already open, thus, do nothing")
		//do nothing, because you dont want to close out of the open floor if user clicks on it again
	} else {
		//if there is an open one, close it 
		if (currentLayer != ""){
			//console.log("There must be this one open already so now close it...." + currentFloor)
			FlipDown(currentLayer, currentFloor);
		} 
		//console.log("...now open the new floor")
		//if there isn't an open one, open new one
		currentLayer = this;
		currentFloor = this.childNodes[1].className;
		currentFloor = currentFloor.toString();
		console.log("the currentLayer floor is: " + currentFloor);
		
		if (currentFloor.length == 3) {
			currentFloor = Number(currentFloor[2]);	
		} else if (currentFloor.length == 4) {
			currentFloor = currentFloor.substr(2,3);
			currentFloor = Number(currentFloor);
		}
		console.log(currentFloor);
		FlipUp(currentLayer, currentFloor);
	}

}

function defineMovingFloors(currentFloor){
	console.log ("DEFINING THE FLOORS THAT WILL MOVE")
	moveAbove.length = 0;
	moveBelow.length = 0;
	//finding the arrays of the floors that need to move up and that need to move down
	if (currentFloor == 10) {
		moveAbove = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		moveBelow = [11];
	} else if (currentFloor == 11) {
		moveAbove = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	} else {
		for (var j=(currentFloor + 1); j <= 9; j++){
			moveAbove.push(j);
		}
		for (var k=(currentFloor - 1); k > 0; k=k-1){
			//console.log(k);
			moveBelow.push(k);
		}
		moveBelow.push(10, 11);	
	}
}

function MoveAway(moveAbove, moveBelow) {
	console.log ("FLOORS MOVE AWAY")
	for (var l = 0; l < moveAbove.length; l++) {
		var floor = Number(findelementnumber(moveAbove[l]));
		elements[floor].parentNode.toggleClassName('toggleMoveUp');	
		//console.log("move up element " + l);
	}
	for (var m = 0; m < moveBelow.length; m++) {
		var floor = Number(findelementnumber(moveBelow[m]));	
		elements[floor].parentNode.toggleClassName('toggleMoveDown');	
	}
}

function FlipUp(currentLayer, currentFloor) {
	console.log("current floor is " + currentFloor);
	defineMovingFloors(currentFloor);
	console.log("OPENING above: " + moveAbove);
	console.log("below: " + moveBelow);
	MoveAway(moveAbove, moveBelow);
	console.log ("CURRENT FLOOR FLIPS UP")
	//turn on big background box
	transparentbox.toggleClassName('transparentboxbehind');
	currentLayer.toggleClassName('flipped');
	currentLayer.parentNode.toggleClassName('flippedBox');
	
	transparentbox.addEventListener( 'click', function(){
		//trigger the open floor to go down if outside is clicked
		console.log("CLICKED OUTSIDE BOX SO FLIP DOWN : " + currentLayer + currentFloor);
		FlipDown(currentLayer, currentFloor);
	}, false); 

	currentLayer.addEventListener( 'webkitAnimationEnd', function() {
	    DeleteEventListeners();
		AddDivsForRoomEL(currentFloor);
  	}, false);
	
}

function DeleteEventListeners() {
	for (var i = 0; i < elements.length; i++) {
		console.log("DELETE EVENT LISTENER");
	    elements[i].removeEventListener('click',addtheListeners,false);	
	}
}

function AddDivsForRoomEL(currentFloor) {
	var addELtotheserooms = "";
	if (currentFloor === 9 || currentFloor === 10 || currentFloor === 11 ) {
		//do nothing
	} else if (currentFloor === 8) {
		addELtotheserooms = ["rm801", "rm802", "rm803", "rm804", "rm806", "brooks"];
	} else if (currentFloor === 7) {
		addELtotheserooms = ["rm717"];
	} else if (currentFloor === 6) {
		addELtotheserooms = ["rm616"];
	} else if (currentFloor === 5) {
		addELtotheserooms = ["rm502", "rm503", "rm504", "rm505", "rm506"];
	} else if (currentFloor === 4) {
		addELtotheserooms = ["rm427", "rm416"];
	} else if (currentFloor === 3) {
		addELtotheserooms = ["rm305"];
	} else if (currentFloor === 2) {
		addELtotheserooms = ["rm201A", "rm201"];
	} else if (currentFloor === 1) {
		addELtotheserooms = ["rm101", "rm104", "rm105", "rm106"];
	}
	output.toggleClassName("moveforward");
	for (i = 0; i < addELtotheserooms.length; i++) {
		console.log(i);
		console.log(addELtotheserooms[i]);
		var add = addELtotheserooms[i];
		var ele = document.createElement("div");
        ele.setAttribute("class","room " + add);
        output.appendChild(ele);
	}
	AddRoomELs();
}

function AddRoomELs(){
	var rooms = document.getElementById('roomholder').children;
	for (var i = 0; i < rooms.length; i++) {
		console.log(rooms[i]);
	    rooms[i].addEventListener( 'click', addtheRoomListeners , false);
	     // rooms[i].style.background = "blue";
	    
	}
}

function addtheRoomListeners() {
	// event.target.style.background = "yellow";
	var roomclicked = event.target.className.split(" ")[1];
	// alert("workingg " + event.target.className.split(" ")[1]);
	roomclicked = roomclicked.substring(2,5);
	var match = checkifroomisredinfb(date, time, roomclicked);
	console.log(match);
	if (match === true ) {
		alert("This room is already taken.");
	} else {
		console.log(roomclicked);
		if(date == null || time == null) {
			alert("Please pick a date and a time if you would like to reserve a room.");
			return;
		}
	    var popup = document.getElementById("popupbox");
	    if ( popup != null ) {
	    	popup.remove();
	    }
	    var coords = getCoords(event);
	    console.log("coords " + coords);
		var ele = document.createElement("div");
	    ele.setAttribute("id","popupbox");
	    ele.setAttribute("class", "greybutton");
	    ele.setAttribute("style", "margin-left:" + coords[0] + "px; margin-top:" + coords[1] + "px");
	    event.target.parentNode.appendChild(ele);
		document.getElementById("popupbox").innerHTML = "To send an immediate request for room " + roomclicked + " please enter your email address. <br><br> <input type = 'text' id='email'/><button type='button' id='submitemail' >Done</button>";
		var emailbutton = $('#submitemail');
		emailbutton.click( function() { 
			var email = $("#email").val();
			console.log(email);
			pushtofirebase(roomclicked, email);
			ele.remove();
		});	
	}
}

function getCoords(e) {

	var x;
	var y;
	if (e.pageX || e.pageY) { 
	  x = e.pageX;
	  y = e.pageY;
	}
	else { 
	  x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
	  y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
	} 
	x -= output.offsetLeft + 150;
	y -= output.offsetTop - 15;
	var coords = [x, y];
	return coords;
}

//will collapse the open floor and reset everything
function FlipDown(currentLayer, currentFloor) {
	//console.log("inside FlipDown " + currentLayer + currentFloor);

	defineMovingFloors(currentFloor);
	console.log ("CURRENT FLOOR FLIPS DOWN ")
	currentLayer.className.replace('flipped','');
	currentLayer.toggleClassName('unflipped');
	currentLayer.parentNode.className.replace('flippedBox','');
	currentLayer.parentNode.toggleClassName('unflippedBox');
	//console.log("the floor is open and since it was clicked remove the class and it will go back down");
	transparentbox.toggleClassName('transparentboxbehind');
	console.log("CLOSING above: " + moveAbove);
	console.log("below: " + moveBelow);
	MoveTowards(moveAbove, moveBelow);
}

function MoveTowards(moveAbove, moveBelow) {
	console.log ("FLOORS MOVE TOWARDS");
	for (var m = 0; m < moveAbove.length; m++) {
		var floor = Number(findelementnumber(moveAbove[m]));
		//console.log("move up " + floor);
		elements[floor].parentNode.toggleClassName('toggleMoveUp');	
	}
	for (var l = 0; l < moveBelow.length; l++) {
		var floor = Number(findelementnumber(moveBelow[l]));
		//console.log("move down " + floor);
		elements[floor].parentNode.toggleClassName('toggleMoveDown');	
	}
	
	turnoff();
}

//reset all of the floors so that none are in the foreground though this is really just a safety
function turnoff(){
	output.removeClassName("moveforward");
	RemoveRoomEventListeners();
	console.log ("EVERYTHING IS RESET")
	var z = 120;
    for (j = 0; j < elements.length; j++) {
    	
    	if (elements[j].hasClassName('flipped') == true) {
    		elements[j].toggleClassName('flipped');	
    		elements[j].parentNode.toggleClassName('flippedBox');
    	} 
    	if (elements[j].hasClassName('unflipped') == true) {
    		elements[j].toggleClassName('unflipped');	
    		elements[j].parentNode.toggleClassName('unflippedBox');
    	} 
    	if (elements[j].parentNode.hasClassName('toggleMoveUp') == true) {
    		elements[j].parentNode.toggleClassName('toggleMoveUp');
    	} 
		if (elements[j].parentNode.hasClassName('toggleMoveDown') == true) {
    		elements[j].parentNode.toggleClassName('toggleMoveDown');
    	} 
    	elements[j].parentNode.style.zIndex = "";
    		
    }	
    if (transparentbox.hasClassName('transparentboxbehind') == true){
    	transparentbox.toggleClassName('transparentboxbehind');	
    }	
	currentLayer = "";
	currentFloor = "";	
	moveAbove.length = 0;
	moveBelow.length = 0;

	console.log("these are the elements: " + elements);
	console.log("these move above: " + moveAbove);
	console.log("these move below: " + moveBelow);
	console.log("this is the state of the behind box: " + stateofbehindbox);
	console.log("current layer : " + currentLayer);
	console.log("current floor : " + currentFloor);
	addEL(elements);
}

function RemoveRoomEventListeners() {
	while ( output.firstChild ) output.removeChild( output.firstChild );
}

function findelementnumber(i){
	if (i == "9") {
		return 0;
	} else if (i == "8") {
		return 1;
	} else if (i == "7") {
		return 2;
	} else if (i == "6") {
		return 3;
	} else if (i == "5") {
		return 4;
	} else if (i == "4") {
		return 5;
	} else if (i == "3") {
		return 6;
	} else if (i == "2") {
		return 7;
	} else if (i == "1") {
		return 8;
	} else if (i == "10") {
		return 9;
	} else if (i == "11") {
		return 10;
	}
}
///////////START FUNCTIONALITY FOR DISPLAYING ROOM DATA ////////////////////////////////////////////////
//clears all of the background images on all of the floor divs except for the basic floor images
function clearrooms(turnonlist) {
	for (i=1; i<=11; i++) {
		var id = 'fl'+i;
		id = id.toString();
		var url = 'url(Images/floor'+i+'.png)';
		document.getElementById(id).style.backgroundImage = url;
	}

	//if any of the rooms match the name of a room in the 'turn on list' then change the var match to true
	for (i=0; i<listOfRooms.length; i++) {
		var item = listOfRooms[i];
		//console.log(item);
		var match = false;
		for (j=0; j<turnonlist.length; j++) {
			var test = turnonlist[j].substr(4,7);
			test = test.toString();
			//console.log(test);
			if (item == test){
				match = true;
			} 
		}
		//if the rooms match it means that room needs to turn on red so don't do anything here. for all the other rooms, turn them on green
		if (match === true) {	
		} else {
			item = item.toString();
			var id = 'fl'+ item.substr(0,1);
			item = item.toString();
			var url = 'url(Images/room' + listOfRooms[i] + 'on.png),';
			var currentstyle = document.getElementById(id).style.backgroundImage;
			document.getElementById(id).style.backgroundImage = url + currentstyle;
		}
		
	}
}

//turn on only the rooms in the 'turn on list' to red
function updaterooms(turnonlist) {	
	//console.log(turnonlist);
	for (i=0; i<turnonlist.length; i++) {
		var id = "fl" + turnonlist[i].charAt(4);
		id = id.toString();
		var url = 'url(Images/' + turnonlist[i] + 'off.png), ';
		//console.log(id);
		//console.log(url);
		var currentstyle = document.getElementById(id).style.backgroundImage;
		document.getElementById(id).style.backgroundImage = url + currentstyle; 
	}	
}

//go through all of the properties of each room in the current time interval t and see which rooms have status of occupied
function checkstatus(t) {
	turnonlist = [];
	for (f = 0; f < 10; f++) {	
		for (var key in buildingSnapshots[t][f]){
			var obj = buildingSnapshots[t][f][key];
			for (var prop in obj){
				if (obj[prop] === true) {
					turnonlist.push(key);
				} 
			}
		}
	}
	//these are the rooms in the current time interval that need to be turned on
	//console.log(turnonlist);
	clearrooms(turnonlist);
	updaterooms(turnonlist);
}

/////////// DATE PICKER WINDOW ////////////////////////////////////////////////

var date;
var time;

function displaydefaulttoday() {
	var today = new Date();
	var todaysdate = (today.getMonth() + 1) + '/' + checkforzeros(today.getDate()) + '/' +  today.getFullYear();
	var todaystime = checkforzeros(today.getHours()) + ':' + checkforzeros(today.getMinutes()) ;
	document.getElementById("datepicker").defaultValue = todaysdate;
	// document.getElementById("timepicker").defaultValue = todaystime;
	checkroomsinfb(todaysdate, todaystime);
}

function checkforzeros(input) {
	input = input.toString();
	if (input.length == 1 ){
		input = "0" + input;
	} else {}
	return input;
}

function updatedisplaydate(truemeanscurrent) {
	
	var wd = "";
	var d;
	var m;
	var y;
	if (truemeanscurrent === true){
		var today = new Date();
		wd = getWrittenDay(today.getDay());
		var mm = today.getMonth();
		mm = mm.toString();
		m = getWrittenMonth(mm);
		d = today.getUTCDate();
		y = today.getFullYear();
		time = $("#timepicker").val();
	} else {
		date = $("#datepicker").val();
		time = $("#timepicker").val();
		if (date == "" || time == "") {
			alert("Please pick a date and a time.");
			return;
		} else {
			m = getWrittenMonth(date);
			d = date[3];
			d += date[4];
			y = date[6];
			y += date[7];
			y += date[8];
			y += date[9];
			var t = date.split("/");
			if(t[2]) {
			    myDate = new Date(t[2], t[0] - 1, t[1]);
			    wd = getWrittenDay(myDate.getDay());
			} 
		}
	}
	document.getElementById("displaydate").innerHTML = "Availability on ";
	document.getElementById("displaydate").innerHTML += wd;
	document.getElementById("displaydate").innerHTML += " ";
	document.getElementById("displaydate").innerHTML += m;
	document.getElementById("displaydate").innerHTML += " ";
	document.getElementById("displaydate").innerHTML += d;
	document.getElementById("displaydate").innerHTML += ", ";
	document.getElementById("displaydate").innerHTML += y;
	document.getElementById("displaydate").innerHTML += " at ";
	document.getElementById("displaydate").innerHTML += time;
	date = date.replace(/\//g, "");
	console.log("look this up in fb " + date + time);
	checkroomsinfb(date, time);
}

function checkifslidingtime() {
 
   // var elem = $(this);
   // var oldVal = "00/00/0000";
   // // Save current value of element
   // elem.data('oldVal', elem.val());
   // console.log("this was the old val " + elem.val());
   // // Look for changes in the value
   $('#timepicker').change(function(){
      console.log("this was the old val " + $(this).val() );
      updatedisplaydate(false);
     //  if (elem.data('oldVal') != elem.val()) {
     //   // Updated stored value
     //   elem.data('oldVal', elem.val());

     //   updatedisplaydate(false);
     // }
   });
 
}

function getWrittenDay(rawdate) {
	var d = rawdate;
	//console.log(d);
	var weekday=new Array(7);
	weekday[0]="Sunday";
	weekday[1]="Monday";
	weekday[2]="Tuesday";
	weekday[3]="Wednesday";
	weekday[4]="Thursday";
	weekday[5]="Friday";
	weekday[6]="Saturday";
	return weekday[d];
}

function getWrittenMonth(rawdate) {
	var m;
	if (rawdate[0]=== "0") {
		m = rawdate[1];
	} else {
		m = rawdate[0];
		m += rawdate[1];	
	}
	console.log(m);
	var month=new Array();
	month[1]="January";
	month[2]="February";
	month[3]="March";
	month[4]="April";
	month[5]="May";
	month[6]="June";
	month[7]="July";
	month[8]="August";
	month[9]="September";
	month[10]="October";
	month[11]="November";
	month[12]="December";
	return month[m];
}

var slider = $('#slideinwindow');
var tab = $('#tabslider');
tab.click( function(){
	slider.toggleClass('slideout');	
});
var box = $('#timepicker');
box.click( function(){ 
	var nowbutton = $('.ui-datepicker-current');
	var donebutton = $('.ui-datepicker-close');
	nowbutton.hide();
	donebutton.hide();
	checkifslidingtime();
});
var submitbutton = $('#submitdate');
submitbutton.click( function() { 
	slider.toggleClass('slideout');
	updatedisplaydate(false);
});

/////////// FIREBASE STUFF ////////////////////////////////////////////////
function pushtofirebase(roomtopush, email) {
	date = date.replace(/\//g, "");
	console.log(time[3]);
	var timeinterval = "";
	if (time[3] === '0' || time[3] === '1' || time[3] === '2') {
		timeinterval = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29"];
	} else if (time[3] === '3' || time[3] === '4' || time[3] === '5') {
		timeinterval = ["30","31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"];
	}
	console.log(timeinterval[1]);
	for (var t = 0; t <= timeinterval.length; t++) {
		var waitinglistRef = new Firebase('https://cooper-spaces.firebaseio.com/waitinglist/' + date + '/' + time[0] + time[1] + ":" + timeinterval[t] );
		console.log(waitinglistRef);
		var pushRooms = waitinglistRef.push();
		var bookroom = $('#bookroom');
		pushRooms.set({'room': roomtopush , 'occupied': "true", 'occupier': email });
	}
}

function checkroomsinfb(date, time) {
	var roomstogoon = Array();
	// console.log('https://cooper-spaces.firebaseio.com/waitinglist/' + date + '/' + time);
	var waitinglistRef = new Firebase('https://cooper-spaces.firebaseio.com/waitinglist/' + date + '/' + time );
	waitinglistRef.on('value', function(roomsnapshot) {
  		roomstogoon = [];
  		roomsnapshot.forEach(
            function(uniqueid) {
            	var roomName = uniqueid.child('room').val();
            	roomName = roomName.toString();
            	roomstogoon.push('room' + roomName);
            }
        );
        // console.log(roomstogoon);
        clearrooms(roomstogoon);
        updaterooms(roomstogoon);
	});
	
}

function checkifroomisredinfb(date, time, room) {
	var listofredrooms = Array();
	var waitinglistRef = new Firebase('https://cooper-spaces.firebaseio.com/waitinglist/' + date + '/' + time );
	waitinglistRef.on('value', function(roomsnapshot) {
  		listofredrooms = [];
  		roomsnapshot.forEach(
            function(uniqueid) {
            	var roomName = uniqueid.child('room').val();
            	roomName = roomName.toString();
            	listofredrooms.push(roomName);
            }
        );
	});
	var match = "";
	for (i = 0; i <= listofredrooms.length ; i++) {
		console.log(room + " " + listofredrooms[i] );
		if (listofredrooms[i] === room ) {
			return true;
		} else {
		}
	}
}

































window.addEventListener('DOMContentLoaded', init, false);













