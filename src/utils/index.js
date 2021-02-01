import Vue from 'vue'

export const isServer = Vue.prototype.$isServer

/**
 * judge if the browser is support sticky
 */
export const isSupportSticky = function () {
  let div = document.createElement('div')
  let style = 'display: none; position: -webkit-sticky; position: sticky'
  div.style.cssText = style
  let body = document.body
  body.appendChild(div)
  let isSupport = /sticky/i.test(window.getComputedStyle(div).position)
  body.removeChild(div)
  div = null

  return isSupport
}

/**
 * get the overscroll parentNode
 * @param {*} element current node
 * @param {*} rootElement root node
 */
export const getScrollTargetEvent = function (element, rootElement = window) {
  let currentNode = element

  while (currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode !== rootElement &&
    currentNode.nodeType === 1) {
    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY
    if (overflowY === 'auto' || overflowY === 'scroll') {
      return currentNode
    }

    currentNode = currentNode.parentNode
  }

  return rootElement
}

export const padZero = (number, length = 2) => {
  number = number + ''

  while (number.length < length) {
    number = '0' + number
  }

  return number
}

export const range = (value, min, max) => {
  return Math.min(Math.max(value, min), max)
}

/** @description 比较数值是否相等 */
export const isEqual = (value1, value2) => {
  if (value1 === value2) return true
  if (!(value1 instanceof Array)) return false
  if (!(value2 instanceof Array)) return false
  if (value1.length !== value2.length) return false
  for (let i = 0; i !== value1.length; ++i) {
    if (value1[i] !== value2[i]) return false
  }
  return true
}

export const bus = new Vue()

/**
 * @description 获取目标原始类型
 * @param target 任意类型
 * @returns {string} type 数据类型
 */
export function getType (target) {
  // 得到原生类型
  const typeStr = Object.prototype.toString.call(target)
  // 拿到类型值
  const type = typeStr.match(/\[object (\w+)\]/)[1]
  // 类型值转小写并返回
  return type.toLowerCase()
}
