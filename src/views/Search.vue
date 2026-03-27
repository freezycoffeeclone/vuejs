<template>
<div class="page-search">
    <h1 class="title has-text-centered">Search Products</h1>
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


    <h2 class="subtitle is-5 mb-2">Search Results for "{{ query }}"</h2>
    <div class="columns is-multiline mt-2">
    
    <!-- Iterate over products response -->
    <div class="column is-4" v-for="product in products" v-bind:key="product.id">
    <div class="box">
      <router-link :to="`/product/${product.id}`" class="has-text-dark">
        <figure class="image mb-2">
          <img v-bind:src="product.img_url" v-bind:alt="product.name">
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
import axios from 'axios';


export default{
    name: 'Search',
    data() {
        return {
            products: [],
            query: ''
        }
    },
    mounted() {
        document.title = "Search Products - Arla Racing Exhaust Indonesia";

        let url = window.location.search.substring(1);
        let params = new URLSearchParams(url);

        // Check if 'query' parameter exists in URL and grab its value
        if (params.get('query')){
            this.query = params.get('query');
        }
        this.searchProducts();
    },
    methods: {
        searchProducts(){
            // make an API call to search products
            axios.post('/api/v1/search/',{"query":this.query})
            .then(response => {
                this.products = response.data;
            })
            .catch(error => {
                console.error('There was an error searching for products:', error);
            });
        }
    }
}

</script>