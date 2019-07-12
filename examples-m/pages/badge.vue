<template>
  <div class="page-badge">
    <white-space>
      <div slot="desc">展示消息数量<code>value</code></div>
      <jm-badge :value="12" class="item">
        <jm-button size="small">评论</jm-button>
      </jm-badge>
      <jm-badge :value="3" class="item" bg-color="pink">
        <jm-button size="small">回复</jm-button>
      </jm-badge>
      <jm-badge :value="1" class="item" type="primary">
        <jm-button size="small">评论</jm-button>
      </jm-badge>
      <jm-badge :value="2" class="item" type="warning">
        <jm-button size="small">回复</jm-button>
      </jm-badge>
      <jm-badge :value="1" class="item" type="success">
        <jm-button size="small">评论</jm-button>
      </jm-badge>
      <jm-badge :value="2" class="item" type="info">
        <jm-button size="small">回复</jm-button>
      </jm-badge>
    </white-space>
    <white-space>
      <div slot="desc">可定义消息最大值<code>max</code></div>
      <jm-badge :value="200" :max="99" class="item">
        <jm-button size="small">评论</jm-button>
      </jm-badge>
      <jm-badge :value="100" :max="10" class="item ">
        <jm-button size="small">回复</jm-button>
      </jm-badge>
    </white-space>
    <white-space>
      <div slot="desc">可自己定制内容<code>value</code>，value 设置为字符串</div>
      <jm-badge value="new" class="item">
        <jm-button size="small">评论</jm-button>
      </jm-badge>
      <jm-badge value="hot" class="item">
        <jm-button size="small">回复</jm-button>
      </jm-badge>
    </white-space>
    <white-space>
      <div slot="desc">小红点<code>is-dot</code></div>
      <jm-badge is-dot class="item ">数据查询</jm-badge>
      <jm-badge is-dot class="item">
        <jm-button class="share-button">数据查询</jm-button>
      </jm-badge>
    </white-space>
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
