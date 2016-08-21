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
	let rgb = xyz.rgb(values).map(Math.floor);

	// let rgb = xyzToRgb(values);
	rgb = rgb.map(v => Math.floor(v));

	return `rgb(${rgb})`;
};

/* A colour system is defined by the CIE x and y coordinates of
   its three primary illuminants and the x and y coordinates of
   the white point. */
const Rec709system = { name: "CIE REC 709", xRed: 0.64,   yRed:0.33,   xGreen: 0.30,   yGreen: 0.60,   xBlue: 0.15,   yBlue: 0.06,   xWhite: 0.3127, yWhite: 0.3291,  gamma: 0 };

function xyzToRgb ([xc, yc, zc]) {
	let cs = Rec709system;
    let xr, yr, zr, xg, yg, zg, xb, yb, zb;
    let xw, yw, zw;
    let rx, ry, rz, gx, gy, gz, bx, by, bz;
    let rw, gw, bw;

    xr = cs.xRed;    yr = cs.yRed;    zr = 1 - (xr + yr);
    xg = cs.xGreen;  yg = cs.yGreen;  zg = 1 - (xg + yg);
    xb = cs.xBlue;   yb = cs.yBlue;   zb = 1 - (xb + yb);

    xw = cs.xWhite;  yw = cs.yWhite;  zw = 1 - (xw + yw);

    /* xyz -> rgb matrix, before scaling to white. */

    rx = (yg * zb) - (yb * zg);  ry = (xb * zg) - (xg * zb);  rz = (xg * yb) - (xb * yg);
    gx = (yb * zr) - (yr * zb);  gy = (xr * zb) - (xb * zr);  gz = (xb * yr) - (xr * yb);
    bx = (yr * zg) - (yg * zr);  by = (xg * zr) - (xr * zg);  bz = (xr * yg) - (xg * yr);

    /* White scaling factors.
       Dividing by yw scales the white luminance to unity, as conventional. */

    rw = ((rx * xw) + (ry * yw) + (rz * zw)) / yw;
    gw = ((gx * xw) + (gy * yw) + (gz * zw)) / yw;
    bw = ((bx * xw) + (by * yw) + (bz * zw)) / yw;

    /* xyz -> rgb matrix, correctly scaled to white. */

    rx = rx / rw;  ry = ry / rw;  rz = rz / rw;
    gx = gx / gw;  gy = gy / gw;  gz = gz / gw;
    bx = bx / bw;  by = by / bw;  bz = bz / bw;

    /* rgb of the desired point */

    let r = (rx * xc) + (ry * yc) + (rz * zc);
    let g = (gx * xc) + (gy * yc) + (gz * zc);
    let b = (bx * xc) + (by * yc) + (bz * zc);

    return [r, g, b];
}

//diapasone settings
const lMin = 380;
const lMax = 780;
const fMin = 1/lMax;
const fMax = 1/lMin;

//convert any intensities array to rgb color
function spectrumToXyz (intensities) {
	let X = 0, Y = 0, Z = 0, XYZ;

	if (intensities.length === 1) {
		intensities = intensities.slice();
		intensities.push(intensities[0]);
	}
	//Q: should we interpolate intensities or table?
	//interpolating intensities gives guaranteed O(c) and precise colors due to fixed table indexes
	//but may loose peaks, therefore interpolate table
	for (i = .5; i < intensities.length; i++) {
		let mag = intensities[Math.floor(i)];

		let nf = i / intensities.length;
		let f = nf * (fMax - fMin) + fMin;
		let l = 1/f;
		let nl = (l - lMin) / (lMax - lMin);

		let xyz = interpolate(table, nl);

		X += mag * xyz[0];
		Y += mag * xyz[1];
		Z += mag * xyz[2];
	}

	XYZ = (X + Y + Z);

	if (!X && !Y && !Z) return [0,0,0];

	let x = X / XYZ;
	let y = Y / XYZ;
	let z = Z / XYZ;

	return [x, y, z];
}
