import Card from './src/main.vue'

Card.install = Vue => {
  Vue.component(Card.name, Card)
}

export default Card
