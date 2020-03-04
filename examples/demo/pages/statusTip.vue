<template>
  <div class="page-tag">
    <demo-block title="搜索无结果">
      <wd-status-tip type="search" tip="当前搜索无结果"/>
    </demo-block>
    <demo-block title="404页面">
      <wd-status-tip type="network" tip="该页面暂时无法访问"/>
    </demo-block>
    <demo-block title="无网络">
      <wd-status-tip type="network" tip="请检查您的网络重新加载吧"/>
    </demo-block>
    <demo-block title="页面无数据">
      <wd-status-tip type="content" tip="暂无内容"/>
    </demo-block>
    <demo-block title="我的收藏为空">
      <wd-status-tip type="collect" tip="暂无收藏"/>
    </demo-block>
    <demo-block title="我的评论为空">
      <wd-status-tip type="comment" tip="暂无评论"/>
    </demo-block>
    <demo-block title="支付失败">
      <wd-status-tip type="halo" tip="支付失败，请重新订购"/>
    </demo-block>
    <demo-block title="已订阅全部消息">
      <wd-status-tip type="message" tip="已订阅全部消息"/>
    </demo-block>
    <demo-block title="有一个操作建议">
      <wd-status-tip type="network" tip="请检查您的网络重新加载吧">
        <div class="option-btn-box">
          <wd-button type="primary" plain size="large" @click="handleClick" >操作文案</wd-button>
        </div>
      </wd-status-tip>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    handleClick() {
      this.$toast.success('操作成功')
    }
  }
}
</script>

<style lang="scss">
.page-tag {
  .option-btn-box {
    margin-top: 18px;
    text-align: center;
  }
}
</style>
