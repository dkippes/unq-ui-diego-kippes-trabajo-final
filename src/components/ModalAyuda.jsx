import React from 'react';
import './styles/ModalAyuda.css';

const ModalAyuda = ({onClose}) => {
    return (
        <div className="modalOverlay">
            <div className="modalContent">
        <span className="closeButton" onClick={onClose}>
          &times;
        </span>
                <h1 className="text-black">Ayuda</h1>
                <ul>
                    <li className="text-black">
                        Selecciona un barco y colócalo en el tablero.
                    </li>
                    <li className="text-black">
                        La posición del barco debe ser horizontal o vertical.
                    </li>
                    <li className="text-black">
                        No se permiten barcos en diagonal.
                    </li>
                    <li className="text-black">
                        P = Portaaviones (5 casillas)
                    </li>
                    <li className="text-black">
                        C = Crucero (4 casillas)
                    </li>
                    <li className="text-black">
                        S = Submarino (3 casillas)
                    </li>
                    <li className="text-black">
                        L = Lancha (2 casillas)
                    </li>
                    <li className="text-black">
                        Ganará el jugador que hunda todos los barcos del oponente.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ModalAyuda;
