<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-grid>
        <wd-grid-item icon="picture" text="文字" v-for="i in 4" :key="i"/>
      </wd-grid>
    </demo-block>
    <demo-block title="自定义列数" transparent>
      <wd-grid :column="4">
        <wd-grid-item icon="picture" text="文字" v-for="i in 8" :key="i"/>
      </wd-grid>
    </demo-block>
    <demo-block title="内容插槽" transparent>
      <wd-grid>
        <wd-grid-item v-for="i in 3" :key="i" >
          <img class="img" src="../assets/img/jd.png" />
        </wd-grid-item>
      </wd-grid>
    </demo-block>
    <demo-block title="单个插槽" transparent>
      <wd-grid :column="3">
        <wd-grid-item text="文字" v-for="i in 3" :key="i" >
          <img slot="icon" class="slot-img" src="../assets/img/jd.png" />
        </wd-grid-item>
      </wd-grid>
    </demo-block>
    <demo-block title="单个插槽" transparent>
      <wd-grid :column="3">
        <wd-grid-item icon="picture" v-for="i in 3" :key="i">
          <div slot="text" class="text">
            这是一段测试数字
          </div>
        </wd-grid-item>
      </wd-grid>
    </demo-block>
    <demo-block title="正方形格子" transparent>
      <wd-grid square :column="4">
        <wd-grid-item icon="picture" text="文字" v-for="i in 8" :key="i"/>
      </wd-grid>
    </demo-block>
    <demo-block title="设定格间隙" transparent>
      <wd-grid :gutter="10" :column="4">
        <wd-grid-item icon="picture" text="文字"  v-for="i in 8" :key="i"/>
      </wd-grid>
    </demo-block>
    <demo-block title="页面导航" transparent>
      <wd-grid clickable>
        <wd-grid-item :to="href" @item-click="click" icon="person" text="location to ..." />
        <wd-grid-item :to="{ path: '/button' }" @item-click="click" icon="link" text="RouterLink to ..." />
      </wd-grid>
    </demo-block>
    <demo-block title="提示信息" transparent>
      <wd-grid>
        <wd-grid-item is-dot icon="cart" text="文字" />
        <wd-grid-item :value="100" :max="99" icon="chat-bubble" text="文字" />
      </wd-grid>
    </demo-block>
  </div>
</template>

<script>

export default {
  data () {
    return {
      href: location.href.split('#')[0]
    }
  },
  methods: {
    click (event) {
      console.log('点击', event)
    }
  }
}
</script>

<style scoped>
.custom-item{
  height: 80px !important;
  color: #e2231a;
  padding-left: 20px;
  text-align: left !important;
}
.img{
  width: 100%;
  height: 90px;
}
.slot-img{
  height: 50px;
  width: 50px;
  margin-bottom: 5px;
}
.text{
  color: #ffb300;
  margin-top: 5px;
}
</style>
