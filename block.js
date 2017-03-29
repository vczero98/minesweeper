class Block {
	constructor(ctx) {
		this.ctx = ctx;
	}

	getArea() {
		return this.height * this.width;
	}

	drawBlock() {
		var c = document.createElement("canvas");
		c.width = c.height = 10;
		var _ctx = c.getContext("2d");

		_ctx.fillStyle = "grey";

		_ctx.fillRect(0, 0, 100, 100);
		var img = new Image();
		img.src = c.toDataURL();
		this.ctx.drawImage(img, 1, 1)
	}
}
