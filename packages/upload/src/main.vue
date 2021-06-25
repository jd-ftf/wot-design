<script>
import { upload } from './utils'
import context from 'wot-design/src/utils/id'
import { isEqual } from 'wot-design/src/utils/index'
import WdLoading from 'wot-design/packages/loading'
import locale from 'wot-design/src/mixins/locale'

export default {
  name: 'WdUpload',

  mixins: [locale],

  data () {
    return {
      uploadFiles: []
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
    data: Object,
    name: {
      type: String,
      default: 'file'
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
      default: 'ring'
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
    customEvokeClass: String,
    multiple: Boolean,
    reverse: Boolean,
    limit: Number,
    // 是否展示限制个数
    showLimitMum: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    // 开启图片预览
    showImgPreview: {
      type: Boolean,
      default: true
    },
    // 双指缩放最小倍数
    minZoom: {
      type: Number,
      default: 1 / 3
    },
    // 双指缩放最大倍数
    maxZoom: {
      type: Number,
      default: 3
    },
    // 轮播持续时间
    swipeDuration: {
      type: Number,
      default: 500
    },
    // 是否展示页码索引
    showIndex: {
      type: Boolean,
      default: true
    },
    // 是否展示预览列表
    showPreviewList: {
      type: Boolean,
      default: true
    },
    nameKey: {
      type: String,
      default: 'name'
    },
    statusKey: {
      type: String,
      default: 'status'
    },
    // 文件上传之前
    beforeUpload: Function,
    // 文件移除前的钩子
    beforeRemove: Function,
    // 预览前的钩子
    beforePreview: Function
  },

  watch: {
    fileList: {
      immediate: true,
      handler (fileList) {
        if (isEqual(fileList, this.uploadFiles)) return
        this.uploadFiles = fileList.map(item => {
          item.uid = context.id++
          item[this.statusKey] = item[this.statusKey] || 'success'
          item.size = item.size || ''
          item.action = this.action || ''
          return item
        })
      }
    }
  },

  beforeDestroy () {
    this.fileList.forEach(file => {
      if (file.url && file.url.indexOf('blob:') === 0) {
        URL.revokeObjectURL(file.url)
      }
    })
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
          [this.statusKey]: 'loading',
          [this.nameKey]: file[this.nameKey],
          size: file.size,
          file,
          url: URL.createObjectURL(file),
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
          this.$emit('oversize', {
            file
          })
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
        this.$emit('exceed', {
          files,
          fileList: this.uploadFiles
        })
        return
      }
      // 上传前钩子
      if (this.beforeUpload) {
        this.beforeUpload({
          files,
          fileList: this.uploadFiles,
          resolve: isPass => {
            isPass && this.readyToPost(files)
            this.$refs.input.value = null
          }
        })
      } else {
        this.readyToPost(files)
        this.$refs.input.value = null
      }
    },

    // 实时更新当前option的数据
    handleSuccess (res, rawFile) {
      const file = this.getFileFromList(rawFile)
      if (file) {
        file[this.statusKey] = 'success'
        file.response = res
        this.$emit('success', {
          response: res,
          file,
          fileList: this.uploadFiles
        })
      }
    },

    handleError (err, rawFile) {
      const file = this.getFileFromList(rawFile)
      if (file) {
        file.error = err.message
        file[this.statusKey] = 'fail'
        this.$emit('fail', {
          error: err,
          file,
          fileList: this.uploadFiles
        })
      }
    },

    handleProgress (e, rawFile) {
      const file = this.getFileFromList(rawFile)
      if (file) {
        file.percent = e.percent
        this.$emit('progress', {
          event: e,
          file,
          fileList: this.uploadFiles
        })
      }
    },

    handlePreview (urls, file, index) {
      // 调用图片预览组件
      this.$preview({
        urls,
        current: index,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        showIndex: this.showIndex,
        swipeDuration: this.swipeDuration,
        onClose: ({ index }) => {
          this.$emit('preview-close', {
            index
          })
        },
        onOpen: ({ index }) => {
          this.$emit('preview-open', {
            index
          })
        },
        onLongTap: ({ index }) => {
          this.$emit('preview-long-tap', {
            index
          })
        }
      })
    },

    handleRemove (file, index) {
      this.uploadFiles.splice(index, 1)
      this.$emit('input', this.uploadFiles)
      this.$emit('remove', {
        file,
        fileList: this.uploadFiles
      })
    },

    removeFile (file, index) {
      if (this.beforeRemove) {
        this.beforeRemove({
          file,
          index,
          fileList: this.uploadFiles,
          resolve: isPass => {
            isPass && this.handleRemove(file, index)
          }
        })
      } else {
        this.handleRemove(file, index)
      }
    },

    preview (imgList, file, index) {
      if (this.beforePreview) {
        this.beforePreview({
          file,
          index,
          imgList,
          resolve: isPass => {
            isPass && this.handlePreview(imgList, file, index)
          }
        })
      } else {
        this.handlePreview(imgList, file, index)
      }
    }
  },

  render (h) {
    const {
      limit,
      showLimitMum,
      reverse,
      uploadFiles,
      disabled,
      multiple,
      accept,
      loadingType,
      loadingColor,
      loadingSize,
      showName,
      showPreviewList,
      t,
      customEvokeClass } = this

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
    const evokeLimitNum = limit && showLimitMum
      ? <div class="wd-upload__evoke-num">（{uploadFiles.length}/{limit}）</div>
      : ''

    // 唤起项div
    const evoke = !limit || (uploadFiles.length < limit)
      ? (
        <div
          key={-1}
          class={[
            'wd-upload__evoke',
            'wd-upload-list-item',
            disabled ? 'is-disabled' : '',
            this.$slots.default ? 'is-slot-default' : '',
            customEvokeClass
          ]}>
          {this.$slots.default || <i class="wd-icon-fill-camera"></i>}
          {this.$slots.default ? '' : evokeLimitNum}
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
    let imgList = []
    // 图片预览的列表
    const previewList = uploadFiles.length !== 0 ? uploadFiles.map((file, index) => {
      this.showImgPreview && imgList.push(file.url)

      // 加载中、失败状态下的样式
      const statusDiv = file[this.statusKey] === 'loading' ? (
        <div class="wd-upload__status-content">
          {loading}
          <span class="wd-upload__progress-txt">{parseInt(file.percent)}%</span>
        </div>
      ) : file[this.statusKey] === 'fail' ? (
        <div class="wd-upload__status-content">
          <i class="wd-icon-close-outline wd-upload__icon"></i>
          <span class="wd-upload__progress-txt">{file.error || t('wd.upload.error')}</span>
        </div>
      ) : ''

      const mask = file[this.statusKey] !== 'success' ? (
        <div class="wd-upload__mask wd-upload__status-content">{statusDiv}</div>
      ) : ''

      // 右上角关闭按钮
      const closeButton = (file[this.statusKey] === 'loading' || disabled) ? '' : (
        <i
          class="wd-icon-error-fill wd-upload__close"
          onClick={() => {
            this.removeFile(file, index)
          }}></i>
      )

      return (
        <div
          class="wd-upload__preview wd-upload-list-item"
          key={file.uid}>
          {mask}
          <div
            class="wd-upload__status-content"
            onClick={() => {
              this.showImgPreview && this.preview(imgList, file, index)
            }}>
            <img src={file.url} class="wd-upload__picture" />
            {showName && file[this.statusKey] === 'success' ? <div class="wd-upload__picture-name">{file[this.nameKey] || t('wd.upload.fileName')}</div> : ''}
          </div>
          {closeButton}
        </div>
      )
    }) : ''

    const transition = (front, end) => {
      return this.$slots.default
        ? (
          <div class="wd-upload">
            {front}
            <transition-group
              name="wd-upload-list"
              class="wd-upload__preview-list"
              tag="div">
              {end}
            </transition-group>
          </div>
        )
        : (
          <transition-group
            name="wd-upload-list"
            tag="div"
            class="wd-upload">
            {front}{end}
          </transition-group>
        )
    }

    const upload = showPreviewList ? (reverse ? transition(evoke, previewList) : transition(previewList, evoke)) : evoke

    return upload
  }
}
</script>
