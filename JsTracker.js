
cfg.MUI;
//cfg.Landscape;
cfg.Portrait;
cfg.Light;

app.Script("Libs/Tone.js");
app.Script("Global.js");
app.Script("Loops.js");
app.Script("LoopsData.js");
app.Script("Sample.js");
app.Script("Samplers.js");
app.Script("Instrument.js");
app.Script("LFOs.js");
app.Script("Pattern.js");
app.Script("DAW.js");

class Main extends App {
	
	onStart() {
		
		
		//ui.setFontFile("fonts/PixelMplus12-Regular.ttf");
		
		this.daw = new DAW();
		this.daw.initDAW();
		this.inst = new InstrumentComponents();
		
		/*
		
		Tone.Transport.schedule(
			(time) => {
				samples[0].start();
				//loop1.start(time, 0, (60/120)*20);
				//loop2.start(time+(60/120)*16, 0, (60/120)*4);
			}, 0
		);
		
		//175bpm, 4bar
		//Tone.Transport.setLoopPoints(0, 60/175*16);
		*/
		
		/*
		this.sampler = new Tone.Sampler({urls: samplers[0]._urls, baseUrl: gitUrl});
		this.sampler.toDestination();
		Tone.ToneAudioBuffer.loaded().then( () => {
			this.sampler.triggerAttackRelease(["C2","C3","E4","G4","B4"], 14)
		});
		*/
		
		this.main = ui.addLayout("main", "Linear", "Vertical", 1.0 ,1.0);
		
		this.tabs = ui.addTabs(this.main, items_tab, "Scrollable", 1, 1);
		this.tabs.backColor = "#696969";
		this.tabs.textColor = "#ffffff";
		this.tab_mast = this.tabs.getLayout(0);
		this.tab_seq = this.tabs.getLayout(1);
		this.tab_pat = this.tabs.getLayout(2);
		this.tab_inst = this.tabs.getLayout(3);
		this.tab_fx = this.tabs.getLayout(6);
		
		/*
			Tab Master Layout
		*/
		this.lay_mast =  ui.addLayout(this.tab_mast, "Linear", "Vertical", 1.0, 1.0);
		this.lay_mast.backColor = "#687074";
		this.lay_mast.textColor = "#fffff0";
		this.lay_mast.setChildMargins(0.01, 0.01, 0, 0.01);
		
		this.lay_mastbpm = ui.addLayout(this.lay_mast, "Linear", "Horizontal", 1.0, -1);
		this.txt_mastbpm = ui.addText(this.lay_mastbpm, "BPM: ", "Center, Singleline", 0.5, -1);
		this.tfd_mastbpm = ui.addTextField(this.lay_mastbpm, "",  "Center, Number", 0.5, -1);
		this.tfd_mastbpm.textColor = "#fffff0";
		this.tfd_mastbpm.text = "130";
		this.tfd_mastbpm.setOnEnter(this.mastbpmOnEnter);
		Tone.Transport.bpm.value = this.tfd_mastbpm.text;
		
		/*
			Tab Instrument Layout
		*/
		this.lay_inst =  ui.addLayout(this.tab_inst, "Linear", "Vertical", 1.0, 1.0);
		this.lay_inst.backColor = "#687074";
		this.lay_inst.textColor = "#fffff0";
		this.lay_inst.setChildMargins(0.01, 0, 0, 0.01);
		
		this.lay_instid = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instid = ui.addText(this.lay_instid, "Instrument Index: ", "Center", 0.4, -1);
		this.txt_instid = ui.addText(this.lay_instid, "1", "Center", 0.1, -1);
		this.sld_instid = ui.addSlider(this.lay_instid, 1,  "Primary", 0.5, -1);
		this.sld_instid.setPadding(0, 0, 0.03, 0);
		this.sld_instid.step = 1;
		this.sld_instid.minValue = 1;
		this.sld_instid.maxValue = 32;
		this.sld_instid.setOnChange(this.instidOnChange);
		this.sld_instid.setOnSelect(this.instidOnSelect);
		
		this.lay_insttyp = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_insttyp = ui.addText(this.lay_insttyp, "Type: ", "Center", 0.1, -1);
		this.txt_insttyp = ui.addText(this.lay_insttyp, "Acoustic Piano", "Center", 0.4, -1);
		this.sld_insttyp = ui.addSlider(this.lay_insttyp, 0,  "Primary", 0.5, -1);
		this.sld_insttyp.setPadding(0, 0, 0.03, 0);
		this.sld_insttyp.step = 1;
		this.sld_insttyp.marks = false;
		this.sld_insttyp.minValue = 0;
		this.sld_insttyp.maxValue = items_insttyp.length-1;
		this.sld_insttyp.setOnChange(this.insttypOnChange);
		this.sld_insttyp.setOnSelect(this.insttypOnSelect);
		
		this.lay_instname = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instname = ui.addText(this.lay_instname, "Name: ", "Center", 0.12, -1);
		this.txt_instname = ui.addText(this.lay_instname, "", "Center", 0.38, -1);
		this.sld_instname = ui.addSlider(this.lay_instname, 0,  "Primary", 0.5, -1);
		this.sld_instname.setPadding(0, 0, 0.03, 0);
		this.sld_instname.step = 1;
		this.sld_instname.marks = false;
		this.sld_instname.minValue = 0;
		this.sld_instname.maxValue = 0;
		this.sld_instname.disabled = true;
		this.sld_instname.setOnChange(this.instnameOnChange);
		this.sld_instname.setOnSelect(this.instnameOnSelect);
		
		this.lay_instload = ui.addLayout(this.lay_inst, "Linear", "Horizontal", -1, -1);
		this.btn_instload = ui.addButton(this.lay_instload, "Load", " Small", -1, -1);
		this.btn_instload.setOnTouch(this.instloadOnTouch);
		this.btn_instload.icon = "sync";
		this.btn_instload.disabled = true;
		this.btn_instplay = ui.addButton(this.lay_instload, "play", "Small", -1, -1);
		this.btn_instplay.setOnTouch(this.instplayOnTouch);
		this.btn_instplay.disabled = true;
		this.btn_instplay.icon = "play_circle_outline";
		this.btn_inststop = ui.addButton(this.lay_instload, "stop", "Small", -1, -1);
		this.btn_inststop.setOnTouch(this.inststopOnTouch);
		this.btn_inststop.disabled = true;
		this.btn_inststop.icon = "stop";
		this.inst.insttypSelected(this, 0);
		
		/*
		this.lay_instname = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt_instname = ui.addText(this.lay_instname, "Instrument Name: ", "Center, Singleline", 0.5, -1);
		this.sel_instname = ui.addSelect(this.lay_instname, items_instname,  "Center, Outlined, Small",  0.5, -1);
		this.sel_instname.backColor = "#a1acbf";
		this.sel_instname.textColor = "#000000";
		this.sel_instname.setOnOpen(this.instnameOnOpen);
		this.sel_instname.setOnChange(this.instnameOnChange);
		
		this.lay_instdtune = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instdtune = ui.addText(this.lay_instdtune, "Detune: ", "Center, Singleline", 0.25, -1);
		this.txt_instdtune = ui.addText(this.lay_instdtune, "0", "Center, Singleline", 0.25, -1);
		this.sld_instdtune = ui.addSlider(this.lay_instdtune, 0, "Primary", 0.5, -1);
		this.sld_instdtune.step = 100;
		this.sld_instdtune.minValue = -1200;
		this.sld_instdtune.maxValue = 1200;
		this.sld_instdtune.setOnChange(this.instdtuneOnChange);
		
		this.lay_instvol = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instvol = ui.addText(this.lay_instvol, "Volume: ", "Center, Singleline", 0.25, -1);
		this.txt_instvol = ui.addText(this.lay_instvol, "-10", "Center, Singleline", 0.25, -1);
		this.sld_instvol = ui.addSlider(this.lay_instvol, 0, "Primary", 0.5, -1);
		this.sld_instvol.step = 1;
		this.sld_instvol.minValue = -50;
		this.sld_instvol.maxValue = 6;
		this.sld_instvol.value = -10;
		this.sld_instvol.setOnChange(this.instvolOnChange);
		
		this.lay_instpan = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instpan = ui.addText(this.lay_instpan, "Panning: ", "Center, Singleline", 0.25, -1);
		this.txt_instpan = ui.addText(this.lay_instpan, "0", "Center, Singleline", 0.25, -1);
		this.sld_instpan = ui.addSlider(this.lay_instpan, 0, "Primary", 0.5, -1);
		this.sld_instpan.step = 0.02;
		this.sld_instpan.minValue = -1;
		this.sld_instpan.maxValue = 1;
		this.sld_instpan.setOnChange(this.instpanOnChange);
		
		this.lay_instftyp = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt_instftyp = ui.addText(this.lay_instftyp, "Filter Type: ", "Center, Singleline", 0.5, -1);
		this.sel_instftyp = ui.addSelect(this.lay_instftyp, items_instftyp,  "Center, Outlined, Small",  0.5, -1);
		this.sel_instftyp.backColor = "#a1acbf";
		this.sel_instftyp.textColor = "#000000";
		this.sel_instftyp.value = "lowpass";
		this.sel_instftyp.setOnChange(this.instftypOnChange);
		
		this.lay_instroff = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt_instroff = ui.addText(this.lay_instroff, "Roll-off: ", "Center, Singleline", 0.5, -1);
		this.sel_instroff = ui.addSelect(this.lay_instroff, items_instroff,  "Center, Outlined, Small",  0.5, -1);
		this.sel_instroff.backColor = "#a1acbf";
		this.sel_instroff.textColor = "#000000";
		this.sel_instroff.value = "-12";
		this.sel_instroff.setOnChange(this.instroffOnChange);
		
		this.lay_instfq = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instfq = ui.addText(this.lay_instfq, "Frequency: ", "Center, Singleline", 0.25, -1);
		this.txt_instfq = ui.addText(this.lay_instfq, "22000", "Center, Singleline", 0.25, -1);
		this.sld_instfq = ui.addSlider(this.lay_instfq, 45, "Primary", 0.5, -1);
		this.sld_instfq.step = 0.5;
		this.sld_instfq.minValue = 0;
		this.sld_instfq.maxValue = 45;
		this.sld_instfq.setOnChange(this.instfqOnChange);
		
		this.lay_instq = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instq = ui.addText(this.lay_instq, "Quality of Fq: ", "Center, Singleline", 0.25, -1);
		this.txt_instq = ui.addText(this.lay_instq, "1", "Center, Singleline", 0.25, -1);
		this.sld_instq = ui.addSlider(this.lay_instq, 1, "Primary", 0.5, -1);
		this.sld_instq.step = 1;
		this.sld_instq.minValue = 1;
		this.sld_instq.maxValue = 24;
		this.sld_instq.setOnChange(this.instqOnChange);
		
		
		
		/*
		Tab Effector Layout
		*/
		this.lay_fx =  ui.addLayout(this.tab_fx, "Linear", "Vertical", 1.0, 1.0);
		this.lay_fx.backColor = "#687074";
		this.lay_fx.textColor = "#fffff0";
		this.lay_fx.setChildMargins(0.01, 0.01, 0, 0.01);
		
		this.tab_fxlist = ui.addTabs(this.lay_fx, items_fxlist, "Scrollable", 1, 1);
		this.tab_fxlist.backColor = "#696999";
		this.tab_fxlist.textColor = "#ffffff";
		this.tab_fxlist.textSize = 10;
		
		
		
	}
	
	
	
	/*
		Tab Master Layout Controller
	*/
	mastbpmOnEnter() {
		this.daw.mastbpmChanged(this);
	}
	
	/*
		Tab Instrument Layout Controller
	*/
	instidOnChange(item) {
		this.txt_instid.text = item;
	}
	
	instidOnSelect(item) {
		
	}
	
	insttypOnChange(item) {
		this.txt_insttyp.text = items_insttyp[item];
	}
	
	insttypOnSelect(item) {
		this.inst.insttypSelected(this, item);
	}
	
	instnameOnChange(item) {
		this.txt_instname.text = items_instname[item];
	}
	
	instloadOnTouch() {
		this.inst.load(this);
	}
	
	instplayOnTouch() {
		this.inst.play(this);
	}
	
	inststopOnTouch() {
		this.inst.stop(this);
	}
	
	instdtuneOnChange(value) {
		this.inst.detuneChanged(this, value);
	}
	
	instvolOnChange(value) {
		this.inst.volumeChanged(this, value);
	}
	
	instpanOnChange(value) {
		this.inst.panningChanged(this, value);
	}
	
	instftypOnChange(item, index) {
		this.inst.ftypeChanged(item);
	}
	
	instroffOnChange(item, index) {
		this.inst.rolloffChanged(item);
	}
	
	instfqOnChange(value) {
		this.inst.frequencyChanged(this, value);
	}
	
	instqOnChange(value) {
		this.inst.qChanged(this, value);
	}
	
	
}