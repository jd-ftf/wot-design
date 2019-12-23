import Tag from './src/main.vue'

Tag.install = Vue => {
  Vue.component(Tag.name, Tag)
}

export default Tag
