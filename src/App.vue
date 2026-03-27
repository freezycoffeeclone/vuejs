
<template>

  <!-- Navbar Wrapper -->
  <div id="wrapper">
    <nav class="navbar is-light box">


      <div class="navbar-brand">
        <router-link to="/" class="navbar-item"><img src="./assets/logo.webp" alt=""></router-link>

        <a class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu" @click="showMobileMenu = !showMobileMenu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <!-- Right end of the navbar -->
      <div id="navbar-menu" class="navbar-menu" v-bind:class="{'is-active': showMobileMenu}">


        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <!-- if user is not authenticated shows login button -->
              <template  v-if="!$store.state.isAuthenticated">
              <router-link to="/login" class="button is-dark">
                <strong><i class="fas fa-user"></i>&nbsp; Log in</strong>
              </router-link>
              </template>

              <!-- if user is authenticated shows profile button -->
              <template v-else>
              <router-link to="/profile" class="button is-dark">
                <strong><i class="fas fa-user"></i>&nbsp; Profile</strong>
              </router-link>
              </template>
              <router-link to="/cart" class="button is-primary">
                <strong><i class="fas fa-shopping-cart"></i>&nbsp; Cart ({{ cartTotalLength }})</strong>
              </router-link>
            </div>
          </div>



        </div>
      </div>


    </nav>
  </div>

  <!-- End Navbar wrapper -->





  <!-- Content Section -->
  <section class="section">
  <router-view/>
  </section>

  <!-- End Content Section -->


  <!-- Footer -->
  <footer class="footer">
    <div class="columns box">
      <div class="column is-8">
        <h4><strong>Arla Racing Exhaust Indonesia</strong></h4>
        <p>Your one-stop shop for all your exhaust needs.</p><br>
        <p>Pesanggrahan RT.04/RW.3, Area Sawah, Bojanegara, Kecamatan Padamara,<br> Kabupaten Purbalingga, Jawa Tengah 53372</p>
      </div>
      <div class="column is-4 has-text-right">
        <h4><strong>Contact Us</strong></h4>
        <p>arla.exhaust@email.com</p>
        <p>+62 889-5876-016</p>
        <a href="https://instagram.com/arlaracingexhaust" target="_blank"><strong><i class="fa-brands fa-instagram" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;</strong></a>
        <a href="https://www.tiktok.com/@arlaracingexhaustidn" target="_blank"><i class="fa-brands fa-tiktok">&nbsp;&nbsp;&nbsp;</i></a>
        <a href="https://web.facebook.com/p/ARLA-recing-exhaust-indonesia-100090862470244/?_rdc=1&_rdr#" target="_blank"><i class="fa-brands fa-facebook"></i></a>

      </div>
    </div>
    <p class="has-text-centered">Copyright &copy; Arla Racing Exhaust Indonesia 2025</p>
  </footer>
  <!-- End Footer -->

</template>


<script>
import axios from 'axios';
// import { supabase } from './supabaseClient'

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: { items: []},
      isAuthenticated: false
    }
  },
  beforeCreate() {


    this.$store.commit('initializeStore');

    // token for authenticated requests
    const token = this.$store.state.token;

    if (token) {
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
    else {
      axios.defaults.headers.common['Authorization'] = '';
    }
  },
mounted() {
    this.cart = this.$store.state.cart;
    this.isAuthenticated = this.$store.state.isAuthenticated;
},
  computed: {
    cartTotalLength() {
      let totallength = 0
      for (let i=0; i < this.cart.items.length; i++) {
        totallength += this.cart.items[i].quantity
      }
      return totallength;
    }
  }

}
</script>

<style lang="scss">
@import '../node_modules/bulma/'

</style>
