<template>


  <Transition>
    <div class="loading-screen" v-if="isLoading"  >
      <div class="loading-img-wrapper">
        <img src="./icons/pokeball_PNG8.png" alt="">
      </div>
    </div>
  </Transition>


  <div class="list">

    <div v-for="pokemon in this.PokeListSorted" :key="pokemon.name" :id="pokemon.name" class="pokemon-card" @click="listClick(pokemon)" :alt="pokemon.name">
      <p class="pokemon-id"># {{ pokemon.id }}</p>

      <button class="pokeball-btn corner-btn" @click.stop.prevent="pushToCaught(pokemon)" ><img :class="{'not-caught' : !stateStorage.caughtList.includes(pokemon.name)}"  src="./icons/pokeball_active.png" alt=""></button>
      <button class="star-btn corner-btn" @click.stop.prevent="pushToFavorites(pokemon)" :class="{'favourite' : stateStorage.favouriteList.includes(pokemon.name)}">&#9733</button>

      <img :src='pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default || pokemon.sprites.front_default' onerror="this.src=''" class="pokemon-img-gif">
      <img :src='pokemon.sprites.front_default' :alt="pokemon.name" class="pokemon-img">

      <p class="pokemon-name">{{ pokemon.name }}</p>

      <div class="types">
        <div v-for="type in pokemon.types" :key="pokemon.id" :class="type.type.name" class="type-btn">
          <p>{{ type.type.name }}</p>
        </div>
      </div>

    </div>
  </div>
  
  <div class="modal-wrapper"  v-if="stateStorage.modalOpen">

    <ModalPop/>
    
    <div class="modal-bg" @click="stateStorage.modalOpen = false"></div>

  </div>

  <div class="alert-box-wrapper" :class="{ 'alert-active' : stateStorage.alertActive }">
    <AlertBox> </AlertBox>
  </div>
  

</template>
  

<script>
  import AlertBox from './AlertBox.vue';
  import ModalPop from './ModalPop.vue';
  import { stateStorage , saveLists , loadLists , logLists , alert } from './dataStorage'


  export default {
      data(){
          return{
            stateStorage,

            fetchStart: 493,
            fetchScroll: 20,
            fetchMax: 1025,
            url: 'https://pokeapi.co/api/v2/pokemon?limit=' + this.fetchStart + '&offset=0',
            csvContent: "data:text/csv;charset=utf-8,",
            isLoading: true,

            currentPokemon: {},

            pokeMasterList : [],
            displayList: [],

            post: null,
            error: null,

            eggGroups: [],
            isBabies: false,
            isLegendary: false,

            yScroll: 20,

          }
      },

      methods: {
        //pokemon List fetch. Gets / sorts pokemon based on ID      
        async fetchPokemon(){
          if(stateStorage.masterList.length == 0){
            const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=' + this.fetchStart + '&offset=0')
              const data = await res.json()
                data.results.forEach(element => {
                  fetch('https://pokeapi.co/api/v2/pokemon/' + element.name)
                    .then(response => response.json())
                    .then(data => {
                      stateStorage.masterList.push(data)
                    })
                  })
          }
        },
      
        async addFetchPokemon(){
          //on scroll add 2 lines of pokemon to the master List
          let winHeight = document.getElementById('content').offsetHeight
          let cardHeight = 200 //px
          
          let winWidth = document.getElementById('content').offsetWidth
          let cardWidth = 150

          let cardsPerRow = winWidth / cardWidth

        },

        listClick(poke){
          stateStorage.currentPokemon = poke
          stateStorage.modalOpen = true
          console.log(poke);
        },

        pushToFavorites(poke){
          let pokeName = poke["name"]
            if(!stateStorage.favouriteList.includes(pokeName)){
              stateStorage.favouriteList.push(pokeName)
              console.log(pokeName + " Favourited!")
              alert(pokeName + " favourited!")
            }else{
                stateStorage.favouriteList.splice(stateStorage.favouriteList.indexOf(pokeName), 1)
                alert(pokeName + " removed from favourites!")
            }
            saveLists()

        },

        pushToCaught(poke){
          let pokeName = poke["name"]
            if(!stateStorage.caughtList.includes(pokeName)){
              stateStorage.caughtList.push(pokeName)
              alert(pokeName + "  caught!")
            }else{
                stateStorage.caughtList.splice(stateStorage.caughtList.indexOf(pokeName), 1)
                alert(pokeName + "  released into the wild!")
            }
            saveLists()
        },

      },

      computed: {
        
        PokeListSorted(){
          this.displayList = []
          //checks if filter is active, if so, run through filter, otherwise show all
          if(stateStorage.filterTypeList.length > 0 || stateStorage.filterStatList.length > 0){
            //if filteredTypeList.length > 0, add matching type to list
            if(stateStorage.filterTypeList.length >= 0){
                // for each pokemon with matching type, (if not in already) push to display pokemon
                stateStorage.masterList.forEach(pokemon =>{
                  pokemon["types"].forEach (type =>{
                    if(stateStorage.filterTypeList.includes(type["type"]["name"])){
                      if(!this.displayList.includes(pokemon)){
                        this.displayList.push(pokemon)
                      }
                    }
                  })
                })
            }
            //if filterStatList.length > 0, add matching type to list
            if(stateStorage.filterStatList.length >= 0){
                // for each pokemon with matching type, (if not in already) push to display pokemon
                stateStorage.masterList.forEach(pokemon =>{
                  pokemon["stats"].forEach (stat =>{
                    if(stateStorage.filterStatList.includes(stat["stat"]["name"])){
                      if(stat["base_stat"] > 80){
                        if(!this.displayList.includes(pokemon)){
                          this.displayList.push(pokemon)
                      }
                      }
                    }
                  })
                })
            }
          }else{
            stateStorage.masterList.forEach(pokemon =>{
                this.displayList.push(pokemon)
              })
          }
          this.displayList.sort((a, b) => { return a.id - b.id;})
          //shallow copy filter for Caught and favourite
          if(stateStorage.filterCaught){
            this.displayList = this.displayList.filter((poke) => stateStorage.caughtList.includes(poke.name))
          }

          if(stateStorage.filterFavorite){
            this.displayList = this.displayList.filter((poke) => stateStorage.favouriteList.includes(poke.name))
          }

          if(stateStorage.searchQuery){
            this.displayList = this.displayList.filter(element => element.name.includes(stateStorage.searchQuery))
          }


          return this.displayList
        },
        
      },

      created(){
        logLists()
        loadLists()
        this.fetchPokemon()
        console.log(stateStorage.masterList)
      },

      mounted() {
        setTimeout(() => {
          this.isLoading = false
        }, 3000);
      },

      components: { ModalPop, AlertBox }
  }
</script>


<style scoped>

  .list{
    display: flex;
    flex-wrap: wrap;
    gap: 40px 15px;
    justify-content: center;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
    opacity: 100%;
  }
  .v-enter-from,
  .v-leave-to {
    transform: translate(0, 100vh);
    opacity: 0%;
  }

  .loading-screen{
    position:absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width:100%;
    z-index: 99;
    background-color: var(--modal-background);
    box-shadow: 0 0 100px 50px rgba(0, 0, 0, .50) inset;
    border-radius: 30px;
  }
  .loading-img-wrapper{
    position: absolute;
    margin:0;
    height:auto;
    width:20%;
    top:20vh;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .loading-img-wrapper img{
    position: absolute;
    margin:0;
    height:auto;
    width:100%;
    animation: anim-spin 1s infinite;
  }

  @keyframes anim-spin {
    0%{
      transform: rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    } 
    
  }

  /* Modal */
  .modal-wrapper{
    position: fixed;
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    z-index: 999;
  }
  .modal-bg{
    position: absolute;
    top:0;
    left:0;
    height:100vh;
    width:100vw;
    background-color: rgba(0, 0, 0, .25);
    z-index:10;
  }


  /* Pokemon Cards */
  .pokemon-card{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border:2px solid var(--card-border);
    border-radius: 20px;
    background-color: var(--card-background);
    box-shadow: 4px 4px 10px 0 var(--card-shadow), 0 0 10px rgba(0, 0, 0, .1) inset;
  }

  .types{
    display: flex;
    flex-direction: row;
    gap:10px;
  }
  
  .pokemon-img{
    position: absolute;
    top:-48px;
  }
  
  .pokemon-img-gif{
    position: absolute;
    display:none;
    top:-60px;
    width: 200px;
    aspect-ratio: auto;
    height:auto;
    max-width:120px;
    max-height:100px;
    z-index: 99;
  }
  
  .pokemon-id{
    position: absolute;
    top:0;
    left:0;
    padding:5px 10px;
    border:1px solid rgba(0, 0, 0, .50);
    border-radius: 20px 0 10px 0 ;
    border-top-style: none;
    border-left-style: none;
    background-color: rgba(0, 0, 0, .1);
    box-shadow:0 0 10px 0 rgba(0, 0, 0, .25);
  }
  
  .pokemon-name{
    font-family: var(--text-font);
    font-size: 32px;
    text-transform: capitalize;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 1px;
    margin: 36px 0 0px;
  }

   /* Fav / Caught Buttons */
  .corner-btn{
    position: absolute;
    background: none;
    border:none;
    height:32px;
    width:32px;
  }
  
  .corner-btn img{
    position: absolute;
    top:50%;
    left:50%;
    height:24px;
    width:24px;
    transform: translate(-50%,-50%);
  }

  .pokeball-btn {
    bottom:5px;
    right:5px;
  }

  .star-btn{
    top:0px;
    right:5px;
  }
    
  .pokemon-card:hover{
    transform: scale(105%);
    box-shadow: 6px 6px 10px 0 var(--card-shadow);
  }
  
  .pokemon-card:hover > .pokemon-img-gif{
    display:inherit;
  }
  
  .pokemon-card:hover > .pokemon-img{
    display:none;
  }


  .alert-box-wrapper{
    position: fixed;
    bottom:-100px;
    right:10px;
    transition: all 1s;
  }


  .alert-active{
    bottom:10px;
    right:10px;
  }



/* Mobile */
@media only screen and (max-width: 600px) {
  /* Loading */
  .loading-screen{
    top:130px;
    height:100%;
    min-height:80vh;
  }
  .pokemon-card{
    height: 140px;
    width: 175px;
  }
}
/* Mobile */
@media only screen and (min-width: 600px) {
  /* Loading */
  .loading-screen{
    top:130px;
    height:100%;
    min-height:80vh;
  }
  .pokemon-card{
    height: 120px;
    width: 210px;
  }
}
/* Tablet */
@media only screen and (min-width: 768px) {
  /* Loading */
  .loading-screen{
    top:190px;
    height:100%;
    min-height:80vh;
  }
  .pokemon-card{
    height: 120px;
    width: 210px;
  }
}
/* Desktop 1440p*/
@media only screen and (min-width: 1200px) {
  /* Loading */
  .loading-screen{
    top:200px;
    height:100%;
    min-height:80vh;
  }
  .pokemon-card{
    height: 120px;
    width: 210px;
  }

}


</style>
  