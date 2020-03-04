<template>
  <div class="page-img">
    <demo-block title="基本用法">
      <wd-img width="100" height="100" :src="joy" alt="joy" />
    </demo-block>
    <demo-block title="填充">
      <div class="col" v-for="fit in fits">
        <wd-img width="100%" height="27vw" :src="joy" :fit="fit" />
        <div class="center">{{fit}}</div>
      </div>
    </demo-block>
    <demo-block title="圆形">
      <div class="col" v-for="fit in fits">
        <wd-img round width="100%" height="27vw" :src="joy" :fit="fit" />
        <div class="center">{{fit}}</div>
      </div>
    </demo-block>
  </div>
</template>

<script>
import Joy from '../assets/img/joy.png'
export default {
  data () {
    return {
      joy: Joy,
      fits: ['contain', 'cover', 'fill', 'none', 'scale-down']
    }
  }
}
</script>

<style lang="scss">
  .col {
    float: left;
    width: 33.333%;
    box-sizing: border-box;
    min-height: 1px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
  }
  .center {
    text-align: center;
  }
</style>
