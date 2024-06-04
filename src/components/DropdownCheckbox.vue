<template>
    <div name="typeSelect" id="typeSelect">
        <div class="line" v-for="types in this.typeList">
            <input type="checkbox"  :value="types" :key="types" name="types"/>
            <label for="types">{{ types }}</label>
        </div>
    </div>
</template>

<script>
export default {
    setup () {
        

        return {}
    }
}
</script>

<style lang="scss" scoped>

</style>