<template>
  <div class="wd-status-tip">
    <img class="wd-status-tip__img" :src="imgName">
    <p class="wd-status-tip__text">{{text}}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WdStatusTip',
  props: {
    type: {
      type: String,
      default: 'network'
    },
    tip: String
  },
  data () {
    return {
    }
  },
  computed: {
    imgName () {
      const imgFiles = require.context('../img', false, /.svg$/)
      try {
        return imgFiles(`./default-${this.type}.svg`)
      } catch (e) {
        return imgFiles(`./default-network.svg`)
      }
    },
    text () {
      let defaultTip = {
        'search': '当前搜索无结果',
        'notfound': '该页面暂时无法访问',
        'network': '请检查您的网络重新加载吧',
        'content': '暂无内容',
        'collect': '暂无收藏',
        'comment': '暂无评论',
        'pay': '支付失败，请重新订购',
        'subscribe': '已订阅全部消息'
      }
      if (this.tip && this.tip.length !== 0) {
        return this.tip
      } else {
        return defaultTip[this.type]
      }
    }

  },
  methods: {
  }
}
</script>
