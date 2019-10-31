<template>
    <b-container>
        <b-row>     
            <b-col sm="12">
                <b-input-group class="mt-3">
                    <b-form-input type="text" placeholder="Type a name or Id" v-model="pokemonSearchString"></b-form-input>
                    <b-input-group-append>
                        <b-button squared variant="outline-secondary" @click="invertSort()">Sort asc/desc</b-button>
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
        <hr/>
        <b-row>
            <b-col sm="12">
                <b-card-group  deck>
                    <div v-for="(pokemon, index) in filteredNameFeed.slice(0,pokemonToShow)" :key="index+10">
                        <b-card :title="pokemon.name" :img-src="pokemon.sprite" img-alt="Image" img-top>
                            <b-card-text>Pokemon n°{{ pokemon.id}}</b-card-text>
                               <template v-slot:footer >
                                    <small v-for="(types, value) in pokemon.types" :key="value+10" class="text-muted">{{ types.type.name}} </small>
                                </template>
                            </b-card>
                    </div>
                </b-card-group>
            </b-col>
        </b-row>
        <hr/>


        <b-button  pill variant="outline-success" v-if="filteredNameFeed.length > 6 && pokemonToShow < filteredNameFeed.length" @click="loadMore">
            Load more pokemons
        </b-button>
    </b-container>
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
            pokemonToShow: 5,
            sortAsc: true
        }
    },
    methods: {
        getList() {
        //get all Pokemon object 
        axios
        .get('https://pokeapi.co/api/v2/pokemon/?limit=251')
        .then(response => {
            this.list = response.data.results;
            this.list.forEach((element) => {
            //get Pokemon object data
            axios
                .get(element.url)
                .then(
                    response2 => {
                        //Create new element in object
                       // this.finalList.push(this.list)
                        element.id = response2.data.id.toString()
                        element.types = response2.data.types
                       element.sprite = response2.data.sprites.front_default
                        //this.list = element
                    }
                )    
            })          
        })
        },
        loadMore() {
            this.pokemonToShow += 5
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
            var names = this.list;
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

.card-deck .card {
    width: 12rem;
    margin-bottom: 20px;
}
</style>