import Slider from 'jm-design/slider/index.js'
import { destroyVM, createTplVM } from '../util'

describe('Slider', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  // 模拟事件
  const fakeEvent = {
    changedTouches: [{
      clientX: 0
    }]
  }

  // 给事件设定值
  const setfingerX = (x) => {
    fakeEvent.changedTouches[0].clientX = x
  }

  it('should render correct contents when default', () => {
    vm = createTplVM({
      template: '<jm-slider></jm-slider>'
    })

    expect(vm.$el.querySelector('.jm-slider__label-min').textContent).to.equal('0')
    expect(vm.$el.querySelector('.jm-slider__label-max').textContent).to.equal('100')
    expect(vm.$el.querySelector('.jm-slider__label-cur').textContent).to.equal('0')
  })

  it('should render correct contents when max and min is set', done => {
    vm = createTplVM({
      template: '<jm-slider :maxValue="666" :minValue="233"></jm-slider>'
    })
    
    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.jm-slider__label-min').textContent).to.equal('233')
      expect(vm.$el.querySelector('.jm-slider__label-max').textContent).to.equal('666')
      expect(vm.$el.querySelector('.jm-slider__label-cur').textContent).to.equal('233')
      done()
    })
  })

  it('should render single slider when type="single" is set', done => {
    vm = createTplVM({
      template: '<jm-slider type="single"></jm-slider>'
    })

    const $labelCur = vm.$el.querySelectorAll('.jm-slider__label-cur')

    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('.jm-slider__ball-container')).to.have.length(1)
      expect(vm.$el.querySelectorAll('.jm-slider__ball')).to.have.length(1)
      expect($labelCur).to.have.length(1)
      expect($labelCur[0].textContent).to.equal('0')
      done()
    })
  })

  it('should render double slider when type="double" is set', done => {
    vm = createTplVM({
      template: '<jm-slider type="double"></jm-slider>'
    })

    const $labelCur = vm.$el.querySelectorAll('.jm-slider__label-cur')

    vm.$nextTick(() => {
      expect(vm.$el.querySelectorAll('.jm-slider__ball-container')).to.have.length(2)
      expect(vm.$el.querySelectorAll('.jm-slider__ball')).to.have.length(2)
      expect($labelCur).to.have.length(2)
      expect($labelCur[0].textContent).to.equal('0')
      expect($labelCur[1].textContent).to.equal('100')
      done()
    })
  
  })

  it('should render correct content when single value is set', done => {
    vm = createTplVM({
      template: '<jm-slider value="33" ref="slider"></jm-slider>'
    })

    const $labelCur = vm.$el.querySelector('.jm-slider__label-cur')

    vm.$nextTick(() => {
      expect($labelCur.textContent).to.equal('33')
      vm.$refs.slider.setValue(-30)
      vm.$nextTick(() => {
        expect($labelCur.textContent).to.equal('0')
        vm.$refs.slider.setValue(130)
        vm.$nextTick(() => {
          expect($labelCur.textContent).to.equal('100')
          done()
        })
      })
    })
  })

  it('should render correct content when double value is set', done => {
    vm = createTplVM({
      template: '<jm-slider type="double" value="33,77" ref="slider"></jm-slider>'
    })

    const $labelCur = vm.$el.querySelectorAll('.jm-slider__label-cur')

    vm.$nextTick(() => {
      expect($labelCur[0].textContent).to.equal('33')
      expect($labelCur[1].textContent).to.equal('77')
      vm.$refs.slider.setValue(-30, 130)
      vm.$nextTick(() => {
        expect($labelCur[0].textContent).to.equal('0')
        expect($labelCur[1].textContent).to.equal('100')
        done()
      })
    })
  })

  it('should get the correct value when using method getValue', () => {
    vm = createTplVM({
      template: '<jm-slider value="33" ref="slider"></jm-slider>'
    })

    expect(vm.$refs.slider.getValue()).to.be.a('number')
    expect(vm.$refs.slider.getValue()).to.equal(33)
    vm.$refs.slider.setValue(-30)
    expect(vm.$refs.slider.getValue()).to.equal(0)
    vm.$refs.slider.setValue(130)
    expect(vm.$refs.slider.getValue()).to.equal(100)

    destroyVM(vm)
    vm = createTplVM({
      template: '<jm-slider type="double" value="33,77" ref="slider"></jm-slider>'
    })

    expect(vm.$refs.slider.getValue()).to.be.a('array')
    expect(vm.$refs.slider.getValue()).to.eql([33, 77])
    vm.$refs.slider.setValue(-30, 130)
    expect(vm.$refs.slider.getValue()).to.eql([0, 100])
  })

  it('should render correct content when sliding over', () => {
    vm = createTplVM({
      template: '<jm-slider ref="slider"></jm-slider>'
    })

    const axleWidth = vm.$refs.slider.axleWidth

    vm.$refs.slider._activeSlider(1)
    setfingerX(0)
    vm.$refs.slider._slidingStart(fakeEvent)
    expect(vm.$refs.slider.getValue()).to.equal(0)
    // 模拟手指滑动
    for (let i = 0; i <= 5; i++) {
      setfingerX(150 + axleWidth / 2 * i) // 保证能滑出界
      vm.$refs.slider._sliding(fakeEvent)
    }
    expect(vm.$refs.slider.getValue()).to.equal(100)
    vm.$refs.slider._slidingEnd(fakeEvent)
    vm.$refs.slider._inactiveSlider(1)
    expect(vm.$refs.slider.getValue()).to.equal(100)
  })

  it('should render nothing when sliding over and is disabled', () => {
    vm = createTplVM({
      template: '<jm-slider ref="slider" :disabled="true"></jm-slider>'
    })

    const axleWidth = vm.$refs.slider.axleWidth

    vm.$refs.slider._activeSlider(1)
    setfingerX(0)
    vm.$refs.slider._slidingStart(fakeEvent)
    expect(vm.$refs.slider.getValue()).to.equal(0)
    // 模拟手指滑动
    for (let i = 0; i <= 5; i++) {
      setfingerX(150 + axleWidth / 2 * i) // 保证能滑出界
      vm.$refs.slider._sliding(fakeEvent)
    }
    expect(vm.$refs.slider.getValue()).to.not.equal(100)
    vm.$refs.slider._slidingEnd(fakeEvent)
    vm.$refs.slider._inactiveSlider(1)
    expect(vm.$refs.slider.getValue()).to.not.equal(100)
  })

  it('should exchange min and max value when minValue big than maxValue', done => {
    vm = createTplVM({
      template: '<jm-slider :minValue="99" :maxValue="1"></jm-slider>'
    })

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.jm-slider__label-min').textContent).to.equal('1')
      expect(vm.$el.querySelector('.jm-slider__label-cur').textContent).to.equal('1')
      expect(vm.$el.querySelector('.jm-slider__label-max').textContent).to.equal('99')
      done()
    })
  })

  it('should render correct content when disabled is set', done => {
    vm = createTplVM({
      template: '<jm-slider :disabled="true" ref="slider"></jm-slider>'
    })

    vm.$nextTick(() => {
      expect(vm.$el.querySelector('.jm-slider__label-min').classList.contains('jm-slider__label-min--disabled')).to.be.true
      expect(vm.$el.querySelector('.jm-slider__label-max').classList.contains('jm-slider__label-max--disabled')).to.be.true
      expect(vm.$el.querySelector('.jm-slider__progress-bar').classList.contains('jm-slider__progress-bar--disabled')).to.be.true
      expect(vm.$el.classList.contains('jm-slider--disabled')).to.be.true

      vm.$refs.slider._slidingStart(event)
      vm.$refs.slider._sliding(event)
      vm.$refs.slider._slidingEnd(event)

      done()
    })
  })
})