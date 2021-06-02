<script>
import animateScrollLeft from 'wot-design/src/utils/animateScrollLeft'
import locale from 'wot-design/src/mixins/locale'
import touchMixin from 'wot-design/src/mixins/touch'
import Sticky from 'wot-design/packages/sticky'

export default {
  name: 'WdTabs',
  mixins: [locale, touchMixin],
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
      delta: 0,
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
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    lazyRender: Boolean,
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
        value = activeItem.length && this.items.indexOf(activeItem[0])
      }

      return value
    },
    bodyStyle () {
      let delta = ((this.activeIndex === this.tabLength - 1 && this.delta < 0) || (this.activeIndex === 0 && this.delta > 0))
        ? this.delta / 4
        : this.delta
      return {
        width: this.tabLength * this.clientWidth + 'px',
        transform: `translate3d(${-1 * this.activeIndex * this.clientWidth + delta}px, 0, 0)`,
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
    changeTab (index, isClick, diff) {
      if (index < 0 || index >= this.tabLength) return

      let name = this.items[index].name
      if (this.items[index].disabled) {
        this.$emit('disabled', index, name)

        // when swipe to the disabeld item, go to next or last
        if (!isClick && diff) {
          this.changeTab(index + diff, isClick, diff)
        }
      } else {
        if (typeof this.value === 'number') {
          this.$emit('input', index)
        } else {
          this.$emit('input', name)
        }
        this.$emit('change', index, name)
        isClick && this.$emit('click', index, name)
      }
    },
    setLineStyle (shouldAnimate = this.ifAnimate) {
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
    getNavDom () {
      return this.items.map((item, index) => {
        let title = item.$slots.title || item.title
        let key = item.name || index
        return (
          <div
            key={key}
            ref={`navs_${index}`}
            class={{
              'wd-tabs__nav-item': true,
              'is-active': this.activeIndex === index,
              'is-disabled': item.disabled
            }}
            onClick={() => {
              this.changeTab(index, true)
            }}>
            {title}
          </div>
        )
      })
    },
    getNavMapDom () {
      return this.items.map((item, index) => {
        let title = item.$slots.title || item.title
        let key = item.name || index
        return (
          <div key={key} class='wd-tabs__map-nav-item'>
            <span
              key={key}
              class={{
                'wd-tabs__map-nav-btn': true,
                'is-active': this.activeIndex === index,
                'is-disabled': item.disabled
              }}
              onClick={() => {
                this.changeTab(index, true)
                !item.disabled && this.toggleMap()
              }}>
              {title}
            </span>
          </div>
        )
      })
    },
    onTouchStart (event) {
      if (!this.swipeable) return

      this.startTime = Date.now()
      this.touchStart(event)
      this.swiping = true
    },
    onTouchMove (event) {
      if (!this.swipeable) return

      this.touchMove(event)

      if (this.direction === 'horizontal') {
        event.preventDefault()
        this.delta = this.deltaX
      }
    },
    onTouchEnd (event) {
      if (!this.swipeable) return

      this.endTime = Date.now()

      if (this.direction === 'horizontal' && this.delta) {
        // judge if should swipe to item
        let isEffectiveSwipe = Math.abs(this.delta) > this.clientWidth / 3 || Math.abs(this.delta) / (this.endTime - this.startTime) > 0.7
        const diff = this.delta < 0 ? 1 : -1
        isEffectiveSwipe && this.changeTab(this.activeIndex + diff, false, diff)
      }

      this.swiping = false
      this.delta = 0
    }
  },
  mounted () {
    this.clientWidth = this.$refs.tabsRef.clientWidth
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
      const MapNavs = this.getNavMapDom()

      NavMap = (
        <div class="wd-tabs__map">
          <span class={{ 'wd-tabs__map-btn': true, 'is-open': this.animating }} on-click={this.toggleMap}>
            <i class={{
              'wd-tabs__map-arrow': true,
              'wd-icon-arrow-down': true,
              'is-open': this.animating
            }}></i>
          </span>
          <div
            class="wd-tabs__map-header"
            style={{ display: this.mapShow ? '' : 'none', opacity: this.animating ? 1 : '' }}
          >{this.t('wd.tabs.all')}</div>
          <div class={{
            'wd-tabs__map-body': true,
            'is-open': this.animating
          }} style={{ display: this.mapShow ? '' : 'none' }}>
            {MapNavs}
          </div>
        </div>
      )
    }

    const Nav = (
      <div class="wd-tabs__nav" ref="navVisible">
        <div class="wd-tabs__nav-container" ref="navContainer">
          {Navs}
          <i class="wd-tabs__line" style={this.lineStyle}></i>
        </div>
      </div>
    )

    return (
      <div
        class={{
          'wd-tabs': true,
          'is-slide': this.slidableNum < this.items.length,
          'is-map': this.mapNum < this.items.length && this.mapNum !== 0
        }}
        ref="tabsRef"
      >
        {
          this.sticky
            ? <Sticky offsetTop={this.offsetTop}>{Nav}{NavMap}</Sticky>
            : Nav
        }
        <div class="wd-tabs__container">
          <div class="wd-tabs__body" style={this.bodyStyle} ref="tabsBody">
            {this.$slots.default}
          </div>
        </div>
        {
          this.sticky ? '' : NavMap
        }
        {
          this.mapNum < this.items.length && this.mapNum !== 0
            ? <div class="wd-tabs__mask" style={{ display: this.mapShow ? '' : 'none', opacity: this.animating ? 1 : '' }} on-click={this.toggleMap}></div>
            : ''
        }
      </div>
    )
  }
}
</script>
