class Board {
	constructor(height, width, numMines) {
		this.height = height;
		this.width = width;
		this.numMines = Math.min(numMines, (height * width - 1));
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

		this.generateMines();
		for (var i = 0; i < width; i++) {
			for (var j = 0; j < height; j++) {
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

	expandBlock(x, y) {
		var block = this.blocks[x][y]
		if (block.expanded) {
			return;
		}
		block.expanded = true;
		this.drawBlock(x, y);
		if (block.n == 0) {
			var neighbours = this.getNeighboursOfBlock(x, y);
			for (var i = 0; i < neighbours.length; i++) {
				this.expandBlock(neighbours[i][0], neighbours[i][1]);
			}
		}
	}

	generateMines() {
		var minesLeft = this.numMines;
		while (minesLeft != 0) {
			var xPos = Math.trunc(Math.random() * this.width); // Generate a number from 0 to the upper bound (exclusive)
			var yPos = Math.trunc(Math.random() * this.height);
			// Check if the block is not a mine already
			if (!this.blocks[xPos][yPos].isMine) {
				// Set the block to be a mine
				this.blocks[xPos][yPos].isMine = true;
				this.drawBlock(xPos, yPos);
				// Increase the number of the neighbours of the mine
				var neighbours = this.getNeighboursOfBlock(xPos, yPos);
				for (var i = 0; i < neighbours.length; i++) {
					this.blocks[neighbours[i][0]][neighbours[i][1]].incrementN();
				}
				minesLeft--;
			}
		}
	}

	getNeighboursOfBlock(x, y) {
		var neighbours = [];
		for (var i = (x - 1); i <= (x + 1); i++) {
			for (var j = (y - 1); j <= (y + 1); j++) {
				if (!(i == x && j == y) && !this.isOutOfRange(i, j)) {
					neighbours.push([i, j]);
				}
			}
		}
		return neighbours;
	}

	isOutOfRange(x, y) {
		return ((Math.min(x, y) < 0) || (x > (this.width - 1)) || (y > (this.height - 1)));
	}
}
