import Vue from 'vue'
import zhCN from './lang/zh-CN'

let message = zhCN

let translate = function (...args) {
  let translate = Object.getPrototypeOf(this || Vue).$t
  if (translate && typeof translate === 'function') {
    return translate.apply(this, args)
  }
}

export function t (key, options) {
  let value = translate.apply(this, arguments)

  if (!value) {
    let keys = key.split('.')
    value = message
    while (keys.length > 0) {
      let prop = keys.shift()
      let arrayMatch = prop.match(/([^[]+)\[(\d+)\]$/)
      if (arrayMatch) {
        value = value[arrayMatch[1]][arrayMatch[2]]
      } else {
        value = value[prop]
      }

      if (!value) {
        break
      }
    }

    if (value && (options || options === 0)) {
      if (typeof options === 'number') {
        value = value.split('|')[options]
        value = value && value.trim()
      } else if (Object.prototype.toString.apply(options) === '[object Object]' ||
        Object.prototype.toString.apply(options) === '[object Array]') {
        value = value.replace(/{\s*([^}\s]*)\s*}/g, ($1, $2) => {
          return options[$2]
        })
      }
    }
  }

  return value || key
}

export function use (langMessage) {
  message = langMessage || zhCN
}

export function i18n (fn) {
  translate = fn || translate
}

export default {
  t,
  use,
  i18n
}
