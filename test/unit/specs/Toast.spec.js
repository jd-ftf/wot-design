import Toast from 'jm-design/toast/index'

describe('Toast', () => {
  it('should render correct contents', () => {
    Toast('Test')
    setTimeout(() => {
      const dom = document.querySelector('.jm-toast')
      expect(dom.querySelector('.jm-toast__msg').textContent)
        .to.equal('Test')
    }, 200)
  })
})
