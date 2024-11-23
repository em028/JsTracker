
var i;

//var baseUrl = "http://192.168.128.123:8080/";
var baseUrl = "http://127.0.0.1:8080/";
var gitUrl = "https://em028.github.io/samples/";

var daw;

var loops = [];
var samples = [];
var samplers = [];
var instruments = Array(36);
var pattern = [];

var items_pat = [];
var items_patbar = ["1", "2", "3", "4", "5", "6", "7", "8"];

//var items_on_off = ["on","off"];	
//var items_key = ["C","Cm","C#","C#m","D","Dm","D#","D#m","E","Em","F","Fm","F#","F#m","G","Gm","G#","G#m","A","Am","A#","A#m","B","Bm"];
var items_tab = ["Master", "Sequencer", "Patterns", "Instruments", "Drum Machine", "Loops", "Effectors"];
var items_lfolist = ["Amplitude LFO", "Detune LFO", "Filter LFO", "Pan LFO"];
var items_fxlist = ["Auto Filter", "Auto Panner", "Auto Wah", "Bit Crusher", "3D Panner"];
var items_note = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
var items_pack = ["All", "BerlinMinimal", "SpeedFreak"];
var items_genre = ["Drum'n'bass", "Techno"];
var items_insttyp = ["Acoustic Piano", "Electric Piano", "Electric Bass", "Synth Bass", "Acoustic Guitar", "Electric Guitar", "Strings", "Synth Strings", "Synth Lead", "Synth Pad"];
var items_instftyp = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"];
var items_instroff = ["-12", "-24", "-48", "-96"];
var items_instname = [];
var items_instloopid = [];
var items_instsmpl = [];

var tmp_octave = 4;
var tmp_sampler = null;
var tmp_instrument = null;
var tmp_samplersid = [];
var tmp_sched = null;
var tmp_loopid = 0;
var tmp_smplid = 0;
var tmp_samples = [];
var tmp_filter = null;
var tmp_vol = null;
var tmp_pan = null;
var tmp_lfo1 = null;
var tmp_lfo2 = null;

var sampleLoaded = false;