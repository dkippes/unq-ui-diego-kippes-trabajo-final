import {Jugador} from "./Jugador.js";

export class Juego {
    constructor() {
        this.jugador1 = new Jugador();
        this.jugador2 = new Jugador();
        this.turno = 1; // Alternar entre turnos de los jugadores
    }

    atacarComputadora(fila, columna) {
        this.jugador2.recibirDano(fila, columna);
        const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        do {
            fila = letras[Math.floor(Math.random() * letras.length)];
            columna = Math.floor(Math.random() * 10);
        } while (!this.jugador1.puedeRecibirDano(fila, columna));
        this.jugador1.recibirDano(fila, columna);
    }

    tipoCelda(letra) {
        switch (letra) {
            case 'P': return 'portaaviones';
            case 'C': return 'crucero';
            case 'S': return 'submarino';
            case 'L': return 'lancha';
            default: return 'Agua';
        }
    }

    jugarContraComputadora() {
        this.jugador2.colocarBarcosAleatoriamente();
    }
}