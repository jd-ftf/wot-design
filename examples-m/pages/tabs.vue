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
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab1: 1,
      tab2: 0,
      tab3: 0
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
  p {
    margin: 0;
  }
}
</style>
