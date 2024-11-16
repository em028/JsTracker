
class Instrument extends Samplers {
	constructor(samplers) {
		super(samplers._gmname, samplers._name, samplers._baseSamples, samplers._urls);
		this.sampler = new Tone.Sampler({urls: this._urls, baseUrl: gitUrl});
		this.sampler.toDestination();
		Tone.ToneAudioBuffer.loaded().then( () => {
			this.sampler.triggerAttackRelease(["C2","C3","E4","G4","B4"], 14)
		});
	}
	
	dispose() {
		this.sampler.dispose();
	}
	
	changeAllAttributes() {
		app.ShowPopup("no changes");
	}
}

class InstrumentComponents {
	constructor() {
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
		tmp_instrument = new Instrument(samplers[tmp_samplersid[main.sld_instname.value]]);
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