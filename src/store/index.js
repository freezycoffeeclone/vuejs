import { createStore } from 'vuex'

export default createStore({
  state: {
    cart : {
      items: [],
    },
    isAuthenticated: false,
    token: '',
    isLoading: false,
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      // Check for cart in localStorage
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }



    // Check if user is authenticated
    if (localStorage.getItem('token')) {
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    }
    else {
      state.token = ''
      state.isAuthenticated = false
    }



  },
    // Mutation to add item to cart
    // item should be an object with product details and quantity
    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id)
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity)+parseInt(item.quantity)
      } else {
        state.cart.items.push(item)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },

    // set token and isAuthenticated
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },

    // clear token and isAuthenticated
    clearToken(state) {
      state.token = ''
      state.isAuthenticated = false
    },

  },
  actions: {
  },
  modules: {
  }
})
