import InfiniteLoad from 'wot-design/packages/infinite-load/index'
import { mount } from '@vue/test-utils'
import { testInstall, later } from './utils'

testInstall(InfiniteLoad)

test('should load correctly', async () => {
  const loadmoreHandler = jest.fn()
  let wrapper = mount({
    data () {
      return {
        loading: false
      }
    },
    template: `<body><wd-infinite-load ref="loadmore" @loadmore="loadmore" :loading="loading" /></body>`,
    methods: {
      loadmore: loadmoreHandler
    }
  })

  expect(loadmoreHandler).toHaveBeenCalled()

  const infiniteEl = wrapper.find('.wd-infinite-load')

  infiniteEl.vm.loadError()
  expect(infiniteEl.vm.isError).toBe(true)

  infiniteEl.vm.reload()
  expect(infiniteEl.vm.isError).toBe(false)

  infiniteEl.vm.loadEnd()
  expect(infiniteEl.vm.isFinished).toBe(true)

  infiniteEl.vm.reset()
  expect(infiniteEl.vm.isFinished).toBe(false)
  
  wrapper.vm.loading = true

  await later()

  wrapper.vm.loading = false

  await later()

  expect(loadmoreHandler.mock.calls.length).toBe(4)

  wrapper.destroy()
})

test('overflow container', () => {
  const loadmoreHandler = jest.fn()
  let wrapper = mount({
    data () {
      return {
        loading: false
      }
    },
    template: `
      <div class="test" style="overflow: auto;">
        <div>
          <wd-infinite-load ref="loadmore" @loadmore="loadmore" :loading="loading" />
        </div>
      </div>
    `,
    methods: {
      loadmore: loadmoreHandler
    },
    attachToDocument: true
  })

  const infiniteEl = wrapper.find('.wd-infinite-load')
  expect(infiniteEl.vm.scrollObj.classList.contains('test')).toBe(true)

  wrapper.destroy()
})