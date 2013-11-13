var falling,fallingPiece,nextPiece,fallingPiecePos;
var colors = [
    'blue', 'orange', 'brown', 'yellow', 'red', 'green', 'purple'
];
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
function newPiece(){
		//replace "fallingPiece"
	fallingPiece = nextPiece;
		//the piece will now start falling
	falling = true;
		//find a new piece to appear as "nextPiece"
	nextPiece = newRandomPiece();
}

function start(){
	nextPiece = newRandomPiece();
	newPiece();
	writePiece();
}

function newRandomPiece(){
		//find a random value 1-7 (7 types of pieces)
	return Math.ceil(Math.random() * 7);
}

function nextFrame(){
	if( falling ){
		dropByOne();
		finishedFalling();
	} else {
		findFullLines( makeList() );
		newPiece();
		writePiece();
	}
}

function writePiece(){
	fallingPiecePos = shapes[fallingPiece - 1];
	for ( i = 0; i < 4; i++ ) {
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = fallingPiece;
	}
}

function finishedFalling(){
		//check if piece has finished falling
	if ( !nothingIsBelow() ) {
			//if yes, tell the program so
		falling = false;
	}
}
	//drop the falling piece by one space
function dropByOne(){
		//loop through the four squares that make up the piece
	for ( i = 3; i > -1; i-- ) {
			//empty old spot of piece
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = 0;
			//drop position place-holder by one row
		fallingPiecePos[i].y++;
			//add square to new spot
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = fallingPiece;
	}
}
	//check if piece is settled
function nothingIsBelow() {

		//check if square below is actually itself
	function selfCheck(i){
		if(fallingPiecePos.indexOf({
			y : fallingPiecePos[i].y + 1,
			x : fallingPiecePos[i].x
		}) < 0 ){ 
			return false; 
		} else {
			return true;
		}
	}
	
		//loop through the four squares that make up the falling piece
	for ( i = 0; i < 4; i++ ) {
			//check if square is resting on something			***other then itself***     or has hit the bottom
		if( ( ( fallingPiecePos[i].y + 1 ) > ( ROWS - 1 ) ) || ( !board[ fallingPiecePos[i].y + 1 ][ fallingPiecePos[i].x ] && selfCheck(i) ) ){
			return false;
		}
	}
	return true;
}

function makeList(){
	var list = [];
	for( i = 0; i < fallingPiecePos.length; i++ ){
		if( list.indexOf( fallingPiecePos[i].y ) < 0 ){
			list.push(fallingPiecePos[i].y);
		}
	}
	return list;
}

function findFullLines( list ){
	for( i = 0; i < list.length; i++ ){
	temp = list[i];
		for( j = 0; j < board[ temp/* list[i] */ ].length; j++ ){
			if( !board[ temp/* list[i]  */][j] ){
				list[i] = false;
				/***********************
				*   continue;/break;   *
				***********************/
			}
		}
	}
	clearFullLines( list )
}

function clearFullLines( list ){
	for( i = 0; i < list.length; i++ ){
		if( list[i] ){
			for( j = 0; j < board[ list[i] ].length; j++ ){
				board[ list[i] ][j] = 0;
			}
		}
	}
}




	//figure this one out another time
/********************
* function rotate() *
*  //end with this  *
* nothingIsBelow()? *
*  falling = true:  *
********************/