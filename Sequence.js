

class Event {
	constructor(element1, element2, element3) {
		this.e1 = element1;
		this.e2 = element2;
		this.e3 = element3;
	}
}

class Sequence {
	constructor() {
		this.event = Array(EVENTLENGTH_MAX);
		this.event.fill(null);
	}
}

class SequenceFunctions {
	
	createEmptySeqText() {
		const str = [];
		for (var i=0; i<16; i++) {
			const beat = Math.floor(i/4)+1;
			const sixteenth = (i%4);
			str.push("#"+beat+"_"+(sixteenth+1)+"/\n");
		}
		return str.join('');
	}
	
	getSequenceText(seq) {
		const str = [];
		if (seq == null) {
			return this.createEmptySeqText();
		}
	}
	
}