//initialize 
var columns = 10, rows = 20, width = 300, height = 600;
var cellWidth =  width / columns, cellheight = height / rows;
var hideBoard = false;

var board =[];

//turn "board" into a 20 * 10 array
function writeBoard() {
	for ( i = 0; i < rows; i++ ){
		board[i] = [];
			for ( j = 0; j < columns; j++ ) {				
			board[i][j] = 0;
		}
	}
}

function drawBlock( x, y, ctx ) {
	ctx.fillRect( cellWidth * x, cellheight * y, cellWidth -1 , cellheight -1 );
}

function render() {
	var canvas = document.getElementById( 'tetris' );
	var ctx = canvas.getContext( '2d' );

	ctx.fillStyle = "white";
	ctx.fillRect( 0, 0, width, height );
	
	if (hideBoard) { return; }
	
	for ( var x = 0; x < columns; ++x ) {
		for ( var y = 0; y < rows; ++y ) {
			if ( board[ y ][ x ] ) {
				ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
				drawBlock( x, y, ctx );
			}
		}
	}
}
	
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