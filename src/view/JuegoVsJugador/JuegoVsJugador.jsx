import {useState} from 'react'
import HeaderNavigation from "../../components/HeaderNavigation.jsx";

const JuegoVsJugador = () => {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            <HeaderNavigation/>
            <div className="tablero">
                <h2>Jugador {id}</h2>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        {letras.map(letra => (
                            <th key={letra}>{letra}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {numeros.map(numero => (
                        <tr key={numero}>
                            <td>{numero}</td>
                            {letras.map(letra => (
                                <td key={letra} onClick={() => onClick(id, letra, numero)}>
                                    {/* Contenido de cada celda */}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default JuegoVsJugador;
