import React from 'react';
import {determinarImagenCelda} from "../utils/utils.js";

const CeldaOculta = ({letra, numero, tablero, fila, columna, handleAtacar}) => {
    return (
        <div
            className="celda-clickeable"
            style={{
                backgroundImage: determinarImagenCelda(tablero[fila][columna]),
            }}
            onClick={() => handleAtacar(letra, numero)}
        />
    );
};

export default CeldaOculta;
