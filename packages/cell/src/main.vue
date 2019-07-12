<template>
  <a class="jm-cell" :href="href">
    <div v-if="iconShow" class="jm-cell__icon">
      <slot name="icon">
        <i :class="icon"></i>
      </slot>
    </div>
    <div class="jm-cell__wrapper">
      <div class="jm-cell__title">
        <slot name="title">
          <div v-text="title"></div>
        </slot>
        <slot name="label">
          <div v-if="label" class="jm-cell__label" v-text="label"></div>
        </slot>
      </div>
      <div class="jm-cell__right">
        <span class="jm-cell__value" v-if="valueShow">
          <slot>
            {{ value }}
          </slot>
        </span>
        <i v-if="isLink" class="jm-cell__arrow-right jm-icon-arrow-right"></i>
      </div>
    </div>
  </a>
</template>

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
  data: function () {
    return {
      added: false
    }
  },
  computed: {
    href () {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to)
        if (!resolved.matched.length) return this.to
        this.$nextTick(() => {
          // eslint-disable-next-line
          this.added = true
          this.$el.addEventListener('click', this.handleClick)
        })
        return resolved.fullPath || resolved.path
      }
      return this.to
    },
    iconShow () {
      return this.icon || this.$slots.icon
    },
    valueShow () {
      return this.value || this.$slots.default
    }
  },
  methods: {
    handleClick ($event) {
      $event.preventDefault()
      this.$router.push(this.href)
    }
  },
  render (h) {
    const Icon = this.iconShow ? (
      <div class="jm-cell__icon">
        <slot name="icon">
          <i class={ this.icon }></i>
        </slot>
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
            this.valueShow ? <span class="jm-cell__value">{ this.$slots.default ? this.$slots.default : '' }</span> : ''
          }
          {
            this.isLink ? <i class="jm-cell__arrow-right jm-icon-arrow-right"></i> : ''
          }
        </div>
      </div>
    )
    let isRouterLink = true
    if (this.to && this.$router) {
      const resolved = this.$router.match(this.to)
      if (!resolved.matched.length) {
        isRouterLink = false
      }
    }

    return isRouterLink
      ? <router-link to={ this.to } class="jm-cell">{Icon}{Wrapper}</router-link>
      : <a class="jm-cell" href={ this.to }>{Icon}{Wrapper}</a>
  }
}
</script>
