<script>
import JmBadge from 'jm-design/badge'

export default {
  name: 'JmTabbarItem',
  inject: ['tabbar'],
  props: {
    name: String,
    icon: String,
    dot: Boolean,
    value: [Number, String],
    max: Number,
    bgColor: String,
    to: [String, Object],
    replace: Boolean
  },
  components: {
    JmBadge
  },
  computed: {
    index () {
      return this.tabbar.items.indexOf(this)
    },
    isActive () {
      return this.index === this.tabbar.activeIndex
    },
    renderBadge () {
      return this.dot || this.value || this.value === 0
    }
  },
  created () {
    if (this.tabbar) {
      this.tabbar.items.push(this)
    }
  },
  render (h) {
    let Icon = this.$slots.icon
      ? this.$slots.icon
      : (<i class={` jm-tabbar-item__icon ${this.icon}` }></i>)

    return (
      <div class={{
        'jm-tabbar-item': true,
        'is-active': this.isActive
      }} onClick={() => { this.tabbar.changeTabbar(this.index) }}>
        <div class="jm-tabbar-item__icon-container">
          {
            this.renderBadge
              ? <JmBadge value={this.value} is-dot={this.dot} value={this.value} max={this.max} bg-color={this.bgColor}>{Icon}</JmBadge>
              : Icon
          }
        </div>
        <div class="jm-tabbar-item__label">
          { this.$slots.default }
        </div>
      </div>
    )
  },
  destroyed () {
    this.tabbar.items.slice(this.tabbar.items.indexOf(this), 1)
  }
}
</script>
