import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon } from "../../store/slice/apiSlice";

export function PokemonCard() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.api.data);
    if (data == null) {
        dispatch(fetchPokemon({page:1,limit:1}));
    }

    return (
        <>
        {
            data && data.map(i => { 

                return (
                    <div key={i.id} className="pokemon_card">
                        <img src={i.url} alt="name" />
                        <div className='pokemon_card_info'>
                            <h2>Имя: {i.breeds[0].name}</h2>
                            <p>Описание: {i.breeds[0].description}</p>
                            <p>Сила атаки: {i.breeds[0].dog_friendly} из 10</p>
                            <p>Агрессивность: {i.breeds[0].stranger_friendly} из 10</p>
                            <p>Происхождение: {i.breeds[0].origin}</p> 
                            <p>Темперамент: {i.breeds[0].temperament}</p> 
                        </div>
                    </div>
                )
            })
        }
        </>
    );
}
