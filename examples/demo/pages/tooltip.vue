<template>
  <div class="tooltip-wrap">
    <demo-block title="基本用法" class="position-wrap">
      <div class="center">
        <wd-tooltip placement="top" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">top</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="top-start" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">top-start</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="top-end" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">top-end</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="bottom" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">bottom</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="bottom-start" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">bottom-start</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="bottom-end" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">bottom-end</wd-button>
        </wd-tooltip>
      </div>
      <div class="right">
        <wd-tooltip placement="left" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">left</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="left-start" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">left-start</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="left-end" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">left-end</wd-button>
        </wd-tooltip>
      </div>
      <div class="left">
        <wd-tooltip placement="right" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">right</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="right-start" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">right-start</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="right-end" content="提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">right-end</wd-button>
        </wd-tooltip>
      </div>
    </demo-block>
    <demo-block title="多行文本">
      <div class="center">
        <wd-tooltip placement="bottom">
          <div slot="content" style="padding: 5px; width: 90px">
            <div>多行文本1</div>
            <div>多行文本2</div>
            <div>多行文本3</div>
          </div>
          <wd-button class="btn btn-default" type="primary">多行文本</wd-button>
        </wd-tooltip>
      </div>
    </demo-block>
    <demo-block title="控制显隐">
      <wd-button @click="control">{{show ? '关' : '开'}}</wd-button>
      <div class="center">
        <wd-tooltip v-model="show" placement="top" content="top 提示文字" @show="onShow" @hide="onHide">
          <wd-button class="btn btn-default" type="primary">控制显隐</wd-button>
        </wd-tooltip>
      </div>
    </demo-block>
    <demo-block title="禁用">
      <div class="center">
        <wd-tooltip placement="top" disabled content="top 提示文字" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">top</wd-button>
        </wd-tooltip>
      </div>
    </demo-block>
    <demo-block title="显示关闭按钮">
      <div class="center">
        <wd-tooltip placement="top" show-close content="显示关闭按钮" style="margin: 10px;">
          <wd-button class="btn btn-default" type="primary">top</wd-button>
        </wd-tooltip>
      </div>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    control () {
      this.show = !this.show
      event.stopPropagation()
    },
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
.tooltip-wrap {
  .position-wrap {
    position: relative;
  }
  .center {
    text-align: center;
  }
  .left {
    text-align: left;
    position: absolute;
    bottom: 10px;
  }
  .right {
    text-align: right;
  }
}
</style>
