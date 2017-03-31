window.onload = function() {
	board = new Board(16, 30, 99);
	//board = new Board(10, 10, 2);

	board.canvas.addEventListener("mouseup", function(evt){
		// Get the position of the click
		var el = evt.target;
		var xPos = evt.clientX - el.offsetLeft;
		var yPos = evt.clientY - el.offsetTop;
		var x = Math.min(Math.floor(xPos/board.blockSize), board.width);
		var y = Math.min(Math.floor(yPos/board.blockSize), board.height);

		if (evt.which == 1) {
			// If the click is a left click
			if (!board.gameStarted) {
				// Protect the selected block and its neighbours
				board.blocks[x][y].protected = true;
				var neighbours = board.getNeighboursOfBlock(x, y);
				for (var i = 0; i < neighbours.length; i++) {
					board.blocks[neighbours[i][0]][neighbours[i][1]].protected = true;
				}
				board.generateMines();
				board.gameStarted = true;
			}
			board.clickBlock(x, y);
			return;
		} else if (evt.which == 3) {
			// If the click is a right click
			board.flagBlock(x, y);
			return;
		}
	});
}
