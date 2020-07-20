<template>
  <div>
    <!-- info -->
    <div v-if="type === 'info'" :style="{ 'width': size, 'height': size }">
      <svg viewBox="0 0 42 42">
        <defs>
          <filter
            x="-300%"
            y="-57.1%"
            width="700%"
            height="214.3%"
            filterUnits="objectBoundingBox"
            id="a"
          >
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix
              values="0 0 0 0 0.362700096 0 0 0 0 0.409035039 0 0 0 0 0.520238904 0 0 0 1 0"
              in="shadowBlurOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <circle fill="#909CB7" opacity=".4" cx="21" cy="21" r="20" />
          <circle fill="#909CB7" cx="21" cy="21" r="16" />
          <g transform="rotate(-180 11.246 15.002)" filter="url(#a)">
            <rect fill="#FFF" transform="matrix(1 0 0 -1 0 14)" width="3" height="14" rx="1.5" />
            <rect
              fill="#EEE"
              transform="matrix(1 0 0 -1 0 36)"
              y="16"
              width="3"
              height="4"
              rx="1.5"
            />
          </g>
        </g>
      </svg>
    </div>
    <!-- warning -->
    <div v-if="type === 'warning'" :style="{ 'width': size, 'height': size }">
      <svg viewBox="0 0 42 42">
        <defs>
          <filter
            x="-240%"
            y="-60%"
            width="580%"
            height="220%"
            filterUnits="objectBoundingBox"
            id="a"
          >
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix
              values="0 0 0 0 0.824756567 0 0 0 0 0.450356612 0 0 0 0 0.168550194 0 0 0 1 0"
              in="shadowBlurOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <circle fill="#F0883A" opacity=".4" cx="21" cy="21" r="20" />
          <circle fill="#F0883A" cx="21" cy="21" r="16" />
          <g filter="url(#a)" transform="translate(18.5 10.8)">
            <rect
              fill="#FFF"
              transform="matrix(1 0 0 -1 0 14.343)"
              x=".993"
              y=".955"
              width="3"
              height="12.432"
              rx="1.5"
            />
            <rect
              fill="#FFDEC5"
              transform="matrix(1 0 0 -1 0 34.405)"
              x="1.009"
              y="15.201"
              width="3"
              height="4.004"
              rx="1.5"
            />
          </g>
        </g>
      </svg>
    </div>
    <!-- success -->
    <div v-if="type === 'success'" :style="{ 'width': size, 'height': size }">
      <svg viewBox="0 0 42 42">
        <defs>
          <filter
            x="-63.2%"
            y="-80%"
            width="226.3%"
            height="260%"
            filterUnits="objectBoundingBox"
            id="a"
          >
            <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
            <feGaussianBlur stdDeviation="2" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix
              values="0 0 0 0 0.122733141 0 0 0 0 0.710852582 0 0 0 0 0.514812768 0 0 0 1 0"
              in="shadowBlurOuter1"
              result="shadowMatrixOuter1"
            />
            <feMerge>
              <feMergeNode in="shadowMatrixOuter1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <rect id="b" x="3.418" y="5.814" width="3" height="8.5" rx="1.5" />
          <linearGradient x1="50%" y1=".127%" x2="50%" y2="100%" id="c">
            <stop stop-color="#ACFFBD" stop-opacity=".208" offset="0%" />
            <stop stop-color="#10B87C" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <circle fill="#34D19D" opacity=".4" cx="21" cy="21" r="20" />
          <circle fill="#34D19D" cx="21" cy="21" r="16" />
          <g filter="url(#a)" transform="translate(11.5 14)">
            <mask id="d" fill="#fff">
              <use xlink:href="#b" />
            </mask>
            <use fill="#C4FFEB" transform="rotate(-45 4.918 10.064)" xlink:href="#b" />
            <path
              fill="url(#c)"
              mask="url(#d)"
              transform="rotate(-45 6.216 11.372)"
              d="M4.716 9.523h3v3.699h-3z"
            />
            <rect
              fill="#FFF"
              transform="scale(1 -1) rotate(-45 -5.825 0)"
              x="10.136"
              y="-1.022"
              width="3"
              height="16.509"
              rx="1.5"
            />
          </g>
        </g>
      </svg>
    </div>
    <!-- error -->
    <div v-if="type === 'error'" :style="{ 'width': size, 'height': size }">
      <svg viewBox="0 0 42 42">
        <defs>
          <linearGradient x1="99.623%" y1="50.377%" x2=".377%" y2="50.377%" id="a">
            <stop stop-color="#FFDFDF" offset="0%" />
            <stop stop-color="#F9BEBE" offset="100%" />
          </linearGradient>
          <linearGradient x1=".377%" y1="50.377%" x2="99.623%" y2="50.377%" id="b">
            <stop stop-color="#FFDFDF" offset="0%" />
            <stop stop-color="#F9BEBE" offset="100%" />
          </linearGradient>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <circle fill="#FA4350" opacity=".4" cx="21" cy="21" r="20" />
          <circle fill="#FA4350" opacity=".9" cx="21" cy="21" r="16" />
          <rect
            fill="#FFDFDF"
            transform="rotate(135 21.071 21.071)"
            x="12.571"
            y="19.571"
            width="17"
            height="3"
            rx="1.5"
          />
          <path fill="url(#a)" transform="rotate(135 19.303 22.839)" d="M17.303 21.339h4v3h-4z" />
          <path fill="url(#b)" transform="rotate(135 22.839 19.303)" d="M20.839 17.803h4v3h-4z" />
          <rect
            fill="#FFF"
            transform="rotate(45 21.071 21.071)"
            x="12.571"
            y="19.571"
            width="17"
            height="3"
            rx="1.5"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'icon',
  props: {
    type: String,
    size: {
      type: String,
      default: '42px'
    }
  }
}
</script>

<style>
</style>
