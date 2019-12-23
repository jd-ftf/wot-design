import Toast from 'jm-design/packages/toast/index'

afterEach(() => {
  const el = document.querySelectorAll('.jm-toast')

  if (el) {
    for (var i of el) {
      if (i.parentNode) i.parentNode.removeChild(i)
    }
  }
})

test('should render correct contents', done => {
  Toast('Test')
  setTimeout(() => {
    const el = document.querySelector('.jm-toast')
    expect(el.querySelector('.jm-toast__msg').textContent).toBe('Test')
    done()
  }, 200)
})

test('should save Object when close with save', done => {
  let toastObj1 = Toast('Test')

  setTimeout(() => {
    toastObj1.close(true)

    let toastObj2 = Toast('Test')

    setTimeout(() => {
      expect(toastObj2).toEqual(toastObj1)
      done()
    }, 200)
  }, 200)
})

test('should toast top and custonIcon', done => {
  Toast({
    msg: 'Test',
    iconClass: 'jm-icon-test',
    position: 'top'
  })

  setTimeout(() => {
    const dom = document.querySelector('.jm-toast')
    expect(dom.classList.contains('jm-toast--top')).toBeTruthy()
    expect(dom.querySelector('.jm-icon-test')).toBeTruthy()
    done()
  }, 200)
})

test('should toast bottom', done => {
  Toast({
    msg: 'Test',
    position: 'bottom',
    iconName: 'warning'
  })

  setTimeout(() => {
    const dom = document.querySelector('.jm-toast')
    expect(dom.classList.contains('jm-toast--bottom')).toBeTruthy()
    expect(dom.querySelector('.jm-icon-warning')).toBeTruthy()
    done()
  }, 200)
})
