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
		}
	}

	drawBoard() {
		this.canvas = document.createElement("canvas");
		this.canvas.height = this.height * 21 + 1;
		this.canvas.width = this.width * 21 + 1;
		this.ctx = this.canvas.getContext("2d");
		console.log(document.body);
		document.body.appendChild(this.canvas);
	}

	drawBlock(x, y) {
		var block = this.blocks[x][y]; // Get the from indices
		// Create canvas and ctx
		var blockCanvas = document.createElement("canvas");
		blockCanvas.width = blockCanvas.height = 20;
		var blockCtx = blockCanvas.getContext("2d");

		if (block.expanded) {
			blockCtx.fillStyle = "lightgrey";
			blockCtx.fillRect(0, 0, 100, 100);
			blockCtx.fillStyle = "black";
			blockCtx.font = "14px Arial";
			if (!block.isMine) {
				blockCtx.fillText(block.n == 0 ? "" : block.n, 6, 16); // Add the number if it is not 0
			} else {
				blockCtx.fillText("M", 4, 16);
			}

		} else {
			blockCtx.fillStyle = "grey";
			blockCtx.fillRect(0, 0, 100, 100);
		}

		var img = new Image();
		img.src = blockCanvas.toDataURL();
		this.ctx.drawImage(img, (x * 20) + (x + 1), (y * 20) + (y + 1))
	}
}
