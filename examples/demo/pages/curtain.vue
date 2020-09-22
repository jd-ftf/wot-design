<template>
  <div class="page-curtain">
    <demo-block title="基本用法">
      <wd-button @click="show1 = true">关闭按钮在内部</wd-button>
      <wd-curtain v-model="show1" :src="img" to="//m.jd.com"></wd-curtain>
    </demo-block>
    <demo-block title="修改按钮位置">
      <div>
        <wd-button @click="show4 = true">左上</wd-button>
        <wd-curtain v-model="show4" close-position="top-left" :src="img" to="//m.jd.com" width="200px"></wd-curtain>

        <wd-button @click="show2 = true">顶部</wd-button>
        <wd-curtain v-model="show2" close-position="top" :src="img" to="//m.jd.com" width="200px"></wd-curtain>

        <wd-button @click="show5 = true">右上</wd-button>
        <wd-curtain v-model="show5" close-position="top-right" :src="img" to="//m.jd.com" width="240px"></wd-curtain>
      </div>

      <div>
        <wd-button @click="show6 = true">左下</wd-button>
        <wd-curtain v-model="show6" close-position="bottom-left" :src="img" to="//m.jd.com" width="240px" ></wd-curtain>

        <wd-button @click="show3 = true">底部</wd-button>
        <wd-curtain v-model="show3" close-position="bottom" :src="img" to="//m.jd.com"></wd-curtain>

        <wd-button @click="show7 = true">右下</wd-button>
        <wd-curtain v-model="show7" close-position="bottom-right" :src="img" to="//m.jd.com" width="240px"></wd-curtain>
      </div>

    </demo-block>
    <demo-block title="点击遮罩关闭">
      <wd-button @click="show9 = true">点击遮罩关闭</wd-button>
      <wd-curtain v-model="show9" :src="img" to="//m.jd.com" width="240px" close-on-click-modal></wd-curtain>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      img: 'https://img20.360buyimg.com/da/jfs/t1/141592/25/8861/261559/5f68d8c1E33ed78ab/698ad655bfcfbaed.png',
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false
    }
  }
}
</script>

<style lang="scss">
.page-curtain {
  .wd-button {
    margin: 0 10px 10px 0;
  }
}
</style>
