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