<template>
  <div class="wd-toast" @touchmove="preventMove">
    <div v-show="forbidClick && show" class="wd-toast__modal"></div>
    <transition name="wd-fade">
      <div v-show="show" class="wd-toast__container" :class="customClass">
        <div class="wd-toast__body">
          <!-- loading -->
          <wd-loading
            v-if="iconName === 'loading'"
            class="wd-toast__icon"
            :type="loadingType"
            :color="loadingColor"
            :size="iconSize"
          />
          <!-- success | warning | info | error -->
          <icon v-if="iconName && iconName !== 'loading'" :type="iconName" :size="iconSize" class="wd-toast__icon"></icon>
          <i v-else-if="iconClass" class="wd-toast__icon" :class="iconClass.split(' ')"></i>
          <div class="wd-toast__msg">{{ msg }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import WdLoading from 'wot-design/packages/loading'
import Icon from './icon'

export default {
  name: 'WdToast',
  components: {
    WdLoading,
    Icon
  },
  data () {
    return {
      forbidClick: false
    }
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
      default: 'outline'
    },
    loadingColor: {
      type: String,
      default: '#4D80F0'
    },
    iconSize: {
      type: String,
      default: '42px'
    }
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

      if (this.iconName === 'loading' && !this.msg) {
        classList.push('wd-toast--loading')
      } else if (this.iconName || this.iconClass) {
        classList.push('wd-toast--with-icon')
      }

      return classList
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
