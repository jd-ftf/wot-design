<template>
  <div class="page-badge">
    <white-space>
      <div slot="desc">展示消息数量<code>value</code></div>
      <wd-badge :value="12" class="item">
        <wd-button size="small">评论</wd-button>
      </wd-badge>
      <wd-badge :value="3" class="item" bg-color="pink">
        <wd-button size="small">回复</wd-button>
      </wd-badge>
      <wd-badge :value="1" class="item" type="primary">
        <wd-button size="small">评论</wd-button>
      </wd-badge>
      <wd-badge :value="2" class="item" type="warning">
        <wd-button size="small">回复</wd-button>
      </wd-badge>
      <wd-badge :value="1" class="item" type="success">
        <wd-button size="small">评论</wd-button>
      </wd-badge>
      <wd-badge :value="2" class="item" type="info">
        <wd-button size="small">回复</wd-button>
      </wd-badge>
    </white-space>
    <white-space>
      <div slot="desc">可定义消息最大值<code>max</code></div>
      <wd-badge :value="200" :max="99" class="item">
        <wd-button size="small">评论</wd-button>
      </wd-badge>
      <wd-badge :value="100" :max="10" class="item ">
        <wd-button size="small">回复</wd-button>
      </wd-badge>
    </white-space>
    <white-space>
      <div slot="desc">可自己定制内容<code>value</code>，value 设置为字符串</div>
      <wd-badge value="new" class="item">
        <wd-button size="small">评论</wd-button>
      </wd-badge>
      <wd-badge value="hot" class="item">
        <wd-button size="small">回复</wd-button>
      </wd-badge>
    </white-space>
    <white-space>
      <div slot="desc">小红点<code>is-dot</code></div>
      <wd-badge is-dot class="item ">数据查询</wd-badge>
      <wd-badge is-dot class="item">
        <wd-button class="share-button">数据查询</wd-button>
      </wd-badge>
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
