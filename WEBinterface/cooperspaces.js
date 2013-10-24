
var init = function() {
	
	var elements = document.getElementsByClassName('layer');
	var transparentbox = document.getElementById('transparentbox');
    //var transparentbox = document.body;

    for (var i = 0; i < elements.length; i++) {
	    elements[i].addEventListener( 'click', function(){
	    	
	    	var state = this.hasClassName('flipped');
	    	var stateofbehindbox = transparentbox.hasClassName('transparentboxbehind');

	    	console.log("state of behind box " + stateofbehindbox);
		    turnoff();

		    function turnoff(){
			    for (j = 0; j < elements.length; j++) {
			    	if (elements[j].hasClassName('flipped') == true) {
			    		elements[j].toggleClassName('flipped');
			    	}
			    }   
	    	}
	    	
	    	
	    	if (stateofbehindbox == true ) {
	    		console.log( "the behind box is already open bc a neww floor was clicked from pov of other floor" );
	    	} else if (stateofbehindbox == false ){
	    		transparentbox.toggleClassName('transparentboxbehind');
	    	}

	    	if (state == true ) {
	    		this.className.replace('flipped','');
	    		console.log("the floor is open and since it was clicked remove the class and it will go back down");
	    		transparentbox.toggleClassName('transparentboxbehind');
	    	} else if (state == false ){
	    		this.toggleClassName('flipped', false);
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

};

window.addEventListener('DOMContentLoaded', init, false);
