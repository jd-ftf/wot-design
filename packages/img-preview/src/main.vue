<template>
  <transition name="wd-fade">
    <div v-if="show" class="wd-img-preview">
      <div class="wd-img-preview__wrapper">
        <!-- 轮播图列表 -->
        <wd-swipe
          ref="swipe"
          hide-indicators
          :autoplay="false"
          :stop-moving="stopSwipeMoving"
          :duration="duration"
          :initial-index="current"
          @touchstart.native="onWraperTouchStart"
          @touchmove.native="onWraperTouchMove"
          @touchend.native="onWraperTouchEnd"
          @touchcancel.native="onWraperTouchEnd"
        >
          <wd-swipe-item v-for="(url, index) in urls" :key="index">
            <!-- 页数展示 -->
            <slot name="index">
              <div v-if="showIndex" class="wd-img-preview__page">{{index + 1}} / {{urls.length}}</div>
            </slot>
            <!-- 单项图片 -->
            <div
              ref="img"
              @touchstart="onImageTouchStart(index)"
              @touchmove="onImageTouchMove"
              @touchend="onImageTouchEnd"
              class="wd-img-preview__item"
              :style="index === currentIndex ? imageStyle : null"
            >
              <img :src="url" class="wd-img-preview__picture" />
            </div>
          </wd-swipe-item>
        </wd-swipe>
      </div>
    </div>
  </transition>
</template>

<script>
import touchMixin from 'wot-design/src/mixins/touch'
import { range } from 'wot-design/src/utils/index'

const SINGLE_CLIK_TIME = 300
const DOUBLE_CLIK_INTERVAL_TIME = 300
const LONG_TAP_TIME = 600

export default {
  name: 'WdImgPreview',

  mixins: [touchMixin],

  data () {
    return {
      show: false,
      duration: 0,
      // 双指缩放的初始尺寸
      startScale: 1,
      // 图片移动横轴移动
      moveX: 0,
      // 图片移动纵轴移动
      moveY: 0,
      // 图片缩放尺寸
      scale: 1,
      // 双指缩放标志
      zooming: false,
      // 图片是否正在移动标志
      moving: false,
      // 停止轮播图拖动标志
      stopSwipeMoving: false,
      currentIndex: 0,
      // 点击次数（用来衡量是否是双击事件）
      clickTimes: 0,
      // 两次点击之间的时间间隔处理
      doubleClickTimer: null,
      initSwipeTimer: null
    }
  },

  props: {
    value: Boolean,
    urls: {
      type: Array,
      default () {
        return []
      }
    },
    // 图片预览 长按事件钩子
    onLongTap: Function,
    // 图片预览 关闭预览列表钩子
    onClose: Function,
    // 图片预览 打开预览列表钩子
    onOpen: Function,
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
    // 初始展示索引
    current: {
      type: Number,
      default: 0
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
    }
  },

  computed: {
    imageStyle () {
      const { scale } = this
      const style = {
        transitionDuration: this.zooming || this.moving ? '0s' : '.3s'
      }

      if (scale !== 1) {
        style.transform = `scale3d(${scale}, ${scale}, 1) translate(${this.moveX /
          scale}px, ${this.moveY / scale}px)`
      }

      return style
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
    }
  },

  methods: {
    /**
     * @description 关闭预览窗口
     */
    close () {
      this.show = false
      this.$emit('input', this.show)
      this.$emit('close', {
        index: this.currentIndex
      })
      clearTimeout(this.timer)
    },

    /**
     * @description 打开预览窗口
     */
    open () {
      this.reset()
      if (this.current !== 0) {
        // 初始化时将轮播滑动时间置为0，禁用跳转index动画
        this.duration = 0
      }
      this.timer = setTimeout(() => {
        this.duration = this.swipeDuration
      }, 30)

      this.$emit('open', {
        index: this.currentIndex
      })
    },

    /**
     * @description 重设参数
     */
    reset () {
      this.moveX = 0
      this.moveY = 0
      this.scale = 1
    },

    /**
     * @description 缩放设置
     */
    toggleScale () {
      const scale = this.scale > 1 ? 1 : 2

      this.scale = scale
      this.moveX = 0
      this.moveY = 0
    },

    /**
     * @description 计算两个触点间的斜向局里
     * @param {Array} touches 两个触点
     * @return {Number} distance
     */
    getDistance (touches) {
      return Math.sqrt(
        (touches[0].clientX - touches[1].clientX) ** 2 +
        (touches[0].clientY - touches[1].clientY) ** 2
      )
    },

    /**
     * @description 初始化图片位置信息，用于图片放大时 移动图片查看全图
     */
    startMove () {
      const image = event.currentTarget
      const rect = image.getBoundingClientRect()
      const winWidth = window.innerWidth
      const winHeight = window.innerHeight

      this.touchStart(event)
      this.startMoveX = this.moveX
      this.startMoveY = this.moveY
      this.maxMoveX = Math.max(0, (rect.width - winWidth) / 2)
      this.maxMoveY = Math.max(0, (rect.height - winHeight) / 2)
    },

    /**
     * @description 设置图片放大时的移动位置信息
     */
    setMoving () {
      // 图片拖动标志
      this.moving = true
      this.touchMove(event)
      const moveX = this.startMoveX + this.deltaX
      const moveY = this.startMoveY + this.deltaY
      this.moveX = range(moveX, -this.maxMoveX, this.maxMoveX)
      this.moveY = range(moveY, -this.maxMoveY, this.maxMoveY)
    },

    /**
     * @description 双指缩放初始化
     */
    startZoom () {
      // 双指缩放期间不能移动图片
      this.moving = false
      // 缩放开启
      this.zooming = true
      // 从当前尺寸开始变化
      this.startScale = this.scale
      // 获取尺寸变化的倍数
      this.startDistance = this.getDistance(event.touches)
    },

    /**
     * @description 图片拖动位置初始化，图片上处理两类事件
     * 1. 放大后 拖动图片位置
     * 2. 双指缩放处理
     * @param {Number} index 当前触摸的图片索引
     */
    onImageTouchStart (index) {
      this.moving = false
      // this.zooming = false
      if (this.current !== 0) {
        // 初始化时将轮播滑动时间置为0，禁用跳转index动画，此时放开
        this.duration = this.swipeDuration
      }
      this.currentIndex = index
      const { touches } = event

      // 图片未缩放，只有一个触点，表示当前是轮播滑动
      if (touches.length === 1 && this.scale === 1) {
        this.stopSwipeMoving = false
      } else {
        this.stopSwipeMoving = true
        // 只有一个触点 在放大的情况下，移动图片，禁止图片轮播切换
        if (touches.length === 1 && this.scale > 1) {
          this.startMove()
        }
        // // 两个触点，双指缩放开启
        // if (touches.length === 2) {
        //   this.startZoom()
        // }
      }
    },

    /**
     * @description 图片拖动位置移动位置设置
     */
    onImageTouchMove () {
      const { touches } = event
      /**
       * TODO 暂时关闭待优化双指缩放 双指缩放图片
       * 1. 获取当前两个触点之间的斜向距离
       * 2. 根据当前斜向距离与初始斜向距离的比例 与 当前缩放尺寸计算
       */
      // if (this.zooming && touches.length === 2) {
      //   this.moving = false
      //   if (this.moving) {
      //     this.moving = false
      //   }
      //   const distance = this.getDistance(touches)
      //   const scale = (this.startScale * distance) / this.startDistance
      //   this.scale = range(scale, this.minZoom, this.maxZoom)
      // }

      if (touches.length === 1 && this.scale !== 1) {
        this.setMoving()
      }
    },

    /**
     * @description 图片拖动位置结束位置设置
     */
    onImageTouchEnd () {
      const { touches } = event

      /**
       * 现阶段有三种滑动
       * 1. @param {moving} 图片放大时，拖拽图片移动
       * 2. @param {zooming}  双指缩放
       * 3. @param {stopSwipeMoving}  轮播图切换页码
       * 实现以上三种状态互不干扰
       */
      if (touches.length && this.scale !== 1) {
        this.stopSwipeMoving = false
        this.setMoving()
      }
      // 缩放最后尺寸小于1时，重置尺寸
      if (this.scale < 1) {
        this.reset()
      }
    },

    /**
     * @description 外层touch事件，由于 click 事件 与 touch 事件存在冲突，因此用touch事件模拟点击事件、双击事件、长按事件
     * 在外层处理
     * 1. 单击关闭
     * 2. 双击放大，缩小
     */
    onWraperTouchStart () {
      // 记录初始时间，比对
      this.touchStartTime = new Date()
      // 开启滑动标志，此时轮播图可手势滑动
      this.stopSwipeMoving = false
    },

    /**
     * @description 外层touch移动
     */
    onWraperTouchMove () {
      const { touches } = event

      // 判断图片是否处于放大状态且正在移动查看
      if (!this.moving) {
        /**
         * 1. touches.length === 1 根据触点个数判断当前页面是否需要滑动，开启禁止滑动的标志。
         * 2. touches.length === 2 表示双指缩放。
         * 因为是在moving中一直触发，为避免重复设置标志需要再添加一个标志修改设置
         */
        if (touches.length === 1 && !this.stopSwipeMoving) {
          this.stopSwipeMoving = true
        } else if (touches.length === 2 && this.stopSwipeMoving) {
          this.stopSwipeMoving = false
        }
      }
    },

    /**
     * @description 点击结束事件，模拟单击/双击事件，模拟长按事件
     * 1. 此处不使用click而是用touch事件模拟，避免冲突
     * 2. touch事件一次触发时间少于 300ms 为单击事件
     * 3. 两次连续点击少于300ms为双击事件，在此处需要设置延时，如果没有再次点击则为单击事件
     * 4. 点击持续600ms为长按事件
     */
    onWraperTouchEnd () {
      // 轮播动作未进行时触发
      if (!this.stopSwipeMoving && !this.moving) {
        // 点击事件持续时间
        const deltaTime = new Date() - this.touchStartTime
        const { offsetX = 0, offsetY = 0 } = this.$refs.swipe || {}

        // 小于 300秒 属于点击事件
        if (deltaTime < SINGLE_CLIK_TIME && offsetX < 10 && offsetY < 10) {
          this.clickTimes++

          // 模拟双击事件
          if (this.clickTimes === 2) {
            this.clickTimes = 0
            // 处理双击事件操作
            this.handleDbClick()
          }

          // 模拟单击事件
          if (!this.doubleClickTimer) {
            this.doubleClickTimer = setTimeout(() => {
              // 处理单击事件
              if (this.clickTimes === 1) {
                this.clickTimes = 0
                this.show && this.close()
              }
              this.doubleClickTimer = null
            }, DOUBLE_CLIK_INTERVAL_TIME)
          } else {
            clearTimeout(this.doubleClickTimer)
            this.doubleClickTimer = null
          }
        } else if (deltaTime > LONG_TAP_TIME) {
          // 超过600毫秒属于长按范围
          // 长按事件
          this.$emit('long-tap', {
            index: this.currentIndex
          })
        }
      }
    },

    /**
     * @description 外层touch移动
     */
    handleDbClick () {
      this.toggleScale()
    },

    onPopstate () {
      this.show && this.close()
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
