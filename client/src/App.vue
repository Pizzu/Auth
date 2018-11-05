<template>
  <div>
    <Header />
    <router-view class="container mt-3"></router-view>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Header,
  }
}
</script>


<style>

</style>
