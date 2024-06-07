<template>
    

  <Transition>
    <div class="loading-screen" v-if="isLoading">
      <img src="../assets/Pokemon-Pokeball-PNG-HD-Image.png" alt="">
    </div>
  </Transition>

  <div class="list" v-if="!isLoading">
    <div v-for="pokemon in this.PokeListSorted" :key="pokemon.name" :id="pokemon.name" class="pokemon-card" @click="listClick(pokemon)">
      <p class="pokemon-id"># {{ pokemon.id }}</p>

      <button class="pokeball-btn corner-btn" @click="addToParty"><img src="../assets/pokeball_active.png" alt=""></button>
      <button class="star-btn corner-btn" @click="addToFavourites"><i class="fa-regular fa-star fa-lg fa-white"></i></button>

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
  
  <div class="modal-wrapper" v-if="isOpenModal">

    <ModalPop :currentPokemon="currentPokemon"/>
    

    <div class="modal-bg" @click="isOpenModal = false"></div>


  </div>

    
</template>
  

<script>
  import ModalPop from './ModalPop.vue';
  import { stateStorage } from './dataStorage'


  export default {
      data(){
          return{
            stateStorage,
            url: 'https://pokeapi.co/api/v2/pokemon?limit=256&offset=0',
            csvContent: "data:text/csv;charset=utf-8,",
            isLoading: true,
            isOpenModal: false,

            currentPokemon: {},

            pokeMasterList : [],
            displayList: [],

            post: null,
            error: null,

            eggGroups: [],
            isBabies: false,
            isLegendary: false,

          }
      },

      methods: {
        //pokemon List fetch. Gets / sorts pokemon based on ID
        
        fetchPokemon(){


            fetch(this.url)
            .then(response => response.json())
            .then(data => 
              data.results.forEach(element => {
                fetch('https://pokeapi.co/api/v2/pokemon/' + element.name)
                  .then(response => response.json())
                  .then(data => this.pokeMasterList.push(data))}))
          },
      
        listClick(poke){
          this.currentPokemon = poke
          this.isOpenModal = true
          console.log(poke);
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
                this.pokeMasterList.forEach(pokemon =>{
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
                this.pokeMasterList.forEach(pokemon =>{
                  pokemon["stats"].forEach (stat =>{
                    if(stateStorage.filterStatList.includes(stat["stat"]["name"])){
                      console.log(pokemon["name"])
                      console.log(stat)
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
            this.pokeMasterList.forEach(pokemon =>{
                this.displayList.push(pokemon)
              })
          }
        
          this.displayList.sort((a, b) => { return a.id - b.id;})
          return this.displayList
        },
        
      },

      created(){
        this.fetchPokemon()
        console.log(this.pokeMasterList)
      },
      mounted() {
        setTimeout(() => {
          this.isLoading = false;
        }, 750);
      },
      components: { ModalPop }
  }
</script>


<style scoped>
  .list{
    display: flex;
    flex-wrap: wrap;
    gap: 40px 15px;
    justify-content: center;
  }
  /* Loading */
  .v-enter-active,
  .v-leave-active {
    transition: transform 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    transform: translate(0, 1080px);
  }

  .loading-screen{
    position:absolute;
    height:100%;
    min-height:80vh;
    display:grid;
    z-index: 99;
    width:100%;
    border-radius: 30px;
    background-color: #444;
    box-shadow: 0 0 100px 50px rgba(0, 0, 0, .50) inset;
  }
  .loading-screen img{
    position: relative;
    margin:auto;
    height:auto;
    width:20%;
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
    border-radius: 20px;
    height: 120px;
    width: 210px;
    background-color: #333;
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
    z-index: 999;
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
  }
  
  .pokemon-name{
    font-family: "Roboto", sans-serif;
    text-transform: capitalize;
    font-weight: 700;
    font-size: 18px;
    letter-spacing: 1px;
    margin: 36px 0 6px;
  }

   /* Fav / Caught Buttons */
  .corner-btn{
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
    position: absolute;
    bottom:5px;
    right:5px;
  }
  
  .pokeball-btn img {
    filter: grayscale(100%);
  }

  .pokeball-btn:hover img{
    filter: grayscale(0%);
    cursor: pointer;
  }
  
  .star-btn{
    position: absolute;
    top:5px;
    right:5px;
  }
  
 
  .corner-btn i{
    color: white;
  }
  
  .pokemon-card:hover{
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, .25);
  }
  
  .pokemon-card:hover > .pokemon-img-gif{
    display:inherit;
  }
  
  .pokemon-card:hover > .pokemon-img{
    display:none;
  }

</style>
  