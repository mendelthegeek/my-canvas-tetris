	//make the next piece start falling
function nextPiece(){
		//replace "fallingPiece"
	fallingPiece = nextPiece;
		//the piece will now start falling
	falling = true;
		//find a new piece to appear as "nextPiece"
	nextPiece = newRandomPiece();
}

function newRandomPiece(){
		//find a random value 0-6 (7 types of pieces)
	return Math.floor(Math.random() * 7);
}

function nextFrame(){
		//check if piece has finished falling
	if ( nothingIsBelow() ) {
			//if not continue falling
		dropByOne();
	} else {
			//if yes, next piece start falling
		/***********************
		*   falling = false;   *
		***********************/
	}
}
	//drop the falling piece by one space
function dropByOne(){
		//loop through the four squares that make up the piece
	for ( i = 0; i < 4; i++ ) {
			//empty old spot of piece
		board[ fallingPiecePos[i].x ][ fallingPiecePos[i].y ] = false;
			//drop position place-holder by one row
		fallingPiecePos[i].x--;
			//add square to new spot
		board[ fallingPiecePos[i].x ][ fallingPiecePos[i].y ] = fallingPiece;
	}
}
	//check if piece is settled
function nothingIsBelow() {

		//check if square below is actually itself
	function selfCheck(i){
		if(fallingPiecePos.indexOf({
			x : fallingPiecePos[i].x - 1,
			y : fallingPiecePos[i].y
		}) < 0 ) { return false; }
	}
		//loop through the four squares that make up the falling piece
	for ( i = 0; i < 4; i++ ) {
			//check if square is resting on something			***other then itself***
		if( !board[ fallingPiecePos[i].x - 1 ][ fallingPiecePos[i].y ] && selfCheck(i) ){
			return false;
		}
	}
	return true;
}
	//figure this one out another time
/********************
* function rotate() *
*  //end with this  *
* nothingIsBelow()? *
*  falling = true:  *
********************/