<template>
  <div class="wd-drop-menu" v-clickoutside="handleOutsideClick">
    <!-- 默认向下折叠 -->
    <!-- 显示需要选择的几大类别 -->
    <div
      ref="trigger"
      class="wd-drop-menu__title"
      :class="item.disabled ? 'is-disabled' : ''"
      :style="{'color': currentIndex === index ? activeColor : ''}"
      v-for="(item, index) in titleList"
      :key="index"
      @click="toggle(index)"
    >
      {{ item.title }}
      <wd-icon
        name="caret-bottom"
        size="12px"
        class="wd-drop-menu__arrow"
        :class=" currentIndex === index ? 'is-retract' : '' "
      />
    </div>
    <!-- 自定义菜单头部插槽 -->
    <div class="wd-drop-menu__title" v-if="$slots.menu">
      <slot name="menu" />
    </div>
    <slot />
  </div>
</template>

<script>
import locale from 'wot-design/src/mixins/locale'
import Clickoutside from 'wot-design/src/utils/clickoutside'

export default {
  name: 'WdDropMenu',
  provide () {
    return {
      dropMenu: this
    }
  },
  mixins: [locale],
  data () {
    return {
      // 保存的永远是当前选中的值
      titleList: [{}],
      disabled: false,
      // -1表示折叠
      currentIndex: -1,
      children: []
    }
  },
  props: {
    activeColor: {
      type: String,
      default: '#0083ff'
    },
    direction: {
      type: String,
      default: 'down'
    },
    // 点击外部是否关闭
    closeOutside: {
      type: Boolean,
      default: true
    }
  },
  directives: { Clickoutside },
  mounted () {
    this.init()
  },
  methods: {
    handleOutsideClick () {
      if (!this.closeOutside || this.disabled) return
      this.fold(-1)
    },
    checkType (value) {
      return Object.prototype.toString.call(value).slice(8, -1)
    },
    init () {
      const children = []
      this.$slots.default.forEach(item => {
        item.tag && children.push(item.child)
      })
      this.children = children

      // 目标对象 dom（被跟随）
      const trigger = this.$refs.trigger[0]
      const scrollTop = window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      const { top, height } = trigger.getBoundingClientRect()
      const { scrollHeight } = document.body

      this.children.forEach(item => {
        if (this.direction === 'up') {
          item.set('positionStyle', {
            bottom: `${height}px`,
            height: `${top + scrollTop}px`
          })
        } else {
          item.set('positionStyle', {
            top: `${height}px`,
            height: `${scrollHeight - top}px`
          })
        }
      })
      this.resetChooseValue()
    },
    toggle (index) {
      // 如果重复展开相同的选项，则折叠选项卡
      const child = this.children[index]
      // 点击当前 menu, 关闭其他 menu
      if (!child.disabled) {
        this.fold(index)
      }
      this.resetChooseValue()
    },
    /**
     * 控制菜单内容是否展开
     * @param {Number} currentIndex 当前选的索引
     */
    fold (currentIndex) {
      this.currentIndex = currentIndex === this.currentIndex ? -1 : currentIndex

      // 选中当前关掉其他的
      this.children.forEach((item, index) => {
        currentIndex === index ? item.set('showPop', !item.showPop) : item.set('showPop', false)
      })
    },
    // 重设选中的 value 菜单列表
    resetChooseValue () {
      const titleList = []
      this.children.forEach((item, index) => {
        const { options, disabled, currentValue } = item
        if (this.checkType(options) === 'Array') {
          options.forEach(option =>
            option.value === currentValue && titleList.push({ title: option.text, disabled: disabled }))
        } else if (this.checkType(options) === 'String') {
          titleList.push({ title: options, disabled: disabled })
        } else {
          throw Error('options must be \'String\' or \'Array\'')
        }
      })
      this.titleList = titleList
    }
  }
}
</script>
