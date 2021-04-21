<template>
  <v-card
    class="mx-auto d-flex flex-column align-center mh-3 mt-3 pa-2"
    width="11rem"
    style="cursor: pointer"
    >
    <v-img
      :src="imageUrl + pokemon.id + '.png'"
      height="150" width="150"
    ></v-img>
    <v-card-title primary-title class="text-center text-capitalize">
      {{pokemon.name}}
    </v-card-title>
    <v-btn color="black" dark>
      <NuxtLink :to="'/pokemon/' + pokemon.name">
        Details
      </NuxtLink>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  props: ['pokemon'],
  data() {
    return {
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
    }
  },
}
</script>

<style>

</style>