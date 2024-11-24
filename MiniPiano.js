

class MiniPiano {
	constructor() {
		this.left = 0;
		this.top = 0;
		this.right = 0;
		this.bottom = 0;
		this.width = 0;
		this.height = 0;
		this.partition_x = 0;
		this.partition_y = 0;
		this.partition_w = 0;
		this.partition_b = 0;
		this.octave = 0;
		this.black = false;
	}
	
	setPianoSize(pos) {
		this.bottom = pos.bottom;
		this.top = (this.bottom*(1-DRAWER_HEIGHT))*(1+PFCTRL_HEIGHT);
		this.left = pos.left;
		this.right = pos.right;
		this.width = this.right - this.left;
		this.height = this.bottom - this.top;
		this.partition_x = this.width*0.5;
		this.partition_y = this.height*0.25;
		this.partition_w = this.partition_x/7;
		this.partition_b = this.partition_x/12;
	}
	
	onTouch(main, x, y) {
		if ((y-this.top)%this.partition_y < this.partition_y*0.5)
			this.black = true;
		else this.black = false;
		this.octave = (Math.floor((y-this.top)/this.partition_y));
		if (x < this.partition_x)
			this.octave = this.octave*2;
		else this.octave = this.octave*2+1;
		if (this.black) {
			if (x%this.partition_x < this.partition_b)
				this.note = "C";
			else if (x%this.partition_x < this.partition_b*2)
				this.note = "Db";
			else if (x%this.partition_x < this.partition_b*3)
				this.note = "D";
			else if (x%this.partition_x < this.partition_b*4)
				this.note = "Eb";
			else if (x%this.partition_x < this.partition_b*5)
				this.note = "E";
			else if (x%this.partition_x < this.partition_b*6)
				this.note = "F";
			else if (x%this.partition_x < this.partition_b*7)
				this.note = "Gb";
			else if (x%this.partition_x < this.partition_b*8)
				this.note = "G";
			else if (x%this.partition_x < this.partition_b*9)
				this.note = "Ab";
			else if (x%this.partition_x < this.partition_b*10)
				this.note = "A";
			else if (x%this.partition_x < this.partition_b*11)
				this.note = "Bb";
			else if (x%this.partition_x < this.partition_x)
				this.note = "B";
		} else {
			if (x%this.partition_x < this.partition_w)
				this.note = "C";
			else if (x%this.partition_x < this.partition_w*2)
				this.note = "D";
			else if (x%this.partition_x < this.partition_w*3)
				this.note = "E";
			else if (x%this.partition_x < this.partition_w*4)
				this.note = "F";
			else if (x%this.partition_x < this.partition_w*5)
				this.note = "G";
			else if (x%this.partition_x < this.partition_w*6)
				this.note = "A";
			else if (x%this.partition_x < this.partition_x)
				this.note = "B";
		}
		if (instruments[main.sld_instid.value-1] != null) {
			if (main.swt_pfctrl.value == false) this.releaseAll();
			instruments[main.sld_instid.value-1].sampler.triggerAttack(this.note+this.octave);
		}
	}
	
	releaseAll() {
		if (instruments[main.sld_instid.value-1] != null)
			instruments[main.sld_instid.value-1].sampler.releaseAll();
	}
	
}