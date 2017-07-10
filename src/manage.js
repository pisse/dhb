// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './entry/Router'
import Manage from './entry/Manage'
import Records from './entry/Records'
import Contract from './entry/Contract'
// import Home from './components/HelloFromVux'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Manage
}, {
  path: '/records',
  component: Records
}, {
  path: '/contract',
  component: Contract
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
