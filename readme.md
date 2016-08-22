# color-spectrum [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Convert spectrum or wavelength to color.

[![color-spectrum](https://raw.githubusercontent.com/dfcreative/color-spectrum/gh-pages/preview.png "color-spectrum")](http://dfcreative.github.io/color-spectrum/)

## Usage

[![npm install color-spectrum](https://nodei.co/npm/color-spectrum.png?mini=true)](https://npmjs.org/package/color-spectrum/)

```js
const toColor = require('color-spectrum');
const fft = require('fourier-transform');

let magnitudes = fft(myData);
document.body.style.background = toColor(magnitudes);
```

## API

<details><summary>**`const spectrumColor = require('color-spectrum');`**</summary>

Get spectrum to color converter.

`require('color-spectrum/table')` to get a table of wavelength to XYZ values.

`require('color-spectrum/approx')` to get approximator of wavelength to XYZ values.

</details>
<details><summary>**`let color = spectrumColor(list|number, options?);`**</summary>

Calculate color based off spectrum or a single wavelength value. Spectrum is a list of float values, like magnitudes or intensities, for example, a direct output from [fourier-transform](https://github.com/scijs/fourier-transform) with real numbers. The visible range `380..780nm` will be stretched to cover the passed list of intensities.

Possible options:

```js
// Use approximation formulas or matching table interpolation
approximate: false,

// Normalize spectrum
normalize: true,

// Reference whitepoint with x,y,z values
white: xyz.whitepoint[2].D65
```

You can also use technical methods:

```js
//get xyz values array for a given wavelength from 380..780 range. Use 1/λ to calc frequency.
[x, y, z] = spectrumColor.wavelength(λ, opts?);

//get xyz values for a list of magnitudes
[x, y, z] = spectrumColor.spectrum(list, opts);

//you would like to transform to rgb
let xyz = require('color-space/xyz');
let [r, g, b] = xyz.rgb(x, y, z);
```

</details>

## References

> [Rendering of Spectra](https://www.fourmilab.ch/documents/specrend/)<br/>
> [Wavelength to color](https://academo.org/demos/wavelength-to-colour-relationship/)<br/>
> [Color science](http://www.midnightkite.com/color.html)<br/>
> [Analytical Approximation of Color Matching Functions](http://jcgt.org/published/0002/02/01/paper.pdf)

## Credits

Thanks to all the color scientists, who devoted their lives to color research and delivered their knowledge to us, for we can trust them and use their formulas and their code. Seriously, this package is just a complement to their work in js/npm format, no new scientific knowledge, just science a bit closer to practice.

## In the wild

> [gl-waveform](https://github.com/audio-lab/gl-waveform) — color-spectrum used to paint waveform color based of spectral contents.

## Related

> [color-space](https://github.com/scijs/color-space) — color space conversions.<br/>
> [color-interpolate](https://github.com/dfcreative/color-interpolate) — interpolate color between values.<br/>