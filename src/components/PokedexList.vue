<template>
    <div class="container vue">
        <b-row>
        <input type="text" placeholder="Type a name or Id" v-model="pokemonSearchString"/>
        <button @click="invertSort()">Sort asc/desc</button>
        </b-row>
        <b-row>
            <b-card-group deck>
                    <div v-for="(pokemon, index) in filteredNameFeed.slice(0,pokemonToShow)" :key="index+10">
                        <b-card :title="pokemon.name" :img-src="pokemon.sprite" img-alt="Image" img-top>
                            <b-card-text>Pokemon n°{{ pokemon.id}}</b-card-text>
                                <template v-slot:footer >
                                    <small v-for="(types, value) in pokemon.types" :key="value+10" class="text-muted">{{ types.type.name}} </small>
                                </template>
                            </b-card>
                    </div>
            </b-card-group>
        </b-row>
        <button v-if="filteredNameFeed.length > 6 && pokemonToShow < filteredNameFeed.length" @click="loadMore">
            Load more pokemons
        </button>
    </div>
</template>
<script>
import axios from 'axios';

export default {
      props: [
      'apiUrl'
    ],
    data() {
        return {
            componentLoaded: false,
            pokemonSearchString : '',
            list: [],
            finalList: [],
            pokemonToShow: 6,
            sortAsc: true
        }
    },
    methods: {
        getList() {
        //get all Pokemon object 
        axios
        .get('https://pokeapi.co/api/v2/pokemon/?limit=251')
        .then(response => {
            this.list.push(response.data.results);
            this.list[0].forEach((element) => {
            //get Pokemon object data
            axios
                .get(element.url)
                .then(
                    response2 => {
                        //Create new element in object
                        element.id = response2.data.id.toString()
                        element.types = response2.data.types
                        element.sprite = response2.data.sprites.front_default
                        this.finalList.push(element)
                    }
                )    
            })          
        })
        },
        loadMore() {
            this.pokemonToShow += 6
        },
        invertSort() {
            this.sortAsc = !this.sortAsc;
        }
    },
    mounted() {
        this.getList();
    },
    computed: {
        filteredNameFeed() {
            var names = this.finalList;
            var pokemonSearchString = this.pokemonSearchString;
            let ascDesc = this.sortAsc ? 1 : -1;
            //Filter pokemon list by name or ID

            if(!pokemonSearchString){
                return names;
            }

            pokemonSearchString = pokemonSearchString.trim().toLowerCase();

            names = names.filter(function(item){
                if(item.name.toLowerCase().indexOf(pokemonSearchString) !== -1 || item.id.indexOf(pokemonSearchString) !== -1 ){
                    return item;
                }
            })
            
            return names.sort((a, b) => ascDesc * a.name.localeCompare(b.name)); 
        }
    },
}
</script>

<style>

</style>