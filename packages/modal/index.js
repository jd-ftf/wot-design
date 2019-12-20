import Modal from './src/main.vue'

Modal.install = Vue => {
  Vue.component(Modal.name, Modal)
}

export default Modal
