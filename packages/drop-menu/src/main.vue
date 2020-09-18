<script>
import Clickoutside from 'wot-design/src/utils/clickoutside'

export default {
  name: 'WdDropMenu',
  provide () {
    return {
      dropMenu: this
    }
  },
  data () {
    return {
      // -1表示折叠
      currentIndex: -1,
      children: [],
      offset: 0
    }
  },
  props: {
    direction: {
      type: String,
      default: 'down'
    },
    // 点击外部是否关闭
    closeOutside: {
      type: Boolean,
      default: true
    },
    modal: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 200
    }
  },
  directives: { Clickoutside },
  methods: {
    handleOutsideClick () {
      if (!this.closeOutside) return
      this.fold(-1)
    },
    toggle (index) {
      // 如果重复展开相同的选项，则折叠选项卡
      const child = this.children[index]
      // 点击当前 menu, 关闭其他 menu
      if (!child.disabled) {
        this.fold(index)
      }
    },
    /**
     * 控制菜单内容是否展开
     * @param {Number} currentIndex 当前选的索引
     */
    fold (currentIndex) {
      this.currentIndex = currentIndex === this.currentIndex ? -1 : currentIndex
      const { top, bottom } = this.$refs.title.getBoundingClientRect()
      if (this.direction === 'down') {
        this.offset = top + this.$refs.title.clientHeight
      } else {
        this.offset = window.innerHeight - bottom + this.$refs.title.clientHeight
      }
      // 选中当前关掉其他的
      this.children.forEach((item, index) => {
        this.currentIndex === index ? item.open() : (item.showPop = false)
      })
    }
  },
  render (h) {
    const { children, currentIndex, handleOutsideClick, toggle } = this
    return (
      <div class='wd-drop-menu' vClickoutside={handleOutsideClick}>
        <div ref='title' class='wd-drop-menu__title'>
          {
            children.map((item, index) => {
              return (
                <div class={{
                  'wd-drop-menu__title-item': true,
                  'is-active': currentIndex === index,
                  'is-disabled': item.disabled
                }} onClick={() => toggle(index)}>
                  <div class="wd-drop-menu__title-text">{item.$slots.title || item.displayTitle}</div>
                  <i class="wd-icon-arrow-down wd-drop-menu__arrow"></i>
                </div>
              )
            })
          }
        </div>
        {this.$slots.default}
      </div>
    )
  }
}
</script>
