<template>
  <v-app style="background-color: #3949AB">
    <v-container>
      <v-row class="mt-10">
        <v-col class="d-flex flex-column align-center" style="position: relative">
          <v-avatar
            color="black"
            size="120"
            style="position: absolute; z-index: 10; bottom: 10"
          >
            <img v-if="isLoading === false"
              :src="imageUrl + pokemon.species.url.split('/').filter(part => {return !!part}).pop() + '.png'"
            >
          </v-avatar>
          <v-card
            elevation="2"
            outlined
            shaped
            tile
            width="600"
            height="fit-content"
            z-index="-1"
            class="mt-15 d-flex flex-column align-center"
            v-if="isLoading === false"
            
          >
            <v-card-title class="mt-15 text-capitalize">
              <h2>{{pokemon.species.name}}</h2>
            </v-card-title>

            <div class="detail">
              <h4>Base Experience</h4>
              <h4>{{pokemon.base_experience}} XP</h4>
            </div>
              <div class="detail">
              <h4>Height</h4>
              <h4>{{pokemon.height}} m</h4>
            </div>
              <div class="detail">
              <h4>Weight</h4>
              <h4>{{pokemon.weight}} kg</h4>
            </div>

            <br/>

            <div class="detail">
              <h4>Abilities</h4>
            </div>

            <div class="d-flex mt-3 mb-3 justify-start" style="width: 80%">
              <div v-for="(ability, index) in pokemon.abilities" :key="index" class="ability">
                  {{ability.ability.name}}
              </div>
            </div>

            <div class="detail">
              <h4>Moves</h4>
            </div>

            <div class="d-flex mt-3 mb-3 justify-start" style="width: 80%">
              <div class="ability">
                {{pokemon.moves[0].move.name}}
              </div>
            </div>

            <div class="detail">
              <h4>Stats</h4>
            </div>

            <div style="width: 80%">
              <v-slider
                v-for="(stat, index) in pokemon.stats" :key="index"
                readonly
                :label="stat.stat.name"
                :value="stat.base_stat"
                thumb-label="always"
                :thumb-size="20"
              ></v-slider>
            </div>

            <div class="detail">
              <h4>Evolution</h4>
            </div>

            <div class="mt-5 mb-5 d-flex">
              <v-btn color="black" dark class="mx-3" v-if="pokemon.species.name !== pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name && pokemon.species !== undefined">
                <NuxtLink :to="'/pokemon/' + pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.url.split('/').filter(part => {return !!part}).pop()">
                  {{pokemonEvolution.chain.evolves_to[0].evolves_to[0].species.name}}
                </NuxtLink>
              </v-btn>

              <v-btn color="black" dark class="mx-3" v-if="pokemon.species.name !== pokemonEvolution.chain.evolves_to[0].species.name && pokemon.species !== undefined">
                <NuxtLink :to="'/pokemon/' + pokemonEvolution.chain.evolves_to[0].species.url.split('/').filter(part => {return !!part}).pop()">
                  {{pokemonEvolution.chain.evolves_to[0].species.name}}
                </NuxtLink>
              </v-btn>

              <v-btn color="black" dark class="mx-3" v-if="pokemon.species.name !== pokemonEvolution.chain.species.name && pokemon.species !== undefined">
                <NuxtLink :to="'/pokemon/' + pokemonEvolution.chain.species.url.split('/').filter(part => {return !!part}).pop()">
                  {{pokemonEvolution.chain.species.name}}
                </NuxtLink>
              </v-btn>
            </div>

             <v-btn color="red" class="mb-5">
               <NuxtLink to="/" style="color: white">
                 Back Home
               </NuxtLink>
            </v-btn>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      pokemonDetailUrl: 'https://pokeapi.co/api/v2/pokemon/',
      imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
      isLoading: true
    }
  },
  computed: {
    pokemon () {
      return this.$store.state.pokemon
    },
    pokemonEvolution () {
      return this.$store.state.pokemonEvolution
    }
  },
  methods: {
    async pokemonDetail() {
      const pokemonData = await this.$axios.get(this.pokemonDetailUrl + this.$route.params.id)
      const {base_experience, weight, height, types, abilities, species, stats, moves } = {...pokemonData.data}
      const filteredPokemonData = { base_experience, weight, height, types, abilities, species, stats, moves }
      const getEvolutionUrl = await this.$axios.get(pokemonData.data.species.url)
      // console.log(pokemonData.data.species.url)
      const evolutionData = await this.$axios.get(getEvolutionUrl.data.evolution_chain.url)
      // console.log(evolutionData.data.chain)
      this.$store.commit('SET_POKEMON', filteredPokemonData)
      this.$store.commit('SET_POKEMONEVOLUTION', evolutionData.data)
      this.isLoading = false
    }
  },
  created () {
    this.pokemonDetail()
  }
}
</script>

<style>
.detail {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  width: 80%;
}

.ability {
  display: flex;
  padding: 7px;
  border-radius: 20px;
  text-transform: capitalize;
  background-color: darkorchid;
  color: white;
  margin-right: 5px;
}
</style>