<template>
  <div class="page-tag">
    <demo-block title="基本用法">
      <wd-tag>标签</wd-tag>
      <wd-tag type="primary">标签</wd-tag>
      <wd-tag type="danger">标签</wd-tag>
      <wd-tag type="warning">标签</wd-tag>
      <wd-tag type="success">标签</wd-tag>
    </demo-block>
    <demo-block title="幽灵标签">
      <wd-tag plain>标签</wd-tag>
      <wd-tag type="primary" plain>标签</wd-tag>
      <wd-tag type="danger" plain>标签</wd-tag>
      <wd-tag type="warning" plain>标签</wd-tag>
      <wd-tag type="success" plain>标签</wd-tag>
    </demo-block>
    <demo-block title="标记标签">
      <wd-tag mark>标签</wd-tag>
      <wd-tag type="primary" mark>标签</wd-tag>
      <wd-tag type="danger" mark>标签</wd-tag>
      <wd-tag type="warning" mark>标签</wd-tag>
      <wd-tag type="success" mark>标签</wd-tag>
    </demo-block>
    <demo-block title="幽灵标记标签">
      <wd-tag mark plain>标签</wd-tag>
      <wd-tag type="primary" mark plain>标签</wd-tag>
      <wd-tag type="danger" mark plain>标签</wd-tag>
      <wd-tag type="warning" mark plain>标签</wd-tag>
      <wd-tag type="success" mark plain>标签</wd-tag>
    </demo-block>
    <demo-block title="圆角标签">
      <wd-tag round>标签</wd-tag>
      <wd-tag type="primary" round>标签</wd-tag>
      <wd-tag type="danger" round>标签</wd-tag>
      <wd-tag type="warning" round>标签</wd-tag>
      <wd-tag type="success" round>标签</wd-tag>
    </demo-block>
    <demo-block title="设置图标">
      <wd-tag icon="wd-icon-clock" mark>标签</wd-tag>
    </demo-block>
    <demo-block title="自定义颜色">
      <wd-tag color="#0083ff" bg-color="#d0e8ff">标签</wd-tag>
      <wd-tag color="#faa21e" bg-color="#faa21e" plain>标签</wd-tag>
    </demo-block>
    <demo-block title="可关闭">
      <wd-tag v-for="tag in tags" :key="tag.name" round closable @close="handleClose(tag)">{{ tag.name }}</wd-tag>
    </demo-block>
    <demo-block title="新增标签">
      <wd-tag v-for="tag in dynamicTags" :key="tag.name" closable round @close="handleClose1(tag)">{{ tag.name }}</wd-tag>
      <wd-tag round dynamic @confirm="handleConfirm"></wd-tag>  
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tags: [{
        name: '标签一'
      }, {
        name: '标签二'
      }, {
        name: '标签三'
      }],
      dynamicTags: [{
        name: '标签一'
      },
      {
        name: '标签二'
      }]
    }
  },
  methods: {
    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    handleClose1 (tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    handleConfirm (detail) {
      if (detail) {
        this.dynamicTags.push({
          name: detail
        })
      }
    }
  }
}
</script>

<style lang="scss">
.page-tag {
  .wd-tag {
    margin-right: 15px;
    margin-bottom: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
