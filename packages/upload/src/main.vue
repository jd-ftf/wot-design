<script>
import { upload } from './utils'
import context from '../../../src/utils/id'
import { isEqual } from '../../../src/utils/index'
import WdLoading from 'wot-design/packages/loading'

function noop () { }

export default {
  name: 'WdUpload',

  data () {
    return {
      uploadFiles: [],
      reqs: {}
    }
  },

  model: {
    prop: 'fileList'
  },

  components: {
    WdLoading
  },

  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default () {
        return {}
      }
    },
    withCredentials: Boolean,
    fileList: Array,
    showName: Boolean,
    accept: {
      type: String,
      default: 'image/*'
    },
    loadingType: {
      type: String,
      default: 'circular-ring'
    },
    loadingSize: {
      type: String,
      default: '24px'
    },
    loadingColor: {
      type: String,
      default: '#ffffff'
    },
    maxSize: {
      type: Number,
      default: Number.MAX_VALUE
    },
    customEnvokeClass: String,
    multiple: Boolean,
    reverse: Boolean,
    limit: Number,
    disabled: Boolean,
    // 文件上传之前
    beforeUpload: Function,
    // 文件移除前的钩子
    beforeRemove: Function,
    // 预览前的钩子
    beforePreview: Function,
    // 个数超出限制的钩子
    onExceed: Function,
    // 文件移除时的钩子
    onRemove: {
      type: Function,
      default: noop
    },
    // 文件上传成功时的钩子
    onSuccess: {
      type: Function,
      default: noop
    },
    // 文件上传时的钩子
    onProgress: {
      type: Function,
      default: noop
    },
    // 文件上传失败时的钩子
    onError: {
      type: Function,
      default: noop
    }
  },

  watch: {
    fileList: {
      immediate: true,
      handler (fileList) {
        if (isEqual(fileList, this.uploadFiles)) return
        this.uploadFiles = fileList.map(item => {
          item.uid = context.id++
          item.status = item.status || 'success'
          item.size = item.size || ''
          item.action = this.action || ''
          return item
        })
      }
    }
  },

  methods: {
    /**
     * @description 拼接上传的图片列表，向服务器发送数据
     * @param {Object} files 新上传的文件列表
     */
    readyToPost (files) {
      let postFiles = Array.prototype.slice.call(files)
      // 单选只有一个
      if (!this.multiple) { postFiles = postFiles.slice(0, 1) }
      postFiles.forEach(file => {
        // 设置files内容初始值
        const initState = {
          uid: context.id++,
          status: 'loading',
          name: file.name,
          size: file.size,
          file,
          action: this.action,
          percent: 0
        }
        // 检查文件尺寸是否大于最大尺寸
        if (file.size <= this.maxSize) {
          this.uploadFiles.push(initState)
          this.$emit('input', this.uploadFiles)
          this.post(initState)
        } else {
          // 自定义超出尺寸行为
          this.$emit('oversize', file)
        }
      })
    },

    /**
     * @description 上传数据发送
     * @param {Object} showFile 发送的文件
     */
    post (showFile) {
      const options = {
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: showFile.file,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.handleProgress(e, showFile)
        },
        onSuccess: res => {
          this.handleSuccess(res, showFile)
        },
        onError: err => {
          this.handleError(err, showFile)
        }
      }
      // 清空当前input上传内容，使其可以重复上传相同的图片而不被拦截
      this.$refs.input.value = null
      // 开始执行上传图片请求
      upload(options)
    },

    /**
     * @description 根据当前上传文件的 uid 返回数组单项的引用
     * @param {Object} file 上传的文件
     * @return {Object} 当前文件在数组中的引用
     */
    getFileFromList (file) {
      let fileList = this.uploadFiles
      let target
      fileList.every(item => {
        // item 尺寸为空下载一遍
        target = file.uid === item.uid ? item : null
        return !target
      })
      return target
    },

    handleChange ({ target: { files } }) {
      // 检查是否是图片
      if (!files || this.disabled) return
      // 检查上传数量是否超过限制数
      if (this.limit && (this.uploadFiles.length + files.length > this.limit)) {
        this.onExceed && this.onExceed(files, this.uploadFiles)
        return
      }
      // 上传前钩子
      if (this.beforeUpload) {
        this.beforeUpload(files, isPass => {
          isPass && this.readyToPost(files)
        })
      } else {
        this.readyToPost(files)
      }
    },

    // 实时更新当前option的数据
    handleSuccess (res, rawFile) {
      const file = this.getFileFromList(rawFile)
      if (file) {
        file.url = URL.createObjectURL(rawFile.file)
        file.status = 'success'
        file.response = res
        this.onSuccess(res, file, this.uploadFiles)
      }
    },

    handleError (res, rawFile) {
      const file = this.getFileFromList(rawFile)
      if (file) {
        file.error = res.message
        file.status = 'fail'
        file.response = res
        this.onError(res, file, this.uploadFiles)
      }
    },

    handleProgress (e, rawFile) {
      const file = this.getFileFromList(rawFile)
      if (file) {
        file.percent = e.percent
        this.onProgress(e, file)
      }
    },

    handleRemove (file) {
      this.uploadFiles.splice(this.uploadFiles.findIndex(item => item === file), 1)
      this.$emit('input', this.uploadFiles)
      this.onRemove(file)
    },

    handlePreview (file) {
      // 调用图片预览组件
    },

    removeFile (file) {
      if (this.beforeRemove) {
        this.beforeRemove(file, isPass => {
          isPass && this.handleRemove(file)
        })
      } else {
        this.handleRemove(file)
      }
    },

    preview (file) {
      if (this.beforePreview) {
        this.beforePreview(file, isPass => {
          isPass && this.handlePreview(file)
        })
      } else {
        this.handlePreview(file)
      }
    }
  },

  render (h) {
    const {
      limit,
      reverse,
      uploadFiles,
      disabled,
      multiple,
      accept,
      loadingType,
      loadingColor,
      loadingSize,
      showName,
      customEnvokeClass } = this

    const input = (
      <input
        ref="input"
        type="file"
        multiple={multiple}
        accept={accept}
        disabled={disabled}
        class="wd-upload__input"
        onChange={this.handleChange} />
    )
    // 限制数量时，展示上传文件个数
    const envokeLimitNum = limit
      ? <div class="wd-upload__evoke-num">（{uploadFiles.length}/{limit}）</div>
      : ''
    // 唤起项div
    const envoke = !limit || (uploadFiles.length < limit)
      ? (
        <div
          class={[
            'wd-upload__evoke',
            disabled ? 'is-disabled' : '',
            this.$slots.default ? 'is-slot-default' : '',
            customEnvokeClass]}>
          {this.$slots.default || <i class="wd-icon-camera"></i>}
          {this.$slots.default ? '' : envokeLimitNum}
          {input}
        </div>
      ) : ''

    // loading 组件
    const loading = (
      <wd-loading
        type={loadingType}
        size={loadingSize}
        color={loadingColor}></wd-loading>
    )

    // 图片预览的列表
    const previewList = uploadFiles.length !== 0 ? uploadFiles.map((file, index) => {
      // 加载中、失败状态下的样式
      const statusDiv = file.status === 'loading' ? (
        <div class="wd-upload__status-content">
          {loading}
          <span class="wd-upload__progress-txt">{file.percent}%</span>
        </div>
      ) : file.status === 'fail' ? (
        <div class="wd-upload__status-content">
          <i class="wd-icon-close-outline wd-upload__icon"></i>
          <span class="wd-upload__progress-txt">{file.error || '上传失败'}</span>
        </div>
      ) : ''

      // 成功时展示成功的标签，上传的蒙层在状态为加载中和失败时才会展示
      const previewDiv = file.status === 'success' ? (
        <div
          class="wd-upload__status-content"
          onClick={() => {
            this.preview(file)
          }}>
          <img src={file.url} class="wd-upload__picture" />
          {showName ? <div class="wd-upload__picture-name">{file.name || '图片名'}</div> : ''}
        </div>
      ) : (<div class="wd-upload__mask wd-upload__status-content">{statusDiv}</div>)

      // 右上角关闭按钮
      const closeButton = file.status === 'loading' ? '' : (
        <i
          class="wd-icon-error-fill wd-upload__close"
          onClick={() => {
            this.removeFile(file, index)
          }}></i>
      )

      return (
        <div class="wd-upload__preview">
          {previewDiv}
          {closeButton}
        </div>
      )
    }) : ''

    const upload = reverse ? (
      <div class='wd-upload'>{envoke}{previewList}</div>
    ) : (<div class='wd-upload'>{previewList}{envoke}</div>)
    return upload
  }
}
</script>
