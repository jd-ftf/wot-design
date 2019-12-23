<template>
  <transition name="wd-fade">
    <div v-show="show" class="wd-toast" :class="customClass">
      <i v-if="iconName" class="wd-toast__icon" :class="[ iconNameToClass ]"></i>
      <i v-else-if="iconClass" class="wd-toast__icon" :class="iconClass.split(' ')"></i>
      <div class="wd-toast__msg">{{ msg }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'WdToast',
  props: {
    iconName: String,
    iconClass: String,
    msg: String,
    position: {
      type: String,
      default: 'middle'
    },
    show: Boolean
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
  }
}
</script>
