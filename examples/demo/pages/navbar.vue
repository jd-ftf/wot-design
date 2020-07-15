<template>
  <div class="page-navbar">
    <demo-block title="默认深色Navbar" transparent>
      <wd-navbar title="基本用法"></wd-navbar>
      <wd-navbar title="左侧插槽">
        <div slot="left" class="middle">
          <wd-icon name="filter" />
        </div>
      </wd-navbar>
      <wd-navbar title="右侧插槽">
        <span slot="right">菜单</span>
      </wd-navbar>
      <wd-navbar title="标题的字数如果太多则超出隐藏">
        <div slot="left" class="middle">
          <wd-icon name="arrow-left" />
        </div>
      </wd-navbar>
      <wd-navbar>
        <div slot="left" class="middle">
          <wd-icon name="arrow-left" />
        </div>
        <div class="title">
          <span>标题</span>
          <wd-icon name="fill-arrow-down"></wd-icon>
        </div>
        <span slot="right">
          <wd-icon class="right" name="filter" />
          <wd-icon class="right" name="setting" />
        </span>
      </wd-navbar>
    </demo-block>
    <demo-block title="淡色Navbar" transparent>
      <wd-navbar title="标题" light></wd-navbar>
      <wd-navbar title="左侧插槽" light>
        <div slot="left" class="middle">
          <wd-icon name="arrow-left" />
        </div>
      </wd-navbar>
      <wd-navbar title="右侧插槽" light>
        <span slot="right" style="color: rgba(0,0,0,0.65);">编辑</span>
      </wd-navbar>
      <wd-navbar title="左右侧插槽" light>
        <div slot="left" class="middle">
          <wd-icon name="arrow-left" />
        </div>
        <span slot="right" style="color: #4D80F0;">完成</span>
      </wd-navbar>
      <wd-navbar title="标题的字数如果太多则超出隐藏" light>
        <div slot="left" class="middle">
          <wd-icon name="arrow-left" />
        </div>
      </wd-navbar>
      <wd-navbar title="标题插槽" light>
        <div slot="left" class="middle">
          <wd-icon name="arrow-left" />
        </div>
        <div class="title">
          <span>标题</span>
          <wd-icon name="fill-arrow-down"></wd-icon>
        </div>
        <span slot="right">
          <wd-icon class="right" name="filter" />
          <wd-icon class="right" name="setting" />
        </span>
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
    height: 44px;
    box-sizing: border-box;
  }
  .right {
    font-size: 18px;
    &:first-child {
      padding-right: 15px;
    }
  }
  .title {
    span {
      position: relative;
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        background: linear-gradient(
          45deg,
          rgba(44, 203, 67, 1) 0%,
          rgba(56, 234, 151, 1) 100%
        );
        position: absolute;
        left: -15px;
        top: 5px;
        border-radius: 50%;
      }
    }
    i {
      font-size: 18px;
      vertical-align: bottom;
    }
  }
}
</style>
