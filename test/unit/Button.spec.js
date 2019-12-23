import Button from 'wot-design/packages/button/index.js'
import { mount } from '@vue/test-utils'

test('should render correct contents', () => {
  let wrapper = mount(Button, {
    slots: {
      default: 'primary'
    }
  })
  expect(wrapper.element.querySelector('span').textContent).toBe('primary')
})