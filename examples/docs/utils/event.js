const eventQueueMap = {} // 监听事件回调函数队列

/**
 * 监听 message 某个事件类型
 * @param {String} eventName 监听的事件名
 * @param {Function} handler 绑定函数
 */
function on (eventName, options, handler) {
  if (!eventQueueMap[eventName]) {
    eventQueueMap[eventName] = {
      handlers: []
    }
  }

  const optionsType = Object.prototype.toString.call(options)
  if (optionsType === '[object Function]') {
    handler = options;
  } else if (optionsType === '[object Object]' && options.immediate) {
    handler(eventQueueMap[eventName].options)
  }

  if (eventQueueMap[eventName].handlers.indexOf(handler) === -1) {
    eventQueueMap[eventName].handlers.push(handler)
  }
}

function once (eventName, handler) {
  if (!eventQueueMap[eventName]) {
    eventQueueMap[eventName] = {
      handlers: []
    }
  }

  if (eventQueueMap[eventName].handlers.indexOf(handler) === -1) {
    const onceHandler = options => {
      handler(options)
      off(eventName, onceHandler)
    }
    eventQueueMap[eventName].handlers.push(onceHandler)
  }
}

/**
 * 移除事件监听
 * @param {String} eventName 事件名
 * @param {Function} handler 绑定函数
 */
function off (eventName, handler) {
  if (eventQueueMap[eventName]) {
    let index = eventQueueMap[eventName].handlers.indexOf(handler)
    index > -1 && eventQueueMap[eventName].handlers.splice(index, 1)
  }
}

/**
 * 触发某个事件
 * @param {String} eventName 触发的事件名
 * @param {Object} data 参数
 */
const trigger = (eventName, options) => {
  if (eventQueueMap[eventName]) {
    eventQueueMap[eventName].handlers.forEach(fn => {
      fn(options)
    })
  } else {
    eventQueueMap[eventName] = {
      options,
      handlers: []
    }
  }
}

export {
  on,
  off,
  once,
  trigger
}
