import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.config.api="localhost:3002"

new Vue({
  render: h => h(App),
}).$mount('#app')
