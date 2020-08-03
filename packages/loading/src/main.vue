<template>
  <div class="wd-loading" :style="{ 'width': size, 'height': size, 'color': color }">
    <div v-if="type === 'circle-outline'" class="wd-loading--circle-outline">
      <svg viewBox="0 0 42 42">
        <defs>
          <linearGradient x1="100%" y1="0%" x2="0%" y2="0%" :id="svgDefineId">
            <stop stop-color="#FFF" stop-opacity="0" offset="0%" />
            <stop stop-color="#FFF" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <path
            d="M21 1c11.046 0 20 8.954 20 20s-8.954 20-20 20S1 32.046 1 21 9.954 1 21 1zm0 7C13.82 8 8 13.82 8 21s5.82 13 13 13 13-5.82 13-13S28.18 8 21 8z"
            fill="currentColor"
          />
          <path
            d="M4.599 21c0 9.044 7.332 16.376 16.376 16.376 9.045 0 16.376-7.332 16.376-16.376"
            :stroke="`url(#${svgDefineId})`"
            stroke-width="3.5"
            stroke-linecap="round"
          />
        </g>
      </svg>
    </div>
    <span v-if="type === 'circle'" class="wd-loading__spinner wd-loading--circle">
      <svg viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
    <span v-else-if="type === 'spinner'" class="wd-loading__spinner wd-loading--spinner">
      <i class="wd-loading__spinner-dot" v-for="item in 12" :key="item"></i>
    </span>
  </div>
</template>

<script>
import context from 'wot-design/src/utils/id'

export default {
  name: 'WdLoading',
  data () {
    return {
      svgDefineId: context.id++
    }
  },
  props: {
    type: {
      type: String,
      default: 'circle-outline'
    },
    color: {
      type: String,
      default: '#4D80F0'
    },
    size: {
      type: String,
      default: '32px'
    }
  }
}
</script>
