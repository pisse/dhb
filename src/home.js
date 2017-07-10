// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './entry/Router.vue'
import Home from './entry/Home'
import Cashout from './entry/Cashout.vue'
import Recharge from './entry/recharge/Recharge.vue'
import List from './entry/recharge/cardSelect'

// import Identity from './entry/home/addIdentity'
// import Home from './components/HelloFromVux'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/out',
  component: Cashout
}, {
  path: '/in',
  component: Recharge
}, {
  path: '/in/list',
  component: List
}]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
