import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { store } from './store'
import ElementUI from 'element-ui'
import Customers from './components/Customers.vue'
import Jobs from './components/Jobs.vue'
import Estimates from './components/Estimates.vue'
import Notes from './components/Notes.vue'
import Home from './components/Home.vue'

Vue.use(VueRouter);
Vue.use(ElementUI);

const routes = [ 
  { path: '/0', component: Home },
  { path: '/1', component: Customers},
  { path: '/2', component: Jobs },
  { path: '/3', component: Estimates },
  { path: '/4', component: Notes },
  { path: '/estimates/:lbl', component: Estimates, props:true }
  
 
];

//vue router setup
export const router = new VueRouter({
  routes,
  mode: 'history'
})

export const bus = new Vue();

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  store,
  router,
  render: h => h(App)
})


