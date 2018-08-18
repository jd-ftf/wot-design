import Navbar from 'jm-design/navbar/index.js'
import { destroyVM, createComVM, createTplVM } from '../util'

describe('Navbar', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('should render correct content', () => {
    vm = createTplVM({
      template: `
        <jm-navbar title="标题">
          <span slot="left">返回</span>
          <span slot="right">菜单</span>
        </jm-navbar>
      `
    })

    expect(vm.$el.querySelector('.jm-navbar__title').textContent).to.equal('标题')
    expect(vm.$el.querySelector('.jm-navbar__side-left span').textContent).to.equal('返回')
    expect(vm.$el.querySelector('.jm-navbar__side-right span').textContent).to.equal('菜单')
  })
})