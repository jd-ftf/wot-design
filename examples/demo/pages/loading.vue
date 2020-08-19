<template>
  <div class="page-loading">
    <demo-block title="基本用法，circle-outline 类型">
      <wd-loading />
    </demo-block>
    <demo-block title="circle 类型，可以修改指示器颜色">
      <wd-loading type="circle" />
      <wd-loading type="circle" color="#fff" class="loading-black" />
    </demo-block>
    <demo-block title="circular-ring 类型，可以修改指示器颜色">
      <wd-loading type="circular-ring" />
      <wd-loading type="circular-ring" color="#faa3ee" intermediate-color="pink" />
    </demo-block>
    <demo-block title="spinner类型">
      <wd-loading type="spinner" />
      <wd-loading type="spinner" color="#fff" class="loading-black" />
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
  .loading-black {
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: 4px;
  }
}
</style>
