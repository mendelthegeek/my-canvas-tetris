var COLS = 10, ROWS = 20;
var board =[];
function writeBoard() {
	for ( i = 0; i < ROWS; i++ ){
		board[i] = [];
		for ( j = 0; j < COLS; j++ ) {
			board[i][j] = 0;
		}
	}
}