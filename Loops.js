

class Loops {
	constructor (pack, genre, inst, mode, name, links, bpm, bar, scale, packname) {
		this._genre = genre;
		this._inst = inst;
		//mode: ["inst", "drum", "shot"]
		//if 'shot' is selected, loop = false.
		this._mode = mode;
		this._name = name;
		this._links = links;
		this._nsample = links.length;
		this._bpm = bpm;
		this._bar = bar;
		//scale: ["perc", "C", "allmin"]
		this._scale = scale;
		this._pack = pack;
		this._volume = 0;
		this._pan = 0;
		this._loop = true;
		this._loopStart = 0;
		this._loopEnd = bar*((60/this._bpm)*4);
		//keys and detunes is defined for 24keys (all scales) 
		// array that index 1 ia 'C', 2 is 'Cm', 3 is 'C#', 4 is 'C#m'...
		// adapted to 'links' index and its detuning.
		this._keys = [];
		this.init();
	}
	
	init() {
		if (this._scale == "C") {
			this._keys = ["C", "Em", "G", "Am"];
		} else if (this._scale == "perc") {
			for (var i=0; i<this._nsample; i++) {
				this._keys.push("variation "+(i+1));
			}
		} else if (this._scale == "allmin") {
			this._keys = ["Cm", "Em", "Am"];
		}
	}
	
}