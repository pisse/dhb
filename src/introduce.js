// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './entry/RouterIntro.vue'
import Platform from './entry/introduce/platform'
import Safety from './entry/introduce/safety'
import Creditor from './entry/introduce/creditor'
// import Home from './components/HelloFromVux'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'platform',
  component: Platform
}, {
  path: '/creditor',
  name: 'creditor',
  component: Creditor
}, {
  path: '/creditor/safety',
  name: 'safety',
  component: Safety
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
