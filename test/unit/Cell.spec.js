import Cell from 'wot-design/packages/cell/index.js'
import CellGroup from 'wot-design/packages/cell-group/index.js'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { testInstall } from './utils'
import VueRouter from 'vue-router'

testInstall(Cell)
testInstall(CellGroup)

test('should render correct content', () => {
  let wrapper = mount(CellGroup, {
    slots: {
      default: '<wd-cell title="标题文字" value="内容"></wd-cell>'
    }
  })

  const cellItem = wrapper.find(Cell)
  expect(cellItem.is(Cell)).toBe(true)
  expect(cellItem.element.querySelector('.wd-cell__title').textContent.trim()).toBe('标题文字')
  expect(cellItem.element.querySelector('.wd-cell__value').textContent.trim()).toBe('内容')
})

test('should render cell-group title and value', () => {
  let wrapper = mount(CellGroup, {
    propsData: {
      title: '分组标题',
      value: '内容'
    },
    slots: {
      default: '<wd-cell title="标题文字" value="内容"></wd-cell>'
    }
  })

  expect(wrapper.element.querySelector('.wd-cell-group__left').textContent.trim()).toBe('分组标题')
  expect(wrapper.element.querySelector('.wd-cell-group__right').textContent.trim()).toBe('内容')
})

test('should render cell-group title slot', () => {
  let wrapper = mount(CellGroup, {
    slots: {
      default: '<wd-cell title="标题文字" value="内容"></wd-cell>',
      title: '分组标题'
    }
  })

  expect(wrapper.element.querySelector('.wd-cell-group__left').textContent.trim()).toBe('分组标题')
})

test('should only render cell-group value', () => {
  let wrapper = mount(CellGroup, {
    propsData: {
      value: '内容'
    },
    slots: {
      default: '<wd-cell title="标题文字" value="内容"></wd-cell>'
    }
  })

  expect(wrapper.element.querySelector('.wd-cell-group__right').textContent.trim()).toBe('内容')
})

test('should only render cell-group value slot', () => {
  let wrapper = mount(CellGroup, {
    slots: {
      default: '<wd-cell title="标题文字" value="内容"></wd-cell>',
      value: '内容'
    }
  })

  expect(wrapper.element.querySelector('.wd-cell-group__right').textContent.trim()).toBe('内容')
})

test('should render cell icon and label, and isLink, clickable, size, center', () => {
  let wrapper = mount(Cell, {
    propsData: {
      title: '标题文字',
      value: '内容',
      label: '描述信息',
      icon: 'wd-icon-setting',
      isLink: true,
      clickable: true,
      size: 'large',
      center: true
    }
  })

  expect(wrapper.element.querySelector('.wd-cell__label').textContent.trim()).toBe('描述信息')
  expect(wrapper.contains('.wd-icon-setting')).toBe(true)
  expect(wrapper.contains('.wd-cell__arrow-right')).toBe(true)
  expect(wrapper.contains('.is-link')).toBe(true)
  expect(wrapper.contains('.is-large')).toBe(true)
  expect(wrapper.contains('.is-center')).toBe(true)
})

test('should render cell slots', () => {
  let wrapper = mount(Cell, {
    slots: {
      default: '内容',
      title: '标题文字',
      label: '描述信息',
      icon: '<i class="wd-icon-setting"></i>'
    }
  })

  expect(wrapper.element.querySelector('.wd-cell__title').textContent.trim()).toBe('标题文字')
  expect(wrapper.element.querySelector('.wd-cell__value').textContent.trim()).toBe('内容')
  expect(wrapper.element.querySelector('.wd-cell__label').textContent.trim()).toBe('描述信息')
  expect(wrapper.contains('.wd-icon-setting')).toBe(true)
})

test('click event', () => {
  const onClick = jest.fn()
  let wrapper = mount(Cell, {
    propsData: {
      title: '标题文字',
      value: '内容',
      clickable: true
    },
    listeners: {
      click: onClick
    }
  })
  wrapper.trigger('click')
  expect(onClick).toHaveBeenCalled()

  const onClick2 = jest.fn()
  let wrapper2 = mount(Cell, {
    propsData: {
      title: '标题文字',
      value: '内容'
    },
    listeners: {
      click: onClick2
    }
  })
  wrapper2.trigger('click')
  expect(onClick).toHaveBeenCalled()
})

test('props: to(href link)', () => {
  let wrapper = mount(Cell, {
    propsData: {
      title: '标题文字',
      value: '内容',
      to: 'https://m.jd.com'
    }
  })
  expect(wrapper.attributes('href')).toBe('https://m.jd.com')
})

test('props: to(router)', () => {
  const localVue = createLocalVue()
  localVue.use(VueRouter)
  const router = new VueRouter({
    routes: [
      {
        path: '/cell',
        component: Cell
      }
    ]
  })
  
  let wrapper = shallowMount(Cell, {
    localVue,
    router,
    stubs: ['router-link'],
    propsData: {
      title: '标题文字',
      value: '内容',
      to: '/cell'
    }
  })
  expect(wrapper.attributes('to')).toBe('/cell')
  
  let wrapper2 = shallowMount(Cell, {
    localVue,
    router,
    stubs: ['router-link'],
    propsData: {
      title: '标题文字',
      value: '内容',
      to: '/button'
    }
  })
  expect(wrapper2.attributes('to')).toBeUndefined()

  let wrapper3 = shallowMount(Cell, {
    localVue,
    router,
    stubs: ['router-link'],
    propsData: {
      title: '标题文字',
      value: '内容',
      to: '/cell',
      replace: true
    }
  })
  expect(wrapper3.attributes('replace')).toBe("true")
})

test('props: to, isLink, size, center', () => {
  let wrapper = mount(Cell, {
    propsData: {
      title: '标题文字',
      value: '内容',
      to: 'https://m.jd.com',
      isLink: true,
      size: 'large',
      center: true
    }
  })
  expect(wrapper.contains('.is-link')).toBe(true)
  expect(wrapper.contains('.is-large')).toBe(true)
  expect(wrapper.contains('.is-center')).toBe(true)
})

test('props: titleWidth', () => {
  let wrapper = mount(Cell, {
    propsData: {
      title: '标题文字',
      value: '内容',
      titleWidth: '100px'
    }
  })
  expect(wrapper.element.querySelector('.wd-cell__left').style.minWidth).toBe('100px')
})

test('should not render value', () => {
  let wrapper = mount(Cell, {
    propsData: {
      title: '标题文字',
      titleWidth: '100px'
    }
  })
  expect(wrapper.contains('.wd-cell__value')).toBe(false)
})