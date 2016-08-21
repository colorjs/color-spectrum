/**
 * @module color-spectrum/approx
 *
 * Approximation functions for wavelength
 */

module.exports = xyz;
xyz.x = x;
xyz.y = y;
xyz.z = z;

function xyz (wave) {
	return [x(wave), y(wave), z(wave)];
}

function x ( wave ) {
	let t1 = (wave-442.0)*((wave<442.0)?0.0624:0.0374);
	let t2 = (wave-599.8)*((wave<599.8)?0.0264:0.0323);
	let t3 = (wave-501.1)*((wave<501.1)?0.0490:0.0382);
	return 0.362*Math.exp(-0.5*t1*t1) + 1.056*Math.exp(-0.5*t2*t2)
- 0.065*Math.exp(-0.5*t3*t3);
}
function y ( wave ) {
	let t1 = (wave-568.8)*((wave<568.8)?0.0213:0.0247);
	let t2 = (wave-530.9)*((wave<530.9)?0.0613:0.0322);
	return 0.821*Math.exp(-0.5*t1*t1) + 0.286*Math.exp(-0.5*t2*t2);
}
function z ( wave ) {
	let t1 = (wave-437.0)*((wave<437.0)?0.0845:0.0278);
	let t2 = (wave-459.0)*((wave<459.0)?0.0385:0.0725);
	return 1.217*Math.exp(-0.5*t1*t1) + 0.681*Math.exp(-0.5*t2*t2);
}
