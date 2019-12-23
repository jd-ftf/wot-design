import Button from 'jm-design/packages/button/index.js'
import { destroyVM, createTplVM } from '../util'

describe('Button', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('should render correct contents', () => {
    vm = createTplVM({
      template: '<jm-button>primary</jm-button>'
    })
    expect(vm.$el.querySelector('span').textContent).to.equal('primary')
  })
})