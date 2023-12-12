import React from 'react';
import './styles/BotonJugar.css';

const BotonJugar = ({onClick, disabled}) => (
    <button className="boton-listo" onClick={onClick} disabled={disabled}>
        Jugar
    </button>
);

export default BotonJugar;
