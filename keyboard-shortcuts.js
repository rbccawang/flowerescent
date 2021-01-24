window.addEventListener('keydown', keyDown, false);

function keyDown(event) {;
	    const key = (event.detail || event.which).toString();
	    if (83 && !activeOscillators[key]) {
	      clickGame();
	    }
	}