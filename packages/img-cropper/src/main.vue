<template>
  <div
    v-if="show"
    class="wd-img-cropper"
    :style="{ width: rootWidth, height: rootHeight }"
    ref="cropper"
  >
    <!-- 展示在用户面前的裁剪框 -->
    <div class="wd-img-cropper__wrapper">
      <!-- 画出裁剪框 -->
      <div class="wd-img-cropper__cut">
        <!-- 上方阴影块 -->
        <div
          :class="[
            { 'wd-img-cropper__cut--top': true },
            { 'is-hightlight': !IS_TOUCH_END },
          ]"
          :style="{ height: `${cutTop}px` }"
        ></div>
        <div class="wd-img-cropper__cut--middle">
          <!-- 左侧阴影块 -->
          <div
            :class="[
              { 'wd-img-cropper__cut--left': true },
              { 'is-hightlight': !IS_TOUCH_END },
            ]"
            :style="{ width: `${cutLeft}px`, height: `${cutWidth}px` }"
          ></div>
          <!-- 裁剪框 -->
          <div
            class="wd-img-cropper__cut--body"
            :style="{ width: `${cutWidth}px`, height: `${cutHeight}px` }"
          >
            <!-- 内部网格线 -->
            <div class="is-gridlines-x"></div>
            <div class="is-gridlines-y"></div>
            <!-- 裁剪窗体四个对角 -->
            <div class="is-left-top"></div>
            <div class="is-left-bottom"></div>
            <div class="is-right-top"></div>
            <div class="is-right-bottom"></div>
          </div>
          <!-- 右侧阴影块 -->
          <div
            :class="[
              { 'wd-img-cropper__cut--right': true },
              { 'is-hightlight': !IS_TOUCH_END },
            ]"
          ></div>
        </div>

        <!-- 底部阴影块 -->
        <div
          :class="[
            { 'wd-img-cropper__cut--bottom': true },
            { 'is-hightlight': !IS_TOUCH_END },
          ]"
        ></div>
      </div>
      <!-- 展示的传过来的图片: 控制图片的旋转角度(rotate)、缩放程度(imgScale)、移动位置(translate) -->
      <img
        id="wd-cropper-img"
        class="wd-img-cropper__img"
        :src="imgSrc"
        :style="{
          width: picWidth ? picWidth + 'px' : 'auto',
          height: picHeight ? picHeight + 'px' : 'auto',
          transform: `translate3d(${imgLeft - picWidth / 2}px, ${
            imgTop - picHeight / 2
          }px, 0) scale(${imgScale}) rotate(${imgAngle}deg)`,
          'transition-duration': `${isAnimation ? 0.3 : 0}s`,
        }"
        @touchstart="handleImgTouchStart"
        @touchmove="handleImgTouchMove"
        @touchend="handleImgTouchEnd"
      />
    </div>
    <!-- 绘制的图片canvas -->
    <canvas
      ref="canvas"
      class="wd-img-cropper__canvas"
      disable-scroll="true"
      :width="canvasWidth * exportScale"
      :height="canvasHeight * exportScale"
    />
    <!-- 下方按钮 -->
    <div class="wd-img-cropper__footer">
      <i
        v-if="!disabledRotate"
        class="wd-icon-rotate wd-img-cropper__footer--rotate"
        @click="handleRotate"
      ></i>

      <div class="wd-img-cropper__footer--button">
        <div class="is-cancel" @click="handleCancel">
          {{ cancelButtonText || t('wd.imgCropper.cancel') }}
        </div>
        <wd-button size="small" class="is-confirm" @click="handleConfirm">
          {{ confirmButtonText || t('wd.imgCropper.confirm') }}
        </wd-button>
      </div>
    </div>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'
import WdButton from 'wot-design/packages/button'

// 延时动画设置
let CHANGE_TIME = null
// 移动节流
let MOVE_THROTTLE = null
// 节流标志
let MOVE_THROTTLE_FLAG = true
// 图片设置尺寸,此值不变（记录最初设定的尺寸）
let INIT_IMGWIDTH = null
// 图片设置尺寸,此值不变（记录最初设定的尺寸）
let INIT_IMGHEIGHT = null
let DISTANCE_LEFT = 0
let DISTANCE_TOP = 0
// 顶部裁剪框占比
const TOP_PERCENT = 0.85

export default {
  name: 'WdImgCropper',

  mixins: [locale],

  components: {
    WdButton
  },

  data () {
    return {
      rootWidth: window.screen.width,
      rootHeight: window.screen.height,
      picWidth: this.imgWidth,
      picHeight: this.imgHeight,
      isAnimation: false,
      imgAngle: 0,
      show: false,
      // 裁剪框的宽高
      cutWidth: 0,
      cutHeight: 0,
      cutScale: 2,
      offset: 20,
      // 裁剪框的距顶距左
      cutLeft: 0,
      cutTop: 0,
      // canvas最终成像宽高
      canvasWidth: '',
      canvasHeight: '',
      canvasScale: 2,
      // 当前缩放大小
      imgScale: 1,
      // 图片中心轴点距左的距离
      imgLeft: window.screen.availWidth / 2,
      imgTop: (window.screen.availHeight / 2) * TOP_PERCENT,
      // 是否移动中设置 同时控制背景颜色是否高亮
      IS_TOUCH_END: true,
      // 记录移动中的双指位置 [0][1]分别代表两根手指 [1]做待用参数
      movingPosRecord: [
        {
          x: '',
          y: ''
        },
        {
          x: '',
          y: ''
        }
      ],
      // 双指缩放时 两个坐标点斜边长度
      fingerDistance: ''
    }
  },

  props: {
    value: Boolean,
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    confirmButtonText: {
      type: String,
      default: '完成'
    },
    // 是否禁用旋转
    disabledRotate: Boolean,
    // 图片源路径
    imgSrc: {
      type: String,
      default: ''
    },
    // 图片宽
    imgWidth: {
      type: null,
      default: null
    },
    // 图片高
    imgHeight: {
      type: null,
      default: null
    },
    // 最大缩放
    maxScale: {
      type: Number,
      default: 3
    },
    // 输出倍数
    exportScale: {
      type: Number,
      default: 2
    },
    /** canvas绘图参数 start **/
    // canvasToTempFilePath —— fileType
    fileType: {
      type: String,
      value: 'image/png'
    },
    // canvasToTempFilePath —— quality
    quality: {
      type: Number,
      value: 1
    },
    // 最大缩放
    type: {
      type: String,
      default: 'png'
    }
  },

  watch: {
    value: {
      handler (val) {
        if (val !== undefined) {
          this.show = val
        }
      },
      immediate: true
    },

    show: {
      handler (val) {
        if (val) {
          this.open()
        }
      },
      immediate: true
    },

    imgSrc: {
      handler (val) {
        val && this.loadImg()
      },
      immediate: true
    },

    imgAngle (val) {
      if (val % 90) {
        this.imgAngle = Math.round(val / 90) * 90
      }
    },

    isAnimation (val) {
      // 开启过渡300毫秒之后自动关闭
      clearTimeout(CHANGE_TIME)
      if (val) {
        CHANGE_TIME = setTimeout(() => {
          this.isAnimation = false
        }, 300)
      }
    }
  },

  methods: {
    /**
     * @description 打开图片裁剪窗口
     */
    open () {
      this.$nextTick(() => {
        this.resize()

        INIT_IMGWIDTH = this.picWidth
        INIT_IMGHEIGHT = this.picHeight
        const cutSize = this.rootWidth - this.offset * 2
        this.cutWidth = cutSize
        this.cutHeight = cutSize
        this.cutTop = (this.rootHeight * TOP_PERCENT - cutSize) / 2
        this.cutLeft = this.offset
        this.canvasScale = this.exportScale
        this.canvasHeight = cutSize
        this.canvasWidth = cutSize

        // 根据开发者设置的图片目标尺寸计算实际尺寸
        this.initImageSize()
        // 初始化canvas
        this.initCanvas()
        // 加载图片
        this.imgSrc && this.loadImg()
      })
    },

    /**
     * @description 对外暴露：控制旋转角度
     * @param {Number} angle 角度
     */
    setRoate (angle) {
      if (!angle || this.disabledRotate) return
      this.isAnimation = true
      this.imgAngle = angle
      // 设置旋转后需要判定旋转后宽高是否不符合贴边的标准
      this.detectImgPosIsEdge()
    },

    resize () {
      const rect = this.$refs.cropper.getBoundingClientRect()
      this.rootWidth = rect.width
      this.rootHeight = rect.height
    },

    /**
     * @description 对外暴露：初始化图片的大小和角度以及距离
     */
    resetImg () {
      this.imgScale = 1
      this.imgAngle = 0
      this.imgLeft = this.rootWidth / 2
      this.imgTop = this.rootHeight / 2 * TOP_PERCENT
    },

    /**
     * @description 加载图片资源文件，并初始化裁剪框内图片信息
     */
    loadImg () {
      if (!this.imgSrc) return
      let image = new Image()
      image.onload = () => {
        this.imgInfo = {
          width: image.width,
          height: image.height
        }
        this.computeImgSize()
        this.resetImg()
      }
      image.src = this.imgSrc
    },

    /**
     * @description 设置图片尺寸，使其有一边小于裁剪框尺寸
     * 1、图片宽或高 小于裁剪框，自动放大至一边与高平齐
     * 2、图片宽或高 大于裁剪框，自动缩小至一边与高平齐
     */
    computeImgSize () {
      let {
        picWidth,
        picHeight,
        imgInfo,
        cutWidth,
        cutHeight
      } = this
      if (!INIT_IMGHEIGHT && !INIT_IMGWIDTH) {
        // 没有设置宽高，写入图片的真实宽高
        picWidth = imgInfo.width
        picHeight = imgInfo.height
        /**
         * 设 a = picWidth; b = picHeight; x = cutWidth; y = cutHeight
         * 共有三种宽高比：1、a/b > x/y 2、a/b < x/y 3、a/b = x/y
         * 1、已知 b = y => a = a/b*y
         * 2、已知 a = x => b = b/a*x
         * 3、可用上方任意公式
         */
        if (picWidth / picHeight > cutWidth / cutHeight) {
          picHeight = cutHeight
          picWidth = imgInfo.width / imgInfo.height * cutHeight
        } else {
          picWidth = cutWidth
          picHeight = imgInfo.height / imgInfo.width * cutWidth
        }
      } else if (INIT_IMGHEIGHT && !INIT_IMGWIDTH) {
        picWidth = imgInfo.width / imgInfo.height * INIT_IMGHEIGHT
      } else if (!INIT_IMGHEIGHT && INIT_IMGWIDTH) {
        picHeight = imgInfo.height / imgInfo.width * INIT_IMGWIDTH
      }

      this.picWidth = picWidth
      this.picHeight = picHeight
    },

    /**
     * @description canvas 初始化
     */
    initCanvas () {
      this.ctx = null
      this.canvas = null
      if (!this.ctx) {
        this.$nextTick(() => {
          this.canvas = this.$refs.canvas
          this.ctx = this.canvas.getContext('2d')
        })
      }
    },

    /**
     * @description 图片初始化,处理宽高特殊单位
     */
    initImageSize () {
      // 处理宽高特殊单位 %>px
      if (INIT_IMGWIDTH && typeof INIT_IMGWIDTH === 'string' && INIT_IMGWIDTH.indexOf('%') !== -1) {
        const width = INIT_IMGWIDTH.replace('%', '')
        INIT_IMGWIDTH = this.picWidth = this.rootWidth / 100 * width
      }
      if (INIT_IMGHEIGHT && typeof INIT_IMGHEIGHT === 'string' && INIT_IMGHEIGHT.indexOf('%') !== -1) {
        const height = this.picHeight.replace('%', '')
        INIT_IMGHEIGHT = this.picHeight = this.rootHeight / 100 * height
      }
    },

    /**
     * @description 图片拖动边缘检测：检测移动或缩放时 是否触碰到图片边缘位置
     */
    detectImgPosIsEdge (scale) {
      const {
        cutLeft,
        cutTop,
        cutWidth,
        cutHeight,
        imgAngle
      } = this
      const imgScale = scale || this.imgScale
      let { picWidth, picHeight } = this
      // 翻转后宽高切换
      if (imgAngle / 90 % 2) {
        picWidth = this.picHeight
        picHeight = this.picWidth
      }
      // 左
      let imgLeft = picWidth * imgScale / 2 + cutLeft >= DISTANCE_LEFT ? DISTANCE_LEFT : picWidth * imgScale / 2 + cutLeft
      // 右
      imgLeft = cutLeft + cutWidth - picWidth * imgScale / 2 <= imgLeft ? imgLeft : cutLeft + cutWidth - picWidth * imgScale / 2
      // 上
      let imgTop = picHeight * imgScale / 2 + cutTop >= DISTANCE_TOP ? DISTANCE_TOP : picHeight * imgScale / 2 + cutTop
      // 下
      imgTop = cutTop + cutHeight - picHeight * imgScale / 2 <= imgTop ? imgTop : cutTop + cutHeight - picHeight * imgScale / 2

      this.imgLeft = imgLeft
      this.imgTop = imgTop
      this.imgScale = imgScale
    },

    /**
     * @description 缩放边缘检测：检测移动或缩放时 是否触碰到图片边缘位置
     */
    detectImgScaleIsEdge () {
      const { cutHeight, cutWidth, imgAngle } = this
      let { picWidth, picHeight, imgScale } = this
      // 翻转后宽高切换
      if (imgAngle / 90 % 2) {
        picWidth = this.picHeight
        picHeight = this.picWidth
      }
      if (picWidth * imgScale < cutWidth) {
        imgScale = cutWidth / picWidth
      }
      if (picHeight * imgScale < cutHeight) {
        imgScale = cutHeight / picHeight
      }
      this.detectImgPosIsEdge(imgScale)
    },

    /**
     * @description 节流
     */
    throttle () {
      if (/(Android)/i.test(navigator.userAgent)) {
        clearTimeout(MOVE_THROTTLE)
        MOVE_THROTTLE = setTimeout(() => {
          MOVE_THROTTLE_FLAG = true
        }, 1000 / 40)
      } else {
        !MOVE_THROTTLE_FLAG && (MOVE_THROTTLE_FLAG = true)
      }
    },

    /**
     * @description {图片区} 开始拖动
     */
    handleImgTouchStart (event) {
      // 如果处于在拖动中，背景为淡色展示全部，拖动结束则为 0.85 透明度
      this.IS_TOUCH_END = false
      if (event.touches.length === 1) {
        // 单指拖动
        this.movingPosRecord[0] = {
          x: (event.touches[0].clientX - this.imgLeft),
          y: (event.touches[0].clientY - this.imgTop)
        }
      } else {
        // 以两指为坐标点 做直角三角形 a2 + b2 = c2
        const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX)
        const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY)
        this.fingerDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
      }
    },

    /**
     * @description {图片区} 拖动中
     */
    handleImgTouchMove (event) {
      if (this.IS_TOUCH_END || !MOVE_THROTTLE_FLAG) return
      // 节流
      this.throttle()
      if (event.touches.length === 1) {
        // 单指拖动
        const { x, y } = this.movingPosRecord[0]
        const left = event.touches[0].clientX - x
        const top = event.touches[0].clientY - y
        DISTANCE_LEFT = left
        DISTANCE_TOP = top
        this.detectImgPosIsEdge()
      } else {
        // 以两指为坐标点 做直角三角形 a2 + b2 = c2
        const width = Math.abs(event.touches[1].clientX - event.touches[0].clientX)
        const height = Math.abs(event.touches[1].clientY - event.touches[0].clientY)
        const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
        const scale = this.imgScale * (hypotenuse / this.fingerDistance)
        this.imgScale = Math.min(scale, this.maxScale)
        this.detectImgScaleIsEdge()
        this.fingerDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
      }
      event.preventDefault()
    },

    /**
     * @description {图片区} 拖动结束
     */
    handleImgTouchEnd () {
      this.IS_TOUCH_END = true
    },

    /**
     * @description 旋转图片
     */
    handleRotate () {
      this.setRoate(this.imgAngle - 90)
    },

    /**
     * @description 取消裁剪图片
     */
    handleCancel () {
      this.$emit('cancel')
      this.$emit('input', false)
    },

    /**
     * @description 完成裁剪
     */
    handleConfirm (event) {
      this.draw()
    },

    base64ToBlob ({ source = '', contentType = 'image/png', sliceSize = 512 } = {}) {
      return new Promise((resolve, reject) => {
        // 使用 atob() 方法将数据解码
        let byteCharacters = atob(source)
        let byteArrays = []
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          let slice = byteCharacters.slice(offset, offset + sliceSize)
          let byteNumbers = []
          for (let i = 0; i < slice.length; i++) {
            byteNumbers.push(slice.charCodeAt(i))
          }
          // 8 位无符号整数值的类型化数组。内容将初始化为 0。
          // 如果无法分配请求数目的字节，则将引发异常。
          byteArrays.push(new Uint8Array(byteNumbers))
        }
        let result = new Blob(byteArrays, {
          type: contentType
        })
        result = Object.assign(result, {
          preview: URL.createObjectURL(result)
        })
        resolve(result)
      })
    },

    /**
     * @description canvas绘制，用canvas模拟裁剪框 对根据图片当前的裁剪信息进行模拟
     */
    draw () {
      if (!this.imgSrc) return
      const {
        imgSrc,
        picWidth,
        picHeight,
        imgLeft,
        imgTop,
        imgScale,
        imgAngle,
        cutLeft,
        cutTop,
        cutHeight,
        cutWidth,
        cutScale,
        disabledRotate
      } = this
      const draw = () => {
        // 图片真实大小
        const width = picWidth * imgScale * cutScale
        const height = picHeight * imgScale * cutScale
        // 取裁剪框和图片的交集
        const x = imgLeft - cutLeft
        const y = imgTop - cutTop
        const image = document.createElement('img')
        image.src = imgSrc
        image.onload = () => {
          this.ctx.translate(x * cutScale, y * cutScale)
          // 设置 旋转角度
          if (!disabledRotate) {
            this.ctx.rotate(imgAngle * Math.PI / 180)
          }
          this.ctx.drawImage(image, -width / 2, -height / 2, width, height)
          // 生成图片
          let output = document.createElement('img')
          let src = this.canvas.toDataURL(this.fileType, this.quality)
          src = src.split(',')[1]
          src = this.base64ToBlob({ source: src, contentType: this.fileType }).then((result) => {
            src = result.preview
            output.src = src
            output.onload = (e) => {
              this.$emit('confirm', {
                url: src,
                width: cutWidth * cutScale,
                height: cutHeight * cutScale
              })
              this.$emit('input', false)
            }
          })
        }
      }

      if (this.ctx.width !== cutWidth || this.ctx.height !== cutHeight) {
        this.canvasHeight = cutHeight
        this.canvasWidth = cutWidth
        draw()
      } else {
        draw()
      }
    },

    onPopstate () {
      this.show && this.handleCancel()
    }
  },

  created () {
    window.addEventListener('popstate', this.onPopstate)
  },

  beforeDestroy () {
    // 移除监听
    window.removeEventListener('popstate', this.onPopstate)
  }
}
</script>
