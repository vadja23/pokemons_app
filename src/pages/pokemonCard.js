import React from "react";
import { PokemonCard } from '../components/pokemon_cards/PokemonCard';
 
const Home = () => {
    return (
        <div className="tabs_page">
            <div className="pokemon">
                <h2>Карточка покемона</h2>
                <PokemonCard />
            </div>
        </div>
    );
};
 
export default Home;