
var turnonlist = new Array();

//this function init gets called once the page loads
var init = function() {
	var elements = document.getElementsByClassName('layer');
	var transparentbox = document.getElementById('transparentbox');
	//set up an event listener for every div that a floor is in
    
    //put the time interval that you want to check 
	checkstatus(0);

    for (var i = 0; i < elements.length; i++) {

	    elements[i].addEventListener( 'click', function(){
	    	var moveUp = new Array();
	    	var moveDown = new Array();
	    	var currentFloor = this.childNodes[1].className;
	    	currentFloor = currentFloor.toString();
	    	//console.log(currentFloor.length);
	    	if (currentFloor.length == 3) {
	    		currentFloor = Number(currentFloor[2]);	
	    	} else if (currentFloor.length == 4) {
	    		currentFloor = currentFloor.substr(2,3);
	    		currentFloor = Number(currentFloor);
	    	}
	    	
	    	//finding the arrays of the floors that need to move up and that need to move down
	    	if (currentFloor == 10) {
	    		moveUp = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	    		moveDown = [11];
	    	} else if (currentFloor == 11) {
	    		moveUp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	    	} else {
	    		for (var j=(currentFloor + 1); j <= 9; j++){
	    			moveUp.push(j);
	    		}
	    		for (var k=(currentFloor - 1); k > 0; k=k-1){
	    			//console.log(k);
	    			moveDown.push(k);
	    		}
	    		moveDown.push(10, 11);	
	    	}

	    	for (var l = 0; l < moveUp.length; l++) {
	    		elements[l].parentNode.toggleClassName('toggleMoveUp');	
	    	}

	    	for (var m = 0; m < moveDown.length; m++) {
	    		var floor = Number(findelementnumber(moveDown[m]));
	    		console.log(floor);
	    		elements[floor].parentNode.toggleClassName('toggleMoveDown');	
	    	}

	    	var state = this.hasClassName('flipped');
	    	var stateofbehindbox = transparentbox.hasClassName('transparentboxbehind');
		    
		    turnoff();
		    
	    	if (stateofbehindbox == true ) {
	    		//console.log( "the behind box is already open bc a neww floor was clicked from pov of other floor" );
	    	} else if (stateofbehindbox == false ){
	    		transparentbox.toggleClassName('transparentboxbehind');
	    	}

	    	if (state == true ) {
	    		this.className.replace('flipped','');
	    		this.parentNode.className.replace('flippedBox','');
	    		//console.log("the floor is open and since it was clicked remove the class and it will go back down");
	    		transparentbox.toggleClassName('transparentboxbehind');
	    	} else if (state == false ){
	    		this.toggleClassName('flipped');
	    		this.parentNode.toggleClassName('flippedBox');
	    		this.parentNode.style.zIndex = 10000; 
	    		//console.log("this is the currently open floor: " + this.childNodes[1].className + " This is its z index: " + this.parentNode.style.zIndex);
	    	}
	    	
	    	transparentbox.addEventListener( 'click', function(){
	    		transparentbox.toggleClassName('transparentboxbehind');	
	    		turnoff();
	    		//console.log("the box was clicked");
	    	}, false); 
		    
	  	}, false);	
  	}

  	transparentbox.addEventListener( 'click', function(){
  		//console.log("the box was clicked but nothing should happen");
	}, false);
  	//reset all of the floors so that none are in the foreground
	function turnoff(){
		var z = 120;
	    for (j = 0; j < elements.length; j++) {
	    	
	    	if (elements[j].hasClassName('flipped') == true) {
	    		elements[j].toggleClassName('flipped');	
	    		elements[j].parentNode.toggleClassName('flippedBox');
	    	}
	    	elements[j].parentNode.style.zIndex = z;
	    	z = z - 10;	
	    }		      
	}
}

function findelementnumber(i){
	if (i == 9) {
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






