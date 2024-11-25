/*
cfg.MUI;
cfg.Portrait;
cfg.Landscape;
cfg.Light;
*/
app.Script("Libs/Tone.js");
app.Script("Global.js");
app.Script("Loops.js");
app.Script("Sample.js");
app.Script("Samplers.js");
app.Script("Instrument.js");
app.Script("MiniPiano.js");
app.Script("Pattern.js");
app.Script("DAW.js");

class Main extends App {
	
	onStart() {
		
		//ui.setFontFile("fonts/MaterialIcons-Regular.ttf");
		
		this.daw = new DAW();
		this.daw.initDAW();
		this.inst = new InstrumentComponents();
		this.piano = new MiniPiano();
		
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
		
		
		this.main = ui.addLayout("main", "Linear", "Vertical", 1, 1);
		
		this.tabs = ui.addTabs(this.main, items_tab, "Scrollable", 1, 1);
		this.tabs.backColor = "#696969";
		this.tabs.textColor = "#ffffff";
		this.tab_mast = this.tabs.getLayout(0);
		this.tab_inst = this.tabs.getLayout(1);
		this.tab_pat = this.tabs.getLayout(2);
		this.tab_seq = this.tabs.getLayout(3);
		this.tab_fx = this.tabs.getLayout(6);
		
		/*
			Bottom Navigation Bar Layout
		*/
		this.bnb = ui.addBottomNavbar(this.main, navs, "", 1, 0.07);
		this.bnb.backColor = "#aaccee";
		this.bnb.textColor = "#222222";
		this.bnb.selectItem("stop");
		this.bnb.setOnChange(this.bnbOnChange);
		
		/*
			Drawer Layout
		*/
		this.lay_drw = ui.addLayout(null, "Linear");
		this.drw = ui.addDrawer(this.lay_drw, "Bottom", DRAWER_HEIGHT);
		this.lay_pfctrl = ui.addLayout(this.lay_drw, "Linear", "Horizontal", 1, PFCTRL_HEIGHT);
		this.lay_pfctrl.backColor = "#687074";
		this.lay_pfctrl.textColor = "#fffff0";
		this.swt_pfctrl = ui.addSwitch(this.lay_pfctrl, "sustine", "Primary, Small, Center", 0.5, 1);
		this.swt_pfctrl.textColor = "#fffff0";
		this.btn_pfctrl = ui.addButton(this.lay_pfctrl, "note off", "VCenter", -1, -1);
		this.btn_pfctrl.icon = "music_off";
		this.btn_pfctrl.setOnTouch(this.noteoffOnTouch);
		this.img_piano1 = ui.addImage(this.lay_drw, "Img/minipiano.jpg", "Image", 1, PIANO_HEIGHT);
		this.img_piano1.setOnTouch(this.pianoOnTouch);
		this.img_piano2 = ui.addImage(this.lay_drw, "Img/minipiano.jpg", "Image", 1, PIANO_HEIGHT);
		this.img_piano2.setOnTouch(this.pianoOnTouch);
		this.img_piano3 = ui.addImage(this.lay_drw, "Img/minipiano.jpg", "Image", 1, PIANO_HEIGHT);
		this.img_piano3.setOnTouch(this.pianoOnTouch);
		this.img_piano4 = ui.addImage(this.lay_drw, "Img/minipiano.jpg", "Image", 1, PIANO_HEIGHT);
		this.img_piano4.setOnTouch(this.pianoOnTouch);
		this.piano.setPianoSize(this.img_piano4.getPosition("px"));
		this.drw.setOnClose(this.drwOnClose);
		
		/*
			Tab Master Layout
		*/
		this.lay_mast =  ui.addLayout(this.tab_mast, "Linear", "Vertical", 1.0, 1.0);
		this.lay_mast.backColor = "#687074";
		this.lay_mast.textColor = "#fffff0";
		this.lay_mast.setChildMargins(0.01, 0.01, 0, 0.01);
		
		this.lay_mastbpm = ui.addLayout(this.lay_mast, "Linear", "Horizontal", 1.0, -1);
		this.txt0_mastbpm = ui.addText(this.lay_mastbpm, "BPM: ", "Left", 0.2, -1);
		this.txt0_mastbpm.setPadding(0.02, 0.01, 0, 0);
		this.txt_mastbpm = ui.addText(this.lay_mastbpm, "120",  "Left", 0.8, -1);
		this.txt_mastbpm.setPadding(0.02, 0.01, 0, 0);
		this.sld_mastbpm = ui.addSlider(this.lay_mast, 0,  "Primary", 1, -1);
		this.sld_mastbpm.setPadding(0.02, 0, 0.03, 0);
		this.sld_mastbpm.step = 5;
		this.sld_mastbpm.minValue = 60;
		this.sld_mastbpm.maxValue = 210;
		this.sld_mastbpm.value = 120;
		this.sld_mastbpm.setOnChange(this.mastbpmOnChange);
		this.sld_mastbpm.setOnSelect(this.mastbpmOnSelect);
		Tone.Transport.bpm.value = this.txt_mastbpm.text;
		
		/*
			Tab Instrument Layout
		*/
		this.lay_inst =  ui.addLayout(this.tab_inst, "Linear", "Vertical", 1.0, 1.0);
		this.lay_inst.backColor = "#687074";
		this.lay_inst.textColor = "#fffff0";
		this.lay_inst.setChildMargins(0, 0, 0, 0.01);
		
		this.lay_instid = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instid = ui.addText(this.lay_instid, "Instrument Index: ", "Left", 0.4, -1);
		this.txt0_instid.setPadding(0.02, 0.01, 0, 0);
		this.txt_instid = ui.addText(this.lay_instid, "1", "Left", 0.6, -1);
		this.txt_instid.setPadding(0, 0.01, 0, 0);
		this.sld_instid = ui.addSlider(this.lay_inst, 1,  "Primary", 1, -1);
		this.sld_instid.setPadding(0.02, 0, 0.03, 0);
		this.sld_instid.step = 1;
		this.sld_instid.minValue = 1;
		this.sld_instid.maxValue = 36;
		this.sld_instid.setOnChange(this.instidOnChange);
		this.sld_instid.setOnSelect(this.instidOnSelect);
		
		this.lay_insttyp = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_insttyp = ui.addText(this.lay_insttyp, "Type: ", "Left", 0.15, -1);
		this.txt0_insttyp.setPadding(0.02, 0, 0, 0);
		this.txt_insttyp = ui.addText(this.lay_insttyp, "Acoustic Piano", "Left", 0.85, -1);
		this.sld_insttyp = ui.addSlider(this.lay_inst, 0,  "Primary", 1, -1);
		this.sld_insttyp.setPadding(0.02, 0, 0.03, 0);
		this.sld_insttyp.step = 1;
		this.sld_insttyp.marks = false;
		this.sld_insttyp.minValue = 0;
		this.sld_insttyp.maxValue = items_insttyp.length-1;
		this.sld_insttyp.setOnChange(this.insttypOnChange);
		this.sld_insttyp.setOnSelect(this.insttypOnSelect);
		
		this.lay_instname = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instname = ui.addText(this.lay_instname, "Name: ", "Left", 0.15, -1);
		this.txt0_instname.setPadding(0.02, 0, 0, 0);
		this.txt_instname = ui.addText(this.lay_instname, "", "Left", 0.85, -1);
		this.sld_instname = ui.addSlider(this.lay_inst, 0,  "Primary", 1, -1);
		this.sld_instname.setPadding(0.02, 0, 0.03, 0);
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
		this.inst.insttypSelected(this, 0);
		
		this.lay_instvol = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instvol = ui.addText(this.lay_instvol, "Volume: ", "Center, Singleline", 0.25, -1);
		this.txt_instvol = ui.addText(this.lay_instvol, "0", "Center, Singleline", 0.25, -1);
		this.sld_instvol = ui.addSlider(this.lay_instvol, 0, "Primary", 0.5, -1);
		this.sld_instvol.setPadding(0, 0, 0.03, 0);
		this.sld_instvol.step = 1;
		this.sld_instvol.minValue = -50;
		this.sld_instvol.maxValue = 6;
		this.sld_instvol.setOnChange(this.instvolOnChange);
		this.sld_instvol.setOnSelect(this.instvolOnSelect);
		
		this.lay_instpan = ui.addLayout(this.lay_inst, "Linear", "Horizontal", 1.0, -1);
		this.txt0_instpan = ui.addText(this.lay_instpan, "Panning: ", "Center, Singleline", 0.25, -1);
		this.txt_instpan = ui.addText(this.lay_instpan, "0", "Center, Singleline", 0.25, -1);
		this.sld_instpan = ui.addSlider(this.lay_instpan, 0, "Primary", 0.5, -1);
		this.sld_instpan.setPadding(0, 0, 0.03, 0);
		this.sld_instpan.step = 0.02;
		this.sld_instpan.minValue = -1;
		this.sld_instpan.maxValue = 1;
		this.sld_instpan.setOnChange(this.instpanOnChange);
		this.sld_instpan.setOnSelect(this.instpanOnSelect);
		
		/*
		Tab Effector Layout
		*/
		this.lay_fx =  ui.addLayout(this.tab_fx, "Linear", "Vertical", 1.0, 1.0);
		this.lay_fx.backColor = "#687074";
		this.lay_fx.textColor = "#fffff0";
		this.lay_fx.setChildMargins(0.01, 0.01, 0, 0.01);
		/*
		this.tab_fxlist = ui.addTabs(this.lay_fx, items_fxlist, "Scrollable", 1, 1);
		this.tab_fxlist.backColor = "#696999";
		this.tab_fxlist.textColor = "#ffffff";
		this.tab_fxlist.textSize = 10;
		*/
		
	}
	/*
		BottomNavigation Bar Layout Controller
	*/
	bnbOnChange(item, index) {
		if (index == 2) this.drw.show();
	}
	
	drwOnClose() {
		this.bnb.selectItemByIndex(1); this.piano.releaseAll();
	}
	
	pianoOnTouch(event) {
		this.piano.onTouch(this, event.left, event.top);
	}
	
	noteoffOnTouch() {
		this.piano.releaseAll();
	}
	
	/*
		Tab Master Layout Controller
	*/
	mastbpmOnChange(item) {
		this.txt_mastbpm.text = item;
	}
	
	mastbpmOnSelect() {
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
	
	instvolOnChange(value) {
		this.txt_instvol.text = value;
	}
	
	instvolOnSelect(value) {
		this.inst.volumeSelected(value);
	}
	
	instpanOnChange(value) {
		this.txt_instpan.text = value;
	}
	
	instpanOnSelect(value) {
		this.inst.panningChanged(this, value);
	}
	
}