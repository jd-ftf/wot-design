<template>
  <div class="wd-toast" @touchmove="preventMove">
    <div v-show="forbidClick && show" class="wd-toast__modal"></div>
    <transition name="wd-fade">
      <div v-show="show" class="wd-toast__body" :class="customClass">
        <wd-loading v-if="iconName === 'loading'" class="wd-toast__icon" :type="loadingType" color="#fff" />
        <i v-if="iconName" class="wd-toast__icon" :class="[ iconNameToClass ]"></i>
        <i v-else-if="iconClass" class="wd-toast__icon" :class="iconClass.split(' ')"></i>
        <div class="wd-toast__msg">{{ msg }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
import WdLoading from 'wot-design/packages/loading'

export default {
  name: 'WdToast',
  components: {
    WdLoading
  },
  props: {
    iconName: String,
    iconClass: String,
    msg: String,
    position: {
      type: String,
      default: 'middle'
    },
    show: Boolean,
    loadingType: {
      type: String,
      default: 'circle'
    },
    forbidClick: Boolean
  },
  computed: {
    customClass () {
      let classList = []

      switch (this.position) {
        case 'top':
          classList.push('wd-toast--top')
          break
        case 'bottom':
          classList.push('wd-toast--bottom')
          break
        default:
          classList.push('wd-toast--middle')
      }

      if (this.iconName || this.iconClass) {
        classList.push('wd-toast--with-icon')
      }

      return classList
    },
    iconNameToClass () {
      switch (this.iconName) {
        case 'success':
          return 'wd-icon-success'
        case 'error':
          return 'wd-icon-error'
        case 'warning':
          return 'wd-icon-warning'
        default:
          return ''
      }
    }
  },
  methods: {
    preventMove (event) {
      if (this.forbidClick) {
        event.preventDefault()
      }
    }
  }
}
</script>
