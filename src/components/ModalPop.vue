<template>

    <Transition>
        <div class="modal-loading" v-if="isLoadingModal">
            <img src="../assets/Pokemon-Pokeball-PNG-HD-Image.png" alt="">
        </div>
    </Transition>

    <div class="modal-info" v-if="!isLoadingModal">
        <div class="modal-content">
            
            <div class="modal-text">
                <h3 class="modal-id">ID: {{ this.currentPokemon["id"] }}</h3>
                <h1 class="modal-name">{{ this.currentPokemon["name"] }}</h1>
                <h3 class="modal-subname">{{ this.currPokeSpecies["genera"][7]["genus"] }}</h3>

                <div class="modal-section">
                    <p>Description:</p>
                    <p>{{ this.currPokeSpecies.flavor_text_entries[2].flavor_text }}</p>
                </div>

                
                <div class="modal-section" v-for="ability in this.enAbilities" :key="ability">
                    <p>Description:</p>
                    <p>{{ ability["effect"] }}</p>
                </div>


            </div>

            <div class="modal-stats">
                <div class="modal-tags"><span class="modal-tag">Starter</span></div>

                <div class="modal-img-wrap">
                     <img :src='this.currentPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default || pokemon.sprites.front_default' onerror="this.src=''" class="modal-img">
                     <div class="modal-img-shadow"></div>
                     <div class="modal-img-st">Shiny</div>
                </div>
                <div class="modal-types">
                    <div v-for="type in this.currentPokemon.types" :key="this.currentPokemon.id" :class="type.type.name" class="type-btn">
                        <p>{{ type.type.name }}</p>
                    </div>
                </div>
                <div class="stats-blocks">
                    <div class="info-block ib-s" >
                        <p class="info-block-value">{{this.currentPokemon.stats[0].base_stat}}</p>
                        <p class="info-block-name">HP</p>
                    </div> 
                    <div class="info-block ib-s">
                        <p class="info-block-value">{{this.currentPokemon.stats[1].base_stat}}</p>
                        <p class="info-block-name">ATK</p>
                    </div>
                    <div class="info-block ib-s">
                        <p class="info-block-value">{{this.currentPokemon.stats[2].base_stat}}</p>
                        <p class="info-block-name">SP.ATK</p>
                    </div>
                    <div class="info-block ib-s">
                        <p class="info-block-value">{{this.currentPokemon.stats[5].base_stat}}</p>
                        <p class="info-block-name">SPEED</p>
                    </div>
                    <div class="info-block ib-s">
                        <p class="info-block-value">{{this.currentPokemon.stats[3].base_stat}}</p>
                        <p class="info-block-name">DEF</p>
                    </div>
                    <div class="info-block ib-s">
                        <p class="info-block-value">{{this.currentPokemon.stats[4].base_stat}}</p>
                        <p class="info-block-name">SP.DEF</p>
                    </div>
                

                    <div class="info-block ib-m" >
                            <p class="info-block-value">{{this.currentPokemon.height / 10}} m</p>
                            <p class="info-block-name">Height</p>
                    </div>
                    <div class="info-block ib-m" >
                            <p class="info-block-value">{{this.currentPokemon.weight / 10}} kg</p>
                            <p class="info-block-name">Weight</p>
                    </div>

                    <div class="info-block ib-m" >
                            <p class="info-block-value">{{this.currPokeSpecies["base_happiness"]}}</p>
                            <p class="info-block-name">Base Happy</p>
                    </div>
                    <div class="info-block ib-m" >
                            <p class="info-block-value">{{this.currPokeSpecies["capture_rate"]}}</p>
                            <p class="info-block-name">Catch Rate</p>
                    </div>

                    <div class="info-block ib-l" >
                            <p class="info-block-value"><span>{{this.currPokeSpecies["growth_rate"]["name"]}}</span></p>
                            <p class="info-block-name">Growth Rate</p>
                    </div>

                    
                    <div class="info-block ib-l" >
                            <p class="info-block-value">{{this.currPokeGrowthInfo["levels"][99]["experience"]}}</p>
                            <p class="info-block-name">Max XP</p>
                    </div>

                    
                    <div class="info-block ib-l" >
                            <p class="info-block-value"><span v-for="group in this.currPokeSpecies.egg_groups">{{ group.name }}</span></p>
                            <p class="info-block-name">Egg Groups</p>
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
                currPokeSpecies: {},
                currPokeGrowthInfo: {},
                isLoadingModal : true,
                abilityList: [],
                abilities: [],
                
            }
        },
        props:{
            currentPokemon: Object
        },

        methods: {
            fetchPokemonInfo(){
                console.log('fetch pokemon info')
                console.log(this.currentPokemon["name"])
                fetch("https://pokeapi.co/api/v2/pokemon-species/" + this.currentPokemon["name"] )
                    .then(response => response.json())
                    .then(data => this.currPokeSpecies = data)
            },

            fetchPokemonGrowth(){
                console.log('fetch pokemon grow info')
                fetch(this.currPokeSpecies["growth_rate"]["url"] )
                    .then(response => response.json())
                    .then(data => this.currPokeGrowthInfo = data)
            },




            abilityGrab(){
                this.currentPokemon.abilities.forEach(ability =>{
                    fetch(ability["ability"]["url"] )
                        .then(response => response.json())
                        .then(data => this.abilityList.push(data))

                })
            },

        },


        computed: {
            enAbilities(){
                this.abilities = []
                this.abilityList.forEach((item, index , full) =>{
                    item.effect_entries.forEach( (entry, index , full) =>{
                        if(entry.language.name === "en"){
                            this.abilities.push(entry)
                            console.log(entry)
                            return this.abilities
                        }
                    })
                })
                console.log(this.abilities)
            }
             
        },



        beforeMount() {
           
            setTimeout(() => {
                this.fetchPokemonInfo()
            }, 250)

            setTimeout(() => {
                this.fetchPokemonGrowth()
                console.log(this.currPokeSpecies)
            }, 500)
            setTimeout(() =>{
                console.log(this.currPokeGrowthInfo)
                this.abilityGrab()
                this.isLoadingModal = false
            }, 750)
        },
        mounted(){
            setTimeout(() =>{
                this.isLoadingModal = false
            }, 750)
        },
    }
</script>

<style>
 /* Base Modal info */
    .modal-info{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        height:800px;
        width:600px;
        background-color: #444;
        border-radius: 20px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5),0 0 20px 20px rgba(0, 0, 0, 0.25);
        z-index: 12;
    }
    .modal-loading{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        height:800px;
        width:600px;
        display:grid;
        z-index: 99;
        border-radius: 30px;
        background-color: #444;
        box-shadow: 0 0 100px 50px rgba(0, 0, 0, .50) inset;
    }

    .modal-loading img{
        position: relative;
        margin:auto;
        height:auto;
        width:20%;
        animation: anim-spin 1s infinite;
    }

     /* Modal loading */
    .v-enter-active,
    .v-leave-active {
        transition: transform 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        transform: translate(-50%, 1000px);
    }



    /* Modal Content */

     .modal-content{
        display: flex;
        flex-direction: row;
        padding:20px;
        justify-content: space-between;
        height:100%;
    }

    /* Modal Info */


    .modal-id{
        margin-top:10px;
        font-size: 16px;
        line-height: 16px;
    }

    .modal-name{
        font-size: 60px;
        font-variant: small-caps;
        font-family: "Roboto", sans-serif;
        line-height: 42px;
        margin-top:10px;
        text-decoration: underline;
    }
    .modal-subname{
        font-size: 16px;
        margin-top:10px;
        font-weight: 600;
        font-variant: small-caps;
        opacity:75%;
        font-family: "Roboto", sans-serif;
    }
    .modal-section{
        margin-top:20px;
        font-size: 16px;
        font-family: "Roboto", sans-serif;
    }

    .modal-section p:first-child{
        margin-left:1.5em;
        font-weight: 600;
    }





    .modal-types{
        margin: 10px auto;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap:10px;

    }



    /* Modal stats */
    .modal-stats{
        height:100%;
        width: 225px;
        background-color: #555;
        border-radius: 0 20px 20px 0;
    }

    .modal-img-wrap{
        position: relative;
        width: 90%;
        height:auto;
        aspect-ratio: 1;
        border: 5px groove #444;
        margin: auto;
        border-radius: 20px;
        background-image: linear-gradient(1deg, #CCB47FFF 0%, #CCB47FFF 20%, #ffefd5ff 25%, #ffefd5ff 90%, #B1EBFFFF 100%);
    }

    .modal-img {
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        height:60%;
        z-index: 2;
    }

    .modal-img-shadow{
        position: absolute;
        bottom:30px;
        left: 50%;        
        transform: translate(-50% , 0);
        height:15px;
        width: 90px;
        border-radius: 50%;
        background-color: #444;
        box-shadow: 0 0 5px 2px #444;
        opacity: 50%;
    }

    .stats-blocks{
        position: relative;
        width: 90%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 5px;
        row-gap: 15px;
        margin:10px auto;
    }

    .ib-s{
        width:calc((180px / 3) - 5px );
        height:40px;
    }

    .ib-m{
        width:calc((180px / 2) - 5px );
        height:40px;
    }
    .ib-mt{
        width: 95px;
        height:95px;
    }

    .ib-l{
        width: 200px;
        height:40px;
    }

    .info-block{
        position: relative;
        border:2px solid #777;
        border-radius: 10px;
        background-color: #666;
        margin:auto;
        padding:0;
    }

    .info-block-value{
        position: relative;
        margin: 10px auto 0;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        font-family: "Roboto", sans-serif;
    }

    .info-block-value span{
        margin: 0 5px;    
    }

    .info-block-name{
        position: absolute;
        font-variant: small-caps;
        width:100%;
        text-align: center;
        top:-3px;
        left:50%;
        transform: translate(-50%, 0);
        font-size: 12px;
        font-weight: 800;
        opacity: 50%;
    }

</style>