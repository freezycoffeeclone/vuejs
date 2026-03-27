<template>

<div class="page-product">

    <!-- Product Details -->
    <div class="columns is-multiline">

        <div class="column is-9 box">
            <figure class="image mb-4">
                <img v-bind:src="product.image" alt="">
            </figure>
            <h1 class="title mb-2">{{ product.name }}</h1>
        </div>
        
        <div class="column is-3">
            <h2 class="subtitle"><strong>Product Information</strong></h2>
            <p><strong>Price: ${{ product.price }}</strong></p>

            <div class="field has-addons mt-4">
                <div class="control">
                    <input class="input" type="number" min="1" v-model="quantity">
                </div>
                <div class="control">
                    <button class="button is-primary" @click="addToCart">
                        Add to Cart
                    </button>
                </div>
            </div>

            <p class="mb-4">Product Description: {{ product.description }}</p>
        </div>


    </div>

    <!-- End Product Details -->

    <!-- Related Products Section -->

        <h3 class="subtitle is-5 mb-2"><strong>Related Products</strong></h3>
        <div class="columns is-multiline">
            <div class="column is-3" v-for="related in related_products" v-bind:key="related.id">
            <router-link :to="`/product/${related.id}`" class="has-text-dark">
                <div class="box">

                        <figure class="image mb-2">
                            <img v-bind:src="related.image" v-bind:alt="related.name">
                        </figure>
                        <div class="content">
                            <h3 class="title is-5">{{ related.name }}</h3>
                            <p class="subtitle is-6">${{ related.price }}</p>
                        </div>

                </div>
            </router-link>
            </div>
  
        </div>

    <!-- End Related Products Section -->



</div>

</template>

<script>
// import axios from 'axios';
import {toast} from 'bulma-toast';
import { supabase } from '@/supabaseClient';

export default {
  name: 'ProductDetailView',
  data() {
    return {
        quantity: 1,
        product: {},
        related_products: []
    }
  },
  components: {
  },
    mounted() {
        this.getProductDetail();
    },
    watch: {
        // Watch for route changes to fetch new product details
        $route(to, from) {
            if (to.params.id !== from.params.id) {
                this.getProductDetail()
            };
        }
    },
    methods: {
        // Fetch product details based on the route parameter
        async getProductDetail(){
            // take the id from the route params
            const productId = this.$route.params.id;
            const { data } = await supabase.from('products').select().eq('id', productId);
            this.product = data[0];
            const { data: relatedData } = await supabase.from('products').select().eq('category', this.product.category).neq('id', this.product.id);

            this.related_products = relatedData;

            

            // make an API call to fetch product details
            // this links to urls.py 
            // axios.get(`/api/v1/products/${productId}/`)
            // .then(response => {
            //     this.product = response.data;

            //     document.title = this.product.name + " - Arla Racing Exhaust Indonesia";
                
            //     // fetch related products
            //     this.related_products = response.data.related_products;
            // })
            // .catch(error => {
            //     console.error('There was an error fetching the product details:', error);
            // });
            },




        addToCart(){
        // Logic to add the product to the cart
        if (isNaN(this.quantity) || this.quantity < 1) {
            this.quantity = 1;
        }

        const cartItem = {
            product: this.product,
            quantity: this.quantity
        };
        this.$store.commit('addToCart', cartItem);
        toast({
            message: `${this.product.name} added to cart!`,
            type: 'is-success',
            position: 'top-center',
            duration: 2000,
            dismissible: true,
        });

        // console.log('Added to cart:', cartItem);
    
}

}
}
</script>