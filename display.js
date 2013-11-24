var canvas = document.getElementsById( 'tetris' );
var ctx = canvas.getContext( '2d' );
var width = 300, hieght = 600;
var cellWidth =  width / columns, cellHieght = hieght / rows;
var hideBoard = false;

function drawBlock( x, y ) {
	ctx.fillRect( cellWidth * x, cellHieght * y, cellWidth -1 , cellHieght -1 );
}

function render() {
	ctx.fillStyle = "cyan";
	ctx.fillRect( 0, 0, width, height );
	
	if (hideBoard) { return; }
	
	for ( var x = 0; x < columns; ++x ) {
		for ( var y = 0; y < rows; ++y ) {
			if ( board[ y ][ x ] ) {
				ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
				drawBlock( x, y );
			}
		}
	}
}

setInterval( render, 30 );

