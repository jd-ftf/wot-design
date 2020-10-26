<template>
  <div>
    <demo-block title="基本用法">
      <wd-rate v-model="rate1" />
    </demo-block>
    <demo-block title="只读状态">
      <wd-rate v-model="rate2" readonly />
    </demo-block>
    <demo-block title="禁用状态">
      <wd-rate v-model="rate3" disabled />
    </demo-block>
    <demo-block title="修改选中颜色">
      <wd-rate style="margin-bottom: 10px;" v-model="rate4" active-color="linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)" /><br/>
      <wd-rate v-model="rate5" :active-color="['linear-gradient(180deg, rgba(255,238,0,1) 0%,rgba(250,176,21,1) 100%)', 'linear-gradient(315deg, rgba(245,34,34,1) 0%,rgba(255,117,102,1) 100%)']" />
    </demo-block>
    <demo-block title="修改icon和选中颜色">
      <wd-rate v-model="rate6" icon="wd-icon-dong" active-icon="wd-icon-dong" active-color="#4D80F0" />
    </demo-block>
    <demo-block title="修改size、space">
      <wd-rate v-model="rate7" size="30px" space="10px" />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rate1: 5,
      rate2: 3,
      rate3: 2,
      rate4: 3,
      rate5: 4,
      rate6: 2.3,
      rate7: 5
    }
  }
}
</script>
