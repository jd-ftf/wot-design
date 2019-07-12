<script>
export default {
  name: 'JmTabs',
  provide () {
    return {
      tabs: this
    }
  },
  data () {
    return {
      items: [],
      activeWidth: 0,
      ifAnimate: false,
      lineStyle: {
        background: this.color
      }
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
    color: String,
    inactiveColor: String,
    sticky: Boolean,
    animated: Boolean,
    swipeable: Boolean,
    lazyRender: Boolean,
    lineWidth: Number,
    lineHeight: String,
    disableMap: Boolean
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
        transform: `translate3d(${-1 * this.activeIndex * 100}%, 0, 0)`,
        transition: this.animated && this.ifAnimate ? 'transform 300ms' : ''
      }
    }
  },
  watch: {
    items () {
      this.setLineStyle()
    },
    activeIndex () {
      this.setLineStyle()
    }
  },
  methods: {
    changeTab (index) {
      if (typeof this.value === 'number') {
        this.$emit('input', index)
      } else {
        this.$emit('input', this.items[index].name)
      }
    },
    setLineStyle () {
      let shouldAnimate = this.ifAnimate

      this.$nextTick(() => {
        let left = 0
        let width = 0
        if (this.$refs[`navs_${this.activeIndex}`]) {
          let clientWidth = this.$refs[`navs_${this.activeIndex}`].clientWidth
          width = this.lineWidth ? this.lineWidth : (clientWidth - 14)
          left = this.$refs[`navs_${this.activeIndex}`].offsetLeft + (clientWidth - width) / 2
        }

        this.lineStyle = {
          width: `${width}px`,
          height: this.lineHeight,
          transform: `translateX(${left}px)`,
          transition: shouldAnimate ? 'width 300ms, transform 300ms' : ''
        }
      })
    },
    onShow () {
      this.$nextTick(() => {
        this.ifAnimate = true
      })
    }
  },
  mounted () {
    this.onShow()
  },
  render (h) {
    const navs = this.items.map((item, index) => {
      let title = item.$slots.title || item.title
      let key = item.name || index
      return (
        <div
          key={key}
          ref={`navs_${index}`}
          class={{
            'jm-tabs__nav-item': true,
            'is-active': this.activeIndex === index
          }}
          onClick={() => this.changeTab(index)}>
          {title}
        </div>
      )
    })

    return (
      <div
        class={{
          'jm-tabs': true,
          'is-slide': this.slidableNum < this.items.length
        }}
      >
        <div class="jm-tabs__nav">
          <div class="jm-tabs__nav-container">
            {navs}
            <i class="jm-tabs__line" style={this.lineStyle}></i>
          </div>
        </div>
        <div class="jm-tabs__body" style={this.bodyStyle}>
          {this.$slots.default}
        </div>
      </div>
    )
  }
}
</script>
