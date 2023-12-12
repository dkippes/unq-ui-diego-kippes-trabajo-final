import {Jugador} from "./Jugador.js";
import {letras} from "../utils/constantes.js";

export class Juego {
    constructor() {
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.turno = 1;
    }

    cambiarTurno() {
        this.turno = (this.turno === 1) ? 2 : 1;
    }

    atacarComputadora(fila, columna) {
        if (this.turno === 1) {
            this.jugador2.recibirDano(fila, columna);
            this.cambiarTurno();
        }

        do {
            fila = letras[Math.floor(Math.random() * letras.length)];
            columna = Math.floor(Math.random() * 10);
        } while (!this.jugador1.puedeRecibirDano(fila, columna));

        this.jugador1.recibirDano(fila, columna);
        this.cambiarTurno();
    }

    jugarContraComputadora() {
        this.jugador2.colocarBarcosAleatoriamente();
    }
}
