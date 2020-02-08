<template>
  <div>
    <space title="基本用法">
      <wd-swipe-action v-model="value" :before-close="beforeClose">
        <div slot="left" class="action">
          <div class="button" style="background: #C8C7CD;">操作1</div>
          <div class="button" style="background: #FFB300;">操作2</div>
          <div class="button" style="background: #E2231A;">操作3</div>
        </div>
        <wd-cell title="标题文字" value="内容"/>
        <div slot="right" class="action">
          <div class="button" style="background: #C8C7CD;">操作1</div>
          <div class="button" style="background: #FFB300;">操作2</div>
          <div class="button" style="background: #E2231A;">操作3</div>
        </div>
      </wd-swipe-action>
    </space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'right'
    }
  },
  methods: {
    beforeClose (reason, position) {
    }
  }
}
</script>
<style>
  .action {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .button{
    display: inline-block;
    width: 40px;
    height: 100%;
    color: white;
    line-height: 46px;
    text-align: center;
  }
</style>
