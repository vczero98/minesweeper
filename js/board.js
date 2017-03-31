class Board {
	constructor(height, width, numMines) {
		this.height = height;
		this.width = width;
		this.numMines = Math.min(numMines, (height * width - 1));
		this.blocks = new Array(width);
		this.drawBoard();
		this.gameStarted = false;
		this.gameOver = false;
		this.blockSize = 24;

		// Creating blocks
		for (var i = 0; i < width; i++) {
			this.blocks[i] = new Array(height);
			for (var j = 0; j < height; j++) {
				var b = new Block();
				this.blocks[i][j] = b;
				this.drawBlock(i,j);
			}
		}

		// Disable context menu at right click
		this.canvas.oncontextmenu = function() {
			return false;
		}
	}

	drawBoard() {
		this.canvas = document.createElement("canvas");
		this.canvas.height = this.height * 24;
		this.canvas.width = this.width * 24;
		this.ctx = this.canvas.getContext("2d");
		document.getElementById("game").appendChild(this.canvas);
	}

	drawBlock(x, y) {
		var block = this.blocks[x][y]; // Get the from indices
		// Create canvas and ctx
		var blockCanvas = document.createElement("canvas");
		var blockCtx = blockCanvas.getContext("2d");

		var img = new Image();
		img.src = "images/"

		if (!this.gameOver) {
			if (block.expanded) {
				if (block.isMine) {
					img.src += "mine.png";
				} else {
					img.src += block.n + ".png";
				}
			} else {
				if (block.flagged) {
					img.src += "flag.png";
				} else {
					img.src += "unexpanded.png";
				}
			}
		} else {
			if (block.losingBlock) {
				img.src += "mine_clicked.png";
			} else if (block.isMine && block.flagged) {
				img.src += "flag.png";
			} else if (block.isMine && !block.flagged) {
				img.src += "mine.png";
			} else if (!block.isMine && block.flagged) {
				img.src += "broken_flag.png";
			}
		}

		//img.src = blockCanvas.toDataURL();
		this.ctx.drawImage(img, x * this.blockSize, y * this.blockSize)
	}

	expandBlock(x, y) {
		var block = this.blocks[x][y];
		if (block.expanded || block.flagged) {
			return false;
		}
		block.expanded = true;
		this.drawBlock(x, y);
		if (block.n == 0 && !block.isMine) {
			var neighbours = this.getNeighboursOfBlock(x, y);
			for (var i = 0; i < neighbours.length; i++) {
				this.expandBlock(neighbours[i][0], neighbours[i][1]);
			}
		}
		return true;
	}

	flagBlock(x, y) {
		var block = this.blocks[x][y];
		if (block.expanded) {
			return;
		}
		block.flagged = !block.flagged;
		this.drawBlock(x, y);
	}

	generateMines() {
		var minesLeft = this.numMines;
		while (minesLeft != 0) {
			var xPos = Math.trunc(Math.random() * this.width); // Generate a number from 0 to the upper bound (exclusive)
			var yPos = Math.trunc(Math.random() * this.height);
			var block = this.blocks[xPos][yPos];
			// Check if the block is not a mine already or not protected
			if (!block.isMine && !block.protected) {
				// Set the block to be a mine
				block.isMine = true;
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

	clickBlock(x, y) {
		// Returns false if the game is over, true otherwise
		if (this.gameOver) {
			return true;
		}
		if (this.expandBlock(x, y)) {
			if (this.blocks[x][y].isMine) {
				this.blocks[x][y].losingBlock = true;
				this.endGame();
				return false;
			}
		}
		return true;
	}

	endGame() {
		this.gameOver = true;
		for (var i = 0; i < this.width; i++) {
			for (var j = 0; j < this.height; j++) {
				var block = this.blocks[i][j];
				if (block.isMine && !block.flagged) {
					block.expanded = true;
					this.drawBlock(i, j);
				} else if (!block.isMine && block.flagged) {
					this.drawBlock(i, j);
				}
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
