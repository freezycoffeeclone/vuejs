<template>
  <div class="home-view">
    <h1 class="title is-2 has-text-centered">Welcome to Arla Racing Exhaust Indonesia</h1>
    <p class="subtitle is-5 has-text-centered">Your one-stop shop for high-quality exhaust systems and accessories.</p>

 <!-- Search Bar -->
  <div class="container mb-3">
      <form method="get" action="/search">
            <div class="field has-addons">

              <div class="control is-expanded">
                <input type="text" class="input" placeholder="Search your products here" name="query">
              </div>

              <div class="control">
                <button type="submit" class="button is-info">
                  <strong><i class="fa fa-search"></i></strong>
                </button>
              </div>

            </div>
      </form>
      <!-- End Search Bar -->
  </div>

  <!-- Iterate products -->
  <div class="columns is-multiline">
    
    <!-- Iterate over products response -->
    <div class="column is-4" v-for="product in products" v-bind:key="product.id">
    <div class="box">
      <router-link :to="`product/${product.id}`" class="has-text-dark">
        <figure class="image mb-2">
          <img v-bind:src="product.image" v-bind:alt="product.name">
        </figure>
        <div class="content has-text-centered">
        <h3 class="title is-4">{{ product.name }}</h3>
        <p class="subtitle is-6">${{ product.price }}</p>
        </div>
      </router-link>
    </div>
    </div>

    <!-- End iterations -->

  </div>

  
  <!-- Iterate categories -->

  <h2 class="title is-4 has-text-centered mt-6">Browse Products Category</h2>
  <div class="columns">
    
    <div class="column is-4" v-for="category in categories">
    <div class="box">
      <router-link :to="`product/category/${category.name}`" class="has-text-dark">
        <div class="content has-text-centered">
        <h3 class="title is-4">{{ category.name}}</h3>
        <p class="subtitle is-6">{{ category.product_count }} items</p>
        </div>
      </router-link>
    </div>
    </div>

    <!-- End iterations -->

  </div>
    
  </div>



</template>

<script>
// import axios from 'axios';
import { supabase } from '../supabaseClient';

export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
      categories: []
    }
  },
  components: {
  },
  mounted() {
    document.title = "Home - Arla Racing Exhaust Indonesia";
    // this.getProducts();
    this.getInstruments();
},
  methods: {
    
    // getProducts(){
    //   axios.get('/api/v1/products/')
    //   .then(response => {
    //     this.products = response.data.products;
    //     this.categories = response.data.categories;
    //   })
    //   .catch(error => {
    //     console.error('There was an error fetching the products:', error);
    //   });

    // },
    async getInstruments() {
      const { data } = await supabase.from('products').select('*');
      const { data: product_count } = await supabase.from('product_count_by_category').select();
      this.products = data.slice(0, 6);
      this.categories = product_count;
    }
  
  },
}
</script>
