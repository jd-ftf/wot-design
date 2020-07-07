<template>
  <div>
    <demo-block title="基本用法">
      <div style="text-align: center;">
        <wd-popover content="这是一段内容。">
          <wd-button class="btn btn-default" type="primary">点击展示</wd-button>
        </wd-popover>
      </div>
    </demo-block>
    <demo-block title="嵌套信息">
      <div style="text-align: center;">
        <wd-popover>
          <div slot="content">
            <wd-tag type="primary">标签</wd-tag>
            <wd-tag type="danger">标签</wd-tag>
            <wd-tag type="warning">标签</wd-tag>
            <wd-tag type="success">标签</wd-tag>
          </div>
          <wd-button class="btn btn-default" type="primary">点击展示</wd-button>
        </wd-popover>
      </div>
    </demo-block>
    <demo-block title="列表模式 menu">
      <div style="text-align: center;">
        <wd-popover placement="bottom-end" mode="menu" :content="menu" @menu-click="linkTo">
          <wd-button class="btn btn-default" type="primary">列表</wd-button>
        </wd-popover>
      </div>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      menu: [
        {
          iconClass: 'wd-icon-read',
          content: '全部标记已读'
        },
        {
          iconClass: 'wd-icon-delete',
          content: '清空最近会话'
        },
        {
          iconClass: 'wd-icon-detection',
          content: '消息订阅设置'
        },
        {
          iconClass: 'wd-icon-subscribe',
          content: '消息异常检测'
        }
      ]
    }
  },
  methods: {
    linkTo (item, index) {
      this.$toast.success('操作成功: ' + (index + 1) + '.' + item.content)
    }
  }
}
</script>
