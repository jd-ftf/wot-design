import Progress from 'wot-design/packages/progress/index.js'
import { mount } from '@vue/test-utils'
import { testInstall, later } from './utils'
testInstall(Progress)

test('should render correct content', async () => {
  const wrapper = mount({
    template: `
      <wd-progress :percentage="percentage" :color="color" />
    `,
    data () {
      return {
        percentage: 80,
        color: 'rgb(226, 35, 26)'
      }
    }
  })
  expect(wrapper.element.querySelector('.wd-progress__inner').style.width).toBe('80%')
  expect(wrapper.element.querySelector('.wd-progress__inner').style.backgroundColor).toBe('rgb(226, 35, 26)')
  wrapper.setData({ color: () => {
    return 'rgb(0, 131, 255)'
  } })
  await later(0)
  expect(wrapper.element.querySelector('.wd-progress__inner').style.backgroundColor).toBe('rgb(0, 131, 255)')

  wrapper.setData({ color: [ { percentage: 20, color: '#00c740' }, '#ffb300', '#e2231a', '#0083ff' ] })
  await later(0)
  expect(wrapper.element.querySelector('.wd-progress__inner').style.backgroundColor).toBe('rgb(0, 131, 255)')

  wrapper.setData({ color: () => { return 'rgb(51, 51, 51)' } })
  await later(0)
  expect(wrapper.element.querySelector('.wd-progress__inner').style.backgroundColor).toBe('rgb(51, 51, 51)')
})

test('hideText', () => {
  const wrapper = mount(Progress, {
    propsData: {
      percentage: 80,
      hideText: false
    }
  })
  expect(wrapper.element.querySelectorAll('.wd-progress__label')[0].textContent).toBe('80%')
})

test('status', () => {
  const wrapper = mount(Progress, {
    propsData: {
      hideText: true,
      status: 'danger'
    }
  })
  expect(wrapper.element.querySelector('.wd-progress__icon').getAttribute('class')).toContain('wd-icon-close-outline')
})
