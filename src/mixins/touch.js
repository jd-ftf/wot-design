import Vue from 'vue'

const MIN_DISTANCE = 5

function getDirection (offsetX, offsetY) {
  if (offsetX > MIN_DISTANCE || offsetY > MIN_DISTANCE) {
    return offsetX > offsetY ? 'horizontal' : 'vertical'
  }

  return ''
}

export default Vue.extend({
  data () {
    return {
      direction: '',
      accurateDirection: '' // 详细方向
    }
  },
  methods: {
    touchStart (event) {
      this.resetTouchStatus()
      this.startX = event.touches[0].clientX
      this.startY = event.touches[0].clientY
    },
    touchMove (event) {
      const touch = event.touches[0]
      this.deltaX = touch.clientX - this.startX
      this.deltaY = touch.clientY - this.startY
      this.offsetX = Math.abs(this.deltaX)
      this.offsetY = Math.abs(this.deltaY)
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY)
      if (this.direction === 'horizontal') {
        this.accurateDirection = this.deltaX > 0 ? 'right' : 'left'
      } else if (this.direction === 'vertical') {
        this.accurateDirection = this.deltaY > 0 ? 'down' : 'up'
      }
    },
    resetTouchStatus () {
      this.direction = ''
      this.accurateDirection = ''
      this.deltaX = 0
      this.deltaY = 0
      this.offsetX = 0
      this.offsetY = 0
    }
  }
})
