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

export const bus = new Vue()
