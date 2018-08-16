import Toast from 'jm-design/toast/index'

describe('Toast', () => {
  afterEach(() => {
    const el = document.querySelectorAll('.jm-toast')

    if (el) {
      for (var i of el) {
        if (i.parentNode) i.parentNode.removeChild(i)
      }
    }
  })

  it('should render correct contents and multi', done => {
    Toast('Test1')
    Toast('Test2')
    setTimeout(() => {
      const el = document.querySelectorAll('.jm-toast')
      expect(el[0].querySelector('.jm-toast__msg').textContent)
        .to.equal('Test1')
      let length = Array.from(el).length
      expect(length).to.equal(2)
      done()
    }, 200)
  })

  it('should mouted a toast when single is true', done => {
    Toast({
      single: true,
      msg: 'Test1'
    })
    Toast({
      single: true,
      msg: 'Test2'
    })
    setTimeout(() => {
      const el = document.querySelectorAll('.jm-toast')
      let length = Array.from(el).length
      expect(length).to.equal(1)
      done()
    }, 200)
  })

  it('should save Object when close with save', done => {
    let toastObj1 = Toast('Test')

    setTimeout(() => {
      toastObj1.close(true)

      let toastObj2 = Toast('Test')

      setTimeout(() => {
        expect(toastObj2).to.deep.equal(toastObj1)
        done()
      }, 200)
    }, 200)
  })

  it('shoud have check icon', done => {
    Toast({
      msg: 'Test',
      iconName: 'check'
    })

    setTimeout(() => {
      expect(document.querySelector('.jm-toast .jm-icon-circle-check')).to.exist
    }, 200)

    setTimeout(() => {
      expect(document.querySelector('.jm-toast')).to.null
      done()
    }, 1800)
  })

  it('should have forbid icon', done => {
    Toast({
      msg: 'Test',
      iconName: 'forbid'
    })

    setTimeout(() => {
      expect(document.querySelector('.jm-toast .jm-icon-forbid')).to.exist
    }, 200)

    setTimeout(() => {
      expect(document.querySelectorAll('.jm-toast')).to.exist
      done()
    }, 1800)
  })

  it('should toast top and custonIcon', done => {
    Toast({
      msg: 'Test',
      iconClass: 'jm-icon-test',
      position: 'top'
    })

    setTimeout(() => {
      const dom = document.querySelector('.jm-toast')
      expect(dom.classList.contains('jm-toast--top')).to.true
      expect(dom.querySelector('.jm-icon-test')).to.exist
      done()
    }, 200)
  })

  it('should toast bottom', done => {
    Toast({
      msg: 'Test',
      position: 'bottom',
      iconName: 'caveat',
      className: 'custom-class'
    })

    setTimeout(() => {
      const dom = document.querySelector('.jm-toast')
      expect(dom.classList.contains('jm-toast--bottom')).to.true
      expect(dom.classList.contains('custom-class')).to.true
      expect(dom.querySelector('.jm-icon-caveat')).to.exist
      done()
    }, 200)
  })
})
