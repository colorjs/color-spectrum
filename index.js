/**
 * @module  color-spectrum
 */

const interpolate = require('interpolate-arrays');
const xyz = require('color-space/xyz');
const table = require('./table');
const approx = require('./approx');

module.exports = spectrumToColor;

spectrumToColor.spectrum = spectrumToXyz;
spectrumToColor.wavelength = wavelengthToXyz;


//convert spectrum to color
function spectrumToColor (intensities, opts) {
	if (!opts) opts = {};

	opts.approximate = opts.approximate == null ? true : opts.approximate;
	opts.normalize = opts.normalize == null ? true : opts.normalize;
	opts.whitepoint = opts.whitepoint || xyz.whitepoint[2].D65;

	let values;
	if (typeof intensities === 'number') {
		values = wavelengthToXyz(intensities, opts);
	}
	else {
		values = spectrumToXyz(intensities, opts);
	}

	let rgb = xyz.rgb(values, opts.whitepoint).map(v => Math.floor(v));

	return `rgb(${rgb})`;
};

//convert any intensities array to rgb color
function spectrumToXyz (intensities, opts) {
	if (!intensities) return [0, 0, 0];

	if (typeof intensities === 'number') {
		return wavelengthToXyz(intensities, opts);
	}

	//append spectrum for interpolation
	if (intensities.length === 1) {
		return wavelengthToXyz(intensities[0], opts);
	}

	let normalize = opts.normalize;
	let approximate = opts.approximate;
	let whitepoint = opts.whitepoint;

	let lMin = 380;
	let lMax = 780;
	let fMin = 1/lMax;
	let fMax = 1/lMin;

	//get sum for normalization
	let sum = 0;
	if (normalize) {
		for (let i = 0; i < intensities.length; i++) {
			sum += intensities[i];
		}
	}

	//integrate over magnitudes
	let X = 0, Y = 0, Z = 0, XYZ;

	for (i = .5; i < intensities.length; i++) {
		let mag = intensities[Math.floor(i)];

		if (normalize) mag = sum === 0 ? mag : mag/sum;

		if (!mag) {
			continue;
		}

		let nf = i / intensities.length;
		let f = nf * (fMax - fMin) + fMin;
		let l = 1/f;
		let nl = (l - lMin) / (lMax - lMin);

		//table-based method
		let xyz = approximate ? approx(l) : interpolate(table, nl);
		X += mag * xyz[0];
		Y += mag * xyz[1];
		Z += mag * xyz[2];
	}

	return [X, Y, Z].map((v, i) => v * whitepoint[i]);
}


function wavelengthToXyz (l, opts) {
	let whitepoint = opts.whitepoint;

	let xyz;
	if (opts.normalize) {
		xyz = approx(l);
	}
	else {
		let r = (l - 380) / 400;
		xyz = interpolate(table, l);
	}

	return xyz.map((v, i) => v * whitepoint[i]);
}