<template>
  <div class="page-cell">
    <jm-cell title="标题文字"></jm-cell>
    <jm-cell title="标题文字" value="说明文字"></jm-cell>
    <jm-cell title="标题文字" icon="jm-icon-star-fill">
      <span>icon 是图片</span>
      <img slot="icon" src="https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png" width="24" height="24">
    </jm-cell>
    <jm-cell title="标题文字" icon="jm-icon-star-fill" value="带 icon"></jm-cell>
    <jm-cell icon="jm-icon-star-fill">
      <span>title</span>
      <span slot="title">标题文字<label class="end-time">还有25天到期</label></span>
    </jm-cell>
    <jm-cell title="标题文字" is-link value="带链接"></jm-cell>
    <jm-cell title="标题文字" is-link>
      <span style="color: green">这里是元素</span>
    </jm-cell>
    <jm-cell title="标题文字">
      <jm-button size="small" type="primary" plain>按钮</jm-button>
    </jm-cell>

    <jm-cell title="标题" label="描述信息" is-link></jm-cell>

    <jm-cell title="原生跳转" label="跳转到 http://beta-jmw.jd.com" is-link to="http://beta-jmw.jd.com/lib/jm-design/docs.html"></jm-cell>
    <jm-cell title="路由跳转" label="跳转到 /#/button" is-link :to="{ path: '/button' }"></jm-cell>
  </div>
</template>

<script>
export default {
}
</script>
<style lang="scss">
  .end-time{
    margin-left: 8px;
    border: 1px solid #faa21e;
    padding: 0 4px;
    font-size: 10px;
    color: #faa21e;
  }
</style>
