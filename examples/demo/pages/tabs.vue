<template>
  <div class="page-tabs">
    <demo-block title="基本用法" transparent>
      <wd-tabs v-model="tab1">
        <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="滑动动画" transparent>
      <wd-tabs v-model="tab2" animated>
        <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="粘性布局" transparent>
      <wd-tabs v-model="tab3" sticky :offset-top="44">
        <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="禁用tab" transparent>
      <wd-tabs v-model="tab4">
        <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab" :disabled="item === 2">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="点击事件" transparent>
      <wd-tabs v-model="tab5" @click="handleTabClick">
        <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="自定义标题" transparent>
      <wd-tabs v-model="tab6">
        <wd-tab v-for="item in 4" :key="item" class="demo-tab">
          <div slot="title">
            <i class="wd-icon-tickets"></i>
            <span>{{ `标签${item}` }}</span>
          </div>
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="延迟渲染" transparent>
      <wd-tabs v-model="tab7" lazy-render>
        <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="手势滑动" transparent>
      <wd-tabs v-model="tab8" swipeable>
        <wd-tab v-for="item in 4" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="数量大于6时可滚动" transparent>
      <wd-tabs v-model="tab9">
        <wd-tab v-for="item in 7" :key="item" :title="`标签${item}`" class="demo-tab">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
    <demo-block title="数量大于10时出现导航地图" transparent>
      <wd-tabs v-model="tab10">
        <wd-tab v-for="item in 11" :key="item" :title="`标签${item}`" class="demo-tab2">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    </demo-block>
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
      tab6: 0,
      tab7: 0,
      tab8: 0,
      tab9: 0,
      tab10: 0
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
