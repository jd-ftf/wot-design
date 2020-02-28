<template>
  <div
    class="wd-img"
    @click="handleClick"
    v-bind:style="style"
    v-bind:class="{ round: round }"
  >
    <img
      :src="src"
      :alt="alt"
      v-bind:style="{ objectFit: fit }"
    />
  </div>
</template>
<script>
import { isDef } from 'wot-design/src/utils/checkType'
import { addUnit } from 'wot-design/src/utils/format'

export default {
  name: 'WdImg',
  props: {
    src: String,
    alt: String,
    fit: String,
    round: Boolean,
    width: [Number, String],
    height: [Number, String]
  },
  computed: {
    style () {
      const style = {}
      if (isDef(this.width)) {
        style.width = addUnit(this.width)
      }
      if (isDef(this.height)) {
        style.height = addUnit(this.height)
      }
      return style
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>
