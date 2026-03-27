<template>
<div class="page-checkout">
    <h1 class="title has-text-centered">Checkout</h1>
    <div class="columns is-multiline box">

        <!-- Order details -->
        <div class="column is-12 mb-5">
            <table class="table is-fullwidth">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart.items"
                        :key="item.product.id">
                        <td>{{ item.product.name }}</td>
                        <td>{{ item.product.price }}</td>
                        <td>{{ item.quantity }}</td>
                        <td>{{ getTotalItem(item).toFixed(2)}}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan="2">Total:</th>
                        <th>{{ cartTotalLength }}</th>
                        <th>{{ cartTotalPrice.toFixed(2) }}</th>
                    </tr>
                </tfoot>
            </table>
        </div>

        <!-- Shipping Information -->
         <div class="column is-12">
            <h2 class="subtitle"><strong>Shipping Information</strong></h2>
            <div class="columns is-multiline">

                <!-- Leftside Column -->

                <div class="column is-6">
                    <div class="field">
                        <label class="label">First Name</label>
                        <div class="control">
                            <input class="input" type="text" v-model="firstname" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Last Name</label>
                        <div class="control">
                            <input class="input" type="text" v-model="lastname" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" v-model="email" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Phone</label>
                        <div class="control">
                            <input class="input" type="text" v-model="phone" required>
                        </div>
                    </div>
                </div>

                <!-- End Leftside -->


                <!-- Rightside Column -->

                <div class="column is-6">
                    <div class="field">
                        <label class="label">Address</label>
                        <div class="control">
                            <input class="input" type="text" v-model="address" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Zip Code</label>
                        <div class="control">
                            <input class="input" type="text" v-model="zipcode" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">City</label>
                        <div class="control">
                            <input class="input" type="text" v-model="place" required>
                        </div>
                    </div>

                </div>

                <!-- End Rightside -->

            </div>

            <!-- End Shipping Info -->

            <div class="notification is-danger" v-if="errors.length">
                <p v-for="error in errors" :key="error">{{ error }}</p>
            </div>


        <hr>
        <div id="card-element" class="mb-5">

         </div>
         <hr>
         <template v-if="cartTotalLength">
            <button class="button is-dark" @click="submitForm">Pay with Stripe</button>
         </template>


         </div>


    </div>

</div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'Checkout',
    data() {
        return {
            // Checkout form data can go here
            cart: {
                items: []
            },
            stripe: {},
            card: {},
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            address: '',
            zipcode: '',
            place: '',
            errors: []
        }
    },
    mounted() {
        document.title = "Checkout - Arla Racing Exhaust Indonesia";

        this.cart = this.$store.state.cart;
    },
    methods: {
        // Checkout methods can go here
        getTotalItem(item){
            return item.quantity * item.product.price;
        },

        submitForm() {
            // Handle form submission

        }

    },
    computed: {
        cartTotalPrice() {
            return this.cart.items.reduce((total, item) => {
                return total += (item.quantity * item.product.price);
            }, 0);
        },
        cartTotalLength() {
            return this.cart.items.reduce((totallength, item) => {
                return totallength += item.quantity;
            }, 0);
        }
    }
}

</script>