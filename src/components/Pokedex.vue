<template>
    <div class='container'>
        <pokedexList :apiUrl="apiUrl" @setPokedexUrl="setPokedexUrl"/>
    </div>
</template>

<script>
    import pokedexList from './PokedexList.vue';
    export default {
        data() {
            return {
                apiUrl: 'https://pokeapi.co/api/v2/pokemon/',
                pokemonUrl: ''
            }
        },
        components: {
            pokedexList,
        },
        methods: {
            setPokedexUrl(url) { 
                this.pokedexUrl = url;
            }

        }

    }
</script>

<style>

</style>