<template>
  <div>
    <demo-block title="基本使用" transparent>
      <wd-card title="经营分析">
        一般的，检举内容由承办的党的委员会或纪律检查委员会将处理意见或复议、复查结论同申诉人见面，听取其意见。复议、复查的结论和决定，应交给申诉人一份。
        <wd-button slot="footer" size="small" type="primary" plain round>查看详情</wd-button>
      </wd-card>
      <wd-card title="新订单">
        <div class="content">
          <img width="70" height="70" src="../assets/img/joy.png" alt="joy" style="border-radius: 4px; margin-right: 12px;"/>
          <div>
            <div>蜜滋兰(mizland)新西兰进口多花种…</div>
            <div>数量：1件</div>
            <div>金额：29.08</div>
            <div>买家昵称：Joy</div>
          </div>
        </div>
        <wd-button slot="footer" size="small" type="primary" plain round>查看详情</wd-button>
      </wd-card>
    </demo-block>
    <demo-block title="矩形卡片" transparent>
      <wd-card title="2020-02-03服务到期" type="rectangle">
        <div style="height: 40px;" class="content">
          <img src="../assets/img/joy.png" width="40" height="40" alt="joy" style="border-radius: 4px; margin-right: 12px;" />
          <div>
            <div style="color: rgba(0,0,0,0.85); font-size: 16px;">智云好客CRM短信_催评营销</div>
            <div style="color: rgba(0,0,0,0.25); font-size: 12px;">高级版-快速吸粉 | 周期一年 </div>
          </div>
        </div>
        <div slot="footer">
          <wd-button size="small" round style="margin-right: 8px;">评价</wd-button>
          <wd-button size="small" type="primary" plain round>立即使用</wd-button>
        </div>
      </wd-card>
      <wd-card type="rectangle">
        <div class="title" slot="title">
          <div>2020-02-03服务到期</div>
          <div class="title-tip"><wd-icon name="warning" size="14px" style="vertical-align: bottom"/> 您可以去电脑上使用该服务</div>
        </div>
        <div style="height: 40px;" class="content">
          <img src="../assets/img/joy.png" width="40" height="40" alt="joy" style="border-radius: 4px; margin-right: 12px;" />
          <div>
            <div style="color: rgba(0,0,0,0.85); font-size: 16px;">智云好客CRM短信_催评营销</div>
            <div style="color: rgba(0,0,0,0.25); font-size: 12px;">高级版-快速吸粉 | 周期一年 </div>
          </div>
        </div>
        <div slot="footer">
          <wd-button size="small" round style="margin-right: 8px;">评价</wd-button>
          <wd-button size="small" type="primary" plain round>立即使用</wd-button>
        </div>
      </wd-card>
    </demo-block>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
.content, .title {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.content {
  justify-content: flex-start;
}
.title {
  justify-content: space-between;
}
.title-tip {
  color: rgba(0, 0, 0, 0.25);
  font-size: 12px;
}
</style>
