<template>
  <div>
    <white-space :hor="0">
      <jm-navbar title="标题"></jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="左侧文字">
        <span slot="left">返回</span>
      </jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="右侧文字">
        <span slot="right">菜单</span>
      </jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="左右侧文字">
        <span slot="left">返回</span>
        <span slot="right">菜单</span>
      </jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="标题的字数如果太多则超出隐藏">
        <span slot="left">返回</span>
      </jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="标题" light></jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="左侧文字" light>
        <span slot="left">返回</span>
      </jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="右侧文字" light>
        <span slot="right">菜单</span>
      </jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="左右侧文字" light>
        <span slot="left">返回</span>
        <span slot="right">菜单</span>
      </jm-navbar>
    </white-space>
    <white-space :hor="0">
      <jm-navbar title="标题的字数如果太多则超出隐藏" light>
        <span slot="left">返回</span>
      </jm-navbar>
    </white-space>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
