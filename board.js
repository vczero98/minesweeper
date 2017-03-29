class Board {
	constructor(height, width, numMines) {
		this.height = height;
		this.width = width;
		this.numMines = numMines;
		this.blocks = new Array(width);
		this.drawBoard();

		// Creating blocks
		for (var i = 0; i < width; i++) {
			this.blocks[i] = new Array(height);
			for (var j = 0; j < height; j++) {
				var b = new Block();
				this.blocks[i][j] = b;
				this.drawBlock(i,j);
			}
			//this.drawBlock(0,0);
		}

		var b = new Block(this.ctx);
	}

	drawBoard() {
		this.canvas = document.createElement("canvas");
		this.canvas.height = this.height * 21 + 1;
		this.canvas.width = this.width * 21 + 1;
		this.ctx = this.canvas.getContext("2d");

		document.body.appendChild(this.canvas);
	}

	drawBlock(x, y) {
		var block = this.blocks[x][y];
		var c = document.createElement("canvas");
		c.width = c.height = 20;
		var _ctx = c.getContext("2d");

		_ctx.fillStyle = "grey";

		_ctx.fillRect(0, 0, 100, 100);
		var img = new Image();
		img.src = c.toDataURL();
		this.ctx.drawImage(img, (x * 20) + (x + 1), (y * 20) + (y + 1))
	}
}
