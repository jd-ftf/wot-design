import Calendar from './src/main.vue'

Calendar.install = Vue => {
  Vue.component(Calendar.name, Calendar)
}

export default Calendar
