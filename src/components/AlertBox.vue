<template>
    <div class="alert-box">
        <p>{{ stateStorage.alertMessage }}</p>
    </div>
</template>

<script>
import { stateStorage } from './dataStorage';

export default {

    data () {
        return {
            stateStorage,
        }
    },

    computed:{


    },

    created() {


    },
}
</script>

<style>

.alert-box{
    padding: 30px 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border:2px solid var(--card-border);
    border-radius: 20px;
    background-color: var(--card-background);
    box-shadow: 4px 4px 10px 0 var(--card-shadow), 0 0 10px rgba(0, 0, 0, .1) inset;
}
.alert-box > p::first-letter {
    text-transform: capitalize;

}

</style>