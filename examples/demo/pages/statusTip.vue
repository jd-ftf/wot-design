<template>
  <div class="page-tag">
    <demo-block title="搜索无结果">
      <wd-status-tip type="search" tip="当前搜索无结果"/>
    </demo-block>
    <demo-block title="404页面">
      <wd-status-tip type="network" tip="糟糕，当前网络不可用～"/>
    </demo-block>
    <demo-block title="页面无数据">
      <wd-status-tip type="content" tip="暂无内容"/>
    </demo-block>
    <demo-block title="我的收藏为空">
      <wd-status-tip type="collect" tip="当前没有收藏哦～"/>
    </demo-block>
    <demo-block title="无联系人名单">
      <wd-status-tip type="comment" tip="当前没有联系人名单哦～"/>
    </demo-block>
    <demo-block title="支付失败">
      <wd-status-tip type="halo" tip="支付失败，请重新订购"/>
    </demo-block>
    <demo-block title="已订阅全部消息">
      <wd-status-tip type="message" tip="已订阅全部消息"/>
    </demo-block>
  </div>
</template>
