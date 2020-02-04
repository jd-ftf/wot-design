<template>
  <div>
    <white-space>
      <wd-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top-start">
        <wd-button>上左</wd-button>
      </wd-tooltip>
    </white-space>
    <wd-tooltip placement="top" @on-show="onShow" @on-hide="onHide">
      <div slot="content" class="popover-demo-content">hello world</div>
      <wd-button class="btn btn-default">Popover on top</wd-button>
    </wd-tooltip>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
