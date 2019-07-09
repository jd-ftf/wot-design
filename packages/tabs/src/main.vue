<template>
  <div class="jm-tabs">

  </div>
</template>

<script>
export default {
  name: 'JmTabs',
  data () {
    return {
      items: []
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
    lineHeight: {
      type: String,
      default: '3px'
    },
    disableMap: Boolean
  },
  computed: {
    tabLength () {
      return this.items.length
    }
  }
}
</script>
