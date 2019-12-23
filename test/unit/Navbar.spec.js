import Navbar from 'jm-design/packages/navbar/index.js'
import { mount } from '@vue/test-utils'


test('should render correct content', () => {
  let wrapper = mount(Navbar, {
    propsData: {
      title: '标题'
    },
    slots: {
      left: '<span>返回</span>',
      right: '<span>菜单</span>'
    }
  })

  expect(wrapper.element.querySelector('.jm-navbar__title').textContent).toBe('标题')
  expect(wrapper.element.querySelector('.jm-navbar__side-left span').textContent).toBe('返回')
  expect(wrapper.element.querySelector('.jm-navbar__side-right span').textContent).toBe('菜单')
})