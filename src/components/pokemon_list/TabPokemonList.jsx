import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from '@material-ui/core';
import { PokemonList } from './PokemonList';
import PokemonInfo from './DrawerInfo';
import { Filters } from './FiltersPanel';
import { toggleDrawer } from '../../store/slice/pokemonSlice';

export function TabPokemonList() {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.pokemon.isDrawerOpen);
    return (
        <>
            <Filters />
            <Drawer anchor="right" open={isDrawerOpen} onClose={() => dispatch(toggleDrawer(false))}>
                <PokemonInfo />
            </Drawer>
            <PokemonList />
        </>
    );
}
