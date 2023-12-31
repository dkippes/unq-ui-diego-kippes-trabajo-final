import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import './styles/HomePage.css';
import {getVictorias, resetVictorias} from "../../game/Victorias.js";

const HomePage = () => {
    const [victorias, setVictorias] = useState(getVictorias());

    useEffect(() => {
        setVictorias(getVictorias());
    }, []);

    const handleReiniciarVictorias = () => {
        resetVictorias();
        setVictorias(getVictorias());
    };

    return (
        <div className="pagina-principal-container">
            <h1 className="text-black">Batalla Naval</h1>
            <Link to="/vs-computadora" className="boton-link">
                <button className="boton">Jugar vs COM</button>
            </Link>
            <Link to="/vs-jugador" className="boton-link">
                <button className="boton">Jugar vs Player</button>
            </Link>
            <div className="boton-link">
                <button className="boton" onClick={handleReiniciarVictorias}>
                    Reiniciar Victorias
                </button>
            </div>
            <h3 className="text-black">Victorias: {victorias}</h3>
        </div>
    );
};

export default HomePage;
