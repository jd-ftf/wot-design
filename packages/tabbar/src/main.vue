<template>
  <div class="jm-tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'JmTabbar',
  provide () {
    return {
      tabbar: this
    }
  },
  data () {
    return {
      items: []
    }
  },
  props: {
    value: [Number, String],
    route: Boolean
  },
  computed: {
    activeIndex () {
      let value = 0
      if (typeof this.value === 'number') {
        value = this.value
      } else if (this.items.length) {
        let activeItem = this.items.filter(item => item.name === this.value)
        value = activeItem && this.items.indexOf(activeItem)
      }

      return value
    }
  },
  methods: {
    changeTabbar (index) {
      if (this.activeIndex === index) return

      if (typeof this.value === 'number') {
        this.$emit('input', index)
      } else {
        this.$emit('input', this.items[index].name)
      }
    }
  }
}
</script>
