// BarcoForm.jsx
import React from 'react';
import { letras, numeros } from '../utils/constantes.js';  // Asegúrate de colocar la ruta correcta

const BarcoForm = ({
                       onSubmit,
                       fila,
                       setFila,
                       columna,
                       setColumna,
                       orientacion,
                       setOrientacion,
                       barcoColocado,
                       nombreBarco,
                   }) => (
    <form onSubmit={onSubmit}>
        <label>
            Fila:
            <select value={fila} onChange={(e) => setFila(e.target.value)}>
                {letras.map(letra => (
                    <option key={letra} value={letra}>
                        {letra}
                    </option>
                ))}
            </select>
        </label>
        <label>
            Columna:
            <select value={columna} onChange={(e) => setColumna(e.target.value)}>
                {numeros.map(numero => (
                    <option key={numero} value={numero}>
                        {numero}
                    </option>
                ))}
            </select>
        </label>
        <label>
            Orientación:
            <select value={orientacion} onChange={(e) => setOrientacion(e.target.value)}>
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
            </select>
        </label>
        <button type="submit" disabled={barcoColocado}>Colocar {nombreBarco}</button>
    </form>
);

export default BarcoForm;
