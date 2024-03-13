import React from "react";
 
const Navbar = () => {
    return (
        <>
            <nav className="nav">
                <a href="/" className="nav_logo">🐚 Магазин покемонов "Пикачу"</a>
                <a href="/" className="nav_page">Главная</a>
                <a href="/pokemon-сard" className="nav_page">Карточка покемона</a>
            </nav>
        </>
    );
};
 
export default Navbar;