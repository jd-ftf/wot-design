<template>
  <div class="page-tabs">
    <space title="基本用法">
      <jm-tabs v-model="tab1">
        <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </jm-tab>
      </jm-tabs>
    </space>
    <space title="滑动动画">
      <jm-tabs v-model="tab2" animated>
        <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </jm-tab>
      </jm-tabs>
    </space>
    <space title="数量大于6时可滚动">
      <jm-tabs v-model="tab3">
        <jm-tab v-for="item in 7" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </jm-tab>
      </jm-tabs>
    </space>
    <space title="数量大于10时出现导航地图">
      <jm-tabs v-model="tab4">
        <jm-tab v-for="item in 12" :key="item" :title="`标签${item}`" class="demo-tab2">
          <p>内容{{ item }}</p>
        </jm-tab>
      </jm-tabs>
    </space>
    <space title="禁用tab">
      <jm-tabs v-model="tab5">
        <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab" :disabled="item === 2">
          <p>内容{{ item }}</p>
        </jm-tab>
      </jm-tabs>
    </space>
    <space title="点击事件">
      <jm-tabs v-model="tab6" @click="handleTabClick">
        <jm-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </jm-tab>
      </jm-tabs>
    </space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab1: 1,
      tab2: 0,
      tab3: 0,
      tab4: 0,
      tab5: 0,
      tab6: 0
    }
  },
  methods: {
    handleTabClick (index) {
      this.$toast(`点击了标签${index + 1}`)
    }
  }
}
</script>

<style lang="scss">
.page-tabs {
  .demo-tab {
    height: 120px;
    text-align: center;
    line-height: 120px;
  }
  .demo-tab2 {
    height: 320px;
    text-align: center;
    line-height: 320px;
  }
  p {
    margin: 0;
  }
}
</style>
