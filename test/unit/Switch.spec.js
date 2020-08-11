import Switch from 'wot-design/packages/switch/index.js'
import { mount } from '@vue/test-utils'
import { testInstall, later } from './utils'

testInstall(Switch)

test('should render correct content', async () => {
  const wrapper = mount({
    template: `
      <wd-switch v-model="value"></wd-switch>
    `,
    data () {
      return {
        value: true
      }
    }
  })
  expect(wrapper.classes('is-checked')).toBe(true)

  wrapper.setData({ value: false })
  await later(0)
  expect(wrapper.classes('is-checked')).toBe(false)
})

test('emit event', () => {
  const input = jest.fn()
  const change = jest.fn()
  const wrapper = mount(Switch, {
    listeners: {
      input,
      change
    }
  })
  wrapper.trigger('click')

  expect(input).toHaveBeenCalledWith(true)
  expect(change).toHaveBeenCalledWith(true)
})

test('disabled', () => {
  const input = jest.fn()
  const change = jest.fn()
  const wrapper = mount(Switch, {
    listeners: {
      input,
      change
    },
    propsData: {
      disabled: true
    }
  })
  wrapper.trigger('click')

  expect(input).toHaveBeenCalledTimes(0)
  expect(change).toHaveBeenCalledTimes(0)
})

test('active-value & inactive-value', () => {
  const input = jest.fn()
  const change = jest.fn()
  const wrapper = mount(Switch, {
    propsData: {
      value: '1',
      activeValue: '1',
      inactiveValue: '2'
    },
    listeners: {
      input,
      change
    }
  })

  wrapper.trigger('click')

  expect(input).toHaveBeenCalledWith('2')
  expect(change).toHaveBeenCalledWith('2')
})

test('active-color', () => {
  const wrapper = mount(Switch, {
    propsData: {
      value: '1',
      activeValue: '1',
      activeColor: 'rgb(0, 131, 255)'
    }
  })
  expect(wrapper.element.style.borderColor).toBe('rgb(0, 131, 255)')
  expect(wrapper.element.style.background).toBe('rgb(0, 131, 255)')
})

test('inactive-color', () => {
  const wrapper = mount(Switch, {
    propsData: {
      value: '1',
      activeValue: '2',
      inactiveColor: 'rgb(226, 35, 26)'
    }
  })
  expect(wrapper.element.style.borderColor).toBe('rgb(226, 35, 26)')
  expect(wrapper.element.style.background).toBe('rgb(226, 35, 26)')
})

test('size', () => {
  const wrapper = mount(Switch, {
    propsData: {
      size: '20px'
    }
  })
  expect(wrapper.element.style.fontSize).toBe('20px')
})
