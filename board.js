
	//get the game stared
function start() {
		//initialize "board" array
	writeBoard();
		//assign a value to "nextPiece"
	nextPiece = newRandomPiece();
		//use said piece as "fallingPiece"
	newPiece();
		//assign the shape, colour, and position to display as "falling piece"
	writePiece();
		//get the game stared
	nextFrameTimeout = setTimeout( nextFrame, 300 );
}
	//reset and restart game
function newGame() {
		//stop falling piece
	window.clearTimeout(nextFrameTimeout);
		//new pieces
	nextPiece = "";
		//empty the board
	board = [];
	
	speed, level, lines = 0;
		//start new game
	start();
}
	//get the game started
