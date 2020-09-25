<template>
  <div class="tooltip-wrap">
    <demo-block title="基本用法" class="position-wrap">
      <div class="top">
        <wd-tooltip placement="bottom-start" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">bottom-start</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="bottom" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">bottom</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="bottom-end" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">bottom-end</wd-button>
        </wd-tooltip>
      </div>
      <div class="right">
        <wd-tooltip placement="left-start" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">left-start</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="left" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">left</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="left-end" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">left-end</wd-button>
        </wd-tooltip>
      </div>
      <div class="left">
        <wd-tooltip placement="right-start" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">right-start</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="right" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">right</wd-button>
        </wd-tooltip>
        <br />
        <wd-tooltip placement="right-end" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">right-end</wd-button>
        </wd-tooltip>
      </div>
      <div class="bottom">
        <wd-tooltip placement="top-start" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">top-start</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="top" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">top</wd-button>
        </wd-tooltip>
        <wd-tooltip placement="top-end" content="提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">top-end</wd-button>
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
          <wd-button :round="false" class="btn btn-default">多行文本</wd-button>
        </wd-tooltip>
      </div>
    </demo-block>
    <demo-block title="控制显隐">
      <wd-button size="small" @click="control">{{show ? '关' : '开'}}</wd-button>
      <div class="center">
        <wd-tooltip v-model="show" placement="top" content="top 提示文字" @show="onShow" @hide="onHide">
          <wd-button :round="false" class="btn btn-default">控制显隐</wd-button>
        </wd-tooltip>
      </div>
    </demo-block>
    <demo-block title="禁用">
      <div class="center">
        <wd-tooltip placement="top" disabled content="top 提示文字" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">top</wd-button>
        </wd-tooltip>
      </div>
    </demo-block>
    <demo-block title="显示关闭按钮">
      <div class="center">
        <wd-tooltip placement="top" show-close content="显示关闭按钮" style="margin: 10px;">
          <wd-button :round="false" class="btn btn-default">top</wd-button>
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
      this.$toast('on show')
    },
    onHide () {
      this.$toast('on hide')
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
    top: 98px;
  }
  .right {
    text-align: right;
  }
  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
  }
}
</style>
