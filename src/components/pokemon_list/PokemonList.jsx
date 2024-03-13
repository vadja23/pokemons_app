import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon, fetchLocalStorage } from "../../store/slice/apiSlice";
import { selectPokemon, toggleDrawer } from '../../store/slice/pokemonSlice';

export function PokemonList() {
    const dispatch = useDispatch();
    const dataFiltered = useSelector((state) => state.api.dataFiltered);
    const currentPage = useSelector((state) => state.api.currentPage);
    const [, forceRender] = useState(undefined);
    let finally_ = false;
    
    // вешаем хук на событие прокрутки страницы
    useEffect( () => {
        document.addEventListener('scroll', scrollHandler)

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    });

    // определяем что уже пролистали страницу вниз, отправляем новый get
    const scrollHandler = (e) => {
        if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 250 && finally_ === false) {
            // переменная для защиты от двойной отправки
            finally_ = true;
            dispatch(fetchPokemon({page:currentPage,limit:10}));
        }
    }

    // добавляем в избранное и рендерим принудительно
    const favoriteAdd = (i) => {
        dispatch(fetchLocalStorage(i));
        forceRender((prev) => !prev);
    }

    const handleClick = (pokemon) => {
        dispatch(selectPokemon(pokemon));
        dispatch(toggleDrawer(true));
    }

    return (
        <div className="pokemon">
        {
            dataFiltered && dataFiltered.map(i => { 

                let iconSpan = "❤️";
                if (localStorage.getItem(i.id)) {
                    iconSpan = "💔";
                }

                return (
                    <div key={i.id} className="pokemon_list">
                        <img src={i.url} onClick={() => handleClick(i.breeds[0])} alt="" />
                        <span onClick={() => favoriteAdd(i)} className="pokemon_list_favorite">{iconSpan}</span>
                    </div> 
                )
            })
        }
        </div>
    )
}