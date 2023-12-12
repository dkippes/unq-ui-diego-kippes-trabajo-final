import React from 'react';
import {determinarColorCelda, determinarImagenCelda} from "../utils/utils.js";

const Celda = ({letra, numero, tablero, fila, columna}) => {
    return (
        <div
            className="celda"
            data-fila={letra}
            data-columna={numero}
            style={{
                backgroundColor: determinarColorCelda(tablero[fila][columna]),
                backgroundImage: determinarImagenCelda(tablero[fila][columna]),
            }}
        >
            {tablero[fila][columna] !== 'X' && tablero[fila][columna] !== 'O'
                ? tablero[fila][columna]
                : null}
        </div>
    );
};

export default Celda;
