<template>
    <div class="nav">

        <nav class="nav-bar">
            <input type="text" name="search-bar" id="search-bar" class="search-bar">
        </nav>

        <div class="nav-btns">

            <div name="typeSelect" id="typeSelect" class="dropdownBox" @click="isOpenType=true" @mouseout="isOpenType=false">

                <div class="select-top-line">
                    <p>Choose a Type to Filter</p>
                </div>

                <div class="select-btns" v-if="isOpenType"  @mouseover="isOpenType=true" @mouseout="isOpenType=false">

                    <div v-for="types in this.typeList" class="type-btn base-btn" :class="{'active' : this.filterTypeList.includes(types)},  types.toLowerCase() " @click="filterType(types)">
                        <p>{{ types }}</p>
                    </div>

                </div>

            </div>

            <div name="statSelect" id="statSelect" class="dropdownBox" @click="isOpenStat=true" @mouseout="isOpenStat=false">

                <div class="select-top-line">
                    <p>Choose a Stat to Filter</p>
                    
                </div>

                <div class="select-btns" v-if="isOpenStat"  @mouseover="isOpenStat=true" @mouseout="isOpenStat=false">

                    <div v-for="stat in this.statList" class="type-btn base-btn" :class="{'active' : this.filterStatList.includes(stat)},  stat.toLowerCase() " @click="filterStat(stat)">
                        <p>{{ stat }}</p>
                    </div>

                </div>

            </div>


            <div name="genSelect" id="genSelect" class="dropdownBox" @click="isOpenGen=true" @mouseout="isOpenGen=false">

                <div class="select-top-line">
                    <p>Choose a Gen to Filter</p>
                    
                </div>

                <div class="select-btns" v-if="isOpenGen"  @mouseover="isOpenGen=true" @mouseout="isOpenGen=false">
                    <div v-for="gen in this.genList" class="type-btn wide-btn base-btn" :class="{'active' : this.filterGenList.includes(gen)},  gen.toLowerCase() " @click="filterGen(gen)">
                        <p >Generation {{ gen }}</p>
                    </div>
                </div>

            </div>


            <button>Egg Group Filter</button>
            <input type="checkbox" name="Babies" id="baby">
            <input type="checkbox" name="Legendarys" id="legendary">
        </div>
            
            <p v-for="types in this.filterTypeList">{{ types }}</p>
            <p v-for="stat in this.filterStatList">{{ stat }}</p>
            <p v-for="gen in this.filterGenList">{{ gen }}</p>
    </div>

</template>

<script>

export default {
    data() {
        return {
            typeList: ["Bug","Dark","Dragon","Electric","Fairy","Fighting","Fire","Flying","Ghost","Grass","Ground","Ice","Normal","Poison","Psychic","Rock","Steel","Water"],
            filterTypeList:[],
            isOpenType: true,

            statList: ["HP","Attack","Defense","Sp.Atk","Sp.Def","Speed"],
            filterStatList: [],
            isOpenStat: false,

            genList: ["I","II","III","IV","V","VI","VII","VIII","IX",],
            filterGenList: [],
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
            console.log(type + "toggled")
            this.isActive
            if(!this.filterTypeList.includes(type)){
                this.filterTypeList.push(type)
            }else{
                this.filterTypeList.splice(this.filterTypeList.indexOf(type), 1);
            }

        },
        filterStat(stat) {
            console.log(stat + "toggled")
            if(!this.filterStatList.includes(stat)){
                this.filterStatList.push(stat)
            }else{
                this.filterStatList.splice(this.filterStatList.indexOf(stat), 1);
            }
        },
        filterGen(gen) {
            console.log(gen + "toggled")
            if(!this.filterGenList.includes(gen)){
                this.filterGenList.push(gen)
            }else{
                this.filterGenList.splice(this.filterGenList.indexOf(gen), 1);
            }



        },
        filterEggGroup(group) {
        },
    },
    computed: {
    },
    created() {
    },
}
</script>

<style>

.nav{
    width: 60%;
    margin: 30px auto;
    border: 1px solid red;
}

.nav-bar{
    margin:auto;
    width:100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border:1px solid red;
}

.search-bar{
    width:100%;
    font-size: 24px;
    padding:10px 20px;
    font-family: "Roboto", sans-serif;
    font-weight: 400;
}

.nav-btns{

    width:80%;
    margin:auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.dropdownBox{
    position: relative;
    background-color: #444;
    width:200px;
    border:1px solid blue;
    text-wrap: none;
}

.select-top-line{
    width:100%;
    display: flex;
    flex-direction: row;
    border-radius: 20px;
    padding:10px;
}

.select-btns{
    width:auto;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap:10px;
    padding:10px;
    position:absolute;
    top:40px;
    left:10px;
    z-index:10;
    border-radius: 20px;
    background-color: #444;
    border:1px solid #555;
}

.active{
    color:red;
    text-decoration: underline;
}

</style>