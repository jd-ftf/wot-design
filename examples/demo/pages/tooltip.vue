<template>
  <div>
    <white-space title="基本用法">
      <div style="text-align: center;">
        <wd-tooltip placement="top" content="top 提示文字">
          <wd-button class="btn btn-default">top</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="top-start" content="top-start 提示文字">
          <wd-button class="btn btn-default">top-start</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="top-end" content="top-end 提示文字">
          <wd-button class="btn btn-default">top-end</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="bottom" content="bottom 提示文字">
          <wd-button class="btn btn-default">bottom</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="bottom-start" content="bottom-start 提示文字">
          <wd-button class="btn btn-default">bottom-start</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="bottom-end" content="bottom-end 提示文字">
          <wd-button class="btn btn-default">bottom-end</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="left" content="left 提示文字">
          <wd-button class="btn btn-default">left</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="left-start" content="left-start 提示文字">
          <wd-button class="btn btn-default">left-start</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="left-end" content="left-end 提示文字">
          <wd-button class="btn btn-default">left-end</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="right" content="right 提示文字">
          <wd-button class="btn btn-default">right</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="right-start" content="right-start 提示文字">
          <wd-button class="btn btn-default">right-start</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="right-end" content="right-end 提示文字">
          <wd-button class="btn btn-default">right-end</wd-button>
        </wd-tooltip>
      </div>
    </white-space>
    <white-space title="列表模式 menu">
      <div style="text-align: center;">
        <wd-tooltip mode="menu" :content="menu">
          <wd-button class="btn btn-default">列表</wd-button>
        </wd-tooltip>
      </div>
    </white-space>
    <white-space title="默认主题 dark">
      <div style="text-align: center;">
        <wd-tooltip effect="dark" content="dark 主题">
          <wd-button class="btn btn-default">dark</wd-button>
        </wd-tooltip>
      </div>
    </white-space>
    <white-space title="白色主题 light">
      <div style="text-align: center;">
        <wd-tooltip effect="light" content="light 主题">
          <wd-button class="btn btn-default">light</wd-button>
        </wd-tooltip>
      </div>
    </white-space>
    <white-space title="多行文本">
      <div style="text-align: center;">
        <wd-tooltip placement="right">
          <div slot="content" style="color: red; padding: 5px; width: 90px">
            <div>多行文本1</div>
            <div>多行文本2</div>
          </div>
          <wd-button class="btn btn-default">多行文本</wd-button>
        </wd-tooltip>
      </div>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      menu: [
        {
          name: 'person',
          content: '全部标记已读'
        },
        {
          name: 'close-fill',
          content: '清空最近会话'
        }
      ]
    }
  },
  methods: {
    onShow () {
      console.log('on show')
    },
    onHide () {
      console.log('on hide')
    }
  }
}
</script>

<style lang="scss">
code {
  color: #0083ff;
  padding: 1px 2px;
  margin: 0 2px;
  border-radius: 2px;
  white-space: nowrap;
  font-size: 0.8em;
  background-color: #f8f8f8;
  -webkit-font-smoothing: initial;
}
.color-box {
  box-sizing: border-box;
  height: 50px;
  width: 100%;
  border: 2px solid #0083ff;
  border-radius: 2px;
  background-color: #fff;
  line-height: 46px;
  text-align: center;
  color: #0083ff;
  -webkit-font-smoothing: initial;
}
.demo .wd-button {
  margin: 10px 0;
}
</style>
