<template>
  <div class="page-badge">
    <demo-block title="展示消息数量">
      <wd-badge :value="12" class="item">
        <wd-button :round="false" size="small" type="info">评论</wd-button>
      </wd-badge>
      <wd-badge :value="3" class="item" bg-color="pink">
        <wd-button :round="false" size="small" type="info">回复</wd-button>
      </wd-badge>
      <wd-badge :value="1" class="item" type="primary">
        <wd-button :round="false" size="small" type="info">评论</wd-button>
      </wd-badge>
      <wd-badge :value="2" class="item" type="warning">
        <wd-button :round="false" size="small" type="info">回复</wd-button>
      </wd-badge>
      <wd-badge :value="1" class="item" type="success">
        <wd-button :round="false" size="small" type="info">评论</wd-button>
      </wd-badge>
      <wd-badge :value="2" class="item" type="info">
        <wd-button :round="false" size="small" type="info">回复</wd-button>
      </wd-badge>
    </demo-block>
    <demo-block title="定义消息最大值">
      <wd-badge :value="200" :max="99" class="item">
        <wd-button :round="false" size="small" type="info">评论</wd-button>
      </wd-badge>
      <wd-badge :value="100" :max="10" class="item ">
        <wd-button :round="false" size="small" type="info">回复</wd-button>
      </wd-badge>
    </demo-block>
    <demo-block title="自定义内容">
      <wd-badge value="new" class="item">
        <wd-button :round="false" size="small" type="info">评论</wd-button>
      </wd-badge>
      <wd-badge value="hot" class="item">
        <wd-button :round="false" size="small" type="info">回复</wd-button>
      </wd-badge>
    </demo-block>
    <demo-block title="点状类型">
      <wd-badge is-dot class="item ">数据查询</wd-badge>
      <wd-badge is-dot class="item">
        <wd-button class="share-button" type="info" :round="false">数据查询</wd-button>
      </wd-badge>
    </demo-block>
  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss">
.page-badge {
  .item{
    margin-top:10px;
    margin-right:25px;
  }
}
</style>
