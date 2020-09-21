// 图片类型限制
export function isImageUrl (url) {
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i

  return IMAGE_REGEXP.test(url)
}

function getBody (xhr) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

/**
 * @description 编辑报错信息
 * @param {String} action 上传服务器地址
 * @param {Object} option 上传文件的参数
 * @param {XMLHttpRequest} xhr XMLHttpRequest 实例
 * @return {Error} 报错信息
 */
function getError (action, option, xhr) {
  let msg
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`
  } else {
    msg = `fail to post ${action} ${xhr.status}`
  }

  const err = new Error(msg)
  err.status = xhr.status
  err.method = 'post'
  err.url = action
  return err
}

/**
 * @description 设置区域选择 tab 标签展示值
 * @param {Number} index 索引标志位，有三个有效值; 0(默认):上方picker索引; 1:下方picker索引;
 * @return {String} showTabLabel
 */
export function upload (option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return
  }

  const xhr = new XMLHttpRequest()
  const action = option.action

  // 进入下载状态触发
  if (xhr.upload) {
    // 计算上传进度百分比
    xhr.upload.onprogress = function progress (e) {
      if (e.total > 0) {
        // 已加载的 / 总共大小
        e.percent = e.loaded / e.total * 100
      }
      // 实时更新当前option的百分比值
      option.onProgress(e)
    }
    // 构造表单数据
    const formData = new FormData()
    // 插入表单数据
    if (option.data) {
      Object.keys(option.data).forEach(key => {
        formData.append(key, option.data[key])
      })
    }

    // 注册失败事件回调函数处理器
    xhr.onerror = function error (e) {
      if (e instanceof Event) {
        e.message = e.target.status === 0 ? 'Error' : e.target.responseText
      }
      // 失败调用展示状态
      option.onError(e)
    }
    // 上传成功
    xhr.onload = function error (e) {
      if (xhr.status < 200 || xhr.status >= 300) {
        return option.onError(getError(action, option, xhr))
      }
      // 成功后修改展示状态
      option.onSuccess(getBody(xhr))
    }

    // 创建一个post 请求 采用异步
    xhr.open('post', action, true)
    // 当前请求为跨域类型时是否在请求中协带cookie
    if (option.withCredentials && 'withCredentials' in xhr) {
      xhr.withCredentials = true
    }
    // 设置请求头
    const headers = option.headers || {}
    for (let item in headers) {
      if (headers.hasOwnProperty(item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item])
      }
    }
    // 发送数据
    xhr.send(formData)
    return xhr
  }
}
