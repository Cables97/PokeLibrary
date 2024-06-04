<script>
import NavBar from './components/NavBar.vue';
import PokeList from './components/PokeList.vue';

export default {
  name: 'App',
  components: {
    NavBar, PokeList
  }
}


</script>

<template class="content">
  <header>
    <NavBar></NavBar>
  </header>

  <PokeList />
</template>

<style>
  .content{
    position: relative;
    width:60%;
    margin:auto;
  }
  @media only screen and (max-width: 600px) {
    body{
    width:100%;
    margin:auto;
  }
}
</style>
