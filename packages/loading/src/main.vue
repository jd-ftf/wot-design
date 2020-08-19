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
    <!-- 带透明度圆环 -->
    <div v-if="type === 'circular-ring'" class="wd-loading--circle-outline">
      <svg viewBox="0 0 200 200">
        <linearGradient :id="svgDefineId1" gradientUnits="userSpaceOnUse" x1="50" x2="50" y2="180">
          <stop offset="0" :stop-color="color" />
          <stop offset="1" :stop-color="intermediateColor" />
        </linearGradient>
        <path
          :fill="`url(#${svgDefineId1})`"
          d="M20 100c0-44.1 35.9-80 80-80V0C44.8 0 0 44.8 0 100s44.8 100 100 100v-20c-44.1 0-80-35.9-80-80z"
        />
        <linearGradient
          :id="svgDefineId2"
          gradientUnits="userSpaceOnUse"
          x1="150"
          y1="20"
          x2="150"
          y2="180"
        >
          <stop offset="0" stop-color="#fff" />
          <stop offset="1" :stop-color="intermediateColor" />
        </linearGradient>
        <path
          :fill="`url(#${svgDefineId2})`"
          d="M100 0v20c44.1 0 80 35.9 80 80s-35.9 80-80 80v20c55.2 0 100-44.8 100-100S155.2 0 100 0z"
        />
        <!-- 顶部实心圆点 -->
        <circle cx="100" cy="10" r="10" :fill="color" />
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
import gradient from 'wot-design/src/utils/gradient'
import context from 'wot-design/src/utils/id'

export default {
  name: 'WdLoading',
  data () {
    return {
      svgDefineId: context.id++,
      svgDefineId1: context.id++,
      svgDefineId2: context.id++
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
  },
  computed: {
    intermediateColor (val) {
      return gradient(this.color, '#ffffff', 2)[1]
    }
  }
}
</script>
