const toColor = require('./');
const assert = require('assert');
const Panel = require('settings-panel');
const isBrowser = require('is-browser');
require('enable-mobile');


if (isBrowser) {
	let panel = Panel({
		spectrum: {
			type: 'textarea',
			value: '1,1,1,1,1,1,1,1,1,1,1,1',
			change: v => {
				let values = v.split(/\s*,\s*/).filter(Boolean).map(v => parseFloat(v) || 0);
				let color = toColor(values);

				document.body.style.background = color;
			}
		}
	}, {
		theme: require('settings-panel/theme/control'),
		palette: ['#111', '#eee'],
		style: `
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate3d(-50%, -50%, 0);
		`
	});

	//paint spectrum at the top
	let el = document.body.appendChild(document.createElement('div'));
	el.style.cssText = `
		position: absolute;
		top: 0;
		height: 10vh;
		left: 0;
		right: 0;
		z-index: 1;
	`;
	let steps = [];
	let w = 128;
	for (let f = .5; f < w; f++) {
		let array = Array(w).fill(0);
		array[Math.floor(f)] = 1;
		let color = toColor(array);
		steps.push(`${color} ${100*f/w}%`);
	}
	let bg = `linear-gradient(to right, ${steps})`;
	el.style.background = bg;
}



//tests part