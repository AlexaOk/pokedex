<template>
    <div>
     <div class="input-container">
    <input type="text" placeholder="Type a name" v-model="pokemonSearchString"/>
  </div>
    <ul>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
    <li v-for="pokename in filteredNameFeed" v-bind:key="pokename">
    <button v-on:click="pokename.url">
        {{ pokename.name}}
    </button>
    <a :href="pokename.url">{{ pokename.name}}</a> –
</li>
    </div>
  </ul>
  </div>
</template>

<script>
import axios from 'axios';
import infiniteScroll from 'vue-infinite-scroll';

export default {
    data() {
        return {
            pokemonSearchString : '',
            feed: [],
            limit: 10,
            busy: false
        }
    },
    directives: {infiniteScroll},
    methods: {
    loadMore() {
        this.busy = true;
        axios
        .get('https://pokeapi.co/api/v2/pokemon/?limit=10000')
        .then(response => 
            {
                const append = response.data.results.slice(
                    this.feed.length, 
                    this.feed.length + this.limit
                );
                this.feed = this.feed.concat(append);
                this.busy = false;
                });
    }
    },
    created() {
        this.loadMore();
    },
    computed: {
        filteredNameFeed() {
            var names = this.feed;
            var pokemonSearchString = this.pokemonSearchString;

            if(!pokemonSearchString){
                return names;
            }

            pokemonSearchString = pokemonSearchString.trim().toLowerCase();

            names = names.filter(function(item){
                if(item.name.toLowerCase().indexOf(pokemonSearchString) !== -1){
                    return item;
                }
            })
            return names;
        }
    }
}
</script>

<style>

</style>