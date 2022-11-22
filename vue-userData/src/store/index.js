import { createStore } from 'vuex';
import axios from 'axios';
import filterProducts from '../products/filter-products';

const store = createStore({
  state() {
    return {
      user: null,
      products: null,
      cart: null,
    };
  },
  getters: {
    getFilteredProducts(state) {
      return (filter) => filterProducts(filter, state.products);
    },
    getCartItems(state) {
      return state.cart;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setCart(state, product) {
      console.log('setCart', product);
      state.cart = product;
    },
  },
  actions: {
    registerUser(context, user) {
      return axios.post('/api/register', user)
        .then((results) => context.commit('setUser', results.data))
        .catch(() => console.log('register error'));
    },
    signinUser(context, userLogin) {
      return axios.post('/api/sign-in', userLogin)
        .then((results) => context.commit('setUser', results.data))
        .catch(() => console.log('login error'));
    },
    fetchProducts(context) {
      axios.get('/api/products')
        .then((result) => context.commit('setProducts', result.data))
        .catch(() => console.log('error'));
    },
    addToCart(context, product) {
      const cartItems = context.state.cart;
      cartItems.push(product);
      context.commit('setCart', cartItems);
    },
  },
});

export default store;
