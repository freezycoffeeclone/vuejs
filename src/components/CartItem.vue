<template>
    <tr>
        <td><router-link :to="`product/${item.product_id}`">{{ item.product.name }}</router-link></td>
        <td>
            <a @click="decrementQty(item)">-</a>&nbsp;
            {{ item.quantity }}&nbsp;
            <a @click="incrementQty(item)">+</a>
        </td>
        <td>${{ item.product.price }}</td>
        <td>${{ getItemTotal(item).toFixed(2) }}</td>
        <td><button @click="removeFromCart(item)" class="delete"></button></td>
    </tr>

</template>

<script>

export default {
    name: 'CartItem',
    props: {
        initializeItem: Object
    },
    data() {
        return {
            item: this.initializeItem
        }
    },
    methods: {
        getItemTotal(item) {
            return (item.product.price * item.quantity);
        },
        incrementQty(item) {
            item.quantity += 1;
            this.updateCart()
        },
        decrementQty(item) {
            item.quantity -= 1;
            if (item.quantity === 0) {
                this.$emit('removeFromCart', item);
            }

            this.updateCart()
    },
        updateCart() {
            localStorage.setItem('cart', JSON.stringify(this.$store.state.cart));
        },

        removeFromCart(item) {
            this.$emit('removeFromCart', item);

            this.updateCart();
        }
    }

}

</script>