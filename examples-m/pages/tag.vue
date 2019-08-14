<template>
  <div class="page-tag">
    <white-space title="基本用法">
      <jm-tag>标签</jm-tag>
      <jm-tag type="primary">标签</jm-tag>
      <jm-tag type="danger">标签</jm-tag>
      <jm-tag type="warning">标签</jm-tag>
      <jm-tag type="success">标签</jm-tag>
    </white-space>
    <white-space title="幽灵标签">
      <jm-tag plain>标签</jm-tag>
      <jm-tag type="primary" plain>标签</jm-tag>
      <jm-tag type="danger" plain>标签</jm-tag>
      <jm-tag type="warning" plain>标签</jm-tag>
      <jm-tag type="success" plain>标签</jm-tag>
    </white-space>
    <white-space title="标签大小">
      <jm-tag>标签</jm-tag>
      <jm-tag size="large">标签</jm-tag>
    </white-space>
    <white-space title="自定义颜色">
      <jm-tag color="#0083ff" bg-color="#d0e8ff">标签</jm-tag>
    </white-space>
    <white-space title="设置图标">
      <jm-tag icon="jm-icon-tickets">标签</jm-tag>
    </white-space>
  </div>
</template>

<style lang="scss">
.page-tag {
  .jm-tag {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
