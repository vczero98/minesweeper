class Block {
	constructor() {
		this.expanded = false;
		this.isMine = false;
		this.flagged = false;
		this.n = 0;
		this.protected = false;
		this.losingBlock = false;
	}

	incrementN() {
		this.n += 1;
	}
}
