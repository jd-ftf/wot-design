<template>
  <div>
    <white-space title="基本用法">
      <wd-tooltip placement="top" content="top 提示文字">
        <wd-button class="btn btn-default">top</wd-button>
      </wd-tooltip>
    </white-space>
    <white-space title="基本用法">
      <wd-tooltip placement="top-start" content="top-start 提示文字">
        <wd-button class="btn btn-default">top-start</wd-button>
      </wd-tooltip>
    </white-space>
    <white-space title="基本用法">
      <wd-tooltip placement="top-end" content="top-end 提示文字">
        <wd-button class="btn btn-default">top-end</wd-button>
      </wd-tooltip>
    </white-space>
    <white-space title="基本用法" style="text-align: center;">
      <div style="display: inline-block;">
        <wd-tooltip placement="right" @on-show="onShow" @on-hide="onHide">
          <div slot="content" class="popover-demo-content">hello world</div>
          <wd-button class="btn btn-default">Popover on top</wd-button>
        </wd-tooltip>
      </div>
    </white-space>
    <white-space title="基本用法" style="padding-left: 100px">
      <wd-tooltip placement="right" @on-show="onShow" @on-hide="onHide">
        <div slot="content" class="popover-demo-content">hello world</div>
        <wd-button class="btn btn-default">Popover on top</wd-button>
      </wd-tooltip>
    </white-space>
    <white-space title="基本用法" style="padding-left: 100px">
      <wd-tooltip placement="right-start" @on-show="onShow" @on-hide="onHide">
        <div slot="content" class="popover-demo-content">hello world</div>
        <wd-button class="btn btn-default">Popover on top</wd-button>
      </wd-tooltip>
    </white-space>
    <white-space title="基本用法" style="padding-left: 100px">
      <wd-tooltip placement="right-start" mode="menu" :content="menu">
        <wd-button class="btn btn-default">menu</wd-button>
      </wd-tooltip>
    </white-space>
    <white-space title="基本用法" style="padding-left: 100px">
      <wd-tooltip placement="right" effect="light" mode="menu" :content="menu">
        <wd-button class="btn btn-default">menu</wd-button>
      </wd-tooltip>
    </white-space>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
