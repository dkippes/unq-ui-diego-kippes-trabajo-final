import {toast} from "react-toastify";

export const ocultarTablero = (tablero) => {
    const tableroOculto = tablero.map((fila) => fila.slice());

    for (let i = 0; i < tableroOculto.length; i++) {
        for (let j = 0; j < tableroOculto[i].length; j++) {
            if (['P', 'C', 'S', 'L'].includes(tableroOculto[i][j])) {
                tableroOculto[i][j] = null;
            }
        }
    }

    return tableroOculto.map((fila) => [...fila]);
};

export const determinarColorCelda = (contenido) => {
    switch (contenido) {
        case 'O':
            return 'orange';
        case 'X':
            return 'blue';
        case 'P':
            return 'gray';
        case 'C':
            return 'gray';
        case 'S':
            return 'gray';
        case 'L':
            return 'gray';
        default:
            return 'transparent';
    }
};

export const determinarColorCeldaOculta = (contenido) => {
    switch (contenido) {
        case 'O':
            return 'orange';
        case 'X':
            return 'blue';
        default:
            return 'transparent';
    }
};