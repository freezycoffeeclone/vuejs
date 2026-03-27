<template>
<div class="account-page">
    <h1 class="title has-text-centered">User Profile</h1>
    <div class="box">

        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <button class="button is-danger" @click="logout">Logout</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import axios from 'axios';

export default {
    name: 'User',
    data() {
        return {
            // User data can go here
            }
        },
    methods: {
        logout() {
            // Clear user data and token
            axios.defaults.headers.common['Authorization'] = '';

            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('user_id');

            this.$store.commit('clearToken');

            this.$router.push('/');
        }
    },
    mounted() {
        document.title = "User Profile - Arla Racing Exhaust Indonesia"
    }
}
</script>