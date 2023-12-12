import React from 'react';

const NumeroFila = ({ numeros }) => {
    return (
        <div className="filas-numero">
            <div className="numero-celda"></div>
            {numeros.map((numero) => (
                <div key={numero} className="numero-celda">
                    {numero}
                </div>
            ))}
        </div>
    );
};

export default NumeroFila;
