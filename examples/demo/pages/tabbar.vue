<template>
  <div>
    <space title="基本用法">
      <wd-tabbar v-model="tabbar1">
        <wd-tabbar-item icon="wd-icon-cart">购物车</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-collect">收藏</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-person">我</wd-tabbar-item>
      </wd-tabbar>
    </space>
    <space title="显示角标">
      <wd-tabbar v-model="tabbar2">
        <wd-tabbar-item icon="wd-icon-cart" dot>购物车</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-collect" value="new">收藏</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-person" :value="7">我</wd-tabbar-item>
      </wd-tabbar>
    </space>
    <space title="修改颜色">
      <wd-tabbar v-model="tabbar3" active-color="#f00" badge-color="#0083ff">
        <wd-tabbar-item icon="wd-icon-cart" dot>购物车</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-collect">收藏</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-person">我</wd-tabbar-item>
      </wd-tabbar>
    </space>
    <space title="路由模式">
      <wd-tabbar>
        <wd-tabbar-item icon="wd-icon-cart" to="/tabbar">标签栏</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-collect" to="/button">按钮</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-person" to="https://m.jd.com">京东</wd-tabbar-item>
      </wd-tabbar>
    </space>
    <wd-tabbar v-model="tabbar4" fixed border>
      <wd-tabbar-item icon="wd-icon-cart">购物车</wd-tabbar-item>
      <wd-tabbar-item icon="wd-icon-collect">收藏</wd-tabbar-item>
      <wd-tabbar-item icon="wd-icon-person">我</wd-tabbar-item>
    </wd-tabbar>
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
