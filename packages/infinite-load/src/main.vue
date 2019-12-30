<template>
  <div class="wd-infinite-load" ref="loadmore" @click="reload">
    <slot>
      <wd-icon
        v-show="!isFinished && !isError"
        name="news"
        size="20px"
        class="wd-infinite-load__indicator" />
      <span class="wd-infinite-load__text">{{ showText }}</span>
    </slot>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'
import WdIcon from 'wot-design/packages/icon'

export default {
  name: 'WdInfiniteLoad',
  mixins: [locale],
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
    loadingText: String,
    finishedText: String,
    errorText: String,
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
    WdIcon
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
        ? (this.finishedText || this.t('wd.infiniteLoad.finished'))
        : this.isError
          ? (this.errorText || this.t('wd.infiniteLoad.error'))
          : (this.loadingText || this.t('wd.infiniteLoad.loading'))
    }
  },
  methods: {
    reset () {
      this.isFinished = false
      this.isError = false
      this.scrollObj.addEventListener('scroll', this.loadmore)
      this.immediateCheck && this.loadmore()
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
    this.reset()
  },
  beforeDestroy () {
    this.scrollObj.removeEventListener('scroll', this.loadmore)
  }
}
</script>
