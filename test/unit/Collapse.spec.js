/* eslint-disable no-undef */
import Collapse from 'wot-design/packages/collapse/index.js'
import CollapseItem from 'wot-design/packages/collapse-item/index.js'
import { mount } from '@vue/test-utils'
import { testInstall } from './utils'

testInstall(Collapse)
testInstall(CollapseItem)

// 测试基本模式
test('collapse mode bascis test -- default', done => {
  const wrapper = mount({
    data () {
      return {
        value: ['item1']
      }
    },
    template: `
    <wd-collapse v-model="value" ref="collapse">
      <wd-collapse-item title="标签1" name="item1" ref="item1">
        这是一条简单的示例文字。
      </wd-collapse-item>
      <wd-collapse-item title="标签2" name="item2" ref="item2">
        这是一条简单的示例文字。
      </wd-collapse-item>
      <wd-collapse-item title="标签3" name="item3" ref="item3">
        这是一条简单的示例文字。
      </wd-collapse-item>
    </wd-collapse>`
  })
  const { vm } = wrapper

  // 判断 item1 当前是否处于展开状态 show 为 true
  expect(vm.$refs.item1.isExpand).toBe(true)
  vm.$refs.item1.$el.querySelector('.wd-collapse-item__header').click()

  vm.$nextTick(() => {
    expect(vm.$refs.item1.isExpand).toBe(false)
    vm.$refs.item2.$el.querySelector('.wd-collapse-item__header').click()

    vm.$nextTick(async () => {
      expect(vm.$refs.item2.isExpand).toBe(true)
      vm.$refs.item3.$el.querySelector('.wd-collapse-item__header').click()
      // 手动模拟折叠状态下的动画结束触发方法
      await expect(vm.$refs.item1.onTransitionend())

      vm.$nextTick(async () => {
        // 最后 item1 处于关闭状态，item2、item3 处于展开状态
        expect(vm.$refs.item3.isExpand).toBe(true)
        // 手动模拟展开状态下的动画结束触发方法
        await expect(vm.$refs.item3.onTransitionend())
        done()
      })
    })
  })
})
// 手风琴模式
test('collapse mode accordion test -- accordion', done => {
  const wrapper = mount({
    data () {
      return {
        value: 'item1'
      }
    },
    template: `
    <wd-collapse v-model="value" accordion ref="collapse">
        <wd-collapse-item title="标签1" name="item1" ref="item1">
          这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签2" name="item2" ref="item2">
          这是一条简单的示例文字。
        </wd-collapse-item>
        <wd-collapse-item title="标签3" name="item3" ref="item3" disabled>
          这是一条简单的示例文字。
        </wd-collapse-item>
      </wd-collapse>`
  })
  const { vm } = wrapper

  // 手风琴模式
  expect(vm.$refs.item1.isExpand).toBe(true)
  // 在第一个展开的情况下，点开第二个
  vm.$refs.item2.$el.querySelector('.wd-collapse-item__header').click()

  vm.$nextTick(() => {
    expect(vm.$refs.item1.isExpand).toBe(false)
    expect(vm.$refs.item2.isExpand).toBe(true)
    expect(vm.$refs.item3.isExpand).toBe(false)

    expect(vm.$refs.item3.disabled).toBe(true)
    // 在第二个展开的情况下点击第三个（此时第三个 disabled 为 true）
    vm.$refs.item3.$el.querySelector('.wd-collapse-item__header').click()

    vm.$nextTick(() => {
      expect(vm.$refs.item1.isExpand).toBe(false)
      expect(vm.$refs.item2.isExpand).toBe(true)
      expect(vm.$refs.item3.isExpand).toBe(false)
      done()
    })
  })
})

// 测试空模式
test('collapse mode bascis test -- default_isEmpty', () => {
  const wrapper = mount({
    data () {
      return {
        value: ''
      }
    },
    template: `
    <wd-collapse v-model="value" ref="collapse">
      <wd-collapse-item title="标签1" name="item1" ref="item1">
        这是一条简单的示例文字。
      </wd-collapse-item>
    </wd-collapse>`
  })
  const { vm } = wrapper

  // value 为空报警告信息
  expect(vm.$refs.collapse.value).toBe('')
})

// 更多模式
test('collapse test viewmore -- basics', done => {
  const wrapper = mount({
    data () {
      return {
        value: false
      }
    },
    template: `<wd-collapse ref="collapse" viewmore v-model="value">这是一条简单的示例文字</wd-collapse>`
  })
  const { vm } = wrapper

  expect(wrapper.find('.wd-collapse__more-txt').text()).toBe('展开')
  vm.$el.querySelector('.wd-collapse__more').click()

  vm.$nextTick(() => {
    expect(wrapper.find('.wd-collapse__more-txt').text()).toBe('收起')
    done()
  })
})

test('collapse test viewmore -- slot-more', done => {
  const wrapper = mount({
    data () {
      return {
        value: false
      }
    },
    template: `
    <wd-collapse viewmore v-model="value">
        这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。这是一条简单的示例文字。
        <div slot="more">自定义{{ value ? '折叠' : '展开' }}</div>
      </wd-collapse>`
  })
  const { vm } = wrapper

  expect(vm.value).toBe(false)
  vm.$el.querySelector('.wd-collapse__more').click()

  vm.$nextTick(() => {
    expect(vm.value).toBe(true)
    done()
  })
})
