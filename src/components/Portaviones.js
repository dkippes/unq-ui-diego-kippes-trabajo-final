class Portaviones {
    constructor(fila, columna) {
        this.tipo = 'Portaviones';
        this.longitud = 5;
        this.fila = fila || null;
        this.columna = columna || null;
    }

    colocarBarco(fila, columna) {
        this.fila = fila;
        this.columna = columna;
    }
}

export default Portaviones;