<template>
    <div class="sign-up">
        <h1 class="title has-text-centered">Sign Up</h1>
        <div class="columns is-multiline">
            <div class="column is-2"></div>
            <div class="column is-8">
                <form @submit.prevent="submitSignUp">
                    <div class="field">
                        <label class="label">Username</label>
                        <div class="control">
                            <input class="input" type="text" v-model="username" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" v-model="email" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input class="input" type="password" v-model="password" required>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">Confirm Password</label>
                        <div class="control">
                            <input class="input" type="password" v-model="confirmPassword" required>
                        </div>
                    </div>

                    <div class="field is-grouped is-grouped-right">
                        <div class="control">
                            <button type="submit" class="button is-primary">Sign Up</button>
                        </div>
                    </div>

                    <div class="notification is-danger" v-if="errors.length">
                        <p v-for="error in errors" :key="error">{{ error }}</p>
                    </div>


                </form>
                <p>Have an account already? <router-link to="/login">Login</router-link></p>
            </div>

            <div class="column is-2"></div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import { supabase } from '@/supabaseClient';
import { toast } from 'bulma-toast';

export default {
    name: 'SignUp',
    data() {
        return {
            // Sign up form data can go here
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: []
            
        }
    },
    mounted() {
        document.title = "Sign Up - Arla Racing Exhaust Indonesia";
    },
    methods: {
        async submitSignUp() {

            this.errors = [];

            if (this.password.length < 8) {
                this.errors.push('Password must be at least 8 characters long.');
            }

            // Validate password and confirm password
            if (this.password !== this.confirmPassword) {
                this.errors.push('Passwords do not match.');
            }

            if (!this.errors.length) {
            // Prepare payload
            const payload = {
                email: this.email,
                password: this.password,
                options: {
                    data: {
                    display_name: this.username,},
                emailRedirectTo: 'http://localhost:8080/login'}
            };

            const { data, error } = await supabase.auth.signUp(payload);
            if(error) {
                console.log(error);
            };
            toast(
                {
                    message: "Confirmation email sent! Please check your inbox to verify and complete the registration",
                    type: 'is-success',
                    duration: 5000,
                    position: 'top-center'
                }
            );
            window.location.href('http://localhost:8080')
            // Make an API call to sign up the user
            // axios.post('/api/v1/users/', payload)
            //     .then(response => {
            //         toast({
            //             message: 'Sign up successful! Please log in.',
            //             type: 'is-success',
            //             duration: 3000,
            //             position: 'top-center'
            //         });
            //         // Redirect to login page after successful sign up
            //         this.$router.push('/login');
            //     })
                // .catch(error => {
                //     if (error.response) {
                //         for (const key in error.response.data) {
                //             if (error.response.data.hasOwnProperty(key)) {
                //                 this.errors.push(`${key}: ${error.response.data[key]}`);
                //             }
                //         }
                //         console.log(JSON.stringify(error.response.data));
                //     }
                //     else if (error.message) {
                //         this.errors.push('Something went wrong please try again later.');

                //         console.log(JSON.stringify(error));
                //     }
                // });
        }}
    }
}


</script>