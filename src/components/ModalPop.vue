<template>

    <Transition>
        <div class="modal-loading" v-if="this.isLoadingModal">
            <img src="./icons/Pokemon-Pokeball-PNG-HD-Image.png" alt="">
        </div>
    </Transition>


    <div class="modal-wrapper-desk" v-if="!this.isLoadingModal">

        <div class="modal-close-btns" :class="{ 'm-c-b-raise' : !this.isLoadingModal }">
            <button class="pokeball-btn corner-btn" @click.stop.prevent="pushToCaught(pokemon)" ><img :class="{'not-caught' : !stateStorage.caughtList.includes(this.currentPokemon.name)}"  src="./icons/pokeball_active.png" alt=""></button>
            <button class="star-btn corner-btn" @click.stop.prevent="pushToFavorites(pokemon)" :class="{'favourite' : stateStorage.favouriteList.includes(this.currentPokemon.name)}">&#9733</button>
            <button class="star-btn corner-btn" @click="stateStorage.modalOpen = false">&#x2715;</button>
        </div>

        <div class="modal-content">
            
            <div class="modal-text">
                <div class="modal-topline">
                    <h3 class="modal-id">ID: {{ this.currentPokemon["id"] }}    <span v-if="stateStorage.favouriteList.includes(currentPokemon.name)">&#9733</span></h3>
                    <img v-if="stateStorage.caughtList.includes(currentPokemon.name)"  src="./icons/pokeball_active.png" alt="This pokemon has been caught" />
                </div>
                
                <h1 class="modal-name">{{ this.currentPokemon["name"] }}</h1>
                <h3 class="modal-subname">{{ this.currPokeSpecies["genera"][7]["genus"] }}</h3>

                <div class="modal-section flavor">
                    <p>{{ this.currPokeSpecies.flavor_text_entries[2].flavor_text }}</p>
                </div>


                <div class="modal-section abilities" v-for="ability in this.enAbilities" :key="ability">
                    <p class="ability-name">{{ ability["name"] }}:</p>
                    <p class="ability-text">{{ ability["flavorText"] }}</p>
                    <div class="hover-text">
                        <p class="ability-name">{{ ability["name"] }}:</p>
                        <p class="ability-text">{{ ability["effect"] }}</p>
                    </div>
                </div>


            </div>

            <div class="modal-stats">
                <div class="modal-tags">
                    <div class="modal-tag mt-baby" v-if="this.currPokeSpecies.is_baby"><img src="./icons/egg.svg" class="mt-img" /><p>Baby</p></div>
                    <div class="modal-tag mt-legend" v-if="this.currPokeSpecies.is_legendary"><img src="./icons/star.svg" class="mt-img" /><p>Legendary</p></div>
                    <div class="modal-tag mt-mythic" v-if="this.currPokeSpecies.is_mythical"><img src="./icons/sparkle.svg" class="mt-img" /><p>Mythical</p></div>
                </div>

                <div class="modal-img-wrap">
                     <img :src='this.currentPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default || pokemon.sprites.front_default' onerror="this.src=''" class="modal-img" :alt="this.currentPokemon.name">
                     <div class="modal-img-shadow"></div>
                     <div class="modal-img-cry" @click="playCry()"><img src="./icons/icons8-audio-wave-50.png" alt=""></div>
                </div>

                <div class="modal-types">
                    <div v-for="type in this.currentPokemon.types" :key="type.type.name" :class="type.type.name" class="type-btn">
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
                        <p class="info-block-name">Max XP - lvl 100</p>
                    </div>

                    
                    <div class="info-block ib-l" >
                        <p class="info-block-value"><span v-for="group in this.currPokeSpecies.egg_groups">{{ group.name }}</span></p>
                        <p class="info-block-name">Egg Groups</p>
                    </div>

                    <div class="info-block ib-lt" v-if="this.currPokeSpecies.evolves_from_species" >
                        <p class="info-block-info">{{ this.currPokeSpecies["evolves_from_species"]["name"] }}</p>
                        <img v-if="!this.missingEvo" :src="this.evolvesFrom" alt="" @click="switchPokemon(this.currPokeSpecies.evolves_from_species.name)">
                        <img v-if="this.missingEvo" src="./icons/Missingno_RB.png" alt="" @click="switchPokemon(this.currPokeSpecies.evolves_from_species.name)">
                        <p class="info-block-name">Evolves From:</p>
                    </div>

                    <div class="info-block ib-l" >
                        <p class="info-block-value">Generation <span class="cap">{{this.firstAppearance}}</span></p>
                        <p class="info-block-name">First Appearance:</p>
                    </div>

                 </div>
            </div>
        </div>
    </div>

    <div class="modal-wrapper-mobile" v-if="!isLoadingModal">
        <div class="m-modal-content">

            <div class="m-modal-img" @click="playCry()">
                
                <img :src='this.currentPokemon.sprites.versions["generation-v"]["black-white"].animated.front_default || pokemon.sprites.front_default' onerror="this.src=''" class="modal-img" :alt="this.currentPokemon.name">
                <div class="modal-img-shadow"></div>
                <div class="modal-img-st"><p>Shiny</p></div>
                
            </div>

            <div class="modal-topline">
                    <h3 class="modal-id">ID: {{ this.currentPokemon["id"] }}    <span v-if="stateStorage.favouriteList.includes(currentPokemon.name)">&#9733</span></h3>
                    <img v-if="stateStorage.caughtList.includes(currentPokemon.name)"  src="../assets/pokeball_active.png" alt="This pokemon has been caught" />
                </div>
                
                <h1 class="modal-name">{{ this.currentPokemon["name"] }}</h1>
                <h3 class="modal-subname">{{ this.currPokeSpecies["genera"][7]["genus"] }}</h3>

                <div class="modal-types">
                    <div v-for="type in this.currentPokemon.types" :key="type.type.name" :class="type.type.name" class="type-btn">
                        <p>{{ type.type.name }}</p>
                    </div>
                </div>


                <div class="m-flavor">
                    <p>Pokedex Entry:</p>
                    <p>{{ this.currPokeSpecies.flavor_text_entries[2].flavor_text }}</p>
                </div>

                <div class="m-stats">
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
                </div>
        </div>
    </div>


</template>

<script>
  import { stateStorage , saveLists , loadLists } from './dataStorage'

    export default {
    data() {
        return {
            stateStorage,
            currentPokemon: stateStorage.currentPokemon,
            currPokeSpecies: {},
            currPokeGrowthInfo: {},

            isLoadingModal: true,

            abilityList: [],
            abilities: [],

            no_damage_to: [],
            half_damage_to:[],
            double_damage_to: [],

            no_damage_from:[],
            half_damage_from: [],
            double_damage_from: [],
            
            missingEvo:false,

        };
    },

    methods: {

        async fetchPokeDex() {
            console.log('fetch pokemon info');
            console.log(this.currentPokemon["name"]);
            this.abilityList=[]


            const species = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + this.currentPokemon["name"])
            const specData = await species.json()
                  this.currPokeSpecies = specData

            const growthRate = await fetch (this.currPokeSpecies["growth_rate"]["url"])
            const gRData = await growthRate.json()
                  this.currPokeGrowthInfo = gRData

            this.currentPokemon.abilities.forEach(ability => {
                fetch(ability["ability"]["url"])
                    .then(response => response.json())
                    .then(data => this.abilityList.push(data));
            })
            
            this.currentPokemon.types.forEach(type => {
                fetch("https://pokeapi.co/api/v2/type/" + type.type.name)
                    .then(response => response.json())
                    .then(data => {
                        data["damage_relations"]["no_damage_to"].forEach(element => {
                            this.no_damage_to.push(element["name"])
                        })

                        data["damage_relations"]["half_damage_to"].forEach(element => {
                        this.half_damage_to.push(element["name"])
                        })

                        data["damage_relations"]["double_damage_from"].forEach(element => {
                            this.double_damage_from.push(element["name"])
                        })

                        data["damage_relations"]["no_damage_from"].forEach(element => {
                            this.no_damage_from.push(element["name"])
                        })

                        data["damage_relations"]["half_damage_from"].forEach(element => {
                        this.half_damage_from.push(element["name"])
                        })

                        data["damage_relations"]["double_damage_to"].forEach(element => {
                            this.double_damage_to.push(element["name"])
                        })
                    })
            })

        },

        playCry(){
            var audio = new Audio(this.currentPokemon.cries.latest);
            audio.play();   
        },

        switchPokemon(pokeName){
            if(!this.missingEvo){
                const pokeObj = stateStorage.masterList.find(item => item.name === pokeName);
                this.currentPokemon = pokeObj
                this.fetchPokeDex()
            }
            else{
                console.log("error: Pokemon pre-evolution is missing.")
            }

        },

        pushToFavorites(){
          let pokeName = this.currentPokemon["name"]
          console.log(pokeName + " Favourited!")
            if(!stateStorage.favouriteList.includes(pokeName)){
              stateStorage.favouriteList.push(pokeName)
            }else{
                stateStorage.favouriteList.splice(stateStorage.favouriteList.indexOf(pokeName), 1)
            }
            saveLists()

        },

        pushToCaught(){
          let pokeName = this.currentPokemon["name"]
          console.log(pokeName + "  Caught!")
            if(!stateStorage.caughtList.includes(pokeName)){
              stateStorage.caughtList.push(pokeName)
            }else{
                stateStorage.caughtList.splice(stateStorage.caughtList.indexOf(pokeName), 1)
            }
            saveLists()
        },
    },
    computed: {
        enAbilities() { // abilitys are sent with multiple languages, need to return english only
            //for each ability 
            this.abilities=[]
            console.log(this.abilityList)
            console.log("ability")
            this.abilityList.forEach(ability => {
                let abilityObj = {
                    "name": "",
                    "flavorText": "",
                    "effect": "",
                }

                abilityObj["name"] = ability.name.replace(/-/g, ' ')
                
                for (let i = 0; i < ability["effect_entries"].length; i++) {
                     // Check if the current element matches the value
                    if (ability["effect_entries"][i]["language"]["name"] === "en") {
                        abilityObj["effect"] = ability["effect_entries"][i]["effect"]
                    }
                }
                
                for (let i = 0; i < ability["flavor_text_entries"].length; i++) {
                     // Check if the current element matches the value
                    if (ability["flavor_text_entries"][i]["language"]["name"] === "en") {
                        abilityObj["flavorText"] = ability["flavor_text_entries"][i]["flavor_text"]
                    }
                }

                console.log(abilityObj["name"])
                console.log(abilityObj["flavorText"])
                console.log(abilityObj["effect"])
                this.abilities.push(abilityObj)
                return
            })
            //find name
            //find first effect-entry with english 
            
            console.log(this.abilities)
            return this.abilities
        },
        firstAppearance() {
            let replace = this.currPokeSpecies.generation.name.replace(/generation-/gi, "")
            return replace
        },
        evolvesFrom(){
            let pre = this.currPokeSpecies["evolves_from_species"]["name"]
            let find = stateStorage.masterList.findIndex((element) => element.name == pre)
            console.log()
            if(find > -1){
                this.missingEvo = false
                return stateStorage.masterList[find].sprites.front_default
            }else{
                return this.missingEvo = true
            }

        }
    },
    beforeMount() {
        this.fetchPokeDex();
    },
    mounted() {
        setTimeout(() => {
            this.isLoadingModal = false;
        }, 750);
    },
    beforeUpdate(){
        //this.isLoadingModal = true;
    },
    updated(){
        setTimeout(() => {
            this.isLoadingModal = false;
        }, 750);
    }
}
</script>

<style >
    .modal-wrapper-mobile{
        position: absolute;
        top:50%;
        left:50%;
        margin-top:100px;
        height:calc(80% - 50px);
        width:90%;
        transform: translate(-50%,-50%);
        background-color: var(--modal-background);
        border-radius: 20px;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5),0 0 20px 20px rgba(0, 0, 0, 0.25);
        z-index: 12;
    }

    .m-modal-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:20px;
        height:100%;
    }

    .m-modal-img{
        position: absolute;
        top:-60px;
        left:50%;
        transform: translate(-50%,-50%);
        width: 160px;
        height:auto;
        aspect-ratio: 1;
        border: 5px groove #444;
        margin: auto;
        border-radius: 40px;
        background-image: linear-gradient(1deg, #CCB47FFF 0%, #CCB47FFF 20%, #ffefd5ff 25%, #ffefd5ff 90%, #B1EBFFFF 100%);
        -webkit-appearance: none;
    }

    .m-modal-img  .modal-img {
        height:80%;
    }

    .m-stats{
        position: relative;
        width: 90%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 5px;
        row-gap: 10px;
    }

    .m-flavor{
        position: relative;
        margin:10px 0;
        padding:10px;
        border-radius:10px;
        background-color: #555;
        text-align: center;
    }
    .m-flavor p:first-child{
        font-size:18px;
        font-weight: 600;
    }

    /*  */
    .modal-wrapper-desk{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        z-index: 20;
    }

    .modal-close-btns{
       position: absolute;
       right:0;
       top:-50px;
       height: 60px;
       background-color: var(--stat-background);
       border-radius: 10px 10px 0 0 ;
       border:2px solid #333;
       z-index:-1;
       display: flex;
       flex-direction: row;
       align-items: center;
       gap:12px;
       padding:0 12px 10px ;
       transition: all 5s;
       transform: translate(0, 50px);
    }

    .m-c-b-raise{
    animation: raise .67s ease-out forwards;
    }

    @keyframes raise {
        10%{
            transform: translate(0, 50px);
        }

        100% {
            transform: translate(0, 0);
        }
    }

     /* Modal loading */
    .modal-loading{
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        display:grid;
        z-index: 99999;
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
        gap:20px;
        padding:20px;
        justify-content: space-between;
        height:100%;
        background-color: var(--modal-background);
        border-radius: 20px;
        border:2px solid #333;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5),0 0 20px 20px rgba(0, 0, 0, 0.25);
        z-index: 1239;
    }

    /* Modal Info */
    .modal-topline{
        position: relative;
        display: flex;
        height:24px;
        flex-direction: row;
        align-items: center;
        gap:20px;
    }

    .modal-id{
        font-size: 16px;
    }
    .modal-id span{
        font-size: 26px;
        filter: brightness(200%);
        color:gold;
    }

    .modal-name{
        font-size: 60px;
        font-variant: small-caps;
        font-family: var(--text-font);
        line-height: 42px;
        margin-top:10px;
        text-decoration: underline;
    }

    .modal-subname{
        font-size: 16px;
        margin-top:10px;
        font-weight: 600;
        font-variant: small-caps;
        font-style: italic;
        letter-spacing: 1px;
        opacity:75%;
        font-family: var(--text-font);
    }

    /* Text Sections */

    .modal-section{
        position: relative;
        margin-top:10px;
        padding:10px;
        border-radius:10px 0 0 10px;
        background-color: #555;
    }

    .flavor{
        margin-bottom: 20px;
    }

    .ability-name{
        margin-left:1em;
        font-size: 1.25em;
        font-weight: 500;
        font-family: var(--text-font);
        text-transform: capitalize;
        text-decoration: underline;
    }

    .ability-text{
        font-size: 1em;
        font-weight: 400;
        font-family: var(--text-font);
    }

    .modal-section:hover .hover-text{
        display: inherit;

    }

    .hover-text{
        display: none;
        position: absolute;
        bottom:-75%;
        left:20px;
        padding:10px;
        background-color: #333;
        border-radius: 10px;
        box-shadow: 5px 3px 5px 5px #222;
        z-index: 10;
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
    .stats-blocks{
        position: relative;
        width: 90%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: 5px;
        row-gap: 10px;
        margin:20px auto;
    }
    .cap{
        text-transform: uppercase;
    }


/* Modal Img + Cry */
    .modal-img-wrap{
        position: relative;
        width: 90%;
        height:auto;
        aspect-ratio: 1;
        border: 5px groove #444;
        margin: auto;
        border-radius: 20px;
        background-image: linear-gradient(1deg, #CCB47FFF 0%, #CCB47FFF 20%, #ffefd5ff 25%, #ffefd5ff 90%, #B1EBFFFF 100%);
        -webkit-appearance: none;
    }

    .modal-img-cry{
        position: absolute;
        top:2px;
        left:2px;
        height: 30px;
        width: 30px;
        background-color: #666;
        border:2px solid #777;
        border-radius: 50%;
    }

    .modal-img-cry:hover{
        cursor: pointer;
        filter: brightness(70%);
    }
    .modal-img-cry img{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        filter: invert(100%);
        height: 24px;
        width: 24px;
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
    

    /* ~~Reused~~ */

/* Pokemon Tags */
    .modal-tags{
        display:flex;
        flex-direction: row;
        width:90%;
        margin:5px auto;
    }

    .mt-img{
        padding:0;
        margin:0;
        height:20px;
        fill: red;
    }
    .modal-tag{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-radius: 20px;
        padding:3px 8px;
        border-radius: 10px 5px 5px 5px;
        box-shadow: 0 0 4px 2px rgba(0, 0, 0, .50) inset;
        background-image: linear-gradient(180deg, rgba(0,0,0,0%), rgba(0,0,0,25%));
    }
    .modal-tag p{
        margin-left:5px;
        text-align: center;
        vertical-align: middle;
        font-family: var(--text-font);
        font-weight: 600;
        letter-spacing: 1px;
        line-height: 28px;
        font-size: 14px;
        color: white;
        text-transform:uppercase;
        text-shadow: 1px 1px 1px black;
    }
    .mt-mythic{
        background-color: #ca9bf7;
    }
    .mt-legend{
        background-color: #e7d194;
    }
    .mt-baby{
        background-color: #89CFC0;
    }
/* Stat Blocks */
    .ib-xs{
        width:calc((100% / 6) - 5px );
        height:40px;
    }

    .ib-s{
        width:calc((100% / 3) - 5px );
        height:40px;
    }

    .ib-m{
        width:calc((100% / 2) - 5px );
        height:40px;
    }
    .ib-lt{
        width:200px;
        height:100px;
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

    .info-block > img{
        position: absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
    }


    .info-block-value{
        position: relative;
        margin: 10px auto 0;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        font-family: var(--text-font);
    }

    .info-block-value span{
        display: inline-block;
        margin: 0 5px; 
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        font-family: var(--text-font);
        text-transform: capitalize;
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

    .info-block-info{
        position: absolute;
        font-variant: small-caps;
        width:100%;
        text-align: center;
        bottom:-3px;
        left:50%;
        transform: translate(-50%, 0);
        font-size: 16px;
        font-weight: 600;
        opacity: 50%;
    }




/* Mobile- */
@media only screen and (max-width: 600px) {
 .modal-wrapper-mobile{
    display:inherit;
 }
 .modal-wrapper-desk{
    display:none;
 }

}
/* Mobile+ */
@media only screen and (min-width: 600px) {
    .modal-wrapper-desk{
        height:800px;
        width:600px;
    }
    .modal-loading{
        height:800px;
        width:600px;
    }

        
    .modal-wrapper{
        display:inherit;
    }
    .modal-wrapper-mobile{
        display:none;
    }

}


/* Tablet */
@media only screen and (min-width: 768px) {
    .modal-wrapper-desk{
        height:800px;
        width:600px;
    }
    .modal-loading{
        height:800px;
        width:600px;
    }

    .modal-name{
        font-size: 50px;

    }
        
    .modal-wrapper{
        display:inherit;
    }
    .modal-wrapper-mobile{
        display:none;
    }

}

/* Desktop */
@media only screen and (min-width: 1200px) {
    .modal-wrapper-desk{
        height:800px;
        width:600px;
    }
    .modal-loading{
        height:800px;
        width:600px;
    }
    .modal-wrapper{
        display:inherit;
    }
    .modal-wrapper-mobile{
        display:none;
    }
}

</style>