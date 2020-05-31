	
setInterval( render, 30 );

function sideDisplay( id, piece ) {
	var canvas = document.getElementById( id );
	var ctx = canvas.getContext( '2d' );
	
	ctx.fillStyle = "white";
	ctx.fillRect( 0, 0, cellWidth * 5, cellheight * 4 );

	var copy = JSON.parse( JSON.stringify( shapes[ piece - 1 ] ) );
	
	ctx.fillStyle = colors[ piece - 1 ];
	for ( var i = 0; i < copy.length; i++ ) {
		drawBlock( copy[i].x - 3 , copy[i].y  + 1, ctx );
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
	
	speed, level, lines = 0;
		//start new game
	start();
}
	//get the game started
