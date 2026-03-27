<template>
<div class="products-list">
    <h2 class="title is-4 mb-2">Find your products in {{ $route.params.categoryName }} Category</h2>
    <div class="columns is-multiline mt-2">
    
    <!-- Iterate over products response -->
    <div class="column is-4" v-for="product in products" v-bind:key="product.id">
    <div class="box">
      <router-link :to="`/product/${product.id}`" class="has-text-dark">
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
</div>
</template>

<script>
import { supabase } from '@/supabaseClient';


export default {
  name: 'ProductsByCategory',
  data() {
    return {
      products: [],
    }
  },
  mounted() {
    document.title = this.$route.params.categoryName + " Products - Arla Racing Exhaust Indonesia";
    this.getProductsByCategory();
  },
  methods: {
    async getProductsByCategory(){
      const categoryName = this.$route.params.categoryName;

      // make an API call to fetch products by category
      const { data, error } = await supabase.from('products_by_category').select('*').eq('category', categoryName);
      if (error) {
        console.error('There was an error fetching the products by category:', error);
      } else {
        this.products = data;
      }
    }
  }
}

</script>