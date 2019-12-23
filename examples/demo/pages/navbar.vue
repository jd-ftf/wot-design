<template>
  <div class="page-navbar">
    <space title="默认深色Navbar">
      <jm-navbar title="标题"></jm-navbar>
      <jm-navbar title="左侧文字">
        <div slot="left">
          <jm-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
      </jm-navbar>
      <jm-navbar title="右侧文字">
        <span slot="right">菜单</span>
      </jm-navbar>
      <jm-navbar title="左右侧文字">
        <div slot="left">
          <jm-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
        <span slot="right">菜单</span>
      </jm-navbar>
      <jm-navbar title="标题的字数如果太多则超出隐藏">
        <div slot="left">
          <jm-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
      </jm-navbar>
    </space>
    <space title="淡色Navbar">
      <jm-navbar title="标题" light></jm-navbar>
      <jm-navbar title="左侧文字" light>
        <div slot="left">
          <jm-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
      </jm-navbar>
      <jm-navbar title="右侧文字" light>
        <span slot="right">菜单</span>
      </jm-navbar>
      <jm-navbar title="左右侧文字" light>
        <div slot="left">
          <jm-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
        <span slot="right">菜单</span>
      </jm-navbar>
      <jm-navbar title="标题的字数如果太多则超出隐藏" light>
        <div slot="left">
          <jm-icon class="middle" name="arrow-left" />
          <span class="middle">返回</span>
        </div>
      </jm-navbar>
    </space>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss">
.page-navbar {
  .jm-navbar {
    margin: 10px 0;
  }
  .middle {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
