import Vue from 'vue'
import Router from 'vue-router'
import GoogleMap from '@/components/GoogleMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoogleMap',
      component: GoogleMap
    }
  ]
})
