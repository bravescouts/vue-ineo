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
import Sites from './components/Sites.vue'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(VueRouter);
Vue.use(ElementUI,{locale});

const routes = [ 
  { path: '/0', component: Home },
  { path: '/1', component: Customers},
  { path: '/2', component: Jobs },
  { path: '/3', component: Estimates },
  { path: '/4', component: Notes },
  { path: '/5', component: Sites },

  { path: '/estimates/:jobID', component: Estimates, props:true }
  
 
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


