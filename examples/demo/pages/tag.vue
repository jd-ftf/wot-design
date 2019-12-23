<template>
  <div class="page-tag">
    <white-space title="基本用法">
      <wd-tag>标签</wd-tag>
      <wd-tag type="primary">标签</wd-tag>
      <wd-tag type="danger">标签</wd-tag>
      <wd-tag type="warning">标签</wd-tag>
      <wd-tag type="success">标签</wd-tag>
    </white-space>
    <white-space title="幽灵标签">
      <wd-tag plain>标签</wd-tag>
      <wd-tag type="primary" plain>标签</wd-tag>
      <wd-tag type="danger" plain>标签</wd-tag>
      <wd-tag type="warning" plain>标签</wd-tag>
      <wd-tag type="success" plain>标签</wd-tag>
    </white-space>
    <white-space title="标签大小">
      <wd-tag size="small">标签</wd-tag>
      <wd-tag>标签</wd-tag>
      <wd-tag size="large">标签</wd-tag>
    </white-space>
    <white-space title="自定义颜色">
      <wd-tag color="#0083ff" bg-color="#d0e8ff">标签</wd-tag>
      <wd-tag color="#faa21e" bg-color="#faa21e" plain>标签</wd-tag>
    </white-space>
    <white-space title="设置图标">
      <wd-tag icon="wd-icon-tickets">标签</wd-tag>
    </white-space>
    <white-space title="可关闭">
      <wd-tag v-for="tag in tags" :key="tag.name" type="primary" closable :size="tag.size" plain @close="handleClose(tag)">{{ tag.name }}</wd-tag>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: [{
        name: '标签一',
        size: 'small'
      }, {
        name: '标签二',
        size: 'medium'
      }, {
        name: '标签三',
        size: 'large'
      }]
    }
  },
  methods: {
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    }
  }
}
</script>

<style lang="scss">
.page-tag {
  .wd-tag {
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
