import Img from 'wot-design/packages/img/index.js'
import { mount } from '@vue/test-utils'
import { testInstall } from './utils'

testInstall(Img)

test('src alt', () => {
  let wrapper = mount(Img, {
    propsData: {
      src: 'https://img11.360buyimg.com/imagetools/jfs/t1/97097/3/14534/16030/5e679864Ee33f7ad8/776765530208d205.png',
      alt: 'joy'
    }
  })
  expect(wrapper.element.querySelector('img').src).toBe('https://img11.360buyimg.com/imagetools/jfs/t1/97097/3/14534/16030/5e679864Ee33f7ad8/776765530208d205.png')
  expect(wrapper.element.querySelector('img').alt).toBe('joy')
})

test('fit', () => {
  let wrapper = mount(Img, {
    propsData: {
      fit: 'contain'
    }
  })
  expect(wrapper.element.querySelector('img').style.objectFit).toBe('contain')
})

test('round', () => {
  let wrapper = mount(Img, {
    propsData: {
      round: true
    }
  })
  expect(wrapper.classes()).toContain('round')
})

test('width height of number type', () => {
  let wrapper = mount(Img, {
    propsData: {
      width: 20,
      height: 20
    }
  })
  expect(wrapper.element.style.width).toBe('20px')
  expect(wrapper.element.style.height).toBe('20px')
})

test('width height of string type', () => {
  let wrapper = mount(Img, {
    propsData: {
      width: '20px',
      height: '20px'
    }
  })
  expect(wrapper.element.style.width).toBe('20px')
  expect(wrapper.element.style.height).toBe('20px')
})

test('click event', () => {
  const onClick = jest.fn()
  let wrapper = mount(Img, {
    listeners: {
      click: onClick
    }
  })
  wrapper.trigger('click')
  expect(onClick).toHaveBeenCalled()
})
