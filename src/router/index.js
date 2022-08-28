import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResumeStatusView from "@/views/ResumeStatusView";
import LoginView from "@/views/LoginView";
import NHomeView from "@/views/NHomeView";
import UpdateLog from "@/views/UpdateLog";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/updatedLog',
    name: 'updatedLog',
    component: UpdateLog
  },
  {
    path: '/n',
    name: 'n',
    component: NHomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../components/Loading.vue')
  // }
  {
    path: '/resumeStatus',
    name: 'resumeStatus',
    component: ResumeStatusView
  }
]

const router = new VueRouter({
  routes
})

export default router
