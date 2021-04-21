<template>
  <v-app style="background-color: #3949AB">
    <v-container>
      <div class="text-center mt-5">
        <h1 class="white--text">Pokedex</h1>
      </div>

      <div color="white" style="width: 50%; margin: 0 auto; background-color: white" class="pa-5 mb-5 d-flex flex-column">
          <v-autocomplete
            v-model="search"
            :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'"
            :items="allPokemonsName"
            :readonly="!isEditing"
            :label="`Pokemon — ${isEditing ? 'Editable' : 'Readonly'}`"
            persistent-hint
          >
            <template v-slot:append-outer>
              <v-slide-x-reverse-transition
                mode="out-in"
              >
                <v-icon
                  :key="`icon-${isEditing}`"
                  :color="isEditing ? 'success' : 'info'"
                  @click="isEditing = !isEditing"
                  v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"
                ></v-icon>
              </v-slide-x-reverse-transition>
            </template>
      </v-autocomplete>
      <v-btn
        :disabled="!search"
        color="success"
        @click="goToDetailPage"
      >
        Search Pokemon
      </v-btn>
      </div>
      <v-row>
        <v-col
          class="d-flex flex-wrap mx-auto"
          cols="8"
        >
        <Pokemon v-for="(pokemon, index) in pokemons" :key="index" :pokemon="pokemon"/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import Pokemon from '../components/Pokemon.vue'

export default {
  data () {
    return {
      apiUrl: 'https://pokeapi.co/api/v2/pokemon?limit=500',
      search: null,
      isEditing: false,
    }
  },
  components: {
    Pokemon
  },
  computed: {
    pokemons () {
      return this.$store.state.pokemons
    },
    currentUrl () {
      return this.$store.state.currentUrl
    },
    allPokemonsName () {
      return this.$store.state.allPokemonsName
    }
  },
  methods: {
    async fetchInitialPokemon() {
      let response = await this.$axios.get(this.apiUrl)
      let pokemons = response.data.results
      pokemons.forEach(pokemon => {
        pokemon.id = pokemon.url.split('/').filter(part => {return !!part}).pop()
      })
      let nextUrl = response.data.next
      this.$store.commit('SET_POKEMONS', pokemons)
      let allPokemonNames = pokemons.map(pokemon => {
        return pokemon.name
      })
      this.$store.commit('SET_ALLPOKEMONSNAME', allPokemonNames)
      this.$store.commit('SET_NEXTURL', nextUrl)
    },
    goToDetailPage () {
      this.$router.push({path: `/pokemon/${this.search}`})
    }
  },
  created() {
    this.fetchInitialPokemon()
  }
}
</script>

<style>

</style>
