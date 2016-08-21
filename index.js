/**
 * @module  color-spectrum
 */

const interpolate = require('interpolate-arrays');
const xyz = require('color-space/xyz');
const table = require('./table');

module.exports = spectrumToColor;


//convert spectrum to color
function spectrumToColor (intensities) {
	let values = spectrumToXyz(intensities);

	values = values.map((v, i) => v * xyz.max[i]);

	let rgb = xyz.rgb(values).map(v => Math.floor(v));

	// let rgb = xyzToRgb(values);
	// rgb = constrainRgb(rgb);
	// rgb = normRgb(rgb);
	// rgb = gamma(rgb, 3);
	// rgb = rgb.map(v => Math.floor(v * 255));

	return `rgb(${rgb})`;
};


//diapasone settings
const lMin = 375;
const lMax = 725;
const fMin = 1/lMax;
const fMax = 1/lMin;

//convert any intensities array to rgb color
function spectrumToXyz (intensities) {
	let X = 0, Y = 0, Z = 0, XYZ;

	if (!intensities) return [0, 0, 0];

	if (intensities.length === 1) {
		intensities = intensities.slice();
		intensities.push(intensities[0]);
	}
	//Q: should we interpolate intensities or table?
	//interpolating intensities gives guaranteed O(c) and precise colors due to fixed table indexes
	//but may loose peaks, therefore interpolate table
	for (i = .5; i < intensities.length; i++) {
		let mag = intensities[Math.floor(i)];
		if (!mag) {
			continue;
		}

		let nf = i / intensities.length;
		let f = nf * (fMax - fMin) + fMin;
		let l = 1/f;
		let nl = (l - lMin) / (lMax - lMin);

		//table-based method
		// let xyz = interpolate(table, nl);
		// X += mag * xyz[0];
		// Y += mag * xyz[1];
		// Z += mag * xyz[2];

		X += mag * xFit(l);
		Y += mag * yFit(l);
		Z += mag * zFit(l);
	}

	return [X, Y, Z];
}

//table approximators
function xFit( wave ) {
	let t1 = (wave-442.0)*((wave<442.0)?0.0624:0.0374);
	let t2 = (wave-599.8)*((wave<599.8)?0.0264:0.0323);
	let t3 = (wave-501.1)*((wave<501.1)?0.0490:0.0382);
	return 0.362*Math.exp(-0.5*t1*t1) + 1.056*Math.exp(-0.5*t2*t2)
- 0.065*Math.exp(-0.5*t3*t3);
}
function yFit( wave ) {
	let t1 = (wave-568.8)*((wave<568.8)?0.0213:0.0247);
	let t2 = (wave-530.9)*((wave<530.9)?0.0613:0.0322);
	return 0.821*Math.exp(-0.5*t1*t1) + 0.286*Math.exp(-0.5*t2*t2);
}
function zFit( wave ) {
	let t1 = (wave-437.0)*((wave<437.0)?0.0845:0.0278);
	let t2 = (wave-459.0)*((wave<459.0)?0.0385:0.0725);
	return 1.217*Math.exp(-0.5*t1*t1) + 0.681*Math.exp(-0.5*t2*t2);
}
