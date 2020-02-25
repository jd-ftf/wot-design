import Icon from 'wot-design/packages/icon/index.js'
import { mount } from '@vue/test-utils'
import { testInstall } from './utils'

testInstall(Icon)

test('should render correct content', () => {
  let wrapper = mount(Icon, {
    propsData: {
      name: 'setting',
      color: 'rgb(0, 131, 255)',
      size: '20px'
    }
  })

  expect(wrapper.contains('.wd-icon-setting')).toBe(true)
})