<template>
<section class="section">
  <div id="app">
    <ul>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
        <li v-for="post in posts" v-bind:key="post" style="margin-bottom: 2rem;" data-aos="slide-up" data-aos-offset="100" data-aos-easing="ease-out-back">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                {{post.title}}
              </p>
            </header>
            <div class="card-content">
              <div class="content">
                <p>{{post.body}}</p>
              </div>
            </div>
          </div>
        </li>
      </div>
    </ul>
  </div>
</section>
</template>

<script>
import axios from 'axios';
import infiniteScroll from 'vue-infinite-scroll';

export default {
    directives: {infiniteScroll},
    data() { 
    return {
    posts: [],
    limit: 10,
    busy: false
    }
  },
  methods: {
    loadMore() {
      this.busy = true;
      axios.get("https://jsonplaceholder.typicode.com/posts").then(response => {
        const append = response.data.slice(
          this.posts.length,
          this.posts.length + this.limit
        );
        this.posts = this.posts.concat(append);
        this.busy = false;
      });
    }
  },
  created() {
    this.loadMore();
  }
}
</script>