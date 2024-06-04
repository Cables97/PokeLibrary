<template>
    <div class="content">
      <h1>PokeList</h1>

      <div class="loading-screen" v-if="isLoading">
        <img src="https://webstockreview.net/images/pikachu-clipart-pokeball-3.png" alt="">
      </div>

      <div class="list" v-if="!isLoading">
        <div v-for="pokemon in this.PokeListSorted" :key="pokemon.name" :id="pokemon.name" class="pokemon" @click="listClick(pokemon)">
          <p class="pokemon-id"># {{ pokemon.id }}</p>
  
          <button class="pokeball-btn corner-btn" @click="addToParty"><img src="../assets/pokeball_inactive.png" alt=""></button>
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
      
    </div>
  </template>
  



  <script>
  export default {
      data(){
          return{
            url: 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0',
            csvContent: "data:text/csv;charset=utf-8,",
            isLoading: false,
            pokeMasterList : [],
            displayList: [],
            loading: true,
            post: null,
            error: null,
            typeList : [],
            statList : [],
            genList: [],
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

        listClick(pokemonName){
          console.log(pokemonName);
        }
      },
  
      computed: {
        
        PokeListSorted(){
          this.displayList = this.pokeMasterList.sort((a, b) => { return a.id - b.id;});
          return this.displayList
        },
        
      },
  
      created(){
        this.fetchPokemon()
        console.log(this.pokeMasterList)
      },
  }
  </script>





  <style>
  .list{
    display: flex;
    flex-wrap: wrap;
    gap: 40px 15px;
    justify-content: center;
  }
  
  .loading-screen{
    position:fixed;
    width: auto;
    height:100%;
    z-index: 99;
  }
  .loading-screen img{
    height:100%;
    width:100%;
  }
  
  .pokemon{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    height: 120px;
    width: 210px;
    background-color: #222;
  }

  .types{
    display: flex;
    flex-direction: row;
    gap:10px;
  }
  
  .type-btn{
    position: relative;
    border-radius: 20px;
    width:70px;
    height:28px;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, .50) inset;
    background-image: linear-gradient(180deg, rgba(0,0,0,0%), rgba(0,0,0,25%));
  }
  .wide-btn{
    width:120px;
  }
  
  .type-btn p{
    text-align: center;
    vertical-align: middle;
    font-family: "Roboto", sans-serif;
    font-weight: 800;
    letter-spacing: 1px;
    line-height: 28px;
    font-size: 12px;
    color: white;
    text-transform:uppercase;
    text-shadow: 1px 1px 1px black;
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
  
  .pokeball-btn {
    position: absolute;
    bottom:5px;
    right:5px;
  }
  
  .pokeball-btn:hover img{
    content:url("../assets/pokeball_active.png");
    cursor: pointer;
  }
  
  .star-btn{
    position: absolute;
    top:5px;
    right:5px;
  }
  
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
  
  .corner-btn i{
    color: white;
  }
  
  
  .pokemon:hover{
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, .25);
  }
  
  .pokemon:hover > .pokemon-img-gif{
    display:inherit;
  }
  
  .pokemon:hover > .pokemon-img{
    display:none;
  }
  .normal{
    background-color: #b3b3a4;
  }
  .fire{
    background-color: #ff4422;
  }
  .water{
    background-color: #3399ff;
  }
  .electric{
    background-color: #ffcc33;
  }
  .grass{
    background-color: #77cc55;
  }
  .ice{
    background-color: #66ccff;
  }
  .fighting{
    background-color: #bb5544;
  }
  .poison{
    background-color: #aa5599;
  }
  .ground{
    background-color:#ddbb55;
  }
  .flying{
    background-color: #8899ff;
  }
  .psychic{
    background-color: #ff5599;
  }
  .bug{
    background-color: #aabb22;
  }
  .rock{
    background-color: #bbaa66;
  }
  .ghost{
    background-color: #6666bb;
  }
  .dragon{
    background-color: #7766ee;
  }
  .dark{
    background-color: #775544;
  }
  .steel{
    background-color: #aaaabb;
  }
  .fairy{
    background-color: #ee99ee;
  }
  </style>
  