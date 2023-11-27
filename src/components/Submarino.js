class Submarino {
    constructor(fila, columna) {
        this.tipo = 'Submarino';
        this.longitud = 3;
        this.fila = fila || null;
        this.columna = columna || null;
    }

    colocarBarco(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
}

export default Submarino;