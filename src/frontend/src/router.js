import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Logout from '@/views/Logout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/logout',
    component: Logout
  }
];

const router = new VueRouter({
    mode: 'history',
  routes
});

export default router;
