/**
Copyright 2016-present Youzan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import { isServer } from './index'

// 高版本浏览器监听 document 的 touch 事件时 event.preventDefault 默认无效，需要手动将 passive 设置为 false
export let supportsPassive = false

if (!isServer) {
  try {
    const opts = {}
    Object.defineProperty(opts, 'passive', {
      get () {
        supportsPassive = true
      }
    })
    window.addEventListener('test-passive', null, opts)
  } catch (e) {}
}

export function on (
  target,
  event,
  handler,
  passive = false
) {
  if (!isServer) {
    target.addEventListener(
      event,
      handler,
      supportsPassive ? { capture: false, passive } : false
    )
  }
}

export function off (
  target,
  event,
  handler
) {
  if (!isServer) {
    target.removeEventListener(event, handler)
  }
}

export function stopPropagation (event) {
  event.stopPropagation()
}

export function preventDefault (event, isStopPropagation) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}
