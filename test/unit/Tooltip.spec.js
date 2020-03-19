/* eslint-disable no-undef */
import Tooltip from 'wot-design/packages/tooltip/index.js'
import Icon from 'wot-design/packages/icon/index.js'
import { mount } from '@vue/test-utils'
import { testInstall } from './utils'

testInstall(Tooltip)
testInstall(Icon)

// 测试位置
const placements = ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'wrong-place']
placements.forEach(placement => {
  test('Tooltip', done => {
    const wrapper = mount({
      template: `
      <wd-tooltip placement="${placement}" content="top 提示文字" ref="tooltip">
        <button>click</button>
      </wd-tooltip>`
    })
    const { vm } = wrapper
    const { tooltip } = vm.$refs

    vm.$nextTick(() => {
      tooltip.$refs.trigger.click()
      vm.$nextTick(() => {
        expect(tooltip.showPop).toBe(true)
        done()
      })
    })
  })
})

// 测试菜单模式
test('Tooltip menu', done => {
  const wrapper = mount({
    data () {
      return {
        menu: [{ name: 'person', content: '全部标记已读' }]
      }
    },
    template: `
    <wd-tooltip mode="menu" placement="right" effect="light" v-bind:content="menu" @menu-click="()=>{}" ref="tooltip">
      <button>click</button>
    </wd-tooltip>`
  })
  const { vm } = wrapper
  const { tooltip } = vm.$refs

  vm.$nextTick(() => {
    tooltip.$refs.trigger.click()
    expect(tooltip.effect).toBe('light')

    vm.$nextTick(() => {
      expect(tooltip.showPop).toBe(true)
      // 测试菜单关闭
      tooltip.$el.querySelector('.wd-tooltip__menu-inner').click()
      vm.$nextTick(() => {
        expect(tooltip.showPop).toBe(false)
        done()
      })
    })
  })
})

// 测试外部控制
test('Tooltip control', done => {
  const wrapper = mount({
    data () {
      return {
        visibleArrow: false,
        show: false
      }
    },
    methods: {
      control (event) {
        this.show = !this.show
        event.stopPropagation()
      }
    },
    template: `
    <div>
      <button @click="control" ref="button">{{show}}</button>
      <wd-tooltip v-model="show"  :visibleArrow="false" placement="right-start" ref="tooltip">
        <button>click</button>
      </wd-tooltip>
    </div>`
  })
  const { vm } = wrapper
  const { tooltip } = vm.$refs

  vm.$nextTick(() => {
    expect(tooltip.showPop).toBe(false)
    vm.$refs.button.click()

    vm.$nextTick(() => {
      expect(tooltip.showPop).toBe(true)
      // tooltip.handleOutsideClick()

      vm.$nextTick(() => {
        // expect(tooltip.showPop).toBe(false)
        done()
      })
    })
  })
})

// 测试插槽
test('Tooltip slot', done => {
  const wrapper = mount({
    template: `
    <wd-tooltip placement="right-end" ref="tooltip">
      <button>click</button>  
      <div slot="content">
        <div>多行文本1</div>
      </div>
    </wd-tooltip>`
  })
  const { vm } = wrapper
  const { tooltip } = vm.$refs

  vm.$nextTick(() => {
    tooltip.$refs.trigger.click()

    vm.$nextTick(() => {
      expect(tooltip.showPop).toBe(true)
      tooltip.handleOutsideClick()
      vm.$nextTick(() => {
        expect(tooltip.showPop).toBe(false)
        done()
      })
    })
  })
})

// 测试禁用
test('Tooltip show', done => {
  const wrapper = mount({
    template: `
    <wd-tooltip placement="right-end" disabled content="内容" ref="tooltip">
      <button>click</button>  
    </wd-tooltip>`
  })
  const { vm } = wrapper
  const { tooltip } = vm.$refs

  vm.$nextTick(() => {
    tooltip.$refs.trigger.click()
    tooltip.handleOutsideClick()

    vm.$nextTick(() => {
      expect(tooltip.showPop).toBe(false)
      done()
    })
  })
})
