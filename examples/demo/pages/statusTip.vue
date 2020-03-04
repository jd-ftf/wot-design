<template>
  <div class="page-tag">
    <demo-block title="搜索无结果">
      <wd-status-tip type="search"/>
    </demo-block>
    <demo-block title="404页面">
      <wd-status-tip type="notfound"/>
    </demo-block>
    <demo-block title="无网络">
      <wd-status-tip type="network"/>
    </demo-block>
    <demo-block title="页面无数据">
      <wd-status-tip type="content"/>
    </demo-block>
    <demo-block title="我的收藏为空">
      <wd-status-tip type="collect"/>
    </demo-block>
    <demo-block title="我的评论为空">
      <wd-status-tip type="comment"/>
    </demo-block>
    <demo-block title="支付失败">
      <wd-status-tip type="pay"/>
    </demo-block>
    <demo-block title="已订阅全部消息">
      <wd-status-tip type="subscribe"/>
    </demo-block>
    <demo-block title="自定义提示文案">
      <wd-status-tip type="pay" tip="支付出现异常，请重试"/>
    </demo-block>
    <demo-block title="有一个操作建议">
      <wd-status-tip type="network">
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
