<template>
  <div>
    <white-space title="基本用法">
      <jm-button type="primary" plain @click="show1 = true">弹出层</jm-button>
      <jm-popup v-model="show1" :style="{ 'width': '100px', 'height': '100px' }"></jm-popup>
    </white-space>
    <white-space title="弹出位置">
      <jm-button type="primary" plain @click="show2 = true">顶部</jm-button>
      <jm-popup v-model="show2" position="top" :style="{ 'height': '200px' }"></jm-popup>
      <jm-button type="primary" plain @click="show3 = true">右侧</jm-button>
      <jm-popup v-model="show3" position="right" :style="{ 'width': '200px' }"></jm-popup>
      <jm-button type="primary" plain @click="show4 = true">底部</jm-button>
      <jm-popup v-model="show4" position="bottom" :style="{ 'height': '200px' }"></jm-popup>
      <jm-button type="primary" plain @click="show5 = true">左侧</jm-button>
      <jm-popup v-model="show5" position="left" :style="{ 'width': '200px' }"></jm-popup>
    </white-space>
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
      show5: false
    }
  }
}
</script>
