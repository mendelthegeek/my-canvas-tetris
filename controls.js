document.body.onkeydown = function( e ) {
	var keys = {
		37: 'left',
		39: 'right',
		40: 'down',
		38: 'up',
		32: 'space',
		80: 'p',
		27: 'escape'
	};
	if ( keys[ e.keyCode ] ) {
		keyPress( keys[ e.keyCode ] )
		render();
	} /*else {
		alert(e.keyCode);
	}//*/
};
	//handle keyPress
function keyPress( key ) {
		//handle it based on the key which was pressed
	switch(key){
		case "right":
				//add 1 to the x value
			moveByOne(0,1);
		break;
		case "left":
				//remove 1 to the x value
			moveByOne(0,-1);
		break;
		case "down":
				//add 1 to the y value
			moveByOne(1,0);
		break;
		case "up":
				//rotate piece clockwise
			rotate();
		break;
		case "space":
				//drop until piece hits bottom
			for(;moveByOne(1,0);){}
		break;
		case "p":
				//hide the board
			hideBoard = !hideBoard;
				//pause or un-pause
			if ( nextFrameTimeout ) {
				window.clearTimeout(nextFrameTimeout);
				nextFrameTimeout = false;
			} else {
				nextFrameTimeout = setTimeout( nextFrame, 300 );
			}
		break;
		case "escape":
			window.clearTimeout(nextFrameTimeout);
			nextPiece = "";
			board = [];
			start();
		break;
	}
}