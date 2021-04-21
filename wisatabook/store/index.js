export const state = () => ({
  pokemons: [],
  currentUrl: 'https://pokeapi.co/api/v2/pokemon/',
  pokemon: {},
  pokemonEvolution: {},
  evolutionChainUrl: '',
  speciesUrl: '',
  nextUrl: '',
  allPokemonsName: []
})

export const mutations = {
  SET_POKEMONS(state, pokemons) {
    state.pokemons = pokemons
  },
  SET_NEXTURL(state, nextUrl) {
    state.nextUrl = nextUrl
  },
  SET_CURRENTURL(state, currentUrl) {
    state.currentUrl = currentUrl
  },
  SET_EVOLUTIONCHAINURL(state, evolutionChainUrl) {
    state.evolutionChainUrl = evolutionChainUrl
  },
  SET_SPECIESURL(state, speciesUrl) {
    state.speciesUrl = speciesUrl
  },
  SET_POKEMON(state, pokemon) {
    state.pokemon = pokemon
  },
  SET_POKEMONEVOLUTION(state, pokemonEvolution) {
    state.pokemonEvolution = pokemonEvolution
  },
  SET_ALLPOKEMONSNAME(state, allPokemonsName) {
    state.allPokemonsName = allPokemonsName
  }
}