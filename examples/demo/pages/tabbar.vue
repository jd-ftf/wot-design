<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-tabbar v-model="tabbar1">
        <wd-tabbar-item icon="wd-icon-bags">服务</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-dong">咚咚</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-chat">我</wd-tabbar-item>
      </wd-tabbar>
    </demo-block>
    <demo-block title="显示角标" transparent>
      <wd-tabbar v-model="tabbar2">
        <wd-tabbar-item icon="wd-icon-bags" dot>服务</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-dong" value="new" :top="3" :right="-8">咚咚</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-chat" :value="7" :top="3">我</wd-tabbar-item>
      </wd-tabbar>
    </demo-block>
    <demo-block title="修改颜色" transparent>
      <wd-tabbar v-model="tabbar3" active-color="#f00" badge-color="#0083ff">
        <wd-tabbar-item icon="wd-icon-bags" dot>服务</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-dong">咚咚</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-chat">我</wd-tabbar-item>
      </wd-tabbar>
    </demo-block>
    <demo-block title="修改选中icon" transparent>
      <wd-tabbar v-model="tabbar4">
        <wd-tabbar-item icon="wd-icon-bags" active-icon="wd-icon-read" dot>服务</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-dong" active-icon="wd-icon-read">咚咚</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-chat" active-icon="wd-icon-read">我</wd-tabbar-item>
      </wd-tabbar>
    </demo-block>
    <demo-block title="路由模式" transparent>
      <wd-tabbar>
        <wd-tabbar-item icon="wd-icon-bags" to="/tabbar">标签栏</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-dong" to="/button">按钮</wd-tabbar-item>
        <wd-tabbar-item icon="wd-icon-chat" to="https://m.jd.com">京东</wd-tabbar-item>
      </wd-tabbar>
    </demo-block>
    <wd-tabbar v-model="tabbar5" fixed border>
      <wd-tabbar-item icon="wd-icon-bags">服务</wd-tabbar-item>
      <wd-tabbar-item icon="wd-icon-dong">咚咚</wd-tabbar-item>
      <wd-tabbar-item icon="wd-icon-chat">我</wd-tabbar-item>
    </wd-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabbar1: 0,
      tabbar2: 0,
      tabbar3: 0,
      tabbar4: 0,
      tabbar5: 0
    }
  }
}
</script>
