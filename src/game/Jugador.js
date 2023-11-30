import {Barco} from "./Barco.js";
import {letras} from "../utils/constantes.js";

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
        const letras = ['P', 'C', 'S', 'L'];
        const longitud = this.barcos[tipo].longitud;
        const letra = this.letra(longitud);
        const letrasFiltradas = letras.filter(l => l !== letra);
        const realRow = this.filaToNumber(fila);
        const realColumn = columna - 1;
        if (orientacion === 'horizontal') {
            return this.esPosicionDisponibleHorizontal(realRow, letra, letrasFiltradas, realColumn, longitud);
        } else {
            return this.esPosicionDisponibleVertical(realRow, letra, letrasFiltradas, realColumn, longitud);
        }
    }

    esPosicionDisponibleHorizontal(fila, letra, letras, columna, longitud) {
        if (columna + longitud > 10) {
            return false;
        }

        // Verificar si las posiciones están vacías
        for (let i = 0; i < longitud; i++) {
            const posicionColumna = columna + i;
            let norte = posicionColumna - 1;
            let sur = posicionColumna + 1;
            let este = fila + 1;
            let oeste = fila - 1;

            // Verificar si la posición está ocupada
            if (this.tablero[fila][posicionColumna] !== null) {
                return false;
            }

            // Norte
            if (norte >= 0 && !(this.tablero[fila][norte] === null)) {
                return false;
            }
            // Sur
            if (sur <= 9 && !(this.tablero[fila][sur] === null)) {
                return false;
            }
            // Este
            if (este <= 9 && !(this.tablero[este][posicionColumna] === null)) {
                return false;
            }
            // Oeste
            if (oeste >= 0 && !(this.tablero[oeste][posicionColumna] === null)) {
                return false;
            }
            // Noroeste
            if (norte >= 0 && oeste >= 0 && !(this.tablero[oeste][norte] === null)) {
                return false;
            }
            // Noreste
            if (norte >= 0 && este <= 9 && !(this.tablero[este][norte] === null)) {
                return false;
            }
            // Suroeste
            if (sur <= 9 && oeste >= 0 && !(this.tablero[oeste][sur] === null)) {
                return false;
            }
            // Sureste
            if (sur <= 9 && este <= 9 && !(this.tablero[este][sur] === null)) {
                return false;
            }
        }
        return true;
    }


    esPosicionDisponibleVertical(fila, letra, letras, columna, longitud) {
        if (fila + longitud > 10) {
            return false;
        }

        // Verificar si las posiciones están vacías
        for (let i = 0; i < longitud; i++) {
            const posicionFila = fila + i;
            let norte = columna - 1;
            let sur = columna + 1;
            let este = posicionFila + 1;
            let oeste = posicionFila - 1;

            // Verificar si la posición está ocupada
            if (this.tablero[posicionFila][columna] !== null) {
                return false;
            }

            // Norte
            if (norte >= 0 && !(this.tablero[posicionFila][norte] === null)) {
                return false;
            }
            // Sur
            if (sur <= 9 && !(this.tablero[posicionFila][sur] === null)) {
                return false;
            }
            // Este
            if (este <= 9 && !(this.tablero[este][columna] === null)) {
                return false;
            }
            // Oeste
            if (oeste >= 0 && !(this.tablero[oeste][columna] === null)) {
                return false;
            }
            // Noroeste
            if (norte >= 0 && oeste >= 0 && !(this.tablero[oeste][norte] === null)) {
                return false;
            }
            // Noreste
            if (norte >= 0 && este <= 9 && !(this.tablero[este][norte] === null)) {
                return false;
            }
            // Suroeste
            if (sur <= 9 && oeste >= 0 && !(this.tablero[oeste][sur] === null)) {
                return false;
            }
            // Sureste
            if (sur <= 9 && este <= 9 && !(this.tablero[este][sur] === null)) {
                return false;
            }
        }
        return true;
    }

    colocarBarco(tipo, fila, columna, orientacion) {
        const longitud = this.barcos[tipo].longitud;
        const realColumn = columna - 1;
        const realRow = this.filaToNumber(fila);
        if (orientacion === 'horizontal') {
            this.colocarBarcoHorizontal(tipo, realRow, realColumn, longitud);
        } else {
            this.colocarBarcoVertical(tipo, realRow, realColumn, longitud);
        }
    }

    colocarBarcoHorizontal(tipo, fila, columna, longitud) {
        const letra = this.letra(longitud);
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
        const letra = this.letra(longitud);
        const nuevoTablero = this.tablero.map((filaActual) => [...filaActual]);

        // Reemplazar las posiciones específicas con la letra
        for (let i = 0; i < longitud; i++) {
            const posicionFila = fila + i;
            nuevoTablero[posicionFila][columna] = letra;
        }

        // Actualizar el tablero con la nueva copia
        this.tablero = nuevoTablero;
    }

    filaToNumber(fila) {
        switch (fila) {
            case 'A': return 0;
            case 'B': return 1;
            case 'C': return 2;
            case 'D': return 3;
            case 'E': return 4;
            case 'F': return 5;
            case 'G': return 6;
            case 'H': return 7;
            case 'I': return 8;
            case 'J': return 9;
            default: return -1;
        }
    }

    letra(longitud) {
        switch (longitud) {
            case 5: return 'P';
            case 4: return 'C';
            case 3: return 'S';
            case 2: return 'L';
            default: return 'X';
        }
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
        const realRow = this.filaToNumber(fila);
        const realColumn = columna - 1;
        let letras = ['P', 'C', 'S', 'L'];
        let celda = this.tablero[realRow][realColumn];
        return celda === null || letras.includes(celda);
    }

    recibirDano(fila, columna) {
        const realRow = this.filaToNumber(fila);
        const realColumn = columna - 1;
        const letra = this.tablero[realRow][realColumn];
        if (letra === null) {
            this.tablero[realRow][realColumn] = 'X';
        } else {
            const tipo = this.tipoBarco(letra);
            this.barcos[tipo].recibirImpacto();
            this.tablero[realRow][realColumn] = 'O';
        }
    }

    tipoBarco(letra) {
        switch (letra) {
            case 'P': return 'portaaviones';
            case 'C': return 'crucero';
            case 'S': return 'submarino';
            case 'L': return 'lancha';
            default: return 'X';
        }
    }

    perdio() {
        return Object.values(this.barcos).every(barco => barco.estaHundido());
    }
}