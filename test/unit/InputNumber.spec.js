import InputNumber from 'wot-design/packages/input-number/index'
import { mount } from '@vue/test-utils'
import { testInstall, later } from './utils'

testInstall(InputNumber)

test('step, add, sub', async () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      value: 3,
      step: 2
    }
  })

  const actions = wrapper.findAll('.wd-input-number__action')
  actions.at(1).trigger('click')
  actions.at(0).trigger('click')

  expect(wrapper.emitted('input')[1]).toEqual([5])

  expect(wrapper.emitted('input')[2]).toEqual([1])
})

test('disabled', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      disabled: true
    }
  })

  expect(wrapper.find('.wd-input-number__input').attributes().disabled).toBe('disabled')
})

test('min disabled', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      value: 1
    }
  })

  const actions = wrapper.findAll('.wd-input-number__action')
  actions.at(0).trigger('click')
  actions.at(1).trigger('click')

  expect(wrapper.emitted('input')[1]).toEqual([2])
})

test('max disabled', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      value: 4,
      max: 4
    }
  })

  const actions = wrapper.findAll('.wd-input-number__action')
  actions.at(1).trigger('click')
  actions.at(0).trigger('click')

  expect(wrapper.emitted('input')[1]).toEqual([3])
})

test('value is null', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      min: 1
    }
  })

  expect(wrapper.find('.wd-input-number__input').element.value).toBe('1')
})

test('without input', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      withoutInput: true
    }
  })

  expect(wrapper.element.querySelector('.wd-input-number__inner')).toBeFalsy()
})

test('precision', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      value: 1.205,
      precision: 2,
      step: 0.1
    }
  })

  expect(wrapper.emitted('input')[0]).toEqual(['1.21'])
})

test('step-strictly', async () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      value: 1,
      step: 2,
      stepStrictly: true
    }
  })

  expect(wrapper.emitted('input')[0]).toEqual([2])

  const input = wrapper.find('.wd-input-number__input')
  input.element.value = 3
  input.trigger('input')

  await later()

  expect(wrapper.vm.displayValue).toBe('3')

  input.trigger('change')
  expect(wrapper.emitted('input')[1]).toEqual([4])
})

test('step-strictly, step precision', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      value: 1.15,
      step: 0.2,
      stepStrictly: true
    }
  })

  expect(wrapper.emitted('input')[0]).toEqual([1.2])
})

test('blur', () => {
  const blurHandler = jest.fn()
  let wrapper = mount(InputNumber, {
    listeners: {
      blur: blurHandler
    }
  })

  const input = wrapper.find('.wd-input-number__input')
  input.trigger('blur')

  expect(blurHandler).toHaveBeenCalled()
})

test('value null', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      value: 3
    }
  })

  const input = wrapper.find('.wd-input-number__input')
  input.element.value = ''
  input.trigger('change')

  expect(wrapper.emitted('change')[0]).toEqual([1])
})

test('max, min', () => {
  let wrapper = mount(InputNumber, {
    propsData: {
      value: 2,
      max: 10
    }
  })

  const input = wrapper.find('.wd-input-number__input')
  input.element.value = 0
  input.trigger('change')
  expect(wrapper.emitted('change')[0]).toEqual([1])

  input.element.value = 11
  input.trigger('change')
  expect(wrapper.emitted('change')[1]).toEqual([10])
})