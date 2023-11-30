import {Jugador} from "./Jugador.js";
import {letras} from "../utils/constantes.js";

export class Juego {
    constructor() {
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.turno = 1; // Alternar entre turnos de los jugadores
    }

    atacarComputadora(fila, columna) {
        this.jugador2.recibirDano(fila, columna);
        do {
            fila = letras[Math.floor(Math.random() * letras.length)];
            columna = Math.floor(Math.random() * 10);
        } while (!this.jugador1.puedeRecibirDano(fila, columna));
        this.jugador1.recibirDano(fila, columna);
    }
    jugarContraComputadora() {
        this.jugador2.colocarBarcosAleatoriamente();
    }
}