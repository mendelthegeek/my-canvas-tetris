var falling,fallingPiece,nextPiece,fallingPiecePos;
var timeoutID;
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
	nextFrame();
}

function newRandomPiece(){
		//find a random value 1-7 (7 types of pieces)
	return Math.ceil(Math.random() * 7);
}

function nextFrame(){
	falling = moveByOne(1,0);
	if( !falling ){
		findFullLines( makeList() );
		newPiece();
		writePiece();
	}
	timeoutID = setTimeout( nextFrame, 300 );
}

function writePiece(){
		//obtain a copy of the object which represents the "fallingPiece"s shape
		//(in order to update "fallingPiecePos" without updating "shapes")
	var copy = JSON.parse( JSON.stringify( shapes[ fallingPiece - 1 ] ) );
		//assign the copy to a variable
	fallingPiecePos = copy;
	for ( i = 0; i < 4; i++ ) {
			//and write the positions into "board" for rendering
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = fallingPiece; 
	}
}

function validMove(copy) {

	for( var i = 0; i < 4; i++ ){
		if( typeof board[ copy[i].y ] == 'undefined' || typeof board[ copy[i].y][ copy[i].x ] == 'undefined' || board[ copy[i].y][ copy[i].x ] ) {
			return false;
		}
	}
	
	fallingPiecePos = copy;
	falling = true;
}	
	//drop the falling piece by one space
function moveByOne(y,x){

	var copy = JSON.parse( JSON.stringify(fallingPiecePos));
		//loop through the four squares that make up the piece
	for ( i = 0; i < 4; i++ ) {
			//empty old spot of piece
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = 0;
			//change position place-holder to new value
		copy[i].y += y;
		copy[i].x += x;
	}
	
	validMove(copy);
	
	for ( i = 0; i < 4; i++ ) {
			//add square to new spot
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = fallingPiece;
	}
	
	return (fallingPiecePos == copy);
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
				break;
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
			dropLinesByOne(list[i]);
		}
	}
}

function dropLinesByOne( startingPoint ){
	for( var i = startingPoint; i > 0; i-- ){
		for( var j = 0; j < COLS; j++ ){
			board[i][j] = board[i-1][j];
			board[i-1][j] = 0;
		}
	}
	render();
}

function keyPress( key ){
	render();
	switch(key){
		case "right":
			moveByOne(0,1);
		break;
		case "left":
			moveByOne(0,-1);
		break;
		case "down":
			moveByOne(1,0);
		break;
		case "up":
			rotate();
		break;
	}
	render();
}

start();
render();


function rotate(){
	k = 0;
	yList = [];
	xList = [];
	oldBlock = [];
	newBlock = [];
	tryThis = [];
	for( var i = 0; i < 4; i++ ){
		if( yList.indexOf( fallingPiecePos[i].y ) < 0 )
			{ yList.push(fallingPiecePos[i].y) }
		if( xList.indexOf( fallingPiecePos[i].x ) < 0 )
			{ xList.push(fallingPiecePos[i].x) }
	}
	yList.sort(function(a,b){return a-b;});
	xList.sort(function(a,b){return a-b;});
	
	for( i = 0; i < yList.length; i++){
	oldBlock[i] = [];
		for( j = 0; j < xList.length; j++){
			oldBlock[i][j] = checkSpot(yList[i],xList[j])?1:0;
		}
	}
	
	for( i = 0; i < xList.length; i++){
	newBlock[i] = [];
		for( j = 0; j < yList.length; j++){
			newBlock[i][j] = oldBlock[ yList.length - ( j + 1 ) ][i];
		}
	}
	
	for( i = 0; i < newBlock.length; i++){
		for( j = 0; j < newBlock[i].length; j++){
			if(newBlock[i][j]){
				tryThis[k] = {};
				tryThis[k].y = yList[0] + i;
				tryThis[k].x = xList[0] + j;
				k++;
			}
		}
	}
	
	for ( i = 0; i < 4; i++ ) {
			//empty old spot of piece
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = 0;
	}
	
	validMove(tryThis);
	
	for ( i = 0; i < 4; i++ ) {
			//add square to new spot
		board[ fallingPiecePos[i].y ][ fallingPiecePos[i].x ] = fallingPiece;
	}
	
	function checkSpot(y,x){
		for( var i = 0; i < 4; i++ ){
			if ( fallingPiecePos[i].y == y && fallingPiecePos[i].x == x ){
				return true;
			}
		}
		return false;
	}
}