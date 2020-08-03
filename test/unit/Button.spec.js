import Button from 'wot-design/packages/button/index.js'
import { mount } from '@vue/test-utils'
import { testInstall } from './utils'

testInstall(Button)

test('should render correct contents', () => {
  let wrapper = mount(Button, {
    slots: {
      default: 'primary'
    }
  })
  expect(wrapper.element.querySelector('span').textContent).toBe('primary')
})

test('click event', () => {
  const onClick = jest.fn()
  let wrapper = mount(Button, {
    listeners: {
      click: onClick
    }
  })
  wrapper.trigger('click')
  expect(onClick).toHaveBeenCalled()
})

test('click disabled when loading', () => {
  const onClick = jest.fn()
  let wrapper = mount(Button, {
    propsData: {
      loading: true
    },
    listeners: {
      click: onClick
    }
  })
  wrapper.trigger('click')
  expect(onClick.mock.calls.length).toBe(0)
})

test('button type', () => {
  let wrapper = mount(Button, {
    propsData: {
      type: 'primary'
    }
  })
  expect(wrapper.classes()).toContain('is-primary')
})

test('button disabled', () => {
  let wrapper = mount(Button, {
    propsData: {
      disabled: true
    }
  })
  expect(wrapper.classes()).toContain('is-disabled')
})

test('button round', () => {
  let wrapper = mount(Button, {
    propsData: {
      round: true
    }
  })
  expect(wrapper.classes()).toContain('is-round')
})

test('button plain', () => {
  let wrapper = mount(Button, {
    propsData: {
      plain: true
    }
  })
  expect(wrapper.classes()).toContain('is-plain')
})

test('button loading', () => {
  let wrapper = mount(Button, {
    propsData: {
      loading: true
    }
  })
  expect(wrapper.classes()).toContain('is-loading')
  expect(wrapper.contains('.wd-button__loading')).toBe(true)
})

test('button suck', () => {
  let wrapper = mount(Button, {
    propsData: {
      suck: true
    }
  })
  expect(wrapper.classes()).toContain('is-suck')
})

test('button block', () => {
  let wrapper = mount(Button, {
    propsData: {
      block: true
    }
  })
  expect(wrapper.classes()).toContain('is-block')
})
