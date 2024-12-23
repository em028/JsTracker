
var i;

//var gitUrl = "http://127.0.0.1:8080/";
var gitUrl = "https://em028.github.io/samples/";

var daw;
const INST_MAX = 16;
const SONGLENGTH_MAX = 128;
const EVENTLENGTH_MAX = 128;
const DRAWER_HEIGHT = 0.6;
const PFCTRL_HEIGHT = 0.08;
const PIANO_HEIGHT = 0.23;

var samplers = [];
var instruments = Array(INST_MAX);
var seq = Array(INST_MAX);
var pattern = [];

var items_patbar = ["1", "2", "3", "4", "5", "6", "7", "8"];

var navs = [["play", "play_circle_outline"], ["stop", "stop"], ["mini piano", "keyboard"]];
//var items_on_off = ["on","off"];	
//var items_key = ["C","Cm","C#","C#m","D","Dm","D#","D#m","E","Em","F","Fm","F#","F#m","G","Gm","G#","G#m","A","Am","A#","A#m","B","Bm"];
var items_tab = ["Master", "Instruments", "Sequencer", "Drum Machine", "Effectors"];
var items_lfolist = ["Amplitude LFO", "Detune LFO", "Filter LFO", "Pan LFO"];
var items_fxlist = ["Auto Filter", "Auto Panner", "Auto Wah", "Bit Crusher", "3D Panner"];
//var items_note = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
var items_pack = ["All", "BerlinMinimal", "SpeedFreak"];
var items_genre = ["Drum'n'bass", "Techno"];
var items_insttyp = ["Acoustic Piano", "Electric Piano", "Electric Bass", "Synth Bass", "Acoustic Guitar", "Electric Guitar", "Strings", "Synth Strings", "Synth Lead", "Synth Pad"];
var items_instftyp = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"];
var items_instroff = ["-12", "-24", "-48", "-96"];
var items_instname = [];
var items_instloopid = [];
var items_instsmpl = [];

var tmp_samplersid = [];
var tmp_sched = null;
var tmp_loopid = 0;

var sampleLoaded = false;