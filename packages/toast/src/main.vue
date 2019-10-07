<template>
  <transition name="jm-fade">
    <div v-show="show" class="jm-toast" :class="customClass">
      <i v-if="iconName" class="jm-toast__icon" :class="[ iconNameToClass ]"></i>
      <i v-else-if="iconClass" class="jm-toast__icon" :class="iconClass.split(' ')"></i>
      <div class="jm-toast__msg">{{ msg }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'JmToast',
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
          classList.push('jm-toast--top')
          break
        case 'bottom':
          classList.push('jm-toast--bottom')
          break
        default:
          classList.push('jm-toast--middle')
      }

      if (this.iconName || this.iconClass) {
        classList.push('jm-toast--with-icon')
      }

      return classList
    },
    iconNameToClass () {
      switch (this.iconName) {
        case 'success':
          return 'jm-icon-success'
        case 'error':
          return 'jm-icon-error'
        case 'warning':
          return 'jm-icon-warning'
        default:
          return ''
      }
    }
  }
}
</script>
