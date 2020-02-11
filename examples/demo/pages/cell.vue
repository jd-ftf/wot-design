<template>
  <div class="page-cell">
    <space title="基本用法">
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" />
        <wd-cell title="标题文字" label="描述信息" value="内容" />
      </wd-cell-group>
    </space>
    <space title="图标">
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" icon="wd-icon-setting" />
        <wd-cell title="标题文字" value="内容" icon="wd-icon-collect" />
        <wd-cell title="标题文字" value="内容">
          <div class="custom-icon" slot="icon">
            <i class="cell-icon"></i>
          </div>
        </wd-cell>
      </wd-cell-group>
    </space>
    <space title="大小">
      <wd-cell-group>
        <wd-cell title="标题文字" value="内容" size="large" />
        <wd-cell title="标题文字" label="描述信息" value="内容" size="large" />
      </wd-cell-group>
    </space>
    <space title="分组标题">
      <wd-cell-group title="交易管理" value="订购">
        <div slot="value" class="custom-group-value">
          <i class="wd-icon-cart"></i>
          <span>订购</span>
        </div>
        <wd-cell title="标题文字" value="内容" />
        <wd-cell title="标题文字" label="描述信息" value="内容" />
      </wd-cell-group>
    </space>
    <space title="可点击的">
      <wd-cell clickable title="标题文字" value="内容" @click="toast" />
    </space>
    <space title="页面跳转">
      <wd-cell-group>
        <wd-cell title="帮助与反馈" is-link :to="href" />
        <wd-cell title="设置" value="内容" is-link :to="{ path: '/button' }" replace />
      </wd-cell-group>
    </space>
    <space title="自定义slot">
      <wd-cell-group>
        <wd-cell title="标题文字" center>
          <wd-button class="custom-value" size="small" type="primary" plain>按钮</wd-button>
        </wd-cell>
        <wd-cell title="标题文字" center>
          <wd-switch class="custom-value" v-model="value" />
        </wd-cell>
        <wd-cell>
          <div slot="title">
            <span>标题文字</span>
            <span class="end-time">25天后到期</span>
          </div>
        </wd-cell>
      </wd-cell-group>
    </space>
  </div>
</template>

<script>
export default {
  data () {
    return {
      href: location.href.split('#')[0],
      value: true
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
  .end-time{
    margin-left: 8px;
    border: 1px solid #faa21e;
    padding: 0 4px;
    font-size: 10px;
    color: #faa21e;
  }
  .custom-icon {
    position: relative;
    width: 18px;
    height: 100%;
  }
  .cell-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png') no-repeat;
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
