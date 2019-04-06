<template>
  <div v-show="!isFinished || finishedText" class="jm-infinite-load" ref="loadmore" @click="reload">
    <slot>
      <jm-icon
        v-show="!isFinished && !isError"
        name="news"
        size="20px"
        class="jm-infinite-load__indicator" />
      <span class="jm-infinite-load__text">{{ showText }}</span>
    </slot>
  </div>
</template>

<script>
import JmIcon from '../../icon'

export default {
  name: 'JmInfiniteLoad',
  data () {
    return {
      isError: false,
      isFinished: false,
      scrollContainerHeight: 0,
      scrollObj: window
    }
  },
  props: {
    loading: Boolean,
    loadingText: {
      type: String,
      default: '加载中...'
    },
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    errorText: {
      type: String,
      default: '加载失败，点击重试'
    },
    offset: {
      type: Number,
      default: 50
    },
    immediateCheck: {
      type: Boolean,
      default: true
    }
  },
  components: {
    JmIcon
  },
  watch: {
    loading (val) {
      this.$nextTick(() => {
        this.loadmore()
      })
    }
  },
  computed: {
    showText () {
      return this.isFinished
        ? this.finishedText
        : this.isError
          ? this.errorText : this.loadingText
    }
  },
  methods: {
    resetListener () {
      this.isFinished = false
      this.scrollObj.addEventListener('scroll', this.loadmore)
    },
    loadmore () {
      if (this.$refs.loadmore.getBoundingClientRect().top <= (this.scrollContainerHeight + this.offset) && !this.loading) {
        this.$emit('loadmore')
      }
    },
    loadEnd () {
      this.isFinished = true
      this.scrollObj.removeEventListener('scroll', this.loadmore)
    },
    loadError () {
      this.isError = true
    },
    reload () {
      this.isError = false
      this.$emit('loadmore')
    },
    setContainer () {
      let parentNode = this.$refs.loadmore.parentNode
      let style = window.getComputedStyle(parentNode)

      while (style.overflow !== 'auto' &&
        style.overflow !== 'scroll' &&
        style.overflowY !== 'auto' &&
        style.overflowY !== 'scroll' &&
        parentNode.tagName !== 'BODY') {
        parentNode = parentNode.parentNode
        style = window.getComputedStyle(parentNode)
      }

      if (parentNode.tagName === 'BODY') {
        this.scrollObj = window
        this.scrollContainerHeight = document.documentElement.clientHeight
      } else {
        this.scrollObj = parentNode
        this.scrollContainerHeight = parentNode.offsetHeight
      }
    }
  },
  mounted () {
    this.setContainer()
    this.resetListener()
    this.immediateCheck && this.loadmore()
  }
}
</script>
