// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './entry/Router.vue'
import Profiles from './entry/home/profiles'
import Identity from './entry/home/addIdentity'
import ChgPwd from './entry/home/chgPwd'
import ResetPwd from './entry/home/resetPwd'
import Mobile from './entry/home/mobile'
import CardList from './entry/home/cardList'
import addCard from './entry/home/addCard'
import authProtocal from './entry/home/authProtocal'
// import Home from './components/HelloFromVux'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Profiles
}, {
  path: '/identity',
  component: Identity
}, {
  path: '/chgpwd',
  component: ChgPwd
}, {
  path: '/chgpwd/reset',
  component: ResetPwd
}, {
  path: '/mobile',
  component: Mobile
}, {
  path: '/cardlist',
  component: CardList
}, {
  path: '/cardlist/add',
  component: addCard
}, {
  path: '/cardlist/add/protocal',
  component: authProtocal
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
