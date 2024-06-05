<template>
    <div class="nav">

        <nav class="nav-bar">
            <input type="text" name="search-bar" id="search-bar" class="search-bar">
        </nav>

        <div class="nav-btns">

            <div name="typeSelect" id="typeSelect" class="dropdownBox" @click="isOpenType=true" @mouseout="isOpenType=false">

                <div class="select-top-line" @mouseover="isOpenType=true">
                    <p>Choose a Type to Filter</p>
                    <i class="fa-solid fa-square-caret-down fa-center"></i>
                </div>

                <div class="select-btns" v-if="isOpenType"  @mouseover="isOpenType=true" @mouseout="isOpenType=false">

                    <div v-for="types in this.typeList" class="type-btn base-btn" :class="{'active' : this.filterTypeList.includes(types)},  types.toLowerCase() " @click="filterType(types)">
                        <p>{{ types }}</p>
                    </div>

                </div>

            </div>

            <div name="statSelect" id="statSelect" class="dropdownBox" @click="isOpenStat=true" @mouseout="isOpenStat=false">

                <div class="select-top-line" @mouseover="isOpenStat=true">
                    <p>Choose a Stat to Filter</p>
                    <i class="fa-solid fa-square-caret-down fa-center"></i>
                </div>

                <div class="select-btns" v-if="isOpenStat"  @mouseover="isOpenStat=true" @mouseout="isOpenStat=false">

                    <div v-for="stat in this.statList" class="type-btn base-btn" :class="{'active' : this.filterStatList.includes(stat)},  stat" @click="filterStat(stat)">
                        <p>{{ stat }}</p>
                    </div>

                </div>

            </div>


            <div name="genSelect" id="genSelect" class="dropdownBox" @click="isOpenGen=true" @mouseout="isOpenGen=false">

                <div class="select-top-line" @mouseover="isOpenGen=true">
                    <p>Choose a Gen to Filter</p>
                    <i class="fa-solid fa-square-caret-down fa-center"></i>
                </div>

                <div class="select-btns" v-if="isOpenGen"  @mouseover="isOpenGen=true" @mouseout="isOpenGen=false">
                    <div v-for="gen in this.genList" class="type-btn wide-btn base-btn" :class="{'active' : this.filterGenList.includes(gen)}, gen" @click="filterGen(gen)">
                        <p >Generation {{ gen }}</p>
                    </div>
                </div>

            </div>


            <button>Egg Group Filter</button>
            <input type="checkbox" name="Babies" id="baby">
            <input type="checkbox" name="Legendarys" id="legendary">
        </div>
        
        <div class="filter-btn-box">
            <div v-for="types in this.filterTypeList" class="filter-btn" @click="filterType(types)"><p>{{ types }}</p><i class="fa-solid fa-rectangle-xmark fa-md fa-center"></i></div>
            <div v-for="stat in this.filterStatList" class="filter-btn"  @click="filterStat(stat)"><p>{{ stat }}</p><i class="fa-solid fa-rectangle-xmark fa-md fa-center"></i></div>
            <div v-for="gen in this.filterGenList" class="filter-btn" @click="filterGen(gen)"><p>Generation {{ gen }}</p><i class="fa-solid fa-rectangle-xmark fa-md fa-center"></i></div>

            <div class="reset filter-btn" v-if="isResetAll" @click="resetAll"><p>Reset Filters</p><i class="fa-solid fa-rectangle-xmark fa-md fa-center"></i></div>
        </div>

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
            isOpenStat: true,

            genList: ["I","II","III","IV","V","VI","VII","VIII","IX",],
            filterGenList: [],
            isOpenGen: true,
            
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
            
                this.isActive
                console.log(stat + "toggled")
                if(!this.filterStatList.includes(stat)){
                    this.filterStatList.push(stat)
                }else{
                    this.filterStatList.splice(this.filterStatList.indexOf(stat), 1);
                
            }
        },
        filterGen(gen) {
            
                this.isActive
                console.log(gen + "toggled")
                if(!this.filterGenList.includes(gen)){
                    this.filterGenList.push(gen)
                }else{
                    this.filterGenList.splice(this.filterGenList.indexOf(gen), 1);
                
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
            this.filterTypeList.length  = []
            this.filterStatList.length = []
            this.filterGenList.length = []
        }
    },
    computed: {
        isResetAll(){
            if(this.filterTypeList.length > 0 || this.filterStatList.length > 0 || this.filterGenList.length > 0){
                return true
            }
        },
        isOpen(){
            if(this.isOpenType){
                return  true
            }
        }
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
    z-index: 9999;
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

    width:50%;
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
}

.filter-btn:hover{
    box-shadow: 0 0 2px 2px rgba(255, 255, 255, .25);
    cursor: default;
}

.filter-btn p{
    margin-right:20px;
}

.filter-btn p:hover{
    cursor: default;
}

.I{
    background-image: linear-gradient(135deg, #FF0000FF 39%, #FFFC00FF 50%, #073AFFFF 62%);
}

.II{
    background-image: linear-gradient(135deg, #FFC200FF 39%, #00FFF7FF 50%, #C0C0C0FF 62%);
}
.III{
    background-image: linear-gradient(135deg, #FF0000FF 39%, #20FF00FF 50%, #10008DFF 62%);
}
.IV{
    background-image: linear-gradient(135deg, #E7F8FFFF 39%, #7E7E7EFF 50%, #FFCAEEFF 62%);
}
.V{
    background-image: linear-gradient(135deg, #4B4B4BFF 25%, #BEBEBEFF 75%);
}
.VI{
    background-image: linear-gradient(135deg, #86B5FFFF 25%, #FA5757FF 75%);
}

.VII{
    background-image: linear-gradient(135deg, #FF8200FF 0%, #FFC386FF 25%, #A843F7FF 75%, #6102AFFF 100%);
}

.VIII{
    background-image: linear-gradient(135deg, #00CDFFFF 25%, #AF022CFF 75%);
}
.IX{
    background-image: linear-gradient(135deg, #FF00F1FF 25%, #AF0202FF 75%);
}



.fa-center { line-height: inherit!important; vertical-align: middle; }

</style>