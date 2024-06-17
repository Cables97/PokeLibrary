<template>
    <div class="nav">
        
        <nav class="nav-bar">
            <!--<button class="top-btn">Team</button>-->
            <input type="text" name="search-bar" @input="getInput()" id="search-bar" class="search-bar" placeholder="Pokemon Search...">
            <button class="top-btn filter-open-btn" @click="mobileFilterToggle()"><img src="./icons/filter.png" alt=""></button>
        </nav>

        <div class="nav-btns">

            <div name="typeSelect" id="typeSelect" class="dropdownBox" @click="isOpenType=true" @mouseout="isOpenType=false">

                <div class="select-top-line" @mouseover="isOpenType=true">
                    <p>{{ this.activeTypeFilter }}</p>
                    <p>▼</p>
                </div>

                <div class="select-btns" v-if="isOpenType"  @mouseover="isOpenType=true" @mouseout="isOpenType=false">

                    <div v-for="types in this.typeList" class="type-btn base-btn" :class="{'active' : stateStorage.filterTypeList.includes(types)},  types.toLowerCase() " @click="filterType(types)">
                        <p>{{ types }}</p>
                    </div>

                </div>

            </div>

            <div name="statSelect" id="statSelect" class="dropdownBox" @click="isOpenStat=true" @mouseout="isOpenStat=false">

                <div class="select-top-line" @mouseover="isOpenStat=true">
                    <p>{{ this.activeStatFilter }}</p>
                    <p>▼</p>
                </div>

                <div class="select-btns" v-if="isOpenStat"  @mouseover="isOpenStat=true" @mouseout="isOpenStat=false">

                    <div v-for="stat in this.statList" class="type-btn base-btn" :class="{'active' : stateStorage.filterStatList.includes(stat)},  stat" @click="filterStat(stat)">
                        <p>{{ this.computedStats(stat) }}</p>
                    </div>

                </div>

            </div>
                <!--
            <div name="genSelect" id="genSelect" class="dropdownBox" @click="isOpenGen=true" @mouseout="isOpenGen=false">

                <div class="select-top-line" @mouseover="isOpenGen=true">
                    <p>Generation</p>
                    <p>▼</p>
                </div>

                <div class="select-btns" v-if="isOpenGen"  @mouseover="isOpenGen=true" @mouseout="isOpenGen=false">
                    <div v-for="gen in this.genList" class="type-btn wide-btn base-btn" :class="{'active' : stateStorage.filterGenList.includes(gen)}, gen" @click="filterGen(gen)">
                        <p >Generation {{ gen }}</p>
                    </div>
                </div>

            </div>
                -->

            <button class="check-btn" @click="caughtFilterToggle()">
                <div><p v-if="stateStorage.filterCaught">&#x1F5F8;</p><p v-if="!stateStorage.filterCaught">&#160;</p> </div>
                <p>Caught</p>
            </button>

            <button class="check-btn" @click="favFilterToggle()">
                <div><p v-if="stateStorage.filterFavorite">&#x1F5F8;</p><p v-if="!stateStorage.filterFavorite">&#160;</p> </div>
                <p>Favorite</p>
            </button>

        </div>
        <!--
        <div class="filter-btn-box">
            <div v-for="types in stateStorage.filterTypeList" class="filter-btn" @click="filterType(types)"><p>{{ types }}</p><p>✖</p></div>
            <div v-for="stat in stateStorage.filterStatList" class="filter-btn"  @click="filterStat(stat)"><p>{{ stat }}</p><p>✖</p></div>
            <div v-for="gen in stateStorage.filterGenList" class="filter-btn" @click="filterGen(gen)"><p>Generation {{ gen }}</p><p>✖</p></div>

            <div class="reset filter-btn" v-if="isResetAll" @click="resetAll"><p>Reset Filters</p><p>✖</p></div>
        </div>
        -->
        <div class="caught-count" >
            <p>You've Caught: {{ stateStorage.caughtList.length }} / {{ stateStorage.masterList.length }}</p>
        </div>

    </div>

    <div class="mobile-filter-wrapper" v-if="this.isMobileModalOpen">
        

        <div class="filter-container">
            <button class="m-nav-close" @click="mobileFilterToggle()">&#11436;</button>

            <h2>Filters:</h2>

            <h4>Type:</h4>
            <div class="m-select-btns" @mouseover="isOpenType=true" @mouseout="isOpenType=false">
                <div v-for="types in this.typeList" class="type-btn base-btn" :class="{'active' : stateStorage.filterTypeList.includes(types)},  types.toLowerCase() " @click="filterType(types)">
                    <p>{{ types }}</p>
                </div>
            </div>

            <h4>Stat:</h4>
            <div class="m-select-btns"  @mouseover="isOpenStat=true" @mouseout="isOpenStat=false">
                <div v-for="stat in this.statList" class="type-btn base-btn" :class="{'active' : stateStorage.filterStatList.includes(stat)},  stat" @click="filterStat(stat)">
                    <p>{{ this.computedStats(stat) }}</p>
                </div>
            </div>

            <h4>First Appearance: </h4>
            <div class="m-select-btns" @mouseover="isOpenGen=true" @mouseout="isOpenGen=false">
                <div v-for="gen in this.genList" class="type-btn wide-btn base-btn" :class="{'active' : stateStorage.filterGenList.includes(gen)}, gen" @click="filterGen(gen)">
                    <p >Generation {{ gen }}</p>
                </div>
            </div>

        </div>
        
        <div class="mf-bg" @click="mobileFilterToggle()"></div>
    </div>
