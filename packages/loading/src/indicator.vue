<template>
  <div class="jm-loading-indicator" :style="{ 'width': size, 'height': size, 'color': color }">
    <span v-if="type === 'circle'" class="jm-loading-indicator__spinner jm-loading-indicator--circle">
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none"></circle>
      </svg>
    </span>
    <span v-else-if="type === 'spinner'" class="jm-loading-indicator__spinner jm-loading-indicator--spinner">
      <i class="jm-loading-indicator__spinner-dot" v-for="item in 12" :key="item"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'JmLoading',
  props: {
    type: {
      type: String,
      default: 'circle'
    },
    color: {
      type: String,
      default: '#c5c5c5'
    },
    size: {
      type: String,
      default: '32px'
    }
  }
}
</script>
