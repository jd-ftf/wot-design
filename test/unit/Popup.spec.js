import Popup from 'wot-design/packages/popup/index.js'
import { mount } from '@vue/test-utils'
import { testInstall, getRandNum, later } from './utils'

testInstall(Popup)

describe('Should render correct content', () => {
  test('Popup\'s state will change when switching v-model', async () => {
    const wrapper = mount({
      template: `
        <wd-popup v-model="show">内容</wd-popup>
      `,
      data () {
        return {
          show: false
        }
      }
    })
    // 初始状态
    expect(document.querySelector('.wd-modal')).toBeNull()
    expect(wrapper.find('.wd-popup').isVisible()).toBe(false)
    // 打开浮层
    wrapper.setData({ show: true })
    await wrapper.vm.$nextTick()
    // 打开浮层body不准滑动
    expect(document.body.className.includes('wd-overflow-hidden')).toBe(true)
    // 内容显示
    expect(document.querySelector('.wd-modal')).toBeDefined()
    expect(wrapper.find('.wd-popup').isVisible()).toBe(true)
    // 自定义内容的的z-index权重比浮层要高
    const modalZindex = document.querySelector('.wd-modal').style['z-index']
    const popupZindex = wrapper.find(Popup).element.style['z-index']
    expect(popupZindex > modalZindex).toBe(true)
  })

  test('position', async () => {
    const map = ['center', 'top', 'right', 'bottom', 'left']
    const wrapper = mount({
      template: `
        <wd-popup v-model="show" :position="position">内容</wd-popup>
      `,
      data () {
        return {
          show: false,
          position: 'center'
        }
      }
    })
    // 打开浮层
    const position = map[getRandNum(0, 4)]
    wrapper.setData({ show: true, position })
    await wrapper.vm.$nextTick()
    expect(wrapper.find(Popup).classes(`wd-popup--${position}`)).toBe(true)
  })

  test('closable', async () => {
    const wrapper = mount({
      template: `
        <wd-popup v-model="show" closable>内容</wd-popup>
      `,
      data () {
        return {
          show: false
        }
      }
    })
    wrapper.setData({ show: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.contains('.wd-popup__close')).toBe(true)
    wrapper.find('.wd-popup__close').trigger('click')
    await later(0)
    await later(300)
    expect(wrapper.find(Popup).isVisible()).toBe(false)
  })

  test('close-on-click-modal', async () => {
    const wrapper = mount({
      template: `
        <wd-popup v-model="show">内容</wd-popup>
      `,
      data () {
        return {
          show: false
        }
      }
    })
    // 正常状态下点击浮层会关闭
    wrapper.setData({ show: true })
    await wrapper.vm.$nextTick()
    document.querySelector('.wd-modal').click()
    // 关闭浮层有300ms动画时长,动画走几个Tick不确定
    await later(0)
    await later(300)
    expect(wrapper.find(Popup).isVisible()).toBe(false)
    // 关闭close-on-click-modal
    wrapper.find(Popup).setProps({
      closeOnClickModal: false
    })
    wrapper.setData({ show: true })
    await wrapper.vm.$nextTick()
    document.querySelector('.wd-modal').click()
    await later(0)
    await later(300)
    expect(wrapper.find(Popup).isVisible()).toBe(true)
  })

  test('duration', async () => {
    const duration = 500
    const wrapper = mount({
      template: `
        <wd-popup v-model="show">内容</wd-popup>
      `,
      data () {
        return {
          show: true
        }
      }
    })
    // 正常状态下点击浮层会关闭
    wrapper.find(Popup).setProps({ duration })
    await wrapper.vm.$nextTick()
    expect(wrapper.find(Popup).element.style['transition-duration']).toBe(`${duration}ms`)
  })
})

describe('Event', () => {
  test('open', async () => {
    const handler = jest.fn()
    const wrapper = mount({
      template: `
        <wd-popup v-model="show" @open="handler">内容</wd-popup>
      `,
      data () {
        return {
          show: false
        }
      },
      methods: {
        handler
      }
    })
    wrapper.setData({ show: true })
    await later()
    expect(handler).toHaveBeenCalled()
  })

  test('opened', async () => {
    const handler = jest.fn()
    const wrapper = mount({
      template: `
        <wd-popup v-model="show" @opened="handler">内容</wd-popup>
      `,
      data () {
        return {
          show: false
        }
      },
      methods: {
        handler
      }
    })
    wrapper.setData({ show: true })
    await later(400)
    expect(handler).toHaveBeenCalled()
  })

  test('close', async () => {
    const handler = jest.fn()
    const wrapper = mount({
      template: `
        <wd-popup v-model="show" @close="handler">内容</wd-popup>
      `,
      data () {
        return {
          show: true
        }
      },
      methods: {
        handler
      }
    })
    wrapper.setData({ show: false })
    await later()
    expect(handler).toHaveBeenCalled()
  })

  test('closed', async () => {
    const handler = jest.fn()
    const wrapper = mount({
      template: `
        <wd-popup v-model="show" @closed="handler">内容</wd-popup>
      `,
      data () {
        return {
          show: true
        }
      },
      methods: {
        handler
      }
    })
    wrapper.setData({ show: false })
    await later(400)
    expect(handler).toHaveBeenCalled()
  })

  test('click-modal', async () => {
    const handler = jest.fn()
    mount({
      template: `
        <wd-popup v-model="show" @click-modal="handler">内容</wd-popup>
      `,
      data () {
        return {
          show: true
        }
      },
      methods: {
        handler
      }
    })
    document.querySelector('.wd-modal').click()
    await later()
    expect(handler).toHaveBeenCalled()
  })
})
