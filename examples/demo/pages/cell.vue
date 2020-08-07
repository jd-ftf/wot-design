<template>
  <div class="page-cell">
    <demo-block title="基本用法" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" />
        <wd-cell title="标题文字" label="描述信息" value="内容" />
      </wd-cell-group>
    </demo-block>
    <demo-block title="图标" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" icon="wd-icon-setting" />
        <wd-cell title="标题文字" value="内容">
          <i class="cell-icon" slot="icon"></i>
        </wd-cell>
      </wd-cell-group>
    </demo-block>
    <demo-block title="分组标题" transparent>
      <wd-cell-group title="交易管理">
        <wd-cell title="标题文字" value="内容" />
        <wd-cell title="标题文字" label="描述信息" value="内容" />
      </wd-cell-group>
    </demo-block>
    <demo-block title="大尺寸" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" size="large" />
        <wd-cell title="标题文字" label="描述信息" value="内容" size="large" />
      </wd-cell-group>
    </demo-block>
    <demo-block title="展示边框线" transparent>
      <wd-cell-group title="交易管理" border>
        <wd-cell title="标题文字" value="内容" />
        <wd-cell title="标题文字" label="描述信息" value="内容" />
      </wd-cell-group>
    </demo-block>
    <demo-block title="点击事件" transparent>
      <wd-cell clickable title="标题文字" value="内容" @click="toast" />
    </demo-block>
    <demo-block title="页面跳转" transparent>
      <wd-cell-group>
        <wd-cell title="帮助与反馈" is-link :to="href" />
        <wd-cell title="设置" value="内容" is-link :to="{ path: '/button' }" replace />
      </wd-cell-group>
    </demo-block>
    <demo-block title="垂直居中" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" center/>
        <wd-cell title="标题文字" label="描述信息" value="内容" center/>
      </wd-cell-group>
    </demo-block>
    <demo-block title="表单属性" transparent>
      <wd-cell-group border>
        <wd-cell title="必填" required>
          <wd-rate v-model="rate" icon="wd-icon-dong" active-icon="wd-icon-dong" />
        </wd-cell>
        <wd-cell title="上下结构" vertical>
          <wd-slider v-model="store" />
        </wd-cell>
      </wd-cell-group>
    </demo-block>
    <demo-block title="自定义slot" transparent>
      <wd-cell-group>
        <wd-cell title="标题文字" center>
          <wd-button class="custom-value" size="small" type="primary" plain>按钮</wd-button>
        </wd-cell>
        <wd-cell title="标题文字" center>
          <wd-switch class="custom-value" v-model="value" />
        </wd-cell>
        <wd-cell title="标题文字" is-link :to="href">
          <div class="custom-text">
            <span>订购</span>
          </div>
        </wd-cell>
        <wd-cell>
          <div slot="title">
            <span>标题文字</span>
            <span class="end-time">25天后到期</span>
          </div>
        </wd-cell>
      </wd-cell-group>
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      href: location.href.split('#')[0],
      value: true,
      rate: '',
      store: 0
    }
  },
  methods: {
    toast () {
      this.$toast('点击')
    }
  }
}
</script>
<style lang="scss">
.page-cell {
  .end-time {
    margin-left: 8px;
    border: 1px solid #f0883a;
    padding: 0 4px;
    font-size: 10px;
    color: #f0883a;
  }
  .custom-text {
    color: #f0883a;
  }
  .cell-icon {
    display: block;
    width: 16px;
    height: 16px;
    background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png')
      no-repeat;
    background-size: cover;
  }
  .custom-value {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(0, -50%);
    white-space: nowrap;
  }
  .custom-group-value {
    color: #0083ff;
  }
}
</style>
