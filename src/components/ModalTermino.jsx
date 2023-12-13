import React, {useEffect, useState} from 'react';
import './styles/ModalTermino.css';
import {getVictorias} from "../game/Victorias.js";
import {Link} from "react-router-dom";

const ModalTermino = ({estado}) => {
    const [victorias, setVictorias] = useState(getVictorias());

    useEffect(() => {
        setVictorias(getVictorias());
    }, []);

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <div className="modalTermino-textarea">
                    <h1 className="text-black">¡{estado}!</h1>
                    <h3 className="text-black">Victorias: {victorias}</h3>
                </div>
                <div className="modalTermino-buttonarea">
                    <Link to={"/"} className="boton-link">
                        <button className="boton">Ir al inicio</button>
                    </Link>
                    <Link to="/vs-computadora" className="boton-link" onClick={() => window.location.reload()}>
                        <button className="boton">Jugar vs COM</button>
                    </Link>
                    <Link to="/vs-jugador" className="boton-link">
                        <button className="boton">Jugar vs Player</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ModalTermino;
