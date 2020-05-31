
setInterval (render, 30);

function sideDisplay(id, piece) {
	var canvas = document.getElementById (id);
	var ctx = canvas.getContext ('2d');

	ctx.fillStyle = "white";
	ctx.fillRect (0, 0, cellWidth * 5, cellheight * 4);

	var copy = JSON.parse (JSON.stringify (shapes[ piece - 1 ]));
	
	ctx.fillStyle = colors [piece - 1];
	for(var i = 0; i < copy.length; i++) {
		drawBlock (copy[i].x - 3, copy[i].y  + 1, ctx);
	}
}


var colors = [
    'blue', 'orange', 'brown', 'cyan', 'red', 'green', 'purple'
];
	//starting shapes for the pieces
var shapes = [
	[{y:0,x:4},{y:0,x:5},{y:0,x:6},{y:0,x:7}],
	[{y:0,x:4},{y:0,x:5},{y:0,x:6},{y:1,x:4}],
	[{y:0,x:4},{y:0,x:5},{y:0,x:6},{y:1,x:5}],
	[{y:0,x:4},{y:0,x:5},{y:0,x:6},{y:1,x:6}],
	[{y:0,x:4},{y:0,x:5},{y:1,x:4},{y:1,x:5}],
	[{y:0,x:4},{y:0,x:5},{y:1,x:3},{y:1,x:4}],
	[{y:0,x:4},{y:0,x:5},{y:1,x:5},{y:1,x:6}]
];
	//make the next piece start falling
function newPiece() {
		//replace "fallingPiece"
	fallingPiece = nextPiece;
		//tell program that piece is ready for deployment
	falling = true;
		//find a new piece to appear as "nextPiece"
	nextPiece = newRandomPiece();
	
	sideDisplay( 'nextPiece', nextPiece );
}
	//get a new random piece
function newRandomPiece() {
		//find a random value 1-7 (7 types of pieces)
	return Math.ceil(Math.random() * 7);
}
	//continue on with the game
function nextFrame() {
		//set the time-out for the next frame
	nextFrameTimeout = setTimeout( nextFrame, speed + 50 );
		//drop by one if possible
	falling = moveByOne(1,0);
		//and if not move to next piece
	if( !falling ) {
			//clear finished lines
		findFullLines( makeList() );
			//reassign "fallingPiece"
		newPiece();
			//assign the shape, colour, and position to display as "falling piece"
		writePiece();
	}
}
	//write next piece into "board"
function writePiece() {
		//obtain a copy of the object which represents "fallingPiece" shape
	var copy = JSON.parse( JSON.stringify( shapes[ fallingPiece - 1 ] ) );
		//assign the copy to a variable in order to keep track of the falling piece
	fallingPiecePos = copy;
		//loop through the boxes that make up the piece
	for ( i = 0; i < fallingPiecePos.length; i++ ) {
			//and write the positions into "board" for rendering
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = fallingPiece; 
	}
}