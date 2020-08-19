<template>
  <div class="page-popup">
    <demo-block title="基本用法">
      <wd-button @click="show1 = true">弹出层</wd-button>
      <wd-popup v-model="show1" :style="{ 'padding': '30px 40px' }">内容</wd-popup>
    </demo-block>
    <demo-block title="弹出位置">
      <wd-button @click="show2 = true">顶部</wd-button>
      <wd-popup v-model="show2" position="top" :style="{ 'height': '200px' }"></wd-popup>
      <wd-button @click="show3 = true">右侧</wd-button>
      <wd-popup v-model="show3" position="right" :style="{ 'width': '200px' }"></wd-popup>
      <wd-button @click="show4 = true">底部</wd-button>
      <wd-popup v-model="show4" position="bottom" :style="{ 'height': '200px' }"></wd-popup>
      <wd-button @click="show5 = true">左侧</wd-button>
      <wd-popup v-model="show5" position="left" :style="{ 'width': '200px' }"></wd-popup>
    </demo-block>
    <demo-block title="关闭按钮">
      <wd-button @click="show6 = true">关闭按钮</wd-button>
      <wd-popup v-model="show6" position="bottom" :style="{ 'height': '200px' }" closable></wd-popup>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false
    }
  }
}
</script>

<style lang="scss">
.page-popup {
  .wd-button {
    margin: 0 10px 0 0;
  }
}
</style>
