<template>
  <transition name="progress-fade">
    <div v-show="isLoading" class="progress">
      <i class="progress__inner" :style="{ width: `${percentage}%`, 'transitionDuration': isLoading ? '200ms' : '' }"></i>
    </div>
  </transition>
</template>

<script>
import { on, off } from '../utils/event'

export default {
  name: 'Progress',
  data () {
    return {
      percentage: 0,
      isLoading: false,
      timer: null
    }
  },
  mounted () {
    on('asyncComponentLoading', this.start)
    on('asyncComponentLoaded', this.stop)
  },
  beforeDestroy () {
    off('asyncComponentLoading', this.start)
    off('asyncComponentLoaded', this.stop)
  },
  methods: {
    start () {
      clearTimeout(this.timer)
      this.isLoading = true
      this.timer = setTimeout(() => {
        this.percentage = 30
      }, 50);
    },
    stop () {
      clearTimeout(this.timer)
      this.percentage = 100
      this.timer = setTimeout(() => {
        this.isLoading = false
        this.percentage = 0
      }, 200)
    }
  }
}
</script>

<style lang="scss">
.progress {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 2px;
  z-index: 10;
  transition: opacity .1s;
  
  .progress__inner {
    width: 0;
    display: block;
    height: 100%;
    border-radius: 1px;
    background: #0083ff;
    transition-property: width;
  }
}
.progress-fade-leave-to {
  opacity: 0;
}
.progress-fade-leave-active {
  transition: opacity .1s;
}
</style>
