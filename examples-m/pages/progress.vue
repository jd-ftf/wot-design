<template>
  <div>
    <white-space title="基本用法">
      <jm-progress :percentage="30" />
    </white-space>
    <white-space title="不显示进度文字">
      <jm-progress :percentage="60" hide-text />
    </white-space>
    <white-space title="修改颜色">
      <jm-progress :percentage="80" color="#00c740" />
    </white-space>
    <white-space title="颜色数组">
      <jm-progress :percentage="percentage" :color="[ '#00c740', '#ffb300', '#e2231a', '#0083ff' ]" hide-text />
    </white-space>
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
