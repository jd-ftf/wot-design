
// TODO 测试颜色工具，组件升级后删除
// 计算color2的百分比
function percent (color1, color2, result) {
  // 转换成10进制
  color1 = parseInt(color1, 16)
  color2 = parseInt(color2, 16)
  result = parseInt(result, 16)
  const percent = (result - color1) / (color2 - color1)
  return percent
}
// 已知percent计算结果 percent是color2的百分比
// function color (color1, color2, percent) {
//   color1 = parseInt(color1, 16)
//   color2 = parseInt(color2, 16)
//   const result = (color2 - color1) / percent + color1
//   return result
// }

function mixColor (color1, color2, percent) {
  color1 = parseInt(color1, 16)
  color2 = parseInt(color2, 16)
  const result = color1 * percent + color2 * (1 - percent)
  return result.toString(16).toString().split('.')[0]
}

const per = percent('000000', 'ffffff', 'f2f2f2')
// const res = color('4D80F0', '668DF8', 0.8)
const resultColor = mixColor('ffffff', '000000', 0.9373320899803692)
// const resultColor1 = mixColor('ffffff', 000000  '4D80F0', 0.01111785969062061)

// function translate (color1, color2, result) {
//   const per = percent(color1, color2, result)
//   const res = mixColor(color2, color1, per)
//   return res
// }
// 6cd13a
console.log(per)
// console.log(res)
console.log(resultColor)

// console.log(translate('4D80F0', 'ffffff', '4F7CF8'))
