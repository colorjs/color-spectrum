const toColor = require('./');
const assert = require('assert');
const Panel = require('settings-panel');
const isBrowser = require('is-browser');
require('enable-mobile');


if (isBrowser) {
	let panel = Panel({
		spectrum: {
			type: 'textarea',
			value: '1,0,0,0,0,0,0,0',
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
			bottom: 0;
			right: 0;
		`
	});
}