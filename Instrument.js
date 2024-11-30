
class Instrument extends Samplers {
	constructor(samplers) {
		super(samplers._gmname, samplers._name, samplers._urls, samplers._volume, samplers._attack, samplers._release);
		this.sampler = new Tone.Sampler({urls: this._urls, baseUrl: gitUrl});
		this.sampler.attack = this._attack;
		this.sampler.release = this._release;
		this.pan = new Tone.Panner();
		this.pan.channelCount = 2;
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
	
}


/*
	Imstrument Component Class
*/
class InstrumentComponents {
	constructor() {
		instruments.fill(null);
	}
	
	insttypSelected(main, value) {
		tmp_samplersid.length = 0;
		if (items_instname.length != 0) items_instname.length = 0;
		for (var i=0; i<samplers.length; i++) {
			if (samplers[i]._gmname == main.txt_insttyp.text) {
				items_instname.push(samplers[i]._name);
				tmp_samplersid.push(i);
			}
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
		var i = main.sld_instid.value-1;
		if (instruments[i] != null && instruments[i]._name == main.txt_instname.text) return 0;
		else if (instruments[i] != null) {
			instruments[i].dispose();
			instruments[i] = null;
		}
		main.btn_instload.disabled = true;
		instruments[i] = new Instrument(samplers[tmp_samplersid[main.sld_instname.value]]);
		main.sld_instvol.value = instruments[i].vol.volume.value;
		main.txt_instvol.text = Math.round(instruments[i].vol.volume.value);
		Tone.ToneAudioBuffer.loaded().then( () => {
			sampleLoaded = true;
			main.btn_instload.disabled = false;
		});
	}
	
	stop(main) {
		instruments[main.sld_instid.value-1].sampler.releaseAll();
	}
	
	volumeSelected(value) {
		if (sampleLoaded) {
			instruments[main.sld_instid.value-1].vol.volume.value = value;
		}
	}
	
	panningChanged(main, value) {
		main.txt_instpan.text = value;
		if (sampleLoaded) {
			instruments[main.sld_instid.value-1].pan.set({pan: value});
		}
	}
	
}