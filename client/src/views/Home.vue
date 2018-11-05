<template>
  <div class="jumbotron text-center">
    <h1 class="display-3">Authentication</h1>
    <p class="lead">Learning Auth is fun! 🔐</p>
    <hr class="my-4">
    <p>Let's learn it together!!! 🌈</p>
    <p class="lead">
      <router-link :to="{name: 'signup'}" tag="button" class="btn btn-primary btn-lg">Sign Up</router-link>
    </p>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>
