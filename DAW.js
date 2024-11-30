
class DAW {
	constructor() {
		this._bpm = 120;
		this._loop = false;
		//loopStart set to 'Measure of start point minus 1'
		this._loopStart = 0;
		//loopEnd set to 'Measure of end point'
		this._loopEnd = 0;
		this._timeSignature = 4;
		this._swing = 0;
	}
	
	get bpm() {return this._bpm;}
	set bpm(bpm) {this._bpm = bpm;}
	
	get loop() {return this._loop;}
	set loop(bool) {this._loop = bool}
	
	initDAW() {
		Tone.Transport.timeSignature = this._timeSignature;
		Tone.Transport.bpm.value = this._bpm;
		Tone.Transport.swing = this._swing;
		Tone.Transport.loop = this._loop;
		Tone.Transport.loopStart = this._loopStart;
		//Tone.Transport.loopEnd = (60/this._bpm)*this._loopEnd*4;
		Tone.Transport.loopEnd = this._loopEnd;
		
		for (var i=0; i<INST_MAX; i++) {
			seq[i] = Array(128);
			seq.fill(null);
		}
	}
	
	mastbpmChanged(main) {
		
	}
	
	instPreviewReset(main) {
		this.stopPreview();
		main.btn_instplay.disabled = true;
		main.btn_inststop.disabled = true;
		items_instname.length = 0;
		main.sel_instname.value = "";
		items_instsmpl.length = 0;
		main.sel_instsmpl.setList(items_instsmpl);
		main.sel_instsmpl.value = "";
		main.txt_instdtune.text = "0";
		main.sld_instdtune.value = 0;
		main.sld_instvol.value = -10;
		main.txt_instvol.text = "-10";
		main.sld_instpan.value = 0;
		main.txt_instpan.text = "0";
		main.sld_instfq.value = 45;
		main.txt_instfq.text = "22000";
		main.sel_instftyp.value = "lowpass";
		main.sel_instroff.value = "-12";
		main.sld_instq.value = 1;
		main.txt_instq.text = "1";
	}
	
	instsmplChanged() {
		this.instStop();
	}
	
	stopPreview() {
		this.instStop();
		if (tmp_sched != null) {
			Tone.Transport.stop();
			Tone.Transport.clear(tmp_sched);
			tmp_sched = null;
		}
	}
	
	instLoad(main) {
		if (main.sel_instname.value != "") {
			main.btn_instplay.disabled = true;
			main.btn_inststop.disabled = true;
			this.freeTempletes();
			tmp_filter = new Tone.Filter(22000);
			tmp_filter.type = "lowpass";
			tmp_filter.rolloff = -12;
			tmp_pan = new Tone.Panner();
			tmp_vol = new Tone.Volume(); 
			tmp_vol.set({volume: -10});
			for (var i=0; i<loops[tmp_loopid]._nsample; i++) {
				tmp_samples.push(new Sample(loops[tmp_loopid]._links[i]));
				if (loops[tmp_loopid]._mode == "shot") {
					tmp_samples[i].loop = false;
				} else {
					tmp_samples[i].playbackRate = main.tfd_mastbpm.text/loops[tmp_loopid]._bpm;
					tmp_samples[i].detune = main.txt_instdtune.text;
				}
				
				tmp_samples[i].connect(tmp_filter);
				/*
				if (tmp_lfo != null) tmp_lfo.dispose();
				tmp_lfo = new Tone.LFO();
				tmp_lfo.min = 1;
				tmp_lfo.max = 10000;
				tmp_lfo.set({"frequency":0.5,"depth":1,"type":"sine"});
				tmp_lfo.connect(tmp_filter.frequency);
				tmp_lfo.start();
				*/
				tmp_filter.connect(tmp_vol);
				tmp_vol.connect(tmp_pan);
				tmp_pan.connect(Tone.Destination);
			}
			Tone.ToneAudioBuffer.loaded().then( () => {
				main.btn_instplay.disabled = false;
				main.btn_inststop.disabled = false;
				sampleLoaded = true;
			});
		}
	}
	
	instPlay() {
		if (tmp_sched == null) {
			tmp_sched = Tone.Transport.schedule((time) => {
				tmp_samples[tmp_smplid].start();
			});
			Tone.Transport.start();
		} else {
			this.instStop();
			Tone.Transport.start();
		}
	}
	
	instStop() {
		if (tmp_sched != null) {
			Tone.Transport.stop();
			tmp_samples[tmp_smplid].stop();
		}
	}
	
}