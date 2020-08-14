<script>
import animateScrollLeft from 'wot-design/src/utils/animateScrollLeft'
import Sticky from 'wot-design/packages/sticky'
let anchorTimer

export default {
  name: 'WdAnchor',
  data () {
    return {
      ifAnimate: false,
      lineStyle: {},
      clientWidth: 0,
      isScroll: true,
      anchorChange: true
    }
  },
  props: {
    value: String,
    data: {
      type: Array,
      default () {
        return []
      }
    },
    slidableNum: {
      type: Number,
      default: 5
    },
    offsetTop: {
      type: Number,
      default: 44
    },
    containerOffsetTop: {
      type: Number,
      default: 86
    }
  },
  components: {
    Sticky
  },
  computed: {
    activeIndex () {
      return this.value
    }
  },
  watch: {
    data () {
      this.lineScrollIntoView()
      this.setLineStyle()
    },
    activeIndex () {
      this.lineScrollIntoView()
      this.setLineStyle()
    }
  },
  methods: {
    /**
     * 滚动效果实现
     * @param {timer} obj
     * @param {direction} number 滚动方向
     */
    onScroll (timer, direction) {
      clearInterval(anchorTimer)
      var bodyTop = document.documentElement.scrollTop || document.body.scrollTop
      anchorTimer = setInterval(() => {
        if (Math.abs(bodyTop - timer.SCOLLOR_OFFSETTOP) <= timer.step) {
          window.scrollTo(0, timer.SCOLLOR_OFFSETTOP)
          clearInterval(anchorTimer)
          setTimeout(() => {
            this.anchorChange = true
          }, 100)
        } else {
          bodyTop += direction * timer.step
          window.scrollTo(0, bodyTop)
        }
      }, timer.times)
    },
    /**
     * @param {String} id
     */
    anchorIndex (id) {
      let item = document.getElementById(id)
      let scrollerOffsetTop = this.getOffsetTop(item)
      let windowScrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let timer = {
        step: 30,
        times: 16,
        SCOLLOR_OFFSETTOP: scrollerOffsetTop
      }
      if (windowScrollTop > scrollerOffsetTop) {
        this.onScroll(timer, -1) // -1向上滚动 1向下滚动
      } else if (windowScrollTop < scrollerOffsetTop) {
        if (scrollerOffsetTop + document.documentElement.clientHeight > document.documentElement.offsetHeight) {
          timer = {
            step: 30,
            times: 16,
            SCOLLOR_OFFSETTOP: document.documentElement.offsetHeight - document.documentElement.clientHeight
          }
        }
        this.onScroll(timer, 1)
      }
    },

    /**
     * 获取元素以浏览器左上角为原点的距离
     * @param {Object} obj
     * @returns {String} 返回需要滚动的距离
     */
    getOffsetTop (obj) {
      let offsetTop = obj.offsetTop // 获取该元素对应父容器的上边距
      let node = obj.offsetParent
      while (node != null) { // 判断是否有父容器，如果存在则累加其边距
        offsetTop += node.offsetTop
        node = node.offsetParent
      }
      return offsetTop - this.containerOffsetTop
    },

    /**
     * Tab切换
     * @param {string} id 选中id
     * @param {Number} index 选中index
     */
    changeTab (id, index) {
      this.isScroll = false
      this.anchorChange = false
      this.anchorIndex(id)
      this.$emit('input', id)
      this.$emit('change', index)
      this.$emit('click', index)
    },
    setLineStyle () {
      let shouldAnimate = this.ifAnimate

      this.$nextTick(() => {
        let left = 0
        let width = 19
        if (this.$refs[`navs_${this.activeIndex}`]) {
          let { clientWidth, offsetLeft } = this.$refs[`navs_${this.activeIndex}`]
          left = offsetLeft + (clientWidth - width) / 2
        }

        this.lineStyle = {
          width: `${width}px`,
          transform: `translateX(${left}px)`,
          transition: shouldAnimate ? 'width 300ms, transform 300ms' : ''
        }
      })
    },
    getNavDom () {
      return this.data.map((item, index) => {
        return (
          <div
            key={item.id}
            ref={`navs_${item.id}`}
            class={{
              'wd-anchor__nav-item': true,
              'is-active': this.activeIndex === index
            }}
            onClick={() => {
              this.changeTab(item.id, index)
            }}>
            {item.title}
          </div>
        )
      })
    },
    lineScrollIntoView (immediate) {
      let activeNav = this.$refs[`navs_${this.activeIndex}`]

      if (!activeNav) return

      let visibleWidth = this.$refs.navVisible.offsetWidth
      let activeLeft = activeNav.offsetWidth / 2 + activeNav.offsetLeft
      let nextNavContainerLeft = activeLeft - visibleWidth / 2
      animateScrollLeft(this.$refs.navContainer, nextNavContainerLeft, immediate ? 0 : 300)
    },
    onShow () {
      this.$nextTick(() => {
        this.setLineStyle()
        this.lineScrollIntoView(true)
        this.ifAnimate = true
      })
    },
    /**
     * 判断是否在可视线区
     */
    isInVisibleArea (ele) {
      var rect = ele.getBoundingClientRect()
      if (rect.top + this.containerOffsetTop <= window.innerHeight && rect.top <= this.containerOffsetTop && rect.bottom >= this.containerOffsetTop) {
        return true
      }
      return false
    },
    /**
     * 屏幕滚动事件监听
     */
    handleScroll () {
      if (this.anchorChange) {
        // Tab切换按钮会滚动视图，标记判断滚动是否结束
        this.isScroll = true
      }
      if (!this.isScroll) return
      this.data.every((item, index) => {
        if (this.isInVisibleArea(document.getElementById(item.id))) {
          this.$emit('input', item.id)
          this.$emit('change', index)
          return false
        }
        return true
      })
    }
  },
  mounted () {
    this.clientWidth = document.body.clientWidth
    this.onShow()
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  render (h) {
    const Navs = this.getNavDom()

    const Nav = (
      <div class="wd-anchor__nav" ref="navVisible">
        <div class="wd-anchor__nav-container" ref="navContainer">
          {Navs}
          <i class="wd-anchor__line" style={this.lineStyle}></i>
        </div>
      </div>
    )

    return (
      <div
        class={{
          'wd-anchor': true,
          'is-slide': this.slidableNum < this.data.length
        }}
      >
        <Sticky offsetTop={this.offsetTop} container={this.$el}>{Nav}</Sticky>
        <div class="wd-anchor__container">
          <div class="wd-anchor__body">
            {this.$slots.default}
          </div>
        </div>
      </div>
    )
  }
}
</script>
