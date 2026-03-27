import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import HomeView from '../views/HomeView.vue'
import ProductDetailView from '../views/ProductDetailView.vue'
import ProductsByCategory from '../views/ProductsByCategory.vue'
import Search from '../views/Search.vue'
import Cart from '../views/Cart.vue'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'
import Checkout from '../views/Checkout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/profile',
    name: 'user-profile',
    component: User,
    meta: {
      requiredLogin: true
    }
  },
   
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView,
    props: true
  },
  {
    path: '/product/category/:categoryName',
    name: 'product-by-category',
    component: ProductsByCategory,
    props: true
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    props: true
  },

  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout,
    meta: {
      requiredLogin: true
    }
  },


  {
    path: '/cart',
    name: 'cart',
    component: Cart

  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },



]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation guard to protect routes that require authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiredLogin) && !store.state.isAuthenticated ) {
    next({ name: 'login', query: { to: to.path } });
  } else {
    next();
  }
});


export default router
