<template>
    <div class="sign-up">
        <h1 class="title has-text-centered">Login</h1>
        <div class="columns is-multiline">
            <div class="column is-2"></div>
            <div class="column is-8">
                <form @submit.prevent="submitLogin">
                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="text" v-model="email" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="password" v-model="password" required>
                        </div>
                    </div>

                    <div class="field is-grouped is-grouped-right">
                        <div class="control">
                            <button type="submit" class="button is-primary">Login</button>
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" :key="error">{{ error }}</p>
                    </div>


                </form>
                <p>Don't have an account? <router-link to="/signup">Register Here</router-link></p>
            </div>

            <div class="column is-2"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { supabase } from '@/supabaseClient';
import { toast } from 'bulma-toast';

export default {
    name: 'Login',
    data() {
        return {
            // Sign up form data can go here
            email: '',
            password: '',
            errors: [],
            
        }
    },
    mounted() {
        document.title = "Login - Arla Racing Exhaust Indonesia"
    },
    methods: {
        async submitLogin() {
            axios.defaults.headers.common['Authorization'] = '';
            localStorage.removeItem('token');

            const payload = {
                email: this.email,
                password: this.password
            };

            const {error} = await supabase.auth.signInWithPassword(payload);
            // const {data} = await supabase.auth.getSession()    // .then(response => {
            // const token = data.session.access_token;
            // this.$store.commit('setToken', token);
            // axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            // localStorage.setItem('token', token);

            if (error) {
                this.errors.push(error);
                console.log(error);
            }
            else {
            const {data} = await supabase.auth.getSession()
            const token = data.session.access_token;
            this.$store.commit('setToken', token);
            axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            localStorage.setItem('token', token);
            };
                    // persist the route info
            const toPath = this.$route.query.to || '/';

            toast({
                message: 'Login successful!',
                type: 'is-success',
                duration: 3000,
                position: 'top-center'
            });
            this.$router.push(toPath);
            
                // .catch(error => {
                //     if (error.response) {
                //         for (const key in error.response.data) {
                //             this.errors.push(`${key}: ${error.response.data[key]}`);
                //         }
                //     } else {
                //         this.errors.push('An error occurred during login. Please try again.');
                //     }
                // });
            

        }
    },

}


</script>