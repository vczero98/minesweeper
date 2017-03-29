class Board {
	constructor(height, width, numMines) {
		this.height = height;
		this.width = width;
		this.numMines = numMines;
		this.blocks = [];
		this.drawBoard();
		var b = new Block(this.ctx);
		b.drawBlock();
	}

	drawBoard() {
		this.canvas = document.createElement("canvas");
		this.canvas.height = 50;
		this.canvas.width = 50;
		this.ctx = this.canvas.getContext("2d");

		document.body.appendChild(this.canvas);
	}
}
