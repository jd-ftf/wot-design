<template>
  <div>
    <space title="基本用法">
      <jm-tabbar v-model="tabbar1">
        <jm-tabbar-item icon="jm-icon-cart">购物车</jm-tabbar-item>
        <jm-tabbar-item icon="jm-icon-collect">收藏</jm-tabbar-item>
        <jm-tabbar-item icon="jm-icon-person">我</jm-tabbar-item>
      </jm-tabbar>
    </space>
    <space title="显示角标">
      <jm-tabbar v-model="tabbar2">
        <jm-tabbar-item icon="jm-icon-cart" dot>购物车</jm-tabbar-item>
        <jm-tabbar-item icon="jm-icon-collect" value="new">收藏</jm-tabbar-item>
        <jm-tabbar-item icon="jm-icon-person" :value="7">我</jm-tabbar-item>
      </jm-tabbar>
    </space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabbar1: 0,
      tabbar2: 0
    }
  }
}
</script>
