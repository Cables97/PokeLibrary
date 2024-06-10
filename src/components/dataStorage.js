import { reactive } from 'vue'

export const stateStorage = reactive({
    masterListLength: "0",
    masterList: [],
    filterTypeList : [],
    filterStatList: [],
    filterGenList: [],
    caughtList:[],
    favouriteList:[],
    currentPokemon: {},

})

