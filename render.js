var canvas = document.getElementsByTagName( 'canvas' )[ 0 ];
var ctx = canvas.getContext( '2d' );
var W = 300, H = 600;
var BLOCK_W = W / COLS, BLOCK_H = H / ROWS;

function drawBlock( x, y ) {
	ctx.fillRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W , BLOCK_H );
}

function render() {
	//alert(board);
	ctx.fillStyle = "cyan";
	ctx.fillRect( 0, 0, W, H );

	for ( var x = 0; x < COLS; ++x ) {
		for ( var y = 0; y < ROWS; ++y ) {
			if ( board[ y ][ x ] ) {
				ctx.fillStyle = colors[ board[ y ][ x ] - 1 ];
				drawBlock( x, y );
			}
		}
	}
	
	nextFrame();
setTimeout( render, 100 );
}

start();
render();