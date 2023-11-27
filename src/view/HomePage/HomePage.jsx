import { useState } from 'react'
import {Link} from "react-router-dom";
import './styles/HomePage.css';

const HomePage = () => {
    const [victorias, setVictorias] = useState(0);

    return (
        <div className="pagina-principal-container">
            <h1>Batalla Naval</h1>
            <Link to="/vs-computadora" className="boton-link">
                <button className="boton">Jugar vs COM</button>
            </Link>
            <Link to="/vs-jugador" className="boton-link">
                <button className="boton">Jugar vs Player</button>
            </Link>
            <h3>Victorias: {victorias}</h3>
        </div>
    );
};

export default HomePage;
