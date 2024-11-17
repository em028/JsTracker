
class Instrument extends Samplers {
	constructor(samplers) {
		super(samplers._gmname, samplers._name, samplers._baseSamples, samplers._urls, samplers._volume);
		this.sampler = new Tone.Sampler({urls: this._urls, baseUrl: gitUrl});
		this.pan = new Tone.Panner3D(0,0,0);
		this.vol = new Tone.Volume(this._volume);
		this.sampler.connect(this.pan);
		this.pan.connect(this.vol);
		this.vol.connect(Tone.Destination);
	}
	
	dispose() {
		this.sampler.dispose();
		this.pan.dispose();
		this.vol.dispose();
	}
	
	changeAllAttributes() {
		app.ShowPopup("no changes");
	}
}


/*
	Imstrument Component Class
*/
class InstrumentComponents {
	constructor() {
		this.tmp_event = [];
	}
	
	insttypSelected(main, value) {
		if (items_instname.length != 0) items_instname.length = 0;
		for (var i=0; i<samplers.length; i++) {
			if (samplers[i]._gmname == main.txt_insttyp.text)
				items_instname.push(samplers[i]._name);
				tmp_samplersid.push(i);
		}
		if (items_instname.length != 0) {
			main.sld_instname.maxValue = items_instname.length-1;
			main.sld_instname.disabled = false;
			main.sld_instname.value = 0;
			main.txt_instname.text = items_instname[0];
			main.btn_instload.disabled = false;
		} else {
			main.sld_instname.disabled = true;
			main.sld_instname.value = 0;
			main.txt_instname.text = "";
			main.btn_instload.disabled = true;
		}
	}
	
	load(main) {
		if (tmp_instrument != null && tmp_instrument._name == main.txt_instname.text) return 0;
		else if (tmp_instrument != null && tmp_instrument._baseSamples == samplers[tmp_samplersid[main.sld_instname.value]]._baseSamples) {
			tmp_instrument.changeAllAttributes();
			return 0;
		}
		else if (tmp_instrument != null) {
			tmp_instrument.dispose();
			tmp_instrument = null;
		}
		main.btn_instload.disabled = true;
		main.btn_instplay.disabled = true;
		main.btn_inststop.disabled = true;
		tmp_instrument = new Instrument(samplers[tmp_samplersid[main.sld_instname.value]]);
		Tone.ToneAudioBuffer.loaded().then( () => {
			main.btn_instload.disabled = false;
			main.btn_instplay.disabled = false;
			main.btn_inststop.disabled = false;
			/*
			tmp_instrument.sampler.triggerAttackRelease(["C2","C3","E4","G4","B4"], 14)
			*/
		});
	}
	
	play(main) {
		this.tmp_event.length = 0;
		this.tmp_event.push(new Tone.ToneEvent( (time) => {
			tmp_instrument.sampler.triggerAttack(["C2","C3","E4","G4","B4"]);
		}));
		this.tmp_event.push(new Tone.ToneEvent( (time) => {
			tmp_instrument.sampler.triggerRelease(["C2","C3","E4","G4","B4"]);
		}));
		Tone.Transport.schedule((time) => {
			this.tmp_event[0].start();
			this.tmp_event[1].start(5);
		});
		Tone.Transport.start();
	}
	
	stop(main) {
		Tone.Transport.stop();
		this.tmp_event[0].dispose();
		this.tmp_event[1].dispose();
		tmp_instrument.sampler.triggerRelease(["C2","C3","E4","G4","B4"]);
	}
	
	detuneChanged(main, value) {
		main.txt_instdtune.text = value;
		if (sampleLoaded) {
			for (var i=0; i<tmp_samples.length; i++)
				tmp_samples[i].detune = value;
		}
	}
	
	volumeChanged(main, value) {
		main.txt_instvol.text = value;
		if (sampleLoaded) {
			tmp_vol.set({volume: value});
		}
	}
	
	panningChanged(main, value) {
		main.txt_instpan.text = value;
		if (sampleLoaded) {
			tmp_pan.set({pan: value});
		}
	}
	
	ftypeChanged(item) {
		if (tmp_filter != null)
			tmp_filter.type = item;
	}
	
	rolloffChanged(item) {
		if (tmp_filter != null)
			tmp_filter.rolloff = item;
	}
	
	frequencyChanged(main, value) {
		main.txt_instfq.text = Math.floor(1.25**value);
		if (tmp_filter != null) {
				tmp_filter.set({frequency: Math.floor(1.25**value)});
		}
	}
	
	qChanged(main, value) {
		main.txt_instq.text = value;
		if (tmp_filter != null) {
				tmp_filter.set({Q: value});
		}
	}
	
}