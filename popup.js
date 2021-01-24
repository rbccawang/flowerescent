document.addEventListener("DOMContentLoaded", function(event){
	
	//backend functions here 
	//how the game works/forums

	window.addEventListener('keydown', keyDown);
	function keyDown(event) {;
		    const key = (event.detail || event.which).toString();
		    if (key == 83) {
		      snakegame_btn.click();
		      //snakeGame();
		    }
		    else if (key == 70) {
		      safespace_btn.click();
		      //safeSpace();
		    }
		}

	const snakegame_btn = document.getElementById("snakegame");
	snakegame_btn.addEventListener('click', function(){
		//location.href = "https://www.google.com";
		location.href = "test.html";
	}, false);

	const safespace_btn = document.getElementById("safespace");
	safespace.addEventListener('click', function(){
		location.href = "test.html";
		//location.href = "https://www.google.com";
	}, false);

/*
	function snakeGame() {
		snakegame_btn.click();
		//window.location.href = "https://www.google.com";
	}*/

	/*object.onkeydown = function(){snakeGame()};*/

	/*function keyDown(event) {;
		    const key = (event.detail || event.which).toString();
		    if (key == 70) {
		      safeSpace();
		    }
		}*/

/*	function safeSpace() {
		safespace_btn.click();
		//window.location.href = "https://www.google.com";
	}*/

	/*object.onkeydown = function(){safeSpace()};*/
}, false);