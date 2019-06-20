<template>
  <div class="page-button">
    <white-space>
      <div slot="desc">基本用法 <code>type</code></div>
      <jm-button>默认按钮</jm-button>
      <jm-button type="primary">主要按钮</jm-button>
      <jm-button type="success">成功按钮</jm-button>
      <jm-button type="info">信息按钮</jm-button>
      <jm-button type="warning">警告按钮</jm-button>
      <jm-button type="error">危险按钮</jm-button>
    </white-space>
    <white-space>
      <div slot="desc">幽灵按钮 <code>plain</code></div>
      <jm-button type="primary" plain>主要按钮</jm-button>
      <jm-button type="success" plain>成功按钮</jm-button>
      <jm-button type="info" plain>信息按钮</jm-button>
      <jm-button type="warning" plain>警告按钮</jm-button>
      <jm-button type="error" plain>危险按钮</jm-button>
    </white-space>
    <white-space>
      <div slot="desc">圆角按钮 <code>round</code></div>
      <jm-button round>圆角按钮</jm-button>
      <jm-button type="primary" round>主要按钮</jm-button>
      <jm-button type="success" round>成功按钮</jm-button>
      <jm-button type="info" round>信息按钮</jm-button>
      <jm-button type="warning" round>警告按钮</jm-button>
      <jm-button type="error" round>危险按钮</jm-button>
    </white-space>
    <white-space>
      <div slot="desc">按钮大小 <code>size</code></div>
      <jm-button type="primary" size="small">小号按钮</jm-button>
      <jm-button type="primary" size="medium">中号按钮</jm-button>
      <jm-button type="primary" size="large">大号按钮</jm-button>
    </white-space>
    <white-space>
      <div slot="desc">加载中 <code>loading</code></div>
      <jm-button loading>加载中</jm-button>
      <jm-button type="primary" loading>加载中</jm-button>
      <jm-button type="primary" plain loading>加载中</jm-button>
    </white-space>
    <white-space :hor="0">
      <div slot="desc">吸顶按钮 <code>suck</code></div>
      <jm-button type="primary" suck>主要按钮</jm-button>
      <jm-button type="success" suck>成功按钮</jm-button>
      <jm-button type="info" suck>信息按钮</jm-button>
      <jm-button type="warning" suck>警告按钮</jm-button>
      <jm-button type="error" suck>危险按钮</jm-button>
    </white-space>
    <jm-button type="primary" plain suck>主要按钮</jm-button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.page-button {
  .jm-button {
    margin: 0 10px 10px 0;
  }
}
</style>
