

class Event {
	constructor(element1, element2, element3) {
		this.e1 = element1;
		this.e2 = element2;
		this.e3 = element3;
	}
}

class Sequence {
	constructor() {
		this.event = Array(128);
		this.event.fill(null);
	}
}

class SequenceFunctions {
	
	createTopLineText() {
		const str = [];
		str.push("___|");
		for (var i=1; i<9; i++) {
			str.push(i+"________|");
		}
		str.push("\n");
		return str.join('');
	}
	
	createEmptySeqText() {
		const str = [];
		for (var i=0; i<16; i++) {
			const beat = Math.floor(i/4)+1;
			const sixteenth = (i%4);
			if (sixteenth == 0)
				str.push(beat+"_"+(sixteenth+1)+"|");
			else str.push("__"+(sixteenth+1)+"|");
			for (var j=0; j<8; j++) {
				str.push("___.__.__|");
			}
			str.push("\n");
		}
		return str.join('');
	}
	
	getSequenceText(seq) {
		const str = [];
		if (seq == null) {
			str.push(this.createTopLineText());
			str.push(this.createEmptySeqText());
			return str.join('');
			//ui.showPopup(tmp_seqtxt, "Long");
		}
	}
	
}