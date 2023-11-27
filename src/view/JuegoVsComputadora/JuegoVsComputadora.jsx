import React, { useState } from 'react';
import HeaderNavigation from '../../components/HeaderNavigation.jsx';
import './styles/JuegoVsComputadora.css';
import logo from '../../static/crucero.png';
import Image from 'react-bootstrap/Image';

const JuegoVsComputadora = ({ id, onClick }) => {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [posicionImagen, setPosicionImagen] = useState({ fila: 0, columna: 0 });
    const [arrastrando, setArrastrando] = useState(false);
    const [tablero, setTablero] = useState(Array.from({ length: 10 }, () => Array(10).fill(null)));

    const colocarBarco = (fila, columna, tipo, orientacion) => {
        const nuevoTablero = [...tablero];
        for (let i = 0; i < tipo; i++) {
            if (orientacion === 'horizontal') {
                nuevoTablero[fila][columna + i] = tipo;
            } else {
                nuevoTablero[fila + i][columna] = tipo;
            }
        }
        setTablero(nuevoTablero);
    };

    const handleCeldaClick = (fila, columna) => {
        colocarBarco(fila, columna, 3, 'horizontal');
    };

    const handleDragStart = (event) => {
        setArrastrando(true);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = (fila, columna) => {
        if (arrastrando) {
            setPosicionImagen({ fila, columna });
        }
    };

    const handleDragEnd = () => {
        setArrastrando(false);
    };

    return (
        <>
            <HeaderNavigation />
            <div className="logo" onDragEnd={handleDragEnd}>
                <Image
                    src={logo}
                    fluid
                    draggable
                    onDragStart={handleDragStart}
                />
            </div>
            <div className="tablero">
                <h2>Jugador {id}</h2>
                <div className="filas-numero">
                    <div className="numero-celda"></div>
                    {numeros.map((numero) => (
                        <div key={numero} className="numero-celda">
                            {numero}
                        </div>
                    ))}
                </div>
                {letras.map((letra) => (
                    <div key={letra} className="fila-letra">
                        <div className="letra-celda">{letra}</div>
                        {numeros.map((numero) => (
                            <div
                                key={numero}
                                onClick={() => handleCeldaClick(numero, letra)}
                                onDragOver={handleDragOver}
                                onDragEnter={() => handleDragEnter(numero, letra)}
                                className="celda"
                            >
                                {posicionImagen.fila === numero && posicionImagen.columna === letra && (
                                    <div className="imagen-arrastrada">
                                        <Image src={logo} fluid />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default JuegoVsComputadora;
