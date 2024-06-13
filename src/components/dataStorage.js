import { reactive } from 'vue'

export const stateStorage = reactive({
    masterListLength: "0",

    modalOpen: false,
    alertActive: false,
    alertMessage: "",

    masterList: [],
    filterTypeList : [],
    filterStatList: [],
    filterGenList: [],
    caughtList:[],

    favouriteList:[],
    currentPokemon: {},

    filterCaught: false,
    filterFavorite: false,

    searchQuery: "",
    
})

export function saveLists(){
    console.log('saving')
    if(localStorage.getItem('pokeDex')){localStorage.setItem('pokeDex', JSON.stringify(stateStorage.masterList))}
    localStorage.setItem('favoriteList', JSON.stringify(stateStorage.favouriteList))
    localStorage.setItem('caughtList', JSON.stringify(stateStorage.caughtList))
}

export function loadLists(){
    console.log(localStorage.getItem('favoriteList'))
    if (localStorage.getItem('pokeDex')) { stateStorage.masterList = JSON.parse(localStorage.getItem('pokeDex'))}
    if (localStorage.getItem('favoriteList')) {stateStorage.favouriteList = JSON.parse(localStorage.getItem('favoriteList'))}
    if (localStorage.getItem('caughtList')) {stateStorage.caughtList = JSON.parse(localStorage.getItem('caughtList'))}
}

export function logLists(){
    console.log(stateStorage.masterList)
    console.log(localStorage.getItem('pokeDex'))
    console.log(localStorage.getItem('favoriteList'))
    console.log(localStorage.getItem('caughtList'))
}

export function clearLists(){
    localStorage.removeItem('favoriteList');
    localStorage.removeItem('caughtList');
}

export function alert(msg){
    stateStorage.alertMessage = msg
    stateStorage.alertActive = true
    setTimeout(() => {
        stateStorage.alertActive = false
    }, 2000);
}
