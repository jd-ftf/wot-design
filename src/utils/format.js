import { isDef, isNumeric } from './checkType'
export function addUnit (value) {
  if (!isDef(value)) {
    return undefined
  }
  value = String(value)
  return isNumeric(value) ? `${value}px` : value
}
