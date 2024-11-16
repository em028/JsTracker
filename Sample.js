

class Sample extends Tone.GrainPlayer {
	constructor (url) {
		super(url);
		//this._bpm = bpm;
		this.grainSize = 0.04;
		this.overlap = 0.04;
		this.loop = true;
	}
	/*
	get bpm() {return this._bpm;}
	set bpm(bpm) {
		this._bpm = bpm;
	}
	
	onload() {
		app.ShowPopup( "sample loaded" );
	}
	*/
}