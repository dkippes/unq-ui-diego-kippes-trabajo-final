class Crucero {
    constructor(fila, columna) {
        this.tipo = 'Crucero';
        this.longitud = 4;
        this.fila = fila || null;
        this.columna = columna || null;
    }

    colocarBarco(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
}

export default Crucero;