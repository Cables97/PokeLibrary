<template>
    <div class="nav">

        <nav class="nav-bar">
            <input type="text" name="search-bar" id="search-bar" class="search-bar" placeholder="Pokemon Search...">
        </nav>

        <div class="nav-btns">

            <div name="typeSelect" id="typeSelect" class="dropdownBox" @click="isOpenType=true" @mouseout="isOpenType=false">

                <div class="select-top-line" @mouseover="isOpenType=true">
                    <p>Type</p>
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
                    <p>Main Stat</p>
                    <p>▼</p>
                </div>

                <div class="select-btns" v-if="isOpenStat"  @mouseover="isOpenStat=true" @mouseout="isOpenStat=false">

                    <div v-for="stat in this.statList" class="type-btn base-btn" :class="{'active' : stateStorage.filterStatList.includes(stat)},  stat" @click="filterStat(stat)">
                        <p>{{ this.computedStats(stat) }}</p>
                    </div>

                </div>

            </div>

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

            <input type="checkbox" name="Babies" id="baby">
            <input type="checkbox" name="Legendarys" id="legendary">
        </div>
        
        <div class="filter-btn-box">
            <div v-for="types in stateStorage.filterTypeList" class="filter-btn" @click="filterType(types)"><p>{{ types }}</p><p>✖</p></div>
            <div v-for="stat in stateStorage.filterStatList" class="filter-btn"  @click="filterStat(stat)"><p>{{ stat }}</p><p>✖</p></div>
            <div v-for="gen in stateStorage.filterGenList" class="filter-btn" @click="filterGen(gen)"><p>Generation {{ gen }}</p><p>✖</p></div>

            <div class="reset filter-btn" v-if="isResetAll" @click="resetAll"><p>Reset Filters</p><p>✖</p></div>
        </div>

        <div class="caught-count" >
            <p >{{ stateStorage.caughtList.length }} / 1025</p>
        </div>

    </div>

</template>

<script>
import { stateStorage } from './dataStorage'

export default {
    
    data() {
        return {
            stateStorage,

            typeList: ["bug","dark","dragon","electric","fairy","fighting","fire","flying","ghost","grass","ground","ice","normal","poison","psychic","rock","steel","water"],
            isOpenType: false,

            statList: ["hp","attack","defense","special-attack","special-defense","speed"],
            isOpenStat: false,

            genList: ["I","II","III","IV","V","VI","VII","VIII","IX",],
            isOpenGen: false,
            
            eggList: [],
            filterEggGroups: [],
            isOpenEggs: false,

            isBabies: false,
            isLegendary: false,
        };
    },

    methods: {
        //filter methods
        filterType(type) {   
                console.log(type + " toggled")
                this.isActive
                if(!stateStorage.filterTypeList.includes(type)){
                    stateStorage.filterTypeList.push(type)
                }else{
                    stateStorage.filterTypeList.splice(stateStorage.filterTypeList.indexOf(type), 1);
            }
        },
        filterStat(stat) {
            
            this.isActive
                console.log(stat + " toggled")
                if(!stateStorage.filterStatList.includes(stat)){
                    stateStorage.filterStatList.push(stat)
                }else{
                    stateStorage.filterStatList.splice(stateStorage.filterStatList.indexOf(stat), 1);
                }


            console.log(stateStorage.filterStatList)
        },
        filterGen(gen) {
            
                this.isActive
                console.log(gen + " toggled")
                if(!stateStorage.filterGenList.includes(gen)){
                    stateStorage.filterGenList.push(gen)
                }else{
                    stateStorage.filterGenList.splice(stateStorage.filterGenList.indexOf(gen), 1);
                
            }
        },
        filterEggGroup(group) {
            
                this.isActive
                console.log(gen + "toggled")
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
        }

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

    },
    created() {
    },
}
</script>

<style>

.nav{
    position: fixed;
    width:var(--global-width);
    left:50%;
    transform: translate(-50%,0);
    top:0;
    padding: 30px;
    z-index: 99;
    background-color: #222;
}

.nav-bar{
    margin:auto;
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom:15px;
}

.search-bar{
    width:100%;
    font-size: 24px;
    padding:10px 20px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    border-radius: 10px;
}

.nav-btns{

    width:70%;
    margin:auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.dropdownBox{
    position: relative;
    background-color: #444;
    width:200px;
    border-radius: 15px;
    text-wrap: none;
}

.select-top-line{
    width:100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 20px;
    padding:10px;
}

.select-btns{
    width:calc((70px + 20px)* 3);
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
    background-color: #444;
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
    background-color: #333;
    gap:20px;
}

.filter-btn:hover{
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, .25);
    cursor: default;
}

.filter-btn p{
    text-transform: capitalize;
}

.filter-btn p:hover{
    cursor: default;
}


.caught-count{
    position: absolute;
    right:100px;
    bottom:50px;
}


</style>