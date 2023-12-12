let victorias = parseInt(localStorage.getItem('victorias')) || 0;

export function incrementarVictorias() {
    victorias++;
    localStorage.setItem('victorias', victorias.toString());
}

export function getVictorias() {
    return victorias;
}

export function resetVictorias() {
    victorias = 0;
    localStorage.setItem('victorias', '0');
}