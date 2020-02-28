export const isDef = function (val) {
  return val !== undefined && val !== null
}
export function isNumeric (val) {
  return /^\d+(\.\d+)?$/.test(val)
}
