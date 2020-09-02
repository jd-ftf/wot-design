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
          return '//img11.360buyimg.com/ftfman/jfs/t1/148663/13/7213/25961/5f4e168bEbe3d2737/893e70e0a102fd67.png'
        case 'comment':
          return '//img11.360buyimg.com/ftfman/jfs/t1/126956/32/11684/26254/5f4e16d7E3d242ac3/33c0bc78a8403651.png'
        case 'content':
          return '//img11.360buyimg.com/ftfman/jfs/t1/110808/18/19406/27939/5f4e16e9E9605a4d6/4326440f10c00461.png'
        case 'halo':
          return '//img11.360buyimg.com/ftfman/jfs/t1/128362/20/11364/22220/5f4e16fbE2f203938/a98687769030a42d.png'
        case 'message':
          return '//img11.360buyimg.com/ftfman/jfs/t1/121735/36/11584/28302/5f4e170dE5838662d/d34b027fe9938bef.png'
        case 'network':
          return '//img11.360buyimg.com/ftfman/jfs/t1/147117/23/7326/21362/5f4e1708E9dd45767/070c33bc6bbdced3.png'
        case 'search':
          return '//img11.360buyimg.com/ftfman/jfs/t1/137154/17/8858/31689/5f4e1711Ecd5eb6f8/68fc5b9677caac1f.png'
        default:
          return '//img11.360buyimg.com/ftfman/jfs/t1/147117/23/7326/21362/5f4e1708E9dd45767/070c33bc6bbdced3.png'
      }
    }
  }
}
</script>
