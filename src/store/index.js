import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./slice/apiSlice"
import pokemonReducer from './slice/pokemonSlice';

export const store = configureStore({
    reducer: {
        api: apiReducer,
        pokemon: pokemonReducer
    }
});