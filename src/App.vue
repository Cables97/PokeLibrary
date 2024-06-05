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

<template>
  <header>
    <NavBar></NavBar>
  </header>
  <div class="content">
    <PokeList />
  </div>
  
</template>

<style>
:root{
  --global-width: 60%;
}


  body{
    background-color: #111;
    box-shadow: 0 0 100px 50px rgba(0, 0, 0, .50) inset;
  }
  header{
    background-color: #111;
  }

  .content{
    position: relative;
    width:var(--global-width);
    margin:auto;
    padding-top:260px;
  }


  @media only screen and (max-width: 600px) {
    :root{
     --global-width: 100%;
    }
    body{
    width:var(--global-width);
    margin:auto;
  }
}
</style>
