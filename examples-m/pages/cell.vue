<template>
  <div class="page-cell">
    <space title="基本用法">
      <jm-cell-group>
        <jm-cell title="标题文字" value="内容" />
        <jm-cell title="标题文字" label="描述信息" value="内容" />
      </jm-cell-group>
    </space>
    <space title="图标">
      <jm-cell-group>
        <jm-cell title="标题文字" value="内容" icon="jm-icon-setting" />
        <jm-cell title="标题文字" value="内容" icon="jm-icon-collect" />
        <jm-cell title="标题文字" value="内容">
          <div class="custom-icon" slot="icon">
            <i class="cell-icon"></i>
          </div>
        </jm-cell>
      </jm-cell-group>
    </space>
    <space title="分组标题">
      <jm-cell-group title="交易管理" value="订购">
        <div slot="value" class="custom-group-value">
          <i class="jm-icon-cart"></i>
          <span>订购</span>
        </div>
        <jm-cell title="标题文字" value="内容" />
        <jm-cell title="标题文字" label="描述信息" value="内容" />
      </jm-cell-group>
    </space>
    <space title="页面跳转">
      <jm-cell-group>
        <jm-cell title="帮助与反馈" is-link :to="href" />
        <jm-cell title="设置" value="内容" is-link :to="{ path: '/button' }" />
      </jm-cell-group>
    </space>
    <space title="自定义slot">
      <jm-cell-group>
        <jm-cell title="标题文字">
          <jm-button class="custom-value" size="small" type="primary" plain>按钮</jm-button>
        </jm-cell>
        <jm-cell title="标题文字">
          <jm-switch class="custom-value" v-model="value" />
        </jm-cell>
        <jm-cell>
          <div slot="title">
            <span>标题文字</span>
            <span class="end-time">25天后到期</span>
          </div>
        </jm-cell>
      </jm-cell-group>
    </space>
    <space title="可点击的">
      <jm-cell clickable title="标题文字" value="内容" @click="toast" />
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
