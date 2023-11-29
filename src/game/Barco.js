export class Barco {
    constructor(tipo, longitud) {
        this.tipo = tipo;
        this.longitud = longitud;
        this.impactosRecibidos = 0;
    }

    recibirImpacto() {
        this.impactosRecibidos += 1;
    }

    estaHundido() {
        return this.impactosRecibidos === this.longitud;
    }
}