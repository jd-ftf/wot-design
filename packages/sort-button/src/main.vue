<template>
  <div
    class="wd-sort-button"
    @click="handleClick"
  >
    <div class="wd-sort-button__wrapper">
      <div
        class="wd-sort-button__left"
        :style="{ color : (value !==0 ? (titleColor || color) : '') }"
      >
        {{title}}
      </div>
      <div class="wd-sort-button__right " :class="{ 'is-only' : oneArrow }">
        <div
          v-if="top.display"
          class="wd-sort-button__icon--top"
        >
          <wd-icon
            name="caret-top"
            :color="top.color"
            class="wd-sort-button__icon"
          />
        </div>
        <div
          v-if="bottom.display"
          class="wd-sort-button__icon--bottom"
        >
          <wd-icon
            name="caret-bottom"
            :color="bottom.color"
            class="wd-sort-button__icon"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WdSortButton',
  props: {
    title: String,
    titleColor: String,
    color: {
      type: String,
      default: '#0083ff'
    },
    value: {
      type: Number,
      value: 0,
      required: true
    },
    oneArrow: Boolean,
    allowReset: Boolean
  },
  watch: {
    value (value) {
      this.changeState(value)
    },
    oneArrow () {
      this.changeState(this.value)
    },
    allowReset () {
      this.changeState(this.value)
    }
  },
  data () {
    return {
      top: {
        display: true,
        color: ''
      },
      bottom: {
        display: true,
        color: ''
      }
    }
  },
  methods: {
    /**
     * @description 数值兑换方向
     * @param {Number} value 代码
     * @return {String} direction 方向
     */
    getDirection (value) {
      // 1 升序，0 无序，-1 降序
      const target = [-1, 0, 1]
      // 类型检测
      if (target.indexOf(value) === -1) {
        throw Error(`value must be one of ${target}`)
      }
      let direction = ''
      if (value === 1) {
        direction = 'top'
      } else if (value === -1) {
        direction = 'bottom'
      }
      return direction
    },
    /**
     * @description 根据传入的value展示不同的箭头
     * @param {Number} value
     */
    changeState (value = 0) {
      // 如果在oneArrow状态设置 value 只能为：-1或1，非法参数自动修正为1
      if (
        this.oneArrow &&
        (value !== 1 && value !== -1)
      ) {
        console.warn('v-model can\'t be 0 when use oneArrow')
        return this.$emit('input', 1)
      }
      // 根据数值对方要展示的方向
      const direction = this.getDirection(value)
      const { oneArrow, color } = this
      // 要设置的箭头如果有color，说明其当前处于选中状态，本次行为无效。
      if (
        this[direction] &&
        this[direction].color === color
      ) {
        return
      }
      const data = {
        top: {},
        bottom: {}
      }
      if (oneArrow && direction === 'top') {
        // 单箭头升序
        data.top.display = true
        data.top.color = color
        data.bottom.display = false
        data.bottom.color = ''
      } else if (oneArrow && direction === 'bottom') {
        // 单箭头降序
        data.top.display = false
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = color
      } else if (!oneArrow && direction === 'top') {
        // 双箭头升序
        data.top.display = true
        data.top.color = color
        data.bottom.display = true
        data.bottom.color = ''
      } else if (!oneArrow && direction === 'bottom') {
        // 双箭头降序
        data.top.display = true
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = color
      } else if (!oneArrow && direction === '') {
        // 双箭头重置
        data.top.display = true
        data.top.color = ''
        data.bottom.display = true
        data.bottom.color = ''
      }
      // 更新value，选中的箭头
      this.top = data.top
      this.bottom = data.bottom
      this.$emit('input', value)
    },
    handleClick () {
      let { value, allowReset, oneArrow } = this
      if (value === 1) {
        // 无论单价头还是双箭头，只要点击就应该由升序切换到降序
        value = -1
      } else if (!oneArrow && allowReset && value === -1) {
        // 双箭头并且允许重置时，只要点击就应该由降序切换到重置状态
        value = 0
      } else if (value === -1) {
        // 不允许重置，只要点击就应该由降序切换到升序
        value = 1
      } else {
        // 不管是否允许重置，只要点击就应该由 重置状态 切换到升序
        value = 1
      }
      this.changeState(value)
    }
  },
  created () {
    this.changeState(this.value)
  }
}
</script>
