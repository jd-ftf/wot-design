import Checkbox from 'wot-design/packages/checkbox/index.js'
import CheckboxGroup from 'wot-design/packages/checkbox-group/index.js'
import { mount } from '@vue/test-utils'
import { testInstall, later } from './utils'

testInstall(Checkbox)
testInstall(CheckboxGroup)

test('only render one checkbox', () => {
  const changeHandler = jest.fn(value => value)
  let wrapper = mount(Checkbox, {
    propsData: {
      value: true
    },
    listeners: {
      change: changeHandler
    }
  })

  expect(wrapper.contains('.is-checked')).toBe(true)

  wrapper.trigger('click')
  expect(changeHandler.mock.calls[0][0]).toEqual(false)
})

test('true-value, false-value', async () => {
  const changeHandler = jest.fn(value => value)
  let wrapper = mount({
    data () {
      return {
        value: '1'
      }
    },
    template: '<wd-checkbox v-model="value" true-value="1" false-value="2" @change="change"></wd-checkbox>',
    methods: {
      change: changeHandler
    }
  })

  expect(wrapper.contains('.is-checked')).toBe(true)

  wrapper.trigger('click')
  expect(changeHandler.mock.calls[0][0]).toEqual('2')

  await later()

  wrapper.trigger('click')
  expect(changeHandler.mock.calls[1][0]).toEqual('1')
})

test('checkbox-group', () => {
  let wrapper = mount(CheckboxGroup, {
    propsData: {
      value: ['1']
    },
    slots: {
      default: `
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2"></wd-checkbox>
      `
    }
  })
  const checkbox = wrapper.find('.wd-checkbox')
  checkbox.vm.toggle()
  expect(wrapper.props().value).toStrictEqual([])

  checkbox.vm.toggle()
  expect(wrapper.props().value).toStrictEqual(['1'])
})

test('checkbox-group without value', () => {
  let wrapper = mount(CheckboxGroup, {
    slots: {
      default: `
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2"></wd-checkbox>
      `
    }
  })

  expect(wrapper.props().value).toStrictEqual([])
})

test('checkbox-group disabled', () => {
  let wrapper = mount({
    template: `
      <wd-checkbox-group disabled>
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2"></wd-checkbox>
      </wd-checkbox-group>
    `
  })

  const checkboxs = wrapper.findAll('.wd-checkbox')
  expect(checkboxs.at(0).contains('.is-disabled')).toBe(true)
  expect(checkboxs.at(1).contains('.is-disabled')).toBe(true)
})

test('checkbox-group cell', () => {
  let wrapper = mount({
    template: `
      <wd-checkbox-group cell>
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2"></wd-checkbox>
      </wd-checkbox-group>
    `
  })

  const checkboxsGroup = wrapper.findAll('.wd-checkbox-group')
  expect(checkboxsGroup.at(0).contains('.is-cell')).toBe(true)
})

test('checkbox-group cell-button', () => {
  let wrapper = mount({
    template: `
      <wd-checkbox-group cell shape="button">
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2"></wd-checkbox>
      </wd-checkbox-group>
    `
  })

  const checkboxsGroup = wrapper.findAll('.wd-checkbox-group')
  expect(checkboxsGroup.at(0).contains('.is-button')).toBe(true)
})

test('checkbox-group shape', () => {
  let wrapper = mount({
    template: `
      <wd-checkbox-group shape="square">
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2" shape="circle"></wd-checkbox>
      </wd-checkbox-group>
    `
  })

  const checkboxs = wrapper.findAll('.wd-checkbox')
  expect(checkboxs.at(0).find('.wd-checkbox__shape').contains('.is-square')).toBe(true)
  expect(checkboxs.at(1).find('.wd-checkbox__shape').contains('.is-square')).toBe(false)
})

test('checkbox-group checked-color', async () => {
  let wrapper = mount({
    data () {
      return {
        value: ['1', '2']
      }
    },
    template: `
      <wd-checkbox-group v-model="value" checked-color="rgb(255, 0, 0)">
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2" checked-color="#0083ff"></wd-checkbox>
      </wd-checkbox-group>
    `
  })

  const checkboxs = wrapper.findAll('.wd-checkbox')
  expect(checkboxs.at(0).element.querySelector('.wd-checkbox__shape').style.color).toBe('rgb(255, 0, 0)')
  expect(checkboxs.at(1).element.querySelector('.wd-checkbox__shape').style.color).toBe('rgb(0, 131, 255)')
})

test('checkbox-group inline', () => {
  let wrapper = mount({
    template: `
      <wd-checkbox-group inline>
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2" shape="circle"></wd-checkbox>
      </wd-checkbox-group>
    `
  })

  const checkboxs = wrapper.findAll('.wd-checkbox')
  expect(checkboxs.at(0).contains('.is-inline')).toBe(true)
  expect(checkboxs.at(1).contains('.is-inline')).toBe(true)
})

test('checkbox-group mix, max', async () => {
  let wrapper = mount({
    data () {
      return {
        value: ['1']
      }
    },
    template: `
      <wd-checkbox-group v-model="value" :min="1" :max="2">
        <wd-checkbox value="1"></wd-checkbox>
        <wd-checkbox value="2"></wd-checkbox>
        <wd-checkbox value="3"></wd-checkbox>
      </wd-checkbox-group>
    `
  })

  let checkboxs = wrapper.findAll('.wd-checkbox')

  expect(checkboxs.at(0).contains('.is-disabled')).toBe(true)

  checkboxs.at(1).trigger('click')

  await later()

  expect(checkboxs.at(1).contains('.is-checked')).toBe(true)
  expect(checkboxs.at(2).contains('.is-disabled')).toBe(true)
})
