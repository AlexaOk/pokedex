<template>
    <div>
        {{ info }}
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            info : null
        }
    },
    mounted () {
    axios
      .get('https://pokeapi.co/api/v2/evolution-chain/?limit=20&offset=20')
      .then(response => (this.info = response))
  },   
}
</script>

<style>

</style>