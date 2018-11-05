import Home from './views/Home.vue';
import Signup from './views/Signup.vue';
import Login from './views/Login.vue';
import Dashboard from './views/Dashboard.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next({name: 'dashboard'});
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next({name: 'dashboard'});
      } else {
        next();
      }
    }
  },
  {
    path: '/signin',
    name: 'signin',
    component: Login,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next({name: 'dashboard'});
      } else {
        next();
      }
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next();
      } else {
        next({name: 'signin'});
      }
    }
  }
];