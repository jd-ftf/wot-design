<script>
export default {
  name: 'JmCell',
  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  },
  computed: {
    iconShow () {
      return this.icon || this.$slots.icon
    },
    valueShow () {
      return this.value || this.$slots.default
    }
  },
  render (h) {
    const Icon = this.iconShow ? (
      <div class="jm-cell__icon">
        {
          this.$slots.icon ? this.$slots.icon : <i class={ this.icon }></i>
        }
      </div>
    ) : ''
    const Wrapper = (
      <div class="jm-cell__wrapper">
        <div class="jm-cell__title">
          {
            this.$slots.title ? this.$slots.title : <div>{ this.title }</div>
          }
          {
            this.$slots.label
              ? this.$slots.label
              : this.label
                ? <div class="jm-cell__label">{ this.label }</div>
                : ''
          }
        </div>
        <div class="jm-cell__right">
          {
            this.valueShow ? <span class="jm-cell__value">{ this.$slots.default ? this.$slots.default : this.value }</span> : ''
          }
          {
            this.isLink ? <i class="jm-cell__arrow-right jm-icon-arrow-right"></i> : ''
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

      let rootClass = this.isLink ? 'jm-cell is-link' : 'jm-cell'

      return isRouterLink
        ? <router-link to={ this.to } class={rootClass}>{Icon}{Wrapper}</router-link>
        : <a class={rootClass} href={ this.to }>{Icon}{Wrapper}</a>
    } else {
      return <a class="jm-cell">{Icon}{Wrapper}</a>
    }
  }
}
</script>
