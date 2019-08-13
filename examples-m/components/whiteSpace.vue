<template>
  <div class="whitespace" :style="{ background: color }">
    <div class="desc">
      <slot name="desc">{{ title }}</slot>
    </div>
    <div class="demo" :style="{ margin: `${ver}px ${hor}px` }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * 留白，默认上下10px，左右0px
 */
export default {
  name: 'WhiteSpace',
  props: {
    ver: {
      type: Number,
      default: 10
    },
    hor: {
      type: Number,
      default: 15
    },
    color: {
      type: String,
      default: '#fff'
    },
    title: String
  }
}
</script>

<style lang="scss">
.whitespace {
  margin: 15px 0;
  color: #666;
  background: #fff;
  overflow: hidden;

  .desc {
    padding: 0 15px;
    margin: 10px 0;
    background: #fff;
  }
  p {
    margin: 0 0 10px;
    padding: 0;
  }
  .tip {
    color: #999;
  }
  .item {
    margin-bottom: 10px;
  }
  .demo {
    margin: 10px 0;
  }
  .demo-item {
    margin: 10px 0;
  }
}
</style>
