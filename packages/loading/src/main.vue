<template>
  <transition name="loading">
    <div class="jm-loading" v-show="show">
      <div class="jm-loading__wrap" :class="{ 'is-with-msg': !!msg }">
        <jm-loading />
        <div v-if="msg" class="jm-loading__msg">
          {{ msg }}
        </div>
      </div>
      <div class="jm-loading__mask"></div>
    </div>
  </transition>
</template>

<script>
import JmLoading from './indicator'

export default {
  props: {
    msg: String,
    iconName: {
      type: String,
      default: 'loading'
    },
    iconClass: String,
    show: Boolean
  },
  components: {
    JmLoading
  },
  computed: {
    iconNameToClass () {
      switch (this.iconName) {
        case 'loading':
          return 'icon-fw-loading'
        default:
          return ''
      }
    }
  }
}
</script>
