function rgbToHex (r, g, b) {
  const hex = ((r << 16) | (g << 8) | b).toString(16)
  return '#' + new Array(Math.abs(hex.length - 7)).join('0') + hex
}

function hexToRgb (hex) {
  const rgb = []
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt('0x' + hex.slice(i, i + 2)))
  }
  return rgb
}

function gradient (startColor, endColor, step) {
  // 将hex转换为rgb
  const sColor = hexToRgb(startColor)
  const eColor = hexToRgb(endColor)

  // 计算R\G\B每一步的差值
  const rStep = (eColor[0] - sColor[0]) / step
  const gStep = (eColor[1] - sColor[1]) / step
  const bStep = (eColor[2] - sColor[2]) / step

  const gradientColorArr = []
  for (let i = 0; i < step; i++) {
    // 计算每一步的hex值
    gradientColorArr.push(rgbToHex(parseInt(rStep * i + sColor[0]), parseInt(gStep * i + sColor[1]), parseInt(bStep * i + sColor[2])))
  }
  return gradientColorArr
}

export default gradient
