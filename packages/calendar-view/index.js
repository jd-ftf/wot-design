import CalendarView from './src/main.vue'

CalendarView.install = Vue => {
  Vue.component(CalendarView.name, CalendarView)
}

export default CalendarView
