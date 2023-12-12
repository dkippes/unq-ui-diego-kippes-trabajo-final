import {Barco} from "./Barco.js";
import {letras} from "../utils/constantes.js";
import {checkPosicion, filaToNumber, filaYColumaDisponible, letraLogitud, tipoBarco} from "../utils/utils.js";

export class Jugador {
    constructor() {
        this.tablero = Array.from({ length: 10 }, () => Array(10).fill(null));
        this.barcos = {
            portaaviones: new Barco('Portaaviones', 5),
            crucero: new Barco('Crucero', 4),
            submarino: new Barco('Submarino', 3),
            lancha: new Barco('Lancha', 2),
        };
    }

    esPosicionDisponible(tipo, fila, columna, orientacion) {
        const longitud = this.barcos[tipo].longitud;
        const realRow = filaToNumber(fila);
        if (orientacion === 'horizontal') {
            return this.esPosicionDisponibleHorizontal(realRow, columna, longitud);
        } else {
            return this.esPosicionDisponibleVertical(realRow, columna, longitud);
        }
    }

    esPosicionDisponibleHorizontal(fila, columna, longitud) {
        if (filaYColumaDisponible(columna, longitud)) {
            return false;
        }

        for (let i = 0; i < longitud; i++) {
            const posicionColumna = columna + i;
            let norte = posicionColumna - 1;
            let sur = posicionColumna + 1;
            let este = fila + 1;
            let oeste = fila - 1;

            if (!checkPosicion(fila, posicionColumna, norte, sur, este, oeste, this.tablero)) {
                return false;
            }
        }
        return true;
    }
    esPosicionDisponibleVertical(fila, columna, longitud) {
        if (filaYColumaDisponible(fila, longitud)) {
            return false;
        }

        for (let i = 0; i < longitud; i++) {
            const posicionFila = fila + i;
            let norte = columna - 1;
            let sur = columna + 1;
            let este = posicionFila + 1;
            let oeste = posicionFila - 1;

            if (!checkPosicion(posicionFila, columna, norte, sur, este, oeste, this.tablero)) {
                return false;
            }
        }
        return true;
    }

    colocarBarco(tipo, fila, columna, orientacion) {
        const longitud = this.barcos[tipo].longitud;
        const realRow = filaToNumber(fila);
        if (orientacion === 'horizontal') {
            this.colocarBarcoHorizontal(tipo, realRow, columna, longitud);
        } else {
            this.colocarBarcoVertical(tipo, realRow, columna, longitud);
        }
    }

    colocarBarcoHorizontal(tipo, fila, columna, longitud) {
        const letra = letraLogitud(longitud);
        const nuevoTablero = this.tablero.map((filaActual) => [...filaActual]);

        // Reemplazar las posiciones específicas con la letra
        for (let i = 0; i < longitud; i++) {
            const posicionColumna = columna + i;
            nuevoTablero[fila][posicionColumna] = letra;
        }

        // Actualizar el tablero con la nueva copia
        this.tablero = nuevoTablero;
    }

    colocarBarcoVertical(tipo, fila, columna, longitud) {
        const letra = letraLogitud(longitud);
        const nuevoTablero = this.tablero.map((filaActual) => [...filaActual]);

        // Reemplazar las posiciones específicas con la letra
        for (let i = 0; i < longitud; i++) {
            const posicionFila = fila + i;
            nuevoTablero[posicionFila][columna] = letra;
        }

        // Actualizar el tablero con la nueva copia
        this.tablero = nuevoTablero;
    }

    colocarBarcosAleatoriamente() {
        let letrasBarco = ['portaaviones', 'crucero', 'submarino', 'lancha'];

        while (letrasBarco.length !== 0) {
            let tipo = letrasBarco[0];
            let orientacion = Math.random() < 0.5 ? 'horizontal' : 'vertical';
            let fila = letras[Math.floor(Math.random() * letras.length)];
            let columna = Math.floor(Math.random() * 10);
            if (this.esPosicionDisponible(tipo, fila, columna, orientacion)) {
                this.colocarBarco(tipo, fila, columna, orientacion);
                letrasBarco.shift();
            }
        }
    }

    barcosEnPosicion() {
        let contarBarcos = 0;
        for (let i = 0; i < this.tablero.length; i++) {
            for (let j = 0; j < this.tablero[i].length; j++) {
                if (this.tablero[i][j] !== null) {
                    contarBarcos++;
                }
            }
        }
        return contarBarcos === 14;
    }
    puedeRecibirDano(fila, columna) {
        const realRow = filaToNumber(fila);
        let letras = ['P', 'C', 'S', 'L'];
        let celda = this.tablero[realRow][columna];
        return celda === null || letras.includes(celda);
    }

    recibirDano(fila, columna) {
        const realRow = filaToNumber(fila);
        const letra = this.tablero[realRow][columna];
        if (letra === null) {
            this.tablero[realRow][columna] = 'X';
        } else {
            const tipo = tipoBarco(letra);
            this.barcos[tipo].recibirImpacto();
            this.tablero[realRow][columna] = 'O';
        }
    }

    perdio() {
        return Object.values(this.barcos).every(barco => barco.estaHundido());
    }
}