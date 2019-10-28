<template>
<!--<section class="section">
  <div id="app">
    <ul>
        <li v-for="post in posts[0]" v-bind:key="post" style="margin-bottom: 2rem;" data-aos="slide-up" data-aos-offset="100" data-aos-easing="ease-out-back">

                {{post.name}}


        </li>
    </ul>
  </div>
</section>-->
<div class="container vue">
  <!--<div v-for="post in posts.slice(0, pokemonToShow)" :key="post">
    
    <li>{{post.name}}</li>

    <hr />

    </div>
  
  <button v-if="posts.length > 10 && pokemonToShow < posts.length" @click="loadMore">
  Load more articles
</button>-->
<div v-for="post in posts[0].slice(0,pokemonToShow)" :key="post">
      <div> {{ post.name }} {{ post.data.id }}</div>
</div>
<button v-if="posts[0].length > 4 && pokemonToShow < posts[0].length" @click="loadMore">
  Load more articles
</button>
</div>

</template>

<script>
import axios from 'axios';


export default {
    data() { 
    return {
    posts: [],
    pokemonToShow: 1,
    }
  },
  methods: {
    getList() {
      this.busy = true;
      axios.get("https://pokeapi.co/api/v2/pokemon/?limit=30")
      .then(response => {
          this.posts.push(response.data.results);  
          this.posts[0].forEach((element) => {
             axios
                    .get(element.url)
                    .then(
                        response2 => element.data = response2.data
                    )
          })
      
      });
    },
    loadMore() {
      this.pokemonToShow += 2
    }
  },
  created() {
    this.getList();
  }
}
</script>