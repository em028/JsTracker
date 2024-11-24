

class MiniPiano {
	constructor() {
		this.left = 0;
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
	}
	
	setPianoSize(pos) {
		this.bottom = pos.bottom;
		this.top = (this.bottom*(1-DRAWER_HEIGHT))*(1+PFCTRL_HEIGHT);
		this.left = pos.left;
		this.right = pos.right;
	}
	
	onTouch(x, y) {
		app.ShowPopup(this.right);
	}
	
}