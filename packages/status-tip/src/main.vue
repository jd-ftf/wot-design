<template>
  <div class="wd-status-tip">
    <img class="wd-status-tip__img" :src="imgName">
    <p v-if="tip && tip.length !== 0" class="wd-status-tip__text">{{tip}}</p>
  </div>
</template>

<script>
export default {
  name: 'WdStatusTip',
  props: {
    type: {
      type: String,
      default: 'network'
    },
    tip: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  computed: {
    imgName () {
      const imgFiles = require.context('../img', false, /.svg$/)
      try {
        return imgFiles(`./default-${this.type}.svg`)
      } catch (e) {
        return imgFiles(`./default-network.svg`)
      }
    }
  },
  methods: {
  }
}
</script>
