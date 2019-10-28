<script>
import animateScrollLeft from '@/utils/animateScrollLeft'
import locale from '@/mixins/locale'
import Sticky from 'jm-design/sticky/main.vue'

export default {
  name: 'JmTabs',
  mixins: [locale],
  provide () {
    return {
      tabs: this
    }
  },
  data () {
    return {
      items: [],
      ifAnimate: false,
      lineStyle: {},
      mapShow: false,
      animating: false,
      startX: 0,
      startY: 0,
      delta: 0,
      direction: '',
      startTime: '',
      endTime: '',
      clientWidth: 0,
      swiping: false
    }
  },
  props: {
    value: {
      type: [Number, String],
      default: 0
    },
    slidableNum: {
      type: Number,
      default: 6
    },
    mapNum: {
      type: Number,
      default: 10
    },
    color: String,
    inactiveColor: String,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    lazyRender: Boolean,
    lineWidth: Number,
    lineHeight: Number,
    offsetTop: {
      type: Number,
      default: 0
    }
  },
  components: {
    Sticky
  },
  computed: {
    tabLength () {
      return this.items.length
    },
    activeIndex () {
      let value = 0
      if (typeof this.value === 'number') {
        value = this.value
      } else if (this.items.length) {
        let activeItem = this.items.filter(item => item.name === this.value)
        value = activeItem && this.items.indexOf(activeItem)
      }

      return value
    },
    bodyStyle () {
      return {
        transform: `translate3d(${-1 * this.activeIndex * this.clientWidth + this.delta}px, 0, 0)`,
        transition: ((this.animated && this.ifAnimate) || (this.swipeable && !this.swiping)) ? 'transform 300ms' : ''
      }
    }
  },
  watch: {
    items () {
      this.lineScrollIntoView()
      this.setLineStyle()
    },
    activeIndex () {
      this.lineScrollIntoView()
      this.setLineStyle()
    }
  },
  methods: {
    changeTab (index, isClick = false) {
      let name = this.items[index].name
      if (this.items[index].disabled) {
        this.$emit('disabled', index, name)
      } else {
        this.$emit('change', index, name)
        isClick && this.$emit('click', index, name)
        if (typeof this.value === 'number') {
          this.$emit('input', index)
        } else {
          this.$emit('input', name)
        }
      }
    },
    setLineStyle () {
      let shouldAnimate = this.ifAnimate

      this.$nextTick(() => {
        let left = 0
        let width = 0
        if (this.$refs[`navs_${this.activeIndex}`]) {
          let { clientWidth, offsetLeft } = this.$refs[`navs_${this.activeIndex}`]
          width = this.lineWidth ? this.lineWidth : this.slidableNum < this.items.length ? clientWidth : (clientWidth - 14)
          left = offsetLeft + (clientWidth - width) / 2
        }

        this.lineStyle = {
          background: this.color,
          width: `${width}px`,
          height: this.lineHeight ? this.lineHeight + 'px' : '',
          transform: `translateX(${left}px)`,
          transition: shouldAnimate ? 'width 300ms, transform 300ms' : ''
        }
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
        this.ifAnimate = true
        this.lineScrollIntoView(true)
      })
    },
    toggleMap () {
      if (this.mapShow) {
        this.animating = false
        setTimeout(() => {
          this.mapShow = false
        }, 300)
      } else {
        this.mapShow = true
        setTimeout(() => {
          this.animating = true
        }, 10)
      }
    },
    getNavDom (isMap = false) {
      return this.items.map((item, index) => {
        let title = item.$slots.title || item.title
        let key = item.name || index
        return (
          <div
            key={key}
            ref={isMap ? '' : `navs_${index}`}
            class={{
              'jm-tabs__nav-item': !isMap,
              'jm-tabs__map-nav-item': isMap,
              'is-active': this.activeIndex === index,
              'is-disabled': item.disabled
            }}
            style={{
              color: this.activeIndex === index ? this.color : this.inactiveColor
            }}
            onClick={() => {
              this.changeTab(index, true)
              isMap && !item.disabled && this.toggleMap()
            }}>
            {title}
          </div>
        )
      })
    },
    getDirection (deltaX, deltaY) {
      let offsetX = Math.abs(deltaX)
      let offsetY = Math.abs(deltaY)
      let direction = ''

      if (offsetX > 5 || offsetY > 5) {
        direction = offsetX > offsetY ? 'horizontal' : 'vertical'
      }

      return direction
    },
    onTouchStart (event) {
      if (!this.swipeable) return

      this.startTime = Date.now()
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
      this.swiping = true
    },
    onTouchMove (event) {
      if (!this.swipeable) return

      let deltaX = event.touches[0].clientX - this.startX
      let deltaY = event.touches[0].clientY - this.startY

      this.direction = this.direction || this.getDirection(deltaX, deltaY)

      if (this.direction === 'horizontal') {
        event.preventDefault()
        this.delta = deltaX
      }
    },
    onTouchEnd (event) {
      if (!this.swipeable) return

      this.endTime = Date.now()

      if (this.direction === 'horizontal' && this.delta) {
        // judge if should swipe to item
        let isEffectiveSwipe = Math.abs(this.delta) > this.clientWidth / 3 || Math.abs(this.delta) / (this.endTime - this.startTime) > 0.7
        isEffectiveSwipe && this.changeTab(this.activeIndex + (this.delta < 0 ? 1 : -1))
      }

      this.swiping = false
      this.delta = 0
      this.direction = ''
    }
  },
  mounted () {
    this.clientWidth = document.body.clientWidth
    if (this.swipeable) {
      this.$refs.tabsBody.addEventListener('touchstart', this.onTouchStart)
      this.$refs.tabsBody.addEventListener('touchmove', this.onTouchMove)
      this.$refs.tabsBody.addEventListener('touchend', this.onTouchEnd)
      this.$refs.tabsBody.addEventListener('touchcancel', this.onTouchEnd)
    }
    this.onShow()
  },
  render (h) {
    const Navs = this.getNavDom()

    let NavMap

    if (this.mapNum < this.items.length && this.mapNum !== 0) {
      const MapNavs = this.getNavDom(true)

      NavMap = (
        <div class="jm-tabs__map">
          <span class="jm-tabs__map-btn" on-click={this.toggleMap}>
            <i class={{
              'jm-tabs__map-arrow': true,
              'jm-icon-arrow-down': true,
              'is-open': this.animating
            }}></i>
          </span>
          <div
            class="jm-tabs__map-header"
            style={{ display: this.mapShow ? '' : 'none', opacity: this.animating ? 1 : '' }}
          >{ this.t('jmd.tabs.all') }</div>
          <div class={{
            'jm-tabs__map-body': true,
            'is-open': this.animating
          }} style={{ display: this.mapShow ? '' : 'none' }}>
            { MapNavs }
          </div>
        </div>
      )
    }

    const Nav = (
      <div class="jm-tabs__nav" ref="navVisible">
        <div class="jm-tabs__nav-container" ref="navContainer">
          {Navs}
          <i class="jm-tabs__line" style={this.lineStyle}></i>
        </div>
      </div>
    )

    return (
      <div
        class={{
          'jm-tabs': true,
          'is-slide': this.slidableNum < this.items.length,
          'is-map': this.mapNum < this.items.length && this.mapNum !== 0
        }}
      >
        {
          this.sticky
            ? <Sticky offsetTop={this.offsetTop} container={this.$el}>{Nav}</Sticky>
            : Nav
        }
        <div class="jm-tabs__container">
          <div class="jm-tabs__body" style={this.bodyStyle} ref="tabsBody">
            {this.$slots.default}
          </div>
        </div>
        {
          NavMap
        }
        {
          this.mapNum < this.items.length && this.mapNum !== 0
            ? <div class="jm-tabs__mask" style={{ display: this.mapShow ? '' : 'none', opacity: this.animating ? 1 : '' }} on-click={this.toggleMap}></div>
            : ''
        }
      </div>
    )
  }
}
</script>
