import Badge from 'wot-design/packages/badge/index.js'
import { mount } from '@vue/test-utils'
import { testInstall } from './utils'

testInstall(Badge)

test('should render correct contents', () => {
  let wrapper = mount(Badge, {
    slots: {
      default: '<span>primary</span>'
    }
  })
  expect(wrapper.element.querySelector('span').textContent).toBe('primary')
})

test('badge bgColor', () => {
  let wrapper = mount(Badge, {
    propsData: {
      bgColor: 'rgb(204, 204, 204)'
    }
  })
  expect(wrapper.element.querySelector('sup').style.backgroundColor).toBe('rgb(204, 204, 204)')
})

test('badge type', () => {
  let wrapper = mount(Badge, {
    propsData: {
      type: 'primary'
    }
  })
  expect(wrapper.element.querySelector('sup').getAttribute('class')).toContain('wd-badge__content--primary')
})

test('badge isDot', () => {
  let wrapper = mount(Badge, {
    propsData: {
      isDot: true
    }
  })
  expect(wrapper.element.querySelector('sup').getAttribute('class')).toContain('is-dot')
})

test('badge top right', () => {
  let wrapper = mount(Badge, {
    slots: {
      default: '<span>primary</span>'
    },
    propsData: {
      top: 3,
      right: 3
    }
  })
  expect(wrapper.element.querySelector('sup').style.top).toBe('3px')
  expect(wrapper.element.querySelector('sup').style.right).toBe('3px')
})

test('badge max', () => {
  let wrapper = mount(Badge, {
    propsData: {
      max: 10,
      value: 9
    }
  })
  expect(wrapper.element.querySelector('sup').textContent).toBe('9')
  wrapper = mount(Badge, {
    propsData: {
      max: 10,
      value: 11
    }
  })
  expect(wrapper.element.querySelector('sup').textContent).toBe('10+')
})
