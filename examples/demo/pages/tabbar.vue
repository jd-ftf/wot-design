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
    <space title="修改颜色">
      <jm-tabbar v-model="tabbar3" active-color="#f00" badge-color="#0083ff">
        <jm-tabbar-item icon="jm-icon-cart" dot>购物车</jm-tabbar-item>
        <jm-tabbar-item icon="jm-icon-collect">收藏</jm-tabbar-item>
        <jm-tabbar-item icon="jm-icon-person">我</jm-tabbar-item>
      </jm-tabbar>
    </space>
    <space title="路由模式">
      <jm-tabbar>
        <jm-tabbar-item icon="jm-icon-cart" to="/tabbar">标签栏</jm-tabbar-item>
        <jm-tabbar-item icon="jm-icon-collect" to="/button">按钮</jm-tabbar-item>
        <jm-tabbar-item icon="jm-icon-person" to="https://m.jd.com">京东</jm-tabbar-item>
      </jm-tabbar>
    </space>
    <jm-tabbar v-model="tabbar4" fixed border>
      <jm-tabbar-item icon="jm-icon-cart">购物车</jm-tabbar-item>
      <jm-tabbar-item icon="jm-icon-collect">收藏</jm-tabbar-item>
      <jm-tabbar-item icon="jm-icon-person">我</jm-tabbar-item>
    </jm-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabbar1: 0,
      tabbar2: 0,
      tabbar3: 0,
      tabbar4: 0
    }
  }
}
</script>
