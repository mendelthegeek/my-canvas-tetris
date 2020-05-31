	//variables to keep track of falling piece status, type, and position
var falling,fallingPiece,fallingPiecePos;
	//exactly what it says
var nextPiece;

var holdingPiece = false;
	//variable to make pausing possible if needed
var nextFrameTimeout;

var lines = 0, level = 0;

var speed = 300;
	//array to assign each piece its colour (based on shape)

	//check if new piece position is valid
function validMove(copy) {
		//loop through the boxes that make up the piece
	for( var i = 0; i < fallingPiecePos.length; i++ ) {
			//check if box is inside the board and in a empty spot
		if( typeof board[ copy[i].y ] == 'undefined' || typeof board[ copy[i].y][ copy[i].x ] == 'undefined' || board[ copy[i].y][ copy[i].x ] ) {
				//if not leave now
			return false;
		}
	}
		//if position is valid make it the new piece position
	fallingPiecePos = copy;
		//keep the piece falling
	falling = true;
}	
	//move piece by one space
function moveByOne(y,x) {
		//obtain a copy of the object which represents "fallingPiece" shape and position
	var copy = JSON.parse( JSON.stringify(fallingPiecePos));
		//loop through the boxes that make up the piece
	for ( i = 0; i < fallingPiecePos.length; i++ ) {
			//empty old spot of piece
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = 0;
			//change position place-holder to new value
		copy[i].y += y;
		copy[i].x += x;
	}
		//check if piece can move to new position
	validMove(copy);
		//loop through the boxes that make up the piece
	for ( i = 0; i < fallingPiecePos.length; i++ ) {
			//add square to new spot (if changed)
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = fallingPiece;
	}
		//tell program if piece was moved
	return (fallingPiecePos == copy);
}
	//create a list of the lines which may have been completed 
function makeList() {
		//make a new empty array (in case you don't know JavaScript and are reading this anyway)
	var list = [];
		//loop through the boxes that make up the piece
	for( i = 0; i < fallingPiecePos.length; i++ ) {
			//if this line hasn't been added to the "list" yet
		if( list.indexOf( fallingPiecePos[i].y ) < 0 ) {
				//add it
			list.push(fallingPiecePos[i].y);
		}
	}
		//send the list back to where its needed
	return list;
}
	//check if any lines are completed
function findFullLines( list ) {
		//loop through all lines that may have just been completed
	for( i = 0; i < list.length; i++ ) {
		//create a temp because of weird error that i still need to figure out
	temp = list[i];
			//loop through all cells of the line
		for( j = 0; j < board[ temp /* list[i] */  ].length; j++ ) {
				//check if cell is occupied
			if( !board[ list[i] ][j] ) {
					//if not tell program that his line shouldn't be emptied
				list[i] = false;
					//and stop checking this line
				break;
			}
		}
	}
		//send the full lines to be emptied
	clearFullLines( list )
}
	//clear full lines
function clearFullLines( list ) {
		//loop through all full lines
	for( i = 0; i < list.length; i++ ) {
			//if this line is full
		if( list[i] ) {
				//go through all cells of the line
			for( j = 0; j < board[ list[i] ].length; j++ ) {
					//empty the cell
				board[ list[i] ][j] = 0;
			}
			addToLines();
				//drop the lines above emptied line
			dropLinesByOne(list[i]);
		}
	}
}
	//drop lines down
function dropLinesByOne( startingPoint ) {
		//loop through all lines above "startingPoint"
	for( var i = startingPoint; i > 0; i-- ) {
			//loop through all cells of the line
		for( var j = 0; j < columns; j++ ) {
				//fill cell with value of cell above it
			board[i][j] = board[i-1][j];
				//empty cell above it
			board[i-1][j] = 0;
		}
	}
		//re-render board 
	render();
}
	//rotate piece clockwise
function rotate() {
		//array to hold y positions occupied by piece
	yList = [];
		//array of how much pizza and soda... jk same thing with x
	xList = [];
		//loop through the boxes that make up the piece
	for( var i = 0; i < fallingPiecePos.length; i++ ) {
			//if this y position wasn't added to the array yet
		if( yList.indexOf( fallingPiecePos[i].y ) < 0 )
				//add it
			{ yList.push(fallingPiecePos[i].y) }
			//same thing...
		if( xList.indexOf( fallingPiecePos[i].x ) < 0 )
			{ xList.push(fallingPiecePos[i].x) }
	}
		//sort the lists to avoid wrong and weird shapes
	yList.sort(function(a,b){return a-b;});
	xList.sort(function(a,b){return a-b;});
		//2d array to represent current shape of piece
	oldBlock = [];
		//loop through the hight of the piece
	for( i = 0; i < yList.length; i++) {
			//create a sub-array
		oldBlock[i] = [];
			//loop through the width of the piece
		for( j = 0; j < xList.length; j++) {
				//if part of the piece is there write a 1
			oldBlock[i][j] = checkSpot(yList[i],xList[j])?1:0;
		}
	}
		//2d array to represent new shape of rotated piece
	newBlock = [];
		//loop through the width
	for( i = 0; i < xList.length; i++) {
			//create new sub-array
		newBlock[i] = [];
			//loop through height
		for( j = 0; j < yList.length; j++) {
				//here is where the magic happens
			newBlock[i][j] = oldBlock[ yList.length - ( j + 1 ) ][i];
		}
	}
		//array to fill with new piece position
	tryThis = [];
		//index in "tryThis"
	index = 0;
		//loop through 2d array with piece shape
	for( i = 0; i < newBlock.length; i++) {
		for( j = 0; j < newBlock[i].length; j++) {
				//if a square is in that spot
			if(newBlock[i][j]) {
					//fill with a object representing a position on board
				tryThis[index ] = {};
				tryThis[index ].y = yList[0] + i;
				tryThis[index ].x = xList[0] + j;
					//indent index
				index++;
			}
		}
	}
		//loop through the boxes that make up the piece
	for ( i = 0; i < fallingPiecePos.length; i++ ) {
			//empty old spot of piece
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = 0;
	}
		//check if rotated piece is in a valid position
	validMove(tryThis);
		//loop through the boxes that make up the piece
	for ( i = 0; i < fallingPiecePos.length; i++ ) {
			//add square to new spot
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = fallingPiece;
	}
		//check if position x,y contains falling piece
	function checkSpot(y,x) {
			//loop through the boxes that make up the piece
		for( var i = 0; i < fallingPiecePos.length; i++ ) {
				//check if position x,y contains falling piece
			if ( fallingPiecePos[i].y == y && fallingPiecePos[i].x == x ) {
				return true;
			}
		}
		return false;
	}
}

function addToLines() {
	lines++;
	if ( lines % 10 == 0 ) {
		levelUp();
	}
}

function levelUp() {
	level++;
	//alert( level );
	speed = (speed / 10) * 9;
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