import Water from "../static/water.png";
import Fire from "../static/fire.png";

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


const checkSureste = (sur, este, tablero) => sur <= 9 && este <= 9 && !(tablero[este][sur] === null);

const checkSuroeste = (sur, oeste, tablero) => sur <= 9 && oeste >= 0 && !(tablero[oeste][sur] === null);

const checkNoreste = (norte, este, tablero) => norte >= 0 && este <= 9 && !(tablero[este][norte] === null);

const checkNoroeste = (norte, oeste, tablero) => norte >= 0 && oeste >= 0 && !(tablero[oeste][norte] === null);

const checkOeste = (oeste, posicionColumna, tablero) => oeste >= 0 && !(tablero[oeste][posicionColumna] === null);

const checkEste = (este, posicionColumna, tablero) => este <= 9 && !(tablero[este][posicionColumna] === null);

const checkSur = (sur, fila, tablero) => sur <= 9 && !(tablero[fila][sur] === null);

const checkNorte = (norte, fila, tablero) => norte >= 0 && !(tablero[fila][norte] === null);

const checkPosicionActual = (fila, posicionColumna, tablero) => (tablero[fila][posicionColumna] !== null);

export const checkPosicion = (fila, posicionColumna, norte, sur, este, oeste, tablero) => {
    if (checkPosicionActual(fila, posicionColumna, tablero)) {
        return false;
    }

    // Norte
    if (checkNorte(norte, fila, tablero)) {
        return false;
    }
    // Sur
    if (checkSur(sur, fila, tablero)) {
        return false;
    }
    // Este
    if (checkEste(este, posicionColumna, tablero)) {
        return false;
    }
    // Oeste
    if (checkOeste(oeste, posicionColumna, tablero)) {
        return false;
    }
    // Noroeste
    if (checkNoroeste(norte, oeste, tablero)) {
        return false;
    }
    // Noreste
    if (checkNoreste(norte, este, tablero)) {
        return false;
    }
    // Suroeste
    if (checkSuroeste(sur, oeste, tablero)) {
        return false;
    }
    // Sureste
    if (checkSureste(sur, este, tablero)) {
        return false;
    }
    return true;
}

export const filaYColumaDisponible = (fila, longitud) => {
    return fila + longitud > 10;
}