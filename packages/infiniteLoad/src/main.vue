<template>
  <div class="jm-infinite-load" ref="loadmore" @click="reload">
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
import locale from '@/mixins/locale'
import JmIcon from '../../icon'

export default {
  name: 'JmInfiniteLoad',
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
        ? (this.finishedText || this.$t('jmd.infiniteLoad.finished'))
        : this.isError
          ? (this.errorText || this.$t('jmd.infiniteLoad.error'))
          : (this.loadingText || this.$t('jmd.infiniteLoad.loading'))
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
  },
  beforeDestroy () {
    this.scrollObj.removeEventListener('scroll', this.loadmore)
  }
}
</script>
