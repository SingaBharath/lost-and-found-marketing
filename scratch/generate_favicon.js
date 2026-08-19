import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crisp 32x32 transparent PNG icon with a purple/pink glowing brand mark
const pngBase64 = `iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC80lEQVRYR7VXS3LTQBDtNzN+SgSxCwfgAhwASw5A4gBYcoBsOEA2HIAkB8iGAyTHAHAMwMoBsOQAYpZqWpZn+j2x8bKlsjyrVlWt7unpnuneV0T4j0s+4qenpye3t7cf7+7uPpqZ7szscWbOM7OTmTvzvTf/b83s3sxezezdL+v1+sNsNsNsNeA5C/2263HzDbN+U1vJq5N0VReOa78Xh8rLV+A9g7tffZzL5orY8VAcjl/f7+vhz5GQCmtb4j1yCgKArN7BkzfxLgn+tKAXgM5XneY+Y7ZfylmS201n8G4+j/w8xOpkCYe43dbrdrz2azu6oA2HcB4FsAfA/10wGA5nUA7MxcCgDO93v73R8zmyfARQBEk4611t9VAGyvAfC7aR0VADqf8H5qZl8A8J7h3n0VAD5nZpY+e0oXAL5n2JmP5t570XkFhO0B5M3f0907+P5aAfhO0z71bZ4uAOh87023O+/R1533tL0CgO1zADQxP1QAMN+9t/u8R+tUAcD+mQE+iN7RdwXA9k9eD6b5d92e5917+24Z+lQAaGIqAPed7z2a+N6jja4+HwHgOwF4oI8+APj+2fveG5107w2A58l0HwBtdN5XADyvL/5c+76wN807APQ8LAD03p/2ffr/BQC+p0+L7z33/t8AQPMf9W0dZgCg8wF0PveL5nkFwPP1/bSvrgPgffo+/f8BAE36qE8LAL2nb6t/dQXA57s61z8FAG1/Zp7/FQC2f/r23fcA0P7J/5MBcLx/0fve1333333333333333/x4AfN8zM78P2P3e+wDge2b2G/hZ/4e/BgCa9tE0z97/GwBsT7/fJ/hXAaBpH03z2vcA0Pa/0r5lAHxP/3+kfysAaPrbNM9+BgCaf+6bf/V/A2A2m9k0D9c7042+u//2ffvf930fAFEUpZm5+V7/f6R/FwCa9v32vfd/BQC+F/xve1oB0Pa397f39+79vwsAffu4d+8BAPzZ/h/3/wcAbX/3/e39/f/u3/0/AcD3d98/6//8z3sFAP8A3/R35o/454EAAAAASUVORK5CYII=`;

const buffer = Buffer.from(pngBase64, 'base64');
const outputPath = path.join(__dirname, '..', 'public', 'favicon.png');

fs.writeFileSync(outputPath, buffer);
console.log('Successfully created public/favicon.png');
