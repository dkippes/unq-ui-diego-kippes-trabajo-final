// Tablero.jsx
import React from 'react';

const Tablero = ({ nombre, tableroJugador, letras, numeros, handleAtacar }) => (
    <div className="tablero">
        <h2>{nombre}</h2>
        <div className="filas-numero">
            <div className="numero-celda"></div>
            {numeros.map((numero) => (
                <div key={numero} className="numero-celda">
                    {numero}
                </div>
            ))}
        </div>
        {letras.map((letra, fila) => (
            <div key={letra} className="fila-letra">
                <div className="letra-celda">{letra}</div>
                {numeros.map((numero, columna) => (
                    <div
                        key={numero}
                        className="celda"
                        onClick={() => handleAtacar(letra, numero)}
                    >
                        {tableroJugador[fila][columna]}
                    </div>
                ))}
            </div>
        ))}
    </div>
);

export default Tablero;
