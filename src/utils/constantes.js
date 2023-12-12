export const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
export const letrasBarco = ['portaaviones', 'crucero', 'submarino', 'lancha'];
export const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const checkSureste = (sur, este, tablero) => sur <= 9 && este <= 9 && !(tablero[este][sur] === null);
export const checkSuroeste = (sur, oeste, tablero) => sur <= 9 && oeste >= 0 && !(tablero[oeste][sur] === null);
export const checkNoreste = (norte, este, tablero) => norte >= 0 && este <= 9 && !(tablero[este][norte] === null);
export const checkNoroeste = (norte, oeste, tablero) => norte >= 0 && oeste >= 0 && !(tablero[oeste][norte] === null);
export const checkOeste = (oeste, posicionColumna, tablero) => oeste >= 0 && !(tablero[oeste][posicionColumna] === null);
export const checkEste = (este, posicionColumna, tablero) => este <= 9 && !(tablero[este][posicionColumna] === null);
export const checkSur = (sur, fila, tablero) => sur <= 9 && !(tablero[fila][sur] === null);
export const checkNorte = (norte, fila, tablero) => norte >= 0 && !(tablero[fila][norte] === null);
export const checkPosicionActual = (fila, posicionColumna, tablero) => (tablero[fila][posicionColumna] !== null);