import React from 'react';
import { Box } from '@material-ui/core';
import { useSelector } from 'react-redux';

const PokemonInfo = () => {
  const selectedPokemon = useSelector((state) => state.pokemon.selectedPokemon);

  return (
    <Box p={2} width='250px' textAlign='left' role='presentation'>
      <h1>{selectedPokemon.name}</h1>
      <p>{selectedPokemon.origin}</p>
      <p>{selectedPokemon.description}</p>
      <p>{selectedPokemon.temperament}</p>
    </Box>
  );
}

export default PokemonInfo;