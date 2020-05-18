<template>
  <div class="page-swipe">
    <demo-block title="基本用法" transparent>
      <wd-swipe class="number-swipe">
        <wd-swipe-item v-for="item in 4" :key="item">
          {{ item }}
        </wd-swipe-item>
      </wd-swipe>
    </demo-block>
    <demo-block title="禁止循环和自动轮播" transparent>
      <wd-swipe class="number-swipe" :loop="false" :autoplay="false" @change="toastChange">
        <wd-swipe-item v-for="item in 4" :key="item">
          {{ item }}
        </wd-swipe-item>
      </wd-swipe>
    </demo-block>
    <demo-block title="留白" transparent>
      <wd-swipe hide-indicators :autoplay="false" :space="80/750">
        <wd-swipe-item v-for="item in imgs" :key="item">
          <img :src="item" class="swipe-img" />
        </wd-swipe-item>
      </wd-swipe>
    </demo-block>
    <demo-block title="自定义指示器" transparent>
      <wd-swipe class="number-swipe" @change="handleItemChange">
        <wd-swipe-item v-for="item in 4" :key="item">
          {{ item }}
        </wd-swipe-item>
        <template #indicators>
          <div class="custom-indicators">
            {{ customIndex + 1 }}/4
          </div>
        </template>
      </wd-swipe>
    </demo-block>
    <demo-block title="关闭动画效果" transparent>
      <wd-swipe class="number-swipe" :animate="false">
        <wd-swipe-item v-for="item in 4" :key="item">
          {{ item }}
        </wd-swipe-item>
      </wd-swipe>
    </demo-block>
    <demo-block title="纵向轮播" transparent>
      <wd-swipe class="number-swipe" vertical height="150px">
        <wd-swipe-item v-for="item in 4" :key="item">
          {{ item }}
        </wd-swipe-item>
      </wd-swipe>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      customIndex: 0,
      imgs: [
        'https://img30.360buyimg.com/devcenter/jfs/t1/47708/13/3247/68416/5d119a5eE3b04b412/d55f472913a293b3.png',
        'http://img30.360buyimg.com/devcenter/jfs/t1/33487/36/14611/31132/5d119a8bE22f01602/e3201f041e75d25e.png',
        'http://img30.360buyimg.com/devcenter/jfs/t1/52089/14/3352/53783/5d119ab8Ef9427f75/8f679674dca7d798.png'
      ]
    }
  },
  methods: {
    toastChange (index) {
      this.$toast(`轮播到第${index + 1}张`)
    },
    handleItemChange (index) {
      this.customIndex = index
    }
  }
}
</script>

<style lang="scss">
.page-swipe {
  .number-swipe {
    .wd-swipe-item {
      line-height: 150px;
      background: #0083ff;
      text-align: center;
      color: #fff;
      font-size: 18px;

      &:nth-child(even) {
        background: #3f98ec;
      }
    }
  }
  .custom-indicators {
    position: absolute;
    right: 10px;
    bottom: 10px;
    font-size: 12px;
    color: #fff;
  }
  .swipe-img {
    width: 100%;
    height: 185 / 375 * 100vw;
    border-radius: 8px;
  }
}
</style>
