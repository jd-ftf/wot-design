import Vue from 'vue'
import { context } from './context'
import Modal from 'jm-design/packages/modal'

let modal

function onClickModal () {
  let topVm = context.getTop()
  if (topVm) {
    let { vm } = topVm
    vm.$emit('click-modal')

    if (vm.closeOnClickModal) {
      vm.close()
    }
  }
}

const ModalInstance = Vue.extend(Modal)

export function updateModal () {
  if (!modal) {
    modal = new ModalInstance({
      el: document.createElement('div')
    })
    modal.$on('click-modal', onClickModal)
    document.body.appendChild(modal.$el)
  }

  let topVm = context.getTop()
  if (topVm) {
    let { vm, config } = topVm
    const el = vm.$el
    if (el && el.parentNode) {
      el.parentNode.insertBefore(modal.$el, el)
    }

    Object.assign(modal, config, {
      show: true
    })
  } else {
    modal.show = false
  }
}

export function openModal (vm, config) {
  if (!context.stack.some(item => item === vm)) {
    context.stack.push({
      vm,
      config
    })
    updateModal()
  }
}

export function closeModal (vm) {
  if (context.stack.length) {
    if (context.getTop().vm === vm) {
      context.stack.pop()
      updateModal()
    } else {
      context.stack = context.stack.filter(item => item.vm !== vm)
    }
  }
}
