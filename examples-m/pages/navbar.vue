<template>
  <div>
    <white-space :hor="0">
      <div slot="desc">
        默认深色Navbar
      </div>
      <jm-navbar title="标题"></jm-navbar>
      <jm-navbar title="左侧文字">
        <div slot="left">
          <jm-icon name="arrow-left" />
          <span>返回</span>
        </div>
      </jm-navbar>
      <jm-navbar title="右侧文字">
        <span slot="right">菜单</span>
      </jm-navbar>
      <jm-navbar title="左右侧文字">
        <div slot="left">
          <jm-icon name="arrow-left" />
          <span>返回</span>
        </div>
        <span slot="right">菜单</span>
      </jm-navbar>
      <jm-navbar title="标题的字数如果太多则超出隐藏">
        <div slot="left">
          <jm-icon name="arrow-left" />
          <span>返回</span>
        </div>
      </jm-navbar>
    </white-space>
    <white-space :hor="0" color="#f8f8f8">
      <div slot="desc">
        淡色Navbar
      </div>
      <jm-navbar title="标题" light></jm-navbar>
      <jm-navbar title="左侧文字" light>
        <div slot="left">
          <jm-icon name="arrow-left" />
          <span>返回</span>
        </div>
      </jm-navbar>
      <jm-navbar title="右侧文字" light>
        <span slot="right">菜单</span>
      </jm-navbar>
      <jm-navbar title="左右侧文字" light>
        <div slot="left">
          <jm-icon name="arrow-left" />
          <span>返回</span>
        </div>
        <span slot="right">菜单</span>
      </jm-navbar>
      <jm-navbar title="标题的字数如果太多则超出隐藏" light>
        <div slot="left">
          <jm-icon name="arrow-left" />
          <span>返回</span>
        </div>
      </jm-navbar>
    </white-space>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style lang="scss">
.demo .jm-navbar {
  margin: 10px 0;
}
</style>
