<script>
export default {
  name: 'WdCell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {},
    clickable: Boolean
  },
  computed: {
    iconShow () {
      return this.icon || this.$slots.icon
    },
    valueShow () {
      return this.value || this.$slots.default
    }
  },
  methods: {
    handleClick () {
      if (!this.clickable) return

      this.$emit('click')
    }
  },
  render (h) {
    const Icon = this.iconShow ? (
      <div class="wd-cell__icon">
        {
          this.$slots.icon ? this.$slots.icon : <i class={ this.icon }></i>
        }
      </div>
    ) : ''
    const Wrapper = (
      <div class="wd-cell__wrapper">
        <div class="wd-cell__title">
          {
            this.$slots.title ? this.$slots.title : <div>{ this.title }</div>
          }
          {
            this.$slots.label
              ? this.$slots.label
              : this.label
                ? <div class="wd-cell__label">{ this.label }</div>
                : ''
          }
        </div>
        <div class="wd-cell__right">
          {
            this.valueShow ? <span class="wd-cell__value">{ this.$slots.default ? this.$slots.default : this.value }</span> : ''
          }
          {
            this.isLink ? <i class="wd-cell__arrow-right wd-icon-arrow-right"></i> : ''
          }
        </div>
      </div>
    )

    if (this.to) {
      let isRouterLink = true
      if (this.to && this.$router) {
        const resolved = this.$router.match(this.to)
        if (!resolved.matched.length) {
          isRouterLink = false
        }
      }

      let rootClass = this.isLink ? 'wd-cell is-link' : 'wd-cell'

      return isRouterLink
        ? <router-link to={ this.to } class={rootClass}>{Icon}{Wrapper}</router-link>
        : <a class={rootClass} href={ this.to }>{Icon}{Wrapper}</a>
    } else {
      return <a class={{ 'wd-cell': true, 'is-link': this.clickable }} onClick={ this.handleClick }>{Icon}{Wrapper}</a>
    }
  }
}
</script>
