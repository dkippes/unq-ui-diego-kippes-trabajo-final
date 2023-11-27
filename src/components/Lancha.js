class Lancha {
    constructor(fila, columna) {
        this.tipo = 'Lancha';
        this.longitud = 2;
        this.fila = fila || null;
        this.columna = columna || null;
    }

    colocarBarco(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
}

export default Lancha;