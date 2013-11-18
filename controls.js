document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'up'
    };
    if ( keys[ e.keyCode ] ) {
        keyPress( keys[ e.keyCode ] );
	  render();
    }
};