import Vue from 'vue'
import App from './App.vue'

// import '../src/assets/css/main.css'
import vueEventCalendar from '../src/'
Vue.use(vueEventCalendar, {locale: 'pt-br', weekStartOn: 1})

new Vue({
  el: '#app',
  render: h => h(App)
})
