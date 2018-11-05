<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link to='/'  tag='a' class="navbar-brand">Auth</router-link>
     <ul class="navbar-nav ml-auto">
      <template v-if="!getIsUserLogged">
        <li class="nav-item mr-sm-3">
          <router-link to='/signup' tag="button" class="btn btn-secondary">Sign Up</router-link>
        </li>
        <li class="nav-item">
          <router-link to='/signin' tag="button" class="btn btn-secondary">Sign In</router-link>
        </li>
      </template>
       <li v-else class="nav-item">
        <button @click="logout" class="btn btn-secondary">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters('auth', [ 'getIsUserLogged']),
  },
  methods: {
     ...mapActions('auth', [ 'logout']),
  }
}
</script>

<style scoped>

</style>
