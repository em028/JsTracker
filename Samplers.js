
var sampleUrls = [];

class Samplers {
	constructor(gmname, name, baseSamples, urls) {
		this._gmname = gmname;
		this._name = name;
		this._baseSamples = baseSamples;
		this._urls = urls;
	}
}

sampleUrls[0] = {
	C1 : "001/00100100.ogg",
	Eb1: "001/00100101.ogg",
	Gb1: "001/00100102.ogg",
	A1 : "001/00100103.ogg",
	C2 : "001/00100104.ogg",
	Eb2: "001/00100105.ogg",
	Gb2: "001/00100106.ogg",
	A2 : "001/00100107.ogg",
	C3 : "001/00100108.ogg",
	Eb3: "001/00100109.ogg",
	Gb3: "001/00100110.ogg",
	A3 : "001/00100111.ogg",
	C4 : "001/00100112.ogg",
	Eb4: "001/00100113.ogg",
	Gb4: "001/00100114.ogg",
	A4 : "001/00100115.ogg",
	C5 : "001/00100116.ogg",
	Eb5: "001/00100117.ogg",
	Gb5: "001/00100118.ogg",
	A5 : "001/00100119.ogg",
	C6 : "001/00100120.ogg",
	Eb6: "001/00100121.ogg",
	Gb6: "001/00100122.ogg",
	A6 : "001/00100123.ogg",
	C7 : "001/00100124.ogg",
	Eb7: "001/00100125.ogg",
	Gb7: "001/00100126.ogg",
	A7 : "001/00100127.ogg",
	C8 : "001/00100128.ogg",
	};
samplers.push(new Samplers(
	"Acoustic Piano", "Grand Piano", "001001",sampleUrls[0]
));
samplers.push(new Samplers(
	"Acoustic Piano", "Grand Piano Dummy", "001001",sampleUrls[0]
));

sampleUrls[1] = {
	C1 : "001/00100200.ogg",
	Eb1: "001/00100201.ogg",
	Gb1: "001/00100202.ogg",
	A1 : "001/00100203.ogg",
	C2 : "001/00100204.ogg",
	Eb2: "001/00100205.ogg",
	Gb2: "001/00100206.ogg",
	A2 : "001/00100207.ogg",
	C3 : "001/00100208.ogg",
	Eb3: "001/00100209.ogg",
	Gb3: "001/00100210.ogg",
	A3 : "001/00100211.ogg",
	C4 : "001/00100212.ogg",
	Eb4: "001/00100213.ogg",
	Gb4: "001/00100214.ogg",
	A4 : "001/00100215.ogg",
	C5 : "001/00100216.ogg",
	Eb5: "001/00100217.ogg",
	Gb5: "001/00100218.ogg",
	A5 : "001/00100219.ogg",
	C6 : "001/00100220.ogg",
	Eb6: "001/00100221.ogg",
	Gb6: "001/00100222.ogg",
	A6 : "001/00100223.ogg",
	C7 : "001/00100224.ogg",
	Eb7: "001/00100225.ogg",
	Gb7: "001/00100226.ogg",
	A7 : "001/00100227.ogg",
	C8 : "001/00100228.ogg",
	};
samplers.push(new Samplers(
	"Acoustic Piano", "Steinway Piano", "001002",sampleUrls[1]
));