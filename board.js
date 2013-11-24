	//initialize columns and rows
var columns = 10, rows = 20;
	//this is where the action happens
var board =[];
	//turn "board" into a 20 * 10 array
function writeBoard() {
		//20 rows
	for ( i = 0; i < ROWS; i++ ){
			//nested array to represent a row
		board[i] = [];
			//10 columns
		for ( j = 0; j < COLS; j++ ) {
				//create cell with falsy value
			board[i][j] = 0;
		}
	}
}
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
		//start new game
	start();
}
	//get the game started
start();