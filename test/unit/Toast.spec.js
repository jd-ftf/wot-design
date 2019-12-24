import Toast from 'wot-design/packages/toast/index'
import Vue from 'vue'

afterEach(() => {
  const el = document.querySelectorAll('.wd-toast')

  if (el) {
    for (var i of el) {
      if (i.parentNode) i.parentNode.removeChild(i)
    }
  }
})

test('should install successfully', () => {
  Vue.use(Toast)
  expect(Vue.$toast).not.toBeNull()
})

test('should render correct contents', done => {
  Toast('Test')
  setTimeout(() => {
    const el = document.querySelector('.wd-toast')
    expect(el.querySelector('.wd-toast__msg').textContent).toBe('Test')
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
    iconClass: 'wd-icon-test',
    position: 'top'
  })

  setTimeout(() => {
    const dom = document.querySelector('.wd-toast')
    expect(dom.classList.contains('wd-toast--top')).toBeTruthy()
    expect(dom.querySelector('.wd-icon-test')).toBeTruthy()
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
    const dom = document.querySelector('.wd-toast')
    expect(dom.classList.contains('wd-toast--bottom')).toBeTruthy()
    expect(dom.querySelector('.wd-icon-warning')).toBeTruthy()
    done()
  }, 200)
})
