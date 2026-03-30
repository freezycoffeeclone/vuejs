<template>
<div class="page-cart">
    <div class="columns is-multiline">
        <div class="column is-12">
            <h2 class="title">Cart</h2>
        </div>
        <div class="column is-12 box">
            <table class="table is-fullwidth" v-if="cartTotalLength">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <CartItem v-for="item in cart.items" :key="item.id" :initializeItem="item" v-on:removeFromCart="removeFromCart"/>
                </tbody>

            </table>
            <div v-else>
                <p class="has-text-centered">Oops! Your Cart is empty. <router-link to="/">Browse Product</router-link></p>
            </div>

        </div>

        <div class="column is-12">
            <div class="box has-text-right">
                <h3 class="title is-4">Cart Summary</h3>
                <p><strong>Total Price: {{ cartTotalPrice }}</strong></p>
                <p>Total Items: {{ cartTotalLength }}</p>
                <!-- Future enhancements for total price can go here -->
            
            <router-link to="/checkout" class="button is-primary mt-2">Proceed to Checkout</router-link>
            </div>
        </div>

    </div>
</div>

</template>

<script>
// import axios from 'axios';
import CartItem from '@/components/CartItem.vue';




export default {
    name: 'Cart',
    components: {
        CartItem
    },
    data() {
        return {
            // Cart data will go here
            cart : {
                items: [],
            }
        }
    },
    methods: {
        removeFromCart(item) {
            this.cart.items = this.cart.items.filter(i => item.product.id !== i.product.id);
            

            
            window.location.reload();
        }
    },
    mounted() {
        document.title = "Cart - Arla Racing Exhaust Indonesia";
        // Logic to fetch cart items will go here
        this.cart = this.$store.state.cart;
    },
    computed: {
        // Computed properties for cart can go here
        cartTotalLength() {
            return this.cart.items.reduce((acc, curVal) => {return acc += curVal.quantity}, 0);
        },
        cartTotalPrice() {
            return this.cart.items.reduce((acc, curVal) => {return acc += (curVal.product.price * curVal.quantity)}, 0).toFixed(2);
        },
        
    },
}

</script>