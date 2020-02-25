<template>
  <div class="page-navbar">
    <demo-block title="默认深色Navbar" transparent>
      <wd-navbar title="标题"></wd-navbar>
      <wd-navbar title="左侧文字">
        <div slot="left">
          <wd-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
      </wd-navbar>
      <wd-navbar title="右侧文字">
        <span slot="right">菜单</span>
      </wd-navbar>
      <wd-navbar title="左右侧文字">
        <div slot="left">
          <wd-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
        <span slot="right">菜单</span>
      </wd-navbar>
      <wd-navbar title="标题的字数如果太多则超出隐藏">
        <div slot="left">
          <wd-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
      </wd-navbar>
    </demo-block>
    <demo-block title="淡色Navbar" transparent>
      <wd-navbar title="标题" light></wd-navbar>
      <wd-navbar title="左侧文字" light>
        <div slot="left">
          <wd-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
      </wd-navbar>
      <wd-navbar title="右侧文字" light>
        <span slot="right">菜单</span>
      </wd-navbar>
      <wd-navbar title="左右侧文字" light>
        <div slot="left">
          <wd-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
        <span slot="right">菜单</span>
      </wd-navbar>
      <wd-navbar title="标题的字数如果太多则超出隐藏" light>
        <div slot="left">
          <wd-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
      </wd-navbar>
    </demo-block>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss">
.page-navbar {
  .wd-navbar {
    margin: 10px 0;
  }
  .middle {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
