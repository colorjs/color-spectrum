# color-spectrum

Convert spectrum to color.

[![color-spectrum](https://raw.githubusercontent.com/audio-lab/color-spectrum/gh-pages/preview.png "color-spectrum")](http://audio-lab.github.io/color-spectrum/)

```js
const toColor = require('color-spectrum');
const fft = require('fourier-transform');

let magnitudes = fft(myData);
let color = toColor(magnitudes);

//convert single value
toColor(magnitudes[0]);
```

## References

> [Rendering of Spectra](https://www.fourmilab.ch/documents/specrend/)<br/>
> [Wavelength to color](https://academo.org/demos/wavelength-to-colour-relationship/)<br/>
> [Color science](http://www.midnightkite.com/color.html)

## Credits

Thanks to all the color scientists, who devoted their lives to color research and delivered their knowledge to us, for now we can trust them and use their formulas and their code. Seriously, this package is just a complement to their work in js/npm format, no new scientific knowledge from me.

## In the wild

> [gl-waveform](https://github.com/audio-lab/gl-waveform) — color-spectrum used to paint waveform color based of spectral contents.

## Related

> [color-wavelength](https://github.com/dfcreative/color-wavelength) — convert wavelength to color.<br/>
> [color-space](https://github.com/scijs/color-space) — color space conversions.<br/>
> [color-interpolate](https://github.com/dfcreative/color-interpolate) — interpolate color between values.<br/>