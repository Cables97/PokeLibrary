<template>

    <Transition>
        <div class="modal-loading" v-if="isLoadingModal">
            <img src="../assets/Pokemon-Pokeball-PNG-HD-Image.png" alt="">
        </div>
    </Transition>

    <div class="modal-info" v-if="!isLoadingModal">
        <div class="modal-content">
            
            <div class="modal-text">
                <div class="modal-topline">
                    <h3 class="modal-id">ID: {{ this.currentPokemon["id"] }}    <span v-if="stateStorage.favouriteList.includes(currentPokemon.name)">&#9733</span></h3>
                    <img v-if="stateStorage.caughtList.includes(currentPokemon.name)"  src="../assets/pokeball_active.png" alt="This pokemon has been caught" />
                    <button @click="switchPokemon('charizard')" >Charizard</button>
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
                     <div class="modal-img-st"><p>Shiny</p></div>
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
                        <p class="info-block-name">Max XP - lvl 100</p>
                    </div>

                    
                    <div class="info-block ib-l" >
                        <p class="info-block-value"><span v-for="group in this.currPokeSpecies.egg_groups">{{ group.name }}</span></p>
                        <p class="info-block-name">Egg Groups</p>
                    </div>

                    <div class="info-block ib-lt" >
                        <p class="info-block-info">{{ this.currPokeSpecies["evolves_from_species"]["name"] }}</p>
                        <p class="info-block-value">{{ this.currPokeSpecies["evolves_from_species"]["name"] }}</p>
                        <p class="info-block-name">Evolves From:</p>
                    </div>

                    <div class="info-block ib-l" >
                        <p class="info-block-value">{{this.currPokeGrowthInfo["levels"][99]["experience"]}}</p>
                        <p class="info-block-name">First Appearance:</p>
                    </div>

                 </div>

            </div>
        </div>
    </div>


</template>

<script>
  import { stateStorage } from './dataStorage'

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
            

        };
    },

    methods: {

        async fetchPokeDex() {
            console.log('fetch pokemon info');
            console.log(this.currentPokemon["name"]);

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
            console.log(this.weakVs)

        },

        playCry(){
            var audio = new Audio(this.currentPokemon.cries.latest);
            audio.play();   
        },

        switchPokemon(pokeName){
            const pokeObj = stateStorage.masterList.find(item => item.name === pokeName);
            this.currentPokemon = pokeObj
        },

    },
    computed: {
        enAbilities() { // abilitys are sent with multiple languages, need to return english only
            //for each ability 
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
}
</script>

<style scoped>
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
        gap:20px;
        padding:20px;
        justify-content: space-between;
        height:100%;
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

    .flavor p{
        
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

    /* Strength boxes */

    .str-weak{
        width:100%;
        border:1px solid red;
        display: flex;
        flex-direction: row;
        gap:10px;
    }

    .sw-side{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .sw-block{
        position: relative;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        border:2px solid #777;
        border-radius: 10px;
        background-color: #666;
        margin:auto;
        padding:0;  
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
    .modal-tag i{
    color: white;
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
    /* Stat Blocks */

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

    .ib-s{
        width:calc((180px / 3) - 5px );
        height:40px;
    }

    .ib-m{
        width:calc((180px / 2) - 5px );
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

    .info-block-value{
        position: relative;
        margin: 10px auto 0;
        font-size: 16px;
        font-weight: 600;
        text-align: center;
        font-family: var(--text-font);
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

</style>