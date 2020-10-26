<template>
  <div class="page-loading">
    <demo-block title="基本用法，circle-outline 类型（适用于按钮加载状态和页面轻提示）">
      <wd-loading />
    </demo-block>
    <demo-block title="circular-ring 类型，可以修改指示器颜色（适用于通用模块加载）">
      <wd-loading type="circular-ring" />
      <wd-loading type="circular-ring" color="#faa3ee" intermediate-color="pink" />
    </demo-block>
    <demo-block title="修改指示器的大小">
      <wd-loading size="20px" />
      <wd-loading size="30px" />
      <wd-loading size="50px" />
    </demo-block>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.page-loading {
  .wd-loading {
    display: inline-block;
    margin: 10px 10px 10px 0;
  }
}
</style>
