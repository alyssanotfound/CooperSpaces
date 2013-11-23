//currentLayer keeps track of the floor that is open and gets deleted when a floor is closed
var currentLayer = "";
var currentFloor;
var elements = new Array();
var transparentbox;
var turnonlist = new Array();
var stateofbehindbox;
var moveAbove = new Array();
var moveBelow = new Array();

//this function init gets called once the page loads
var init = function() {
	elements = document.getElementsByClassName('layer');
	transparentbox = document.getElementById('transparentbox'); 
	stateofbehindbox = getstateofbehindbox();
	//console.log( stateofbehindbox );
	checkstatus(1);
	addEL(elements);
}

var getstateofbehindbox = function() {
	return transparentbox.hasClassName('transparentboxbehind');
}

function addEL(elements) {
	for (var i = 0; i < elements.length; i++) {
	    elements[i].addEventListener( 'click', function() {
	    	console.log ("--------------NEW THING CLICKED---------------")
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
		}, false);	
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
		turnoff();
		//FlipDown(currentLayer, currentFloor);
	}, false); 
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
	console.log ("FLOORS MOVE TOWARDS")
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

//clears all of the background images on all of the floor divs except for the basic floor images
function clearrooms() {
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
	clearrooms();
	updaterooms(turnonlist);
}

window.addEventListener('DOMContentLoaded', init, false);










