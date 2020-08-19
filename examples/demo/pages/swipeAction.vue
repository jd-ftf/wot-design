<template>
  <div>
    <demo-block title="基本用法" transparent>
      <wd-swipe-action>
        <wd-cell title="标题文字" value="内容"/>
        <div slot="right" class="action">
          <div class="button" style="background: #fa4350;" @click="handleAction('操作1')">操作1</div>
          <div class="button" style="background: #f0883a;" @click="handleAction('操作2')">操作2</div>
          <div class="button" style="background: #4d80f0;" @click="handleAction('操作3')">操作3</div>
        </div>
      </wd-swipe-action>
    </demo-block>

    <demo-block title="取消自动关闭" transparent>
      <wd-swipe-action :auto-close="false">
        <wd-cell title="标题文字" value="内容"/>
        <div slot="right" class="action">
          <div class="button" style="background: #fa4350;">操作1</div>
          <div class="button" style="background: #f0883a;">操作2</div>
          <div class="button" style="background: #4d80f0;">操作3</div>
        </div>
      </wd-swipe-action>
    </demo-block>

    <demo-block title="左右滑动" transparent>
      <wd-swipe-action>
        <div slot="left" class="action">
          <div class="button" style="background: #fa4350;" @click="handleAction('操作1')">操作1</div>
          <div class="button" style="background: #f0883a;" @click="handleAction('操作2')">操作2</div>
          <div class="button" style="background: #4d80f0;" @click="handleAction('操作3')">操作3</div>
        </div>
        <wd-cell title="标题文字" value="内容"/>
        <div slot="right" class="action">
          <div class="button" style="background: #fa4350;">操作4</div>
          <div class="button" style="background: #f0883a;">操作5</div>
          <div class="button" style="background: #4d80f0;">操作6</div>
        </div>
      </wd-swipe-action>
    </demo-block>

    <demo-block title="切换按钮" transparent>
      <wd-swipe-action v-model="value" :before-close="beforeClose">
        <div slot="left" class="action">
          <div class="button" style="background: #fa4350;">操作1</div>
          <div class="button" style="background: #f0883a;">操作2</div>
          <div class="button" style="background: #4d80f0;">操作3</div>
        </div>
        <wd-cell title="标题文字" value="内容"/>
        <div slot="right" class="action">
          <div class="button" style="background: #fa4350;">操作4</div>
          <div class="button" style="background: #f0883a;">操作5</div>
          <div class="button" style="background: #4d80f0;">操作6</div>
        </div>
      </wd-swipe-action>
    </demo-block>
    <div class="button-group">
      <wd-button @touchstart.native.capture.stop="changeState('left',$event)">打开左边</wd-button>
      <wd-button @touchstart.native.capture.stop="changeState('close',$event)">关闭所有</wd-button>
      <wd-button @touchstart.native.capture.stop="changeState('right',$event)">打开右边</wd-button>
    </div>

    <demo-block title="点击事件" transparent>
      <wd-swipe-action @click="handleClick">
        <wd-cell title="标题文字" value="内容"/>
        <div slot="right" class="action">
          <div class="button" style="background: #fa4350;">操作1</div>
          <div class="button" style="background: #f0883a;">操作2</div>
          <div class="button" style="background: #4d80f0;">操作3</div>
        </div>
      </wd-swipe-action>
    </demo-block>

    <demo-block title="禁用滑动按钮" transparent>
      <wd-swipe-action disabled>
        <wd-cell title="标题文字" value="内容"/>
        <div slot="right" class="action">
          <div class="button" style="background: #fa4350;">操作1</div>
          <div class="button" style="background: #f0883a;">操作2</div>
          <div class="button" style="background: #4d80f0;">操作3</div>
        </div>
      </wd-swipe-action>
    </demo-block>
  </div>
</template>

<script>

export default {
  data () {
    return {
      value: 'close'
    }
  },
  methods: {
    beforeClose (reason, position) {
      if (reason === 'click') {
        this.$toast(`${reason} ${position}导致滑动按钮关闭`)
      } else {
        this.$toast(`${reason}导致${position}滑动按钮关闭`)
      }
    },
    changeState (value) {
      this.value = value
    },
    handleClick (position) {
      this.$toast(`点击${position}关闭操作按钮`)
    },

    handleAction (action) {
      this.$toast(`点击了${action}`)
    }
  }
}
</script>
<style>
  .action {
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .button{
    display: inline-block;
    padding: 0 11px;
    height: 100%;
    color: white;
    line-height: 46px;
  }
  .button-group{
    padding: 10px;
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
</style>
