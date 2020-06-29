var width = 300, height = 600;
var cellWidth =  width / columns, cellheight = height / rows;
var hideBoard = false;
var canvas = document.getElementById( 'tetris' );
var ctx = canvas.getContext( '2d' );

function drawBlock( x, y, ctx ) {
	ctx.fillRect( cellWidth * x + 1.5, cellheight * y + 1.5, cellWidth -2 , cellheight -2 );
}

function render() {

	ctx.fillStyle = "white";
	ctx.fillRect( 0, 0, width, height );

    for (var x = 0; x <= width; x += cellWidth) {
	    ctx.moveTo(0.5 + x, 0);
	    ctx.lineTo(0.5 + x, height);
	}

    for (var x = 0; x <= height; x += cellheight) {
        ctx.moveTo(0, 0.5 + x);
        ctx.lineTo(width, 0.5 + x);
    }

    ctx.strokeStyle = "grey";
    ctx.stroke();

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