</template>

<script>
import { stateStorage, popUp } from './dataStorage'

export default {
    
    data() {
        return {
            stateStorage,

            typeList: ["bug","dark","dragon","electric","fairy","fighting","fire","flying","ghost","grass","ground","ice","normal","poison","psychic","rock","steel","water"],
            isOpenType: false,

            statList: ["hp","attack","defense","special-attack","special-defense","speed"],
            isOpenStat: false,

            genList: ["I","II","III","IV","V","VI","VII","VIII","IX",],
            isOpenGen: true,
            
            eggList: [],
            filterEggGroups: [],
            isOpenEggs: false,

            isBabies: false,
            isLegendary: false,

            isMobileModalOpen: false,

        };
    },

    methods: {
        //filter methods
        filterType(type) {   
                this.isActive
                if(!stateStorage.filterTypeList.includes(type)){
                    popUp("Added " + type + " to filters!")
                    stateStorage.filterTypeList.push(type)
                }else{
                    popUp("Removed " + stat + " to filters!")
                    stateStorage.filterTypeList.splice(stateStorage.filterTypeList.indexOf(type), 1);
            }
        },
        filterStat(stat) {
            this.isActive
                if(!stateStorage.filterStatList.includes(stat)){
                    popUp("Added " + stat + " to filters!")
                    stateStorage.filterStatList.push(stat)
                }else{
                    popUp("Removed " + stat + " to filters!")
                    stateStorage.filterStatList.splice(stateStorage.filterStatList.indexOf(stat), 1);
                }
        },
        filterGen(gen) {
            
                this.isActive
                if(!stateStorage.filterGenList.includes(gen)){
                    popUp("Added " + gen + " to filters!")
                    stateStorage.filterGenList.push(gen)
                }else{
                    popUp("Removed " + stat + " to filters!")
                    stateStorage.filterGenList.splice(stateStorage.filterGenList.indexOf(gen), 1);
                
            }
        },
        filterEggGroup(group) {
            
                this.isActive
                if(!this.filterEggList.includes(gen)){
                    this.filterEggList.push(gen)
                }else{
                    this.filterEggList.splice(this.filterEggList.indexOf(gen), 1);
                }
            
        },
        //reset
        resetAll(){
            stateStorage.filterTypeList = []
            stateStorage.filterStatList = []
            stateStorage.filterGenList = []
        },
        computedStats(stat){
            switch(stat){
                case "hp":
                case "attack":
                case "defense":
                case "speed":
                    return stat
                break
                case "special-attack":
                    return "sp.atk"    
                break
                case "special-defense":
                    return "sp.def"
                break
                default:
                break
            }
        },
        mobileFilterToggle(){
            if(this.isMobileModalOpen){
                this.isMobileModalOpen = false
            }else {
                this.isMobileModalOpen = true
            }
        },
        caughtFilterToggle(){
            popUp("Caught filter toggled!")
            if(stateStorage.filterCaught){
                stateStorage.filterCaught = false
                
            } else { 
                stateStorage.filterCaught = true}
        },
        favFilterToggle(){
            popUp("Favorited filter toggled!")
            if(stateStorage.filterFavorite){
                stateStorage.filterFavorite = false
            } else { 
                stateStorage.filterFavorite = true}
        },
        getInput(){
            stateStorage.searchQuery = event.target.value.toLowerCase()
        },

    },
    computed: {
        isResetAll(){
            if(stateStorage.filterTypeList.length > 0 || stateStorage.filterStatList.length > 0 || stateStorage.filterGenList.length > 0){
                return true
            }
        },
        isOpen(){
            if(this.isOpenType){
                return  true
            }
        },
        activeTypeFilter(){
            let filter = stateStorage.filterTypeList.length
            let output = ''

            if(filter == 0){
                output = "Type Filter"
            } else{
                if(filter == 1){
                    output = stateStorage.filterTypeList[0]
                }
                else{
                    output = stateStorage.filterTypeList[0] + ", " + stateStorage.filterTypeList[1] +", ..."
                }
            }
            return output
        },
        activeStatFilter(){
            let filter = stateStorage.filterStatList.length
            let output = ''

            if(filter == 0){
                output = "Stat Filter"
            } else{
                if(filter == 1){
                    output = stateStorage.filterStatList[0]
                }
                else{
                    output = stateStorage.filterStatList[0]  +"..."
                }
            }
            return output
        }


    },
    created() {
    },
    
}
</script>

<style>

.mobile-filter-wrapper{
    position: fixed;
    top:0;
    left:0;
    height:100%;
    width:100vw;
    z-index: 9999999;
}
.m-nav-close{
    position: absolute;
    top:20px;
    right:20px;
    height: 40px;
    width:40px;
    border-radius: 20px;
    border:none;
    background: none;
    font-size: 24px;
    color: var(--text-light);
}


.filter-container{
    position: absolute;
    top:0;
    right:0;
    height:100%;
    width:320px;
    background-color: var(--modal-background);
    padding:20px;
    border-radius: 20px 0 0 20px;
    box-shadow: -2px -2px 2px 2px rgba(0, 0, 0, 0.5),0 0 20px 20px rgba(0, 0, 0, 0.25);
    z-index: 9999999;
}

.mf-bg{
    position: absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.m-select-btns{
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap:10px 0px;
    padding: 5px 5px;
    z-index:10;
    border-radius: 15px;
    background-color: var(--modal-background);
    border:1px solid var(--stat-border)
}

.filter-container > h4{
    margin-top:10px;
}

.nav{
    position: fixed;
    left:50%;
    transform: translate(-50%,0);
    top:0;
    height:200px;
    padding: 30px;
    z-index: 999;
    width:var(--global-width);
    min-width:var(--global-min-width);
    backdrop-filter: blur(40px);
}

.nav-bar{
    margin:auto;
    width:90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom:15px;
    gap:20px;
}

.search-bar{
    width:100%;
    font-size: 24px;
    padding:10px 20px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    color:var(--text-light);
    border-radius: 0 0 0 10px;
    background-color: transparent;
    border:none;
    border-left:1px solid var(--text-main);
    border-bottom: 1px solid var(--text-main);
}

.search-bar:focus{
    outline:1px solid  var(--text-main);
}
.search-bar::placeholder{
    color:  var(--text-light)
}

.nav-btns{
    width:60%;
    margin:auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.dropdownBox{
    position: relative;
    background-color: var(--modal-background);
    width:400px;
    border-radius: 15px;
    text-wrap: none;
    border: 2px solid var(--stat-border);
    font-family: var(--text-font);
    text-transform: capitalize;
}

.select-top-line{
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 20px;
    padding:10px;
    text-wrap: none;
}

.select-btns{
    width:calc((70px + 30px)* 3);
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap:10px 0px;
    padding: 5px 10px;
    position:absolute;
    top:40px;
    left:10px;
    z-index:10;
    border-radius: 20px;
    background-color: var(--modal-background);
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5),0 0 20px 20px rgba(0, 0, 0, 0.25) ;
    border:1px solid #555;
}

.active{
    color:red;
    text-decoration: underline;
    filter: grayscale(100%);
}

.filter-btn-box{
    display: flex;
    width:60%;
    margin:auto;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    gap:10px;
    margin-top:10px;
}

.filter-btn{
    padding:5px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 10px;
    background-color: var(--card-background);
    gap:20px;
}

.filter-btn:hover{
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, .25);
    cursor: pointer;
}

.filter-btn p{
    text-transform: capitalize;
    pointer-events: none;
}

.filter-btn p:hover{
    cursor: default;
}

.check-btn{
    height: 44px;
    width:60px;
    background-color: var(--modal-background);
    border-radius: 15px;
    border:none;
    border: 2px solid var(--stat-border);
}
.check-btn > div{
    position: relative;
    background-color:var(--stat-border);
    border-radius: 5px;
    width:20px;
    height:16px;
    margin:auto;
}
.check-btn > div > p{
    position: absolute;
    top:45%;
    left:60%;
    transform: translate(-50%,-50%);
    font-size: 42px;
    margin:auto;
}

.check-btn > p{
    color:var(--text-main);
    font-size: 12px;
    font-family: var(--text-font);
}

.caught-count{
    position: absolute;
    right:100px;
    bottom:10px;
    font-family: var(--text-font);
}

.filter-open-btn{
    border:none;
    background: none;
}

.filter-open-btn img{
    filter: invert(80%);
}


/* Mobile- */
@media only screen and (max-width: 600px) {

    .nav{
        height:120px;
        padding:30px 10px;
    }

    .nav-btns{
        display: none;
    }
 
    .filter-btn-box{
        display: flex;
        width:100%;
        gap:10px;
        margin-top:10px;
    }
    .filter-btn{
        padding:5px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        border-radius: 10px;
        background-color: var(--card-background);
        gap:5px;
    }
}

/* Mobile+ */
@media only screen and (min-width: 600px) {
    
    .nav{
        height:120px;
        padding: 30px 10px;
    }
    .nav-btns{
        display: none;
    }
}


/* Tablet */
@media only screen and (min-width: 768px) {
    .top-btn{
        display:none
    }
    .nav{
        height:180px;
    }
    .nav-btns{
        width:70%;
        display: flex;
    }
    .dropdownBox{
        position: relative;
        background-color: var(--modal-background);
        width:170px;
        text-wrap: none;
    }
}

@media only screen and (min-width: 1000px) {
    .nav{
        height:180px;
    }
    .nav-btns{
        width:80%;
        display: flex;
    }
}

/* Desktop */
@media only screen and (min-width: 1200px) {
    .top-btn{
        display:none
    }

    .search-bar{
        width:70%;
        margin:auto;
    }

    .nav{
        height:175px;
    }
    .nav-btns{
        width:50%;
        display: flex;
    }
}


</style>