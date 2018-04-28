export function GenerateRandomRGBArr(){
  return [Math.floor(Math.random()*205 + 50),Math.floor(Math.random()*205 + 50),Math.floor(Math.random()*205 + 50)];
}

export function rgb2hex(red, green, blue) {
  var rgb = blue | (green << 8) | (red << 16);
  return '#' + (0x1000000 + rgb).toString(16).slice(1)
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}

export function GenerateRandomHexArr(){
  let [r0,g0,b0] = GenerateRandomRGBArr();
  let [r1,g1,b1] = GenerateRandomRGBArr();
  let hexColor0 = rgb2hex(r0,g0,b0);
  let hexColor1 = rgb2hex(r1,g1,b1);
  return [hexColor0, hexColor1];
}
