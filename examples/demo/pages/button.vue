<template>
  <div class="page-button">
    <white-space>
      <div slot="desc">基本用法 <code>type</code></div>
      <wd-button>默认按钮</wd-button>
      <wd-button type="primary">主要按钮</wd-button>
      <wd-button type="success">成功按钮</wd-button>
      <wd-button type="info">信息按钮</wd-button>
      <wd-button type="warning">警告按钮</wd-button>
      <wd-button type="error">危险按钮</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">基本用法 <code>disabled</code></div>
      <wd-button disabled>默认按钮</wd-button>
      <wd-button type="primary" disabled>主要按钮</wd-button>
      <wd-button type="success" disabled>成功按钮</wd-button>
      <wd-button type="info" disabled>信息按钮</wd-button>
      <wd-button type="warning" disabled>警告按钮</wd-button>
      <wd-button type="error" disabled>危险按钮</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">幽灵按钮 <code>plain</code></div>
      <wd-button type="primary" plain>主要按钮</wd-button>
      <wd-button type="success" plain>成功按钮</wd-button>
      <wd-button type="info" plain>信息按钮</wd-button>
      <wd-button type="warning" plain>警告按钮</wd-button>
      <wd-button type="error" plain>危险按钮</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">幽灵按钮 <code>disabled</code></div>
      <wd-button type="primary" plain disabled>主要按钮</wd-button>
      <wd-button type="success" plain disabled>成功按钮</wd-button>
      <wd-button type="info" plain disabled>信息按钮</wd-button>
      <wd-button type="warning" plain disabled>警告按钮</wd-button>
      <wd-button type="error" plain disabled>危险按钮</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">圆角按钮 <code>round</code></div>
      <wd-button round>圆角按钮</wd-button>
      <wd-button type="primary" round>主要按钮</wd-button>
      <wd-button type="success" round>成功按钮</wd-button>
      <wd-button type="info" round>信息按钮</wd-button>
      <wd-button type="warning" round>警告按钮</wd-button>
      <wd-button type="error" round>危险按钮</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">按钮大小 <code>size</code></div>
      <wd-button type="primary" size="small">小号按钮</wd-button>
      <wd-button type="primary" size="medium">中号按钮</wd-button>
      <wd-button type="primary" size="large">大号按钮</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">加载中 <code>loading</code></div>
      <wd-button loading>加载中</wd-button>
      <wd-button type="primary" loading>加载中</wd-button>
      <wd-button type="primary" plain loading>加载中</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">文字按钮 <code>type</code>为<code>text</code></div>
      <wd-button type="text">文字按钮</wd-button>
      <wd-button type="text" disabled>文字按钮</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">图标按钮 <code>type</code>为<code>icon</code></div>
      <wd-button type="icon" icon="wd-icon-menu"></wd-button>
      <wd-button type="icon" icon="wd-icon-menu" disabled></wd-button>
    </white-space>
    <white-space>
      <div slot="desc">带图标的基本按钮 <code>icon</code></div>
      <wd-button type="primary" icon="wd-icon-edit-outline">修改</wd-button>
      <wd-button type="primary" icon="wd-icon-share">分享</wd-button>
    </white-space>
    <white-space :hor="0">
      <div slot="desc">吸顶按钮 <code>suck</code></div>
      <wd-button type="primary" suck>主要按钮</wd-button>
      <wd-button type="success" suck>成功按钮</wd-button>
      <wd-button type="info" suck>信息按钮</wd-button>
      <wd-button type="warning" suck>警告按钮</wd-button>
      <wd-button type="error" suck>危险按钮</wd-button>
    </white-space>
    <white-space>
      <div slot="desc">plain 的吸顶按钮</div>
    </white-space>
    <wd-button type="primary" plain suck style="margin-right: 0;">主要按钮</wd-button>
    <white-space>
      <div slot="desc">块状按钮，宽度100% <code>block</code></div>
      <div style="width: 315px; margin: 0 auto">
        <wd-button type="primary" size="large" block>主要按钮</wd-button>
        <wd-button type="success" size="large" block>成功按钮</wd-button>
        <wd-button type="info" size="large" block>信息按钮</wd-button>
        <wd-button type="warning" size="large" block>警告按钮</wd-button>
        <wd-button type="error" size="large" block>危险按钮</wd-button>
      </div>
    </white-space>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.page-button {
  .wd-button {
    margin: 0 10px 10px 0;
  }
}
</style>
