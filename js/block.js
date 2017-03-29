class Block {
	constructor() {
		this.expanded = false;
		this.isMine = false;
		this.flagged = false;
		this.n = 0;
	}

	incrementN() {
		this.n += 1;
	}
}
