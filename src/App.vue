<script>
import NavBar from './components/NavBar.vue';
import PokeList from './components/PokeList.vue';

export default {
  name: 'App',
  components: {
    NavBar, PokeList
  },
  methods: {

  },
}


</script>

<template>
  <header>
    <NavBar></NavBar>
  </header>
  <div class="pokemon-list-container">
    <PokeList />
  </div>
  
</template>

<style>


body{
    background-color: var(--body-background);
    box-shadow: 0 0 100px 50px rgba(0, 0, 0, .50) inset;
}

header{
  background-color: var(--body-background);
  z-index: 99999;
}

.pokemon-list-container{
  position: relative;
  width:var(--global-width);
  min-width: var(--global-min-width);
  margin:auto;
  padding-top:260px;
}



/* Mobile */
@media only screen and (max-width: 600px) {
  :root{
     --global-width: 100%;
     --global-min-width: 375px;
    }
  body{
    width:100%;
    height:100%;
    margin:auto;
  }
  .pokemon-list-container{
    width:var(--global-width);
    min-width: var(--global-min-width);
    padding-top:160px;
  }
}

/* Tablet */
@media only screen and (min-width: 600px) {
    :root{
     --global-width: 100%;
     --global-min-width: 600px;
    }
  body{
    width:100%;
    height:100%;
    margin:auto;
  }
  .pokemon-list-container{
    width:100%;
    min-width: var(--global-min-width);
    padding-top:160px;
  }
}

/* Tablet */
  @media only screen and (min-width: 768px) {
    :root{
     --global-width: 100%;
     --global-min-width: 768px;
    }
  body{
    width:100%;
    height:100%;
    margin:auto;
  }
  .pokemon-list-container{
    width:100%;
    min-width: var(--global-min-width);
    padding-top:260px;
  }
}

/* Desktop */
@media only screen and (min-width: 1200px) {
  :root{
     --global-width: 60%;
     --global-min-width: 1142px;
    }

  body{
    width:100%;
    height:100%;
    margin:auto;
  }
  .pokemon-list-container{
    width:var(--global-width);
    min-width: var(--global-min-width);
    padding-top:260px;
  }
}

</style>
