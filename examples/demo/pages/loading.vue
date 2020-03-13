<template>
  <div class="page-loading">
    <demo-block title="基本用法，circle 类型，可以修改指示器颜色">
      <wd-loading />
      <wd-loading color="#fff" class="loading-black" />
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
