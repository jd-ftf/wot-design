import Tabs from 'wot-design/packages/tabs/index.js'
import Tab from 'wot-design/packages/tab/index.js'
import { mount } from '@vue/test-utils'
import { testInstall, later, getRandNum } from './utils'

describe('Tabs and tab tests install', () => {
  testInstall(Tabs)
  testInstall(Tab)
})

test('should render correct content', async () => {
  const wrapper = mount({
    template: `
      <wd-tabs v-model="tab">
        <wd-tab v-for="item in 4" :key="item">
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    `,
    data () {
      return {
        tab: 0
      }
    }
  })
  expect(wrapper.classes('wd-tabs')).toBe(true)
  const tabItems = wrapper.findAll('.wd-tab')
  expect(tabItems).toHaveLength(4)
  // nav-item 是在nextTick才计算的，这里要等待一下
  await later(0)
  const tabNavs = wrapper.findAll('.wd-tabs__nav-item')
  expect(tabNavs).toHaveLength(4)
  expect(tabNavs.at(0).classes('is-active')).toBe(true)
})

describe('Tabs\' props', () => {
  test('The active must change with value changing bound by v-model', async () => {
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab">
          <wd-tab v-for="item in 4" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0
        }
      }
    })
    const randNum = getRandNum(0, 3)
    wrapper.setData({ tab: randNum })
    await later(0)
    expect(
      wrapper.findAll('.wd-tabs__nav-item')
        .at(randNum)
        .classes('is-active')
    ).toBe(true)
  })

  test('Don\'t allow scrolling when the number of tab less than slidable-num', async () => {
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab" :slidable-num="slidableNum">
          <wd-tab v-for="item in tabNum" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0,
          slidableNum: 6,
          tabNum: 4
        }
      }
    })
    const tabs = wrapper.find(Tabs)
    // 换成4个tab，应该不允许滚动
    wrapper.setData({ tabNum: 4 })
    await later(0)
    expect(tabs.classes('is-slide')).toBe(false)
    // 换成8个tab，应该允许滚动
    wrapper.setData({ tabNum: 8 })
    await later(0)
    expect(tabs.classes('is-slide')).toBe(true)
    // 阀值变成9，应该不允许滚动
    wrapper.setData({ slidableNum: 9 })
    await later(0)
    expect(tabs.classes('is-slide')).toBe(false)
  })

  test('Allow showing map when the number of tab more than map-num', async () => {
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab" :map-num="mapNum">
          <wd-tab v-for="item in tabNum" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0,
          mapNum: 10,
          tabNum: 4
        }
      }
    })
    const tabs = wrapper.find(Tabs)
    // 换成12个tab，应该出现map
    wrapper.setData({ tabNum: 12 })
    await later(0)
    expect(wrapper.contains('.wd-tabs__map')).toBe(true)
    expect(wrapper.findAll('.wd-tabs__map-nav-item')).toHaveLength(12)
    // 点击map按钮，浮层应该打开
    wrapper.find('.wd-tabs__map-btn').trigger('click')
    expect(tabs.vm.mapShow).toBe(true)
    // 阀值调整为14，map不应该出现
    wrapper.setData({ mapNum: 14 })
    await later(0)
    expect(wrapper.contains('.wd-tabs__map')).toBe(false)
  })

  test('Should render color, inactive-color, line-width, and line-height', async () => {
    const wrapper = mount({
      template: `
        <wd-tabs
          v-model="tab"
          :color="color"
          :inactive-color="inactiveColor"
          :line-width="lineWidth"
          :line-height="lineHeight"
        >
          <wd-tab v-for="item in 4" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0,
          color: 'rgb(255, 0, 0)',
          inactiveColor: 'rgb(0, 0, 0)',
          lineWidth: 40,
          lineHeight: 4
        }
      }
    })
    await later(0)
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    const { style: lineStyle } = wrapper.find('.wd-tabs__line').element
    expect(lineStyle.background).toBe('rgb(255, 0, 0)')
    expect(navItems.at(0).element.style.color).toBe('rgb(255, 0, 0)')
    expect(navItems.at(getRandNum(1, 3)).element.style.color).toBe('rgb(0, 0, 0)')
    expect(lineStyle.width).toBe('40px')
    expect(lineStyle.height).toBe('4px')
  })

  test('Tab renders after click with setting lazy-render', async () => {
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab" lazy-render>
          <wd-tab v-for="item in 4" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0
        }
      }
    })
    await later(0)
    const navItems = wrapper.findAll('.wd-tabs__nav-item')
    const tabs = wrapper.findAll(Tab)
    const randNum = getRandNum(1, 3)
    expect(tabs.at(randNum).text()).toBe('')
    navItems.at(randNum).trigger('click')
    await later(0)
    expect(tabs.at(randNum).text()).not.toBe('')
  })

  test('Display animated when using animated', async () => {
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab" animated>
          <wd-tab v-for="item in 4" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0
        }
      }
    })
    await later(0)
    const { transition } = wrapper.find('.wd-tabs__body').element.style
    expect(transition).toBeDefined()
  })
})

describe('Tabs\' event', () => {
  test('change', async () => {
    const handler = jest.fn(v => v)
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab" @change="handler">
          <wd-tab v-for="item in 4" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0
        }
      },
      methods: {
        handler
      }
    })
    const randNum = getRandNum(1, 3)
    await later(0)
    wrapper.findAll('.wd-tabs__nav-item').at(randNum).trigger('click')
    expect(handler).toHaveBeenCalled()
  })
  test('click', async () => {
    const handler = jest.fn(v => v)
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab" @click="handler">
          <wd-tab v-for="item in 4" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0
        }
      },
      methods: {
        handler
      }
    })
    const randNum = getRandNum(1, 3)
    await later(0)
    wrapper.findAll('.wd-tabs__nav-item').at(randNum).trigger('click')
    expect(handler).toHaveBeenCalled()
  })
  test('disabled', async () => {
    const handler = jest.fn(v => v)
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab" @disabled="handler">
          <wd-tab v-for="item in 4" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0
        }
      },
      methods: {
        handler
      }
    })
    await later(0)
    const randNum = getRandNum(1, 3)
    const nav = wrapper.findAll('.wd-tabs__nav-item').at(randNum)
    nav.trigger('click')
    expect(handler).toBeCalledTimes(0)
    wrapper.findAll(Tab).at(randNum).setProps({ disabled: true })
    nav.trigger('click')
    expect(handler).toHaveBeenCalled()
  })
})

describe('Tab\'s props', () => {
  test('name and title', async () => {
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab">
          <wd-tab
            v-for="item in 4" :key="item"
            :title="\`标签\${item}\`"
            :name="\`命名\${item}\`"
          >
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0
        }
      }
    })
    const randNum = getRandNum(0, 3)
    await later()
    expect(
      wrapper
        .findAll('.wd-tabs__nav-item')
        .at(randNum)
        .text()
    ).toBe(`标签${randNum + 1}`)

    expect(
      wrapper
        .findAll(Tab)
        .at(randNum)
        .vm.name
    ).toBe(`命名${randNum + 1}`)
  })

  test('disabled', async () => {
    const wrapper = mount({
      template: `
        <wd-tabs v-model="tab">
          <wd-tab v-for="item in 4" :key="item">
            <p>内容{{ item }}</p>
          </wd-tab>
        </wd-tabs>
      `,
      data () {
        return {
          tab: 0
        }
      }
    })
    const randNum = getRandNum(0, 3)
    await later()
    const nav = wrapper.findAll('.wd-tabs__nav-item').at(randNum)
    // 禁用之后无法点击
    wrapper.findAll(Tab).at(randNum).setProps({ disabled: true })
    nav.trigger('click')
    await later()
    expect(nav.classes('is-disabled')).toBe(true)
    // 取消禁用之后可以点击
    wrapper.findAll(Tab).at(randNum).setProps({ disabled: false })
    nav.trigger('click')
    await later()
    expect(nav.classes('is-active')).toBe(true)
  })
})

describe('Tab\'s slot', () => {
  test('title', async () => {
    const wrapper = mount({
      template: `
      <wd-tabs v-model="tab">
        <wd-tab v-for="item in 4" :key="item">
          <template v-slot:title>标签{{item}}</template>
          <p>内容{{ item }}</p>
        </wd-tab>
      </wd-tabs>
    `,
      data () {
        return {
          tab: 0
        }
      }
    })
    await later()
    const randNum = getRandNum(0, 3)
    const nav = wrapper.findAll('.wd-tabs__nav-item').at(randNum)
    expect(nav.text()).toBe(`标签${randNum + 1}`)
  })
})
