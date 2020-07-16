import Input from 'wot-design/packages/input/index'
import { mount } from '@vue/test-utils'
import { testInstall, later } from './utils'

testInstall(Input)

test('placeholder', () => {
  let wrapper = mount(Input, {
    propsData: {
      placeholder: '请输入'
    }
  })

  expect(wrapper.element.querySelector('.wd-input__inner').placeholder).toBe('请输入')
})

test('disabled', () => {
  let wrapper = mount(Input, {
    propsData: {
      disabled: true
    }
  })

  expect(wrapper.contains('.is-disabled')).toBe(true)
})

test('readonly', () => {
  let wrapper = mount(Input, {
    propsData: {
      readonly: true
    }
  })
  expect(wrapper.element.querySelector('.wd-input__inner').readOnly).toBe(true)
})

test('error', () => {
  let wrapper = mount(Input, {
    propsData: {
      error: true
    }
  })
  expect(wrapper.contains('.is-error')).toBe(true)
})

test('clearable', () => {
  const clearHandler = jest.fn()
  let wrapper = mount(Input, {
    propsData: {
      clearable: true,
      value: '测试'
    },
    listeners: {
      clear: clearHandler
    }
  })

  let clearWrapper = wrapper.find('.wd-icon-error-fill')
  expect(clearWrapper).toBeTruthy()

  clearWrapper.trigger('click')
  expect(clearHandler).toHaveBeenCalled()
})

test('show-password', async () => {
  let wrapper = mount(Input, {
    propsData: {
      showPassword: true
    }
  })

  expect(wrapper.element.querySelector('.wd-input__inner').type).toBe('password')

  wrapper.find('.wd-icon-eye-close').trigger('click')
  await later()
  expect(wrapper.element.querySelector('.wd-icon-view')).toBeTruthy()
})

test('prefix-icon, suffix-icon', () => {
  let wrapper = mount(Input, {
    propsData: {
      prefixIcon: 'wd-icon-person',
      suffixIcon: 'wd-icon-tickets'
    }
  })

  expect(wrapper.element.querySelector('.wd-icon-person')).toBeTruthy()
  expect(wrapper.element.querySelector('.wd-icon-tickets')).toBeTruthy()
})

test('prefix-icon, suffix-icon, slot', () => {
  let wrapper = mount(Input, {
    slots: {
      prefix: '<i class="test1"></i>',
      suffix: '<i class="test2"></i>s'
    }
  })

  expect(wrapper.element.querySelector('.test1')).toBeTruthy()
  expect(wrapper.element.querySelector('.test2')).toBeTruthy()
})

test('show-word-limit', () => {
  let wrapper = mount(Input, {
    propsData: {
      maxlength: '20',
      showWordLimit: true
    }
  })

  expect(wrapper.element.querySelector('.wd-input__count')).toBeTruthy()
})

test('textarea', () => {
  let wrapper = mount(Input, {
    propsData: {
      type: 'textarea'
    }
  })

  expect(wrapper.element.querySelector('.wd-input__textarea-inner')).toBeTruthy()
})

test('autosize', () => {
  let wrapper = mount(Input, {
    propsData: {
      autosize: true
    }
  })

  expect(wrapper.element.querySelector('.is-text-auto')).toBeTruthy()

  let wrapper2 = mount(Input, {
    propsData: {
      value: '1123',
      autosize: {
        minRows: 4,
        maxRows: 6
      }
    }
  })

  expect(wrapper2.element.querySelector('.is-text-auto')).toBeTruthy()
})

test('event', () => {
  const focusHandler = jest.fn()
  const blurHandler = jest.fn()
  const changeHandler = jest.fn()
  const inputHandler = jest.fn()

  let wrapper = mount(Input, {
    listeners: {
      focus: focusHandler,
      blur: blurHandler,
      change: changeHandler,
      input: inputHandler
    }
  })

  let inputEl = wrapper.find('.wd-input__inner')

  inputEl.trigger('focus')
  expect(focusHandler).toHaveBeenCalled()

  inputEl.trigger('blur')
  expect(blurHandler).toHaveBeenCalled()

  inputEl.trigger('change')
  expect(changeHandler).toHaveBeenCalled()

  inputEl.trigger('input')
  expect(inputHandler).toHaveBeenCalled()
})

test('methods', () => {
  const blurHandler = jest.fn()
  let wrapper = mount(Input, {
    listeners: {
      blur: blurHandler
    }
  })

  wrapper.vm.blur()
  wrapper.vm.select()
})

test('calcTextareaHeight', async () => {
  /**
   * box-sizing 无法获取，window.getComputedStyle 只模拟出部分功能，自己添加需要的样式属性
   */
  const originGetComputedStyle = window.getComputedStyle
  window.getComputedStyle = ele => {
    const style = originGetComputedStyle(ele)
    style._values['box-sizing'] = 'content-box'

    return style
  }

  let wrapper = mount(Input, {
    propsData: {
      autosize: true
    }
  })

  await later()
  expect(parseFloat(wrapper.find('.wd-input__textarea-inner').element.style.height) < 0).toBe(true)

  window.getComputedStyle = ele => {
    const style = originGetComputedStyle(ele)
    style._values['box-sizing'] = 'border-box'

    return style
  }
  let wrapper2 = mount(Input, {
    propsData: {
      autosize: {
        minRows: 2,
        maxRows: 4
      }
    }
  })

  await later()
  expect(parseFloat(wrapper2.find('.wd-input__textarea-inner').element.style.height) < 0).toBe(true)
})
