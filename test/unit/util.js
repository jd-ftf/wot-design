import Vue from "vue"
import JMDesign from 'main/index'

Vue.use(JMDesign)

const destroyVM = vm => {
  vm.$destroy && vm.$destroy();
  vm.$el &&
  vm.$el.parentNode &&
  vm.$el.parentNode.removeChild(vm.$el);
}

const createComVM = (Component, propsData = {}) => {
  let el = document.createElement('div')
  document.body.appendChild(el)
  const Constructor = Vue.extend(Component)

  return new Constructor({ propsData }).$mount(el)
}

const createTplVM = template => {
  let el = document.createElement('div')
  document.body.appendChild(el)

  return new Vue(template).$mount(el)
}

const diapatchEvent = (el, type) => {
  let event = new Event(type)
  el.dispatchEvent(event)
}

export {
  destroyVM,
  createComVM,
  createTplVM,
  diapatchEvent
}
