import Water from "../static/water.png";
import Fire from "../static/fire.png";
import {
    checkEste,
    checkNoreste,
    checkNoroeste,
    checkNorte,
    checkOeste,
    checkPosicionActual,
    checkSur,
    checkSureste,
    checkSuroeste
} from "./constantes.js";

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

export const determinarImagenCelda = (contenido) => {
    switch (contenido) {
        case 'X':
            return 'url(' + Water + ')';
        case 'O':
            return 'url(' + Fire + ')';
        default:
            return null;
    }
}

export const tipoBarco = (letra) => {
    switch (letra) {
        case 'P':
            return 'portaaviones';
        case 'C':
            return 'crucero';
        case 'S':
            return 'submarino';
        case 'L':
            return 'lancha';
        default:
            return 'X';
    }
}

export const letraLogitud = (longitud) => {
    switch (longitud) {
        case 5:
            return 'P';
        case 4:
            return 'C';
        case 3:
            return 'S';
        case 2:
            return 'L';
        default:
            return 'X';
    }
}

export const filaToNumber = (fila) => {
    switch (fila) {
        case 'A':
            return 0;
        case 'B':
            return 1;
        case 'C':
            return 2;
        case 'D':
            return 3;
        case 'E':
            return 4;
        case 'F':
            return 5;
        case 'G':
            return 6;
        case 'H':
            return 7;
        case 'I':
            return 8;
        case 'J':
            return 9;
        default:
            return -1;
    }
}

export const checkPosicion = (fila, posicionColumna, norte, sur, este, oeste, tablero) => {
    return checkPosicionActual(fila, posicionColumna, tablero)
        || checkNorte(norte, fila, tablero) || checkSur(sur, fila, tablero)
        || checkEste(este, posicionColumna, tablero)
        || checkOeste(oeste, posicionColumna, tablero)
        || checkNoroeste(norte, oeste, tablero)
        || checkNoreste(norte, este, tablero)
        || checkSuroeste(sur, oeste, tablero)
        || checkSureste(sur, este, tablero);
}

export const filaYColumaDisponible = (fila, longitud) => {
    return fila + longitud > 10;
}