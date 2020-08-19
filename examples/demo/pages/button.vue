<template>
  <div class="page-button">
    <demo-block title="基本用法" >
      <wd-button>默认按钮</wd-button>
      <wd-button type="success">成功按钮</wd-button>
      <wd-button type="info">信息按钮</wd-button>
      <wd-button type="warning">警告按钮</wd-button>
      <wd-button type="error">危险按钮</wd-button>
    </demo-block>
    <demo-block title="禁用" >
      <wd-button disabled>默认按钮</wd-button>
      <wd-button type="success" disabled>成功按钮</wd-button>
      <wd-button type="info" disabled>信息按钮</wd-button>
      <wd-button type="warning" disabled>警告按钮</wd-button>
      <wd-button type="error" disabled>危险按钮</wd-button>
    </demo-block>
    <demo-block title="幽灵按钮" >
      <wd-button plain>主要按钮</wd-button>
      <wd-button type="success" plain>成功按钮</wd-button>
      <wd-button type="info" plain>信息按钮</wd-button>
      <wd-button type="warning" plain>警告按钮</wd-button>
      <wd-button type="error" plain>危险按钮</wd-button>
    </demo-block>
    <demo-block title="幽灵按钮禁用状态" >
      <wd-button plain disabled>主要按钮</wd-button>
      <wd-button type="success" plain disabled>成功按钮</wd-button>
      <wd-button type="info" plain disabled>信息按钮</wd-button>
      <wd-button type="warning" plain disabled>警告按钮</wd-button>
      <wd-button type="error" plain disabled>危险按钮</wd-button>
    </demo-block>
    <demo-block title="圆角按钮" >
      <wd-button round>圆角按钮</wd-button>
      <wd-button type="success" round>成功按钮</wd-button>
      <wd-button type="info" round>信息按钮</wd-button>
      <wd-button type="warning" round>警告按钮</wd-button>
      <wd-button type="error" round>危险按钮</wd-button>
    </demo-block>
    <demo-block title="按钮大小">
      <wd-button size="small">小号按钮</wd-button>
      <wd-button size="medium">中号按钮</wd-button>
      <wd-button size="large">大号按钮</wd-button>
    </demo-block>
    <demo-block title="加载中" >
      <wd-button loading>加载中</wd-button>
      <wd-button type="success" loading>加载中</wd-button>
      <wd-button type="warning" loading>加载中</wd-button>
      <wd-button type="error" loading>加载中</wd-button>
      <wd-button type="info" loading>加载中</wd-button>
    </demo-block>
    <demo-block title="文字按钮">
      <wd-button type="text">文字按钮</wd-button>
      <wd-button type="text" disabled>文字按钮</wd-button>
    </demo-block>
    <demo-block title="图标按钮">
      <wd-button type="icon" icon="wd-icon-delete-thin"></wd-button>
      <wd-button type="icon" icon="wd-icon-delete-thin" disabled></wd-button>
    </demo-block>
    <demo-block title="带图标的基本按钮">
      <wd-button icon="wd-icon-download">下载</wd-button>
      <wd-button icon="wd-icon-setting">设置</wd-button>
    </demo-block>
    <demo-block title="吸顶按钮" transparent class="page-button-suck">
      <div slot="desc">吸顶按钮</div>
      <wd-button suck>主要按钮</wd-button>
      <wd-button type="success" suck>成功按钮</wd-button>
      <wd-button type="info" suck>信息按钮</wd-button>
      <wd-button type="warning" suck>警告按钮</wd-button>
      <wd-button type="error" suck>危险按钮</wd-button>
    </demo-block>
    <demo-block title="plain 的吸顶按钮" transparent>
      <wd-button plain suck style="margin-right: 0;">主要按钮</wd-button>
    </demo-block>
    <demo-block title="块状按钮，宽度100%">
      <div style="width: 315px; margin: 0 auto">
        <wd-button size="large" block>主要按钮</wd-button>
        <wd-button type="success" size="large" block>成功按钮</wd-button>
        <wd-button type="info" size="large" block>信息按钮</wd-button>
        <wd-button type="warning" size="large" block>警告按钮</wd-button>
        <wd-button type="error" size="large" block>危险按钮</wd-button>
      </div>
    </demo-block>
    <demo-block title="常用按钮：块状+圆角">
      <div style="width: 315px; margin: 0 auto">
        <wd-button size="large" block disabled round>主要按钮</wd-button>
        <wd-button size="large" block round>主要按钮</wd-button>
        <wd-button size="large" block round loading>主要按钮</wd-button>
        <wd-button type="info" size="large" block round disabled>信息按钮</wd-button>
        <wd-button type="info" size="large" block round>信息按钮</wd-button>
      </div>
    </demo-block>
    <demo-block title="常用按钮：圆角或圆角+幽灵">
      <wd-button disabled round>主操作</wd-button>
      <wd-button size="small" disabled round>主操作</wd-button>
      <br />
      <wd-button round>主操作</wd-button>
      <wd-button size="small" round>主操作</wd-button>
      <br />
      <wd-button type="info" round disabled>次操作</wd-button>
      <wd-button type="info" size="small" round disabled>次操作</wd-button>
      <br />
      <wd-button type="info" round>次操作</wd-button>
      <wd-button type="info" size="small" round>次操作</wd-button>
      <br />
      <wd-button plain disabled round>幽灵按钮</wd-button>
      <wd-button size="small" plain disabled round>幽灵按钮</wd-button>
      <br />
      <wd-button plain round>幽灵按钮</wd-button>
      <wd-button size="small" plain round>幽灵按钮</wd-button>
      <br />
      <wd-button type="info" plain disabled round>次操作</wd-button>
      <wd-button type="info" size="small" plain disabled round>次操作</wd-button>
      <br />
      <wd-button type="info" plain round>次操作</wd-button>
      <wd-button type="info" size="small" plain round>次操作</wd-button>
    </demo-block>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.page-button {
  .wd-button {
    margin: 0 10px 10px 0;
  }
  .page-button-suck {
    .wd-button {
      margin-right: 0;
    }
  }
}
</style>
