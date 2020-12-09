<template>
  <div class="wd-status-tip">
    <img class="wd-status-tip__img" :src="imgName">
    <p v-if="tip && tip.length !== 0" class="wd-status-tip__text">{{tip}}</p>
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
    tip: {
      type: String,
      default: ''
    }
  },
  computed: {
    imgName () {
      switch (this.type) {
        case 'collect':
          return '//img11.360buyimg.com/ftfman/jfs/t1/146876/19/17683/28878/5fd03b70E2e029d9d/b3ebf4444ec144cf.png'
        case 'comment':
          return '//img11.360buyimg.com/ftfman/jfs/t1/136543/33/19003/31469/5fd03b92E510000ff/0f9f2f302d8c084f.png'
        case 'content':
          return '//img11.360buyimg.com/ftfman/jfs/t1/140894/19/17605/31485/5fd03b8dE22c82234/0506be411332b914.png'
        case 'halo':
          return '//img11.360buyimg.com/ftfman/jfs/t1/137867/20/17583/28484/5fd03b96E99da5386/eae93dc441c061b6.png'
        case 'message':
          return '//img11.360buyimg.com/ftfman/jfs/t1/145522/14/17551/32214/5fd03b9aE7de897d8/066e511adebe4223.png'
        case 'network':
          return '//img11.360buyimg.com/ftfman/jfs/t1/148420/6/17526/26156/5fd03b9eE0119edb0/0d93541f6085c74c.png'
        case 'search':
          return '//img11.360buyimg.com/ftfman/jfs/t1/130609/24/19259/35205/5fd03cc7E49456a46/4fb443c24e0cf799.png'
        default:
          return '//img11.360buyimg.com/ftfman/jfs/t1/148420/6/17526/26156/5fd03b9eE0119edb0/0d93541f6085c74c.png'
      }
    }
  }
}
</script>
