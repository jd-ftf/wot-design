import Slider from 'jm-design/slider/index.js'
import { destroyVM, createTplVM } from '../util'

describe('Slider', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('should render correct contents when default', () => {
    vm = createTplVM({
      template: '<jm-slider></jm-slider>'
    })

    vm.$el.querySelector('.jm-slider__label-min').textContent.should.equal('0')
    vm.$el.querySelector('.jm-slider__label-max').textContent.should.equal('100')
    vm.$el.querySelector('.jm-slider__label-cur').textContent.should.equal('0')
  })

  it('should render correct contents when max and min is set', () => {
    vm = createTplVM({
      template: '<jm-slider :maxValue="666" :minValue="233"></jm-slider>'
    })

    vm.$el.querySelector('.jm-slider__label-min').textContent.should.equal('233')
    vm.$el.querySelector('.jm-slider__label-max').textContent.should.equal('666')
    vm.$el.querySelector('.jm-slider__label-cur').textContent.should.equal('233')
  })

  it('should render single slider when type="single" is set', () => {
    vm = createTplVM({
      template: '<jm-slider type="single"></jm-slider>'
    })

    const $labelCur = vm.$el.querySelectorAll('.jm-slider__label-cur')

    vm.$el.querySelectorAll('.jm-slider__ball-container').should.have.lengthOf(1)
    vm.$el.querySelectorAll('.jm-slider__ball').should.have.lengthOf(1)
    $labelCur.should.have.lengthOf(1)
    $labelCur[0].textContent.should.equal('0')
  })

  it('should render double slider when type="double" is set', () => {
    vm = createTplVM({
      template: '<jm-slider type="double"></jm-slider>'
    })

    const $labelCur = vm.$el.querySelectorAll('.jm-slider__label-cur') 

    vm.$el.querySelectorAll('.jm-slider__ball-container').should.have.lengthOf(2)
    vm.$el.querySelectorAll('.jm-slider__ball').should.have.lengthOf(2)
    $labelCur.should.have.lengthOf(2)
    $labelCur[0].textContent.should.equal('0')
    $labelCur[1].textContent.should.equal('100')
  })

  it('should render correct content when single value is set', () => {
    vm = createTplVM({
      template: '<jm-slider value="33" ref="slider"></jm-slider>'
    })

    const $labelCur = vm.$el.querySelector('.jm-slider__label-cur')

    $labelCur.should.equal('33')
    vm.$refs.slider.setValue(-30)
    $labelCur.should.equal('0')
    vm.$refs.slider.setValue(130)
    $labelCur.should.equal('100')
  })

  it('should render correct content when double value is set', () => {
    vm = createTplVM({
      template: '<jm-slider type="double" value="33,77" ref="slider"></jm-slider>'
    })

    const $labelCur = vm.$el.querySelectorAll('.jm-slider__label-cur')

    $labelCur[0].should.equal('33')
    $labelCur[1].should.equal('77')
    vm.$refs.slider.setValue(-30, 130)
    $labelCur[0].should.equal('0')
    $labelCur[1].should.equal('100')
  })

  it('should get the correct value when using method getValue()', () => {
    vm = createTplVM({
      template: '<jm-slider value="33" ref="slider"></jm-slider>'
    })

    vm.$refs.slider.getValue().should.be.a('number')
    vm.$refs.slider.getValue().should.equal(33)
    vm.$refs.slider.setValue(-30)
    vm.$refs.slider.getValue().should.equal(0)
    vm.$refs.slider.setValue(130)
    vm.$refs.slider.getValue().should.equal(100)

    destroyVM(vm)
    vm = createTplVM({
      template: '<jm-slider type="double" value="33,77" ref="slider"></jm-slider>'
    })
    vm.$refs.slider.getValue().should.be.a('array')
    vm.$refs.slider.getValue()[0].should.equal(33)
    vm.$refs.slider.getValue()[1].should.equal(77)
    vm.$refs.slider.setValue(-30, 130)
    vm.$refs.slider.getValue()[0].should.equal(0)
    vm.$refs.slider.getValue()[1].should.equal(100)
  })

  it('should render correct content when sliding over', () => {
    vm = createTplVM({
      template: '<jm-slider ref="slider"></jm-slider>'
    })

    const AXLE_WIDTH = vm.$refs.slider.axleWidth

    const event = {
      changedTouches: [{
        clientX: 0
      }]
    }

    const setfingerX = (x) => {
      event.changedTouches[0].clientX = x
    }

    vm.$refs.slider._activeSlider(1)
    setfingerX(0)
    vm.$refs.slider._slidingStart(event)
    vm.$refs.slider.getValue().should.equal(0)
    // 模拟手指滑动
    for (let i = 0; i <= 5; i++) {
      setfingerX(150 + AXLE_WIDTH / 2 * i) // 保证能滑出界
      vm.$refs.slider._sliding(event)
    }
    vm.$refs.slider.getValue().should.equal(100)
    vm.$refs.slider._slidingEnd(event)
    vm.$refs.slider._inactiveSlider(1)
  })
})