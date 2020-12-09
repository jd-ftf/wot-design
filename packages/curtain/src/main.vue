<template>
  <wd-popup
    v-model="show"
    position="center"
    :teleport="teleport"
    :close-on-click-modal="closeOnClickModal"
    transition="wd-zoom-in"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
    @click-modal="clickModal"
    class="wd-curtain">
    <div class="wd-curtain__content">
      <img
        :src="src"
        class="wd-curtain__content-img"
        :style="imgStyle"
        @load="imgLoad"
        @error="imgErr"
        @click="clickImg"/>
      <i class="wd-curtain__content-close wd-icon-close-outline" :class="closePosition" @click="close"></i>
    </div>
  </wd-popup>
</template>

<script>
import WdPopup from 'wot-design/packages/popup'

export default {
  name: 'WdCurtain',

  props: {
    value: Boolean,
    closePosition: String,
    src: String,
    to: String,
    width: String,
    closeOnClickModal: Boolean,
    teleport: [String, Object]
  },

  data () {
    return {
      show: false,
      imgSucc: false
    }
  },

  components: {
    WdPopup
  },

  watch: {
    value (newVal, oldVal) {
      if (this.imgSucc && newVal) {
        this.show = true
      } else {
        this.show = false
      }
    },
    imgSucc (newVal, oldVal) {
      if (this.value && newVal) {
        this.show = true
      } else {
        this.show = false
      }
    }
  },

  computed: {
    imgStyle () {
      if (this.width) {
        return { width: this.width }
      } else {
        return { maxWidth: '280px' }
      }
    }
  },

  methods: {
    open () {
      this.$emit('open')
    },
    close () {
      this.$emit('input', false)
      this.$emit('close')
    },
    opened () {
      this.$emit('opened')
    },
    closed () {
      this.$emit('closed')
    },
    clickModal () {
      this.$emit('click-modal')
    },
    imgLoad () {
      this.imgSucc = true
    },
    imgErr () {
      this.imgSucc = false
      this.$emit('error')
    },
    clickImg () {
      if (this.to) {
        location.href = this.to
      }
      this.$emit('input', false)
      this.$emit('click')
    }
  }
}
</script>
