<template>
    <b-container>
        <b-row>     
            <b-col sm="12">
                <b-input-group class="mt-3">
                    <b-form-input type="text" placeholder="Type a name or Id" v-model="pokemonSearchString"></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-button squared variant="outline-secondary" @click="sortByName=!sortByName">Sort by Name</b-button>
                <b-button squared variant="outline-secondary" @click="sortById=!sortById">Sort by Id</b-button>
            </b-col>
        </b-row>
        <hr/>
        <b-row>
            <b-col v-if="filteredPokemon" sm="12">
                <b-card-group deck>
                    <div v-for="(pokemon, index) in filteredPokemon.slice(0,pokemonToShow)" :key="index+10">
                        <div v-if="pokemon.details">
                            <b-card  :title="pokemon.name" :img-src="pokemon.details.sprite" img-alt="Image" img-top>
                                <b-card-text>Pokemon n°{{ pokemon.details.id}}</b-card-text>
                                <template v-slot:footer >
                                    <small v-for="(types, value) in pokemon.details.types" :key="value+10" class="text-muted">{{ types.type.name}} </small>
                                </template>
                            </b-card>
                        </div>
                    </div>
                </b-card-group>
            </b-col>
        </b-row>
        <hr/>
       <b-button  pill variant="outline-success" v-if="filteredPokemon.length > 6 && pokemonToShow < filteredPokemon.length" @click="loadMore">
            Load more pokemons
        </b-button>
    </b-container>
</template>
<script>
import axios from 'axios';

export default {
    data() {
        return {
            pokemonSearchString : '',
            list: [],
            loading: true,
            pokemonToShow: 5,
            sortByName: false,
            sortById: true,
        }
    },
    watch: {
        list(newValue, oldValue) {
            if (oldValue.length === 0 && newValue.length > 0) {
                this.loadDetails();
            }
        },
        sortByName(val) {
            this.filteredPokemon = this.sortBy(this.filteredPokemon, 'name', val);
        },
        sortById(val) {
            this.filteredPokemon = this.sortBy(this.filteredPokemon, 'id', val);
        },
    },
    methods: {
        getList() {
            axios
            .get("https://pokeapi.co/api/v2/pokemon/?limit=251")
            .then(response => {
                this.list = response.data.results;
            })
            .finally(() => (this.loading = false));
        },
        loadDetails() {
            this.list.forEach((element) => {
            const secondApiUrl = element.url;
            this.getDetailByPokemon(secondApiUrl);
            });
        },
        getDetailByPokemon(secondApiUrl) {
            axios.get(secondApiUrl).then(response => {
                this.mapDetailsInList(response, secondApiUrl);
            });
        },
        mapDetailsInList(response, secondApiUrl) {
            // mapping the required infos to list
            const id = response.data.id.toString();
            const sprite = response.data.sprites.front_default;
            const types = response.data.types;
            this.list = this.list.map(element => {
                const mappedElement = element;
                if (element.url === secondApiUrl) {
                    mappedElement.details = { id: id, sprite: sprite, types: types };
                }
                return mappedElement;
            });
        },
        loadMore() {
            this.pokemonToShow += 5
            },
        sortBy(array, param, reverse) {
            var filterA, filterB;
            return array.sort(function (a, b) {
                switch (param) {
                    case 'name':
                        filterA = a.name;
                        filterB = b.name;
                        break;
                    case 'id':
                        filterA = parseInt(a.details.id);
                        filterB = parseInt(b.details.id);
                        break;
                    }
                if (reverse) {
                    return (filterA > filterB) ? 1 : -1;
                } else {
                    return (filterA < filterB) ? 1 : -1;
                }
			});
		},
    },
    mounted() {
        this.getList();
    },
    computed: {
        filteredPokemon: {
            get() {
                var names = this.list;
                var pokemonSearchString = this.pokemonSearchString;
                this.sortByName ? 1 : -1;
                this.sortById ? 1 : -1;
            
                //Filter pokemon list by name or ID
                if(!pokemonSearchString){
                    return names
                }
                names = names.filter(function(item){
                if(item.name.toLowerCase().indexOf(pokemonSearchString) !== -1  || item.details.id.indexOf(pokemonSearchString) !== -1){
                    return item;
                }
                })
                return names;
            },
            set(newValue) {
                var names = newValue;
                this.names = names;
            }
        },
    },
}
</script>

<style>
.card-deck .card {
    width: 12rem;
    margin-bottom: 20px;
}
.row {
    margin-top: 10px;
}
</style>
