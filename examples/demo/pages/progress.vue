<template>
  <div>
    <demo-block title="基本用法">
      <wd-progress :percentage="30" />
    </demo-block>
    <demo-block title="不显示进度文字">
      <wd-progress :percentage="60" hide-text />
    </demo-block>
    <demo-block title="修改颜色">
      <wd-progress :percentage="80" color="#00c740" />
    </demo-block>
    <demo-block title="颜色数组">
      <wd-progress :percentage="percentage" :color="[ '#00c740', '#ffb300', '#e2231a', '#0083ff' ]" hide-text />
    </demo-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      percentage: 0,
      timer: ''
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.percentage === 100) {
        this.percentage = 0
        return
      }

      let percentage = this.percentage + Math.random() * 20
      if (percentage >= 100) percentage = 100
      this.percentage = percentage
    }, 1000)
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
