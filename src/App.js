import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar_pages/NavbarPages";
import './App.css';
import Home from "./pages/index";
import PokemonCard from "./pages/pokemonCard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/pokemon-сard" element={<PokemonCard />} />
      </Routes>
    </Router>
  );
}

export default App;