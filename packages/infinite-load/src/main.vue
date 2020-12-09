<template>
  <div class="wd-infinite-load" ref="loadmore" @click="reload">
    <slot>
      <wd-divider v-if="isFinished">{{ finishedText || t('wd.infiniteLoad.finished') }}</wd-divider>
      <div v-if="isError">
        <template v-if="errorText">
          {{ errorText }}
        </template>
        <template v-else>
          <span class="wd-infinite-load__text">{{ t('wd.infiniteLoad.error') }}</span>
          <span class="wd-infinite-load__text is-light">{{ t('wd.infiniteLoad.retry') }}</span>
          <wd-icon name="refresh" size="16px" class="wd-infinite-load__refresh" />
        </template>
      </div>
      <div v-if="!isFinished && !isError">
        <wd-loading size="16px" class="wd-infinite-load__loading" />
        <span class="wd-infinite-load__text">{{ loadingText || t('wd.infiniteLoad.loading') }}</span>
      </div>
    </slot>
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'
import WdIcon from 'wot-design/packages/icon'
import WdDivider from 'wot-design/packages/divider'
import WdLoading from 'wot-design/packages/loading'

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
    WdIcon,
    WdDivider,
    WdLoading
  },
  watch: {
    loading (val) {
      this.$nextTick(() => {
        this.loadmore()
      })
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
      if (this.$refs.loadmore.getBoundingClientRect().top <= (this.scrollContainerHeight + this.offset) && !this.loading && !this.isFinished && !this.isError) {
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
