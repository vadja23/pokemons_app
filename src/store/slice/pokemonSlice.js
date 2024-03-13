import { createSlice } from '@reduxjs/toolkit';

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    selectedPokemon: null,
    isDrawerOpen: false,
  },
  reducers: {
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    selectPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
    toggleDrawer: (state, action) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export const { setPokemons, selectPokemon, toggleDrawer } = pokemonSlice.actions;

export default pokemonSlice.reducer;