<template>
  <section>
    <h1>Signup</h1>
    <div v-if="getErrorMessage" class="alert alert-danger" role="alert">
      {{ getErrorMessage }}
    </div>
     <form @submit.prevent="onSignup(user)">
      <div class="form-group">
        <label for="email">Email address</label>
        <input v-model="user.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="user.password" type="password" class="form-control" id="password" placeholder="Password" required>
        <small id="passwordHelp" class="form-text text-muted">Password length must be at least 6 characters long.</small>
      </div>
      <button type="submit" class="btn btn-primary">Signup</button>
     </form>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { validateUser } from '../validationSchema.js';

export default {
  name: 'Signup',
  data() {
    return {
      user: {
        email: '',
        password: ''
      },
    }
  },
  mounted() {
    this.setErrorMessage('');
  },
  computed: {
    ...mapGetters('auth', ['getErrorMessage'])
  },
  methods: {
    ...mapActions('auth', ['signup']),
    ...mapMutations('auth',['setErrorMessage']),
    onSignup(user) {
      const resultValidation = validateUser(user);
      if  (resultValidation === null) {
        this.signup(user);
      } else {
        this.setErrorMessage(resultValidation);
      }
    }
  }
}
</script>

<style>

</style>
