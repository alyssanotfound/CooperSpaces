
var init = function() {
	var elements = document.getElementsByClassName('layer');
	var transparentbox = document.getElementById('transparentbox');

    for (var i = 0; i < elements.length; i++) {
	    elements[i].addEventListener( 'click', function(){
	    	
	    	var state = this.hasClassName('flipped');
	    	var stateofbehindbox = transparentbox.hasClassName('transparentboxbehind');

	    	//console.log("state of behind box " + stateofbehindbox);
		    turnoff();

		    function turnoff(){
		    	var z = 120;
			    for (j = 0; j < elements.length; j++) {
			    	
			    	if (elements[j].hasClassName('flipped') == true) {
			    		elements[j].toggleClassName('flipped');	
			    	}
			    	elements[j].parentNode.style.zIndex = z;
			    	z = z - 10;
			    	//console.log("this is the element number: " + elements[j].childNodes[1].className + " This is its z index: " + z);
			    }   
	    	}
	    	
	    	
	    	if (stateofbehindbox == true ) {
	    		//console.log( "the behind box is already open bc a neww floor was clicked from pov of other floor" );
	    	} else if (stateofbehindbox == false ){
	    		transparentbox.toggleClassName('transparentboxbehind');
	    	}

	    	if (state == true ) {
	    		this.className.replace('flipped','');
	    		//console.log("the floor is open and since it was clicked remove the class and it will go back down");
	    		transparentbox.toggleClassName('transparentboxbehind');
	    	} else if (state == false ){
	    		this.toggleClassName('flipped');
	    		//console.log(this.__proto__)

	    		//this.addEventListener( 'webkitTransitionEnd', function( event ) { 
	    		this.parentNode.style.zIndex = 1000; 
	    		//console.log("this is the currently open floor: " + this.childNodes[1].className + " This is its z index: " + this.parentNode.style.zIndex);
	    	//}, false);
	    	}
	    	
	    	transparentbox.addEventListener( 'click', function(){
	    		transparentbox.toggleClassName('transparentboxbehind');	
	    		turnoff();
	    		console.log("the box was clicked");
	    	}, false);

	  	}, false);	
  	}

  	transparentbox.addEventListener( 'click', function(){
  		console.log("the box was clicked but nothing should happen");
	}, false);

  	var turnonlist = new Array();
	
	function checkstatus(t) {
		turnonlist = [];
		for (f = 0; f < 10; f++) {	
			for (var key in buildingSnapshots[t][f]){
				var obj = buildingSnapshots[t][f][key];
				for (var prop in obj){
					if (obj[prop] == true) {
						turnonlist.push(key);
					} 
				}
			}
		}
		//these are the rooms in the current time interval that need to be turned on
		console.log(turnonlist);
		//return turnonlist;
		clearrooms();
		updaterooms(turnonlist);
	}

	function clearrooms() {
		for (i=1; i<=11; i++) {
			var id = 'fl'+i;
			id = id.toString();
			var url = 'url(Images/floor'+i+'.png)';
			//console.log(id);
			//console.log(url);
			document.getElementById(id).style.backgroundImage = url;
		}
	}

	function updaterooms(turnonlist) {
		for (i=0; i<turnonlist.length; i++) {
			//console.log(turnonlist[i]);
			var id = "fl" + turnonlist[i].charAt(4);
			id = id.toString();
			var url = 'url(Images/' + turnonlist[i] + 'on.png), ';
			//console.log(id);
			//console.log(url);
			var currentstyle = document.getElementById(id).style.backgroundImage;
			document.getElementById(id).style.backgroundImage = url + currentstyle; 
		}	
	}

	checkstatus(0);
}







window.addEventListener('DOMContentLoaded', init, false);






