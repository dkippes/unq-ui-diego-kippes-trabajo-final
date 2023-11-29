import React, {useEffect, useMemo, useState} from 'react';
import HeaderNavigation from '../../components/HeaderNavigation.jsx';
import './styles/JuegoVsComputadora.css';
import {Juego} from "../../game/Juego.js";
import {useNavigate} from "react-router-dom";
import {incrementarVictorias} from "../../game/Victorias.js";
import ToastUtil from "../../utils/ToastUtil.js";

const JuegoVsComputadora = () => {
    const juego = useMemo(() => new Juego(), []);

    const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const navigate = useNavigate();

    const [tableroJugador, setTableroJugador] = useState(juego.jugador1.tablero);
    const [tableroComputadora, setTableroComputadora] = useState(juego.jugador2.tablero);
    const [inicioPartida, setInicioPartida] = useState(true);

    const [filaPortaviones, setFilaPortaviones] = useState('A');
    const [columnaPortaviones, setColumnaPortaviones] = useState('1');
    const [orientacionPortaviones, setOrientacionPortaviones] = useState('horizontal');
    const [portavionesColocado, setPortavionesColocado] = useState(false);

    const [filaCrucero, setFilaCrucero] = useState('A');
    const [columnaCrucero, setColumnaCrucero] = useState('1');
    const [orientacionCrucero, setOrientacionCrucero] = useState('horizontal');
    const [cruceroColocado, setCruceroColocado] = useState(false);

    const [filaSubmarino, setFilaSubmarino] = useState('A');
    const [columnaSubmarino, setColumnaSubmarino] = useState('1');
    const [orientacionSubmarino, setOrientacionSubmarino] = useState('horizontal');
    const [submarinoColocado, setSubmarinoColocado] = useState(false);

    const [filaLancha, setFilaLancha] = useState('A');
    const [columnaLancha, setColumnaLancha] = useState('1');
    const [orientacionLancha, setOrientacionLancha] = useState('horizontal');
    const [lanchaColocado, setLanchaColocado] = useState(false);

    useEffect(() => {
        let tableroOculto = ocultarTablero(juego.jugador2.tablero);
        setTableroJugador([...juego.jugador1.tablero]);
        setTableroComputadora(tableroOculto);
    }, [juego.jugador1.tablero, juego.jugador2.tablero]);

    useEffect(() => {
        let tableroOculto = ocultarTablero(juego.jugador2.tablero);
        setTableroComputadora(tableroOculto);
    }, [juego.jugador2.tablero]);

    useEffect(() => {
        setTableroJugador([...juego.jugador1.tablero]);
    }, [juego.jugador1.tablero]);


    const handlePortaviones = (e) => {
        e.preventDefault();

        // Verifica si la posición está disponible antes de colocar el barco
        if (juego.jugador1.esPosicionDisponible('portaaviones', filaPortaviones, columnaPortaviones, orientacionPortaviones)) {
            juego.jugador1.colocarBarco('portaaviones', filaPortaviones, columnaPortaviones, orientacionPortaviones);
            setTableroJugador(juego.jugador1.tablero);
            setInicioPartida(!juego.jugador1.barcosEnPosicion())
            setPortavionesColocado(true);
            ToastUtil.toastSuccess('Portaaviones colocado');
        } else {
            // Muestra un mensaje de error o toma otras medidas según sea necesario
            ToastUtil.toastError('No se puede colocar el portaaviones en esa posición, ocupa 5 celdas');
        }
    };

    const handleCrucero = (e) => {
        e.preventDefault();

        // Verifica si la posición está disponible antes de colocar el barco
        if (juego.jugador1.esPosicionDisponible('crucero', filaCrucero, columnaCrucero, orientacionCrucero)) {
            juego.jugador1.colocarBarco('crucero', filaCrucero, columnaCrucero, orientacionCrucero);
            setTableroJugador(juego.jugador1.tablero);
            setInicioPartida(!juego.jugador1.barcosEnPosicion())
            setCruceroColocado(true);
            ToastUtil.toastSuccess('Crucero colocado');
        } else {
            // Muestra un mensaje de error o toma otras medidas según sea necesario
            ToastUtil.toastError('No se puede colocar el crucero en esa posición, ocupa 4 celdas');
        }
    };

    const handleSubmarino = (e) => {
        e.preventDefault();

        // Verifica si la posición está disponible antes de colocar el barco
        if (juego.jugador1.esPosicionDisponible('submarino', filaSubmarino, columnaSubmarino, orientacionSubmarino)) {
            juego.jugador1.colocarBarco('submarino', filaSubmarino, columnaSubmarino, orientacionSubmarino);
            setTableroJugador(juego.jugador1.tablero);
            setInicioPartida(!juego.jugador1.barcosEnPosicion())
            setSubmarinoColocado(true);
            ToastUtil.toastSuccess('Submarino colocado');
        } else {
            // Muestra un mensaje de error o toma otras medidas según sea necesario
            ToastUtil.toastError('No se puede colocar el submarino en esa posición, ocupa 3 celdas');
        }
    };

    const handleLancha = (e) => {
        e.preventDefault();

        // Verifica si la posición está disponible antes de colocar el barco
        if (juego.jugador1.esPosicionDisponible('lancha', filaLancha, columnaLancha, orientacionLancha)) {
            juego.jugador1.colocarBarco('lancha', filaLancha, columnaLancha, orientacionLancha);
            setTableroJugador(juego.jugador1.tablero);
            setInicioPartida(!juego.jugador1.barcosEnPosicion())
            setLanchaColocado(true);
            ToastUtil.toastSuccess('Lancha colocado');
        } else {
            // Muestra un mensaje de error o toma otras medidas según sea necesario
            ToastUtil.toastError('No se puede colocar la lancha en esa posición, ocupa 2 celdas');
        }
    };

    const handleIniciarPartida = (e) => {
        e.preventDefault();
        juego.jugarContraComputadora();
        let tableroOculto = ocultarTablero(juego.jugador2.tablero);
        console.log(tableroOculto)
        console.log(juego.jugador2.tablero)
        setTableroComputadora(tableroOculto);
        setInicioPartida(true);
        ToastUtil.toastSuccess('Iniciando partida');
    };

    const ocultarTablero = (tablero) => {
        const tableroOculto = tablero.map((fila) => fila.slice());

        for (let i = 0; i < tableroOculto.length; i++) {
            for (let j = 0; j < tableroOculto[i].length; j++) {
                if (['P', 'C', 'S', 'L'].includes(tableroOculto[i][j])) {
                    // Ocultar letras P, C, S, L poniéndolas en null
                    tableroOculto[i][j] = null;
                }
            }
        }

        return tableroOculto.map((fila) => [...fila]);
    };

    const handleAtacar = (fila, columna) => {
        if (!juego.jugador2.puedeRecibirDano(fila, columna)) {
            ToastUtil.toastError('No puedes atacar esa posición');
        } else {
            juego.atacarComputadora(fila, columna);
            setTableroJugador([...juego.jugador1.tablero]);
            let tableroOculto = ocultarTablero(juego.jugador2.tablero);
            setTableroComputadora(tableroOculto);
            if (juego.jugador2.perdio()) {
                ToastUtil.toastSuccess('Ganaste')
                incrementarVictorias();
                navigate('/');
            }
            if (juego.jugador1.perdio()) {
                ToastUtil.toastError('Perdiste')
                navigate('/');
            }
        }
    };

    return (
        <>
            <HeaderNavigation />
            <form onSubmit={handlePortaviones}>
                <label>
                    Fila:
                    <select value={filaPortaviones} onChange={(e) => setFilaPortaviones(e.target.value)}>
                        {letras.map((letra) => (
                            <option key={letra} value={letra}>
                                {letra}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Columna:
                    <select value={columnaPortaviones} onChange={(e) => setColumnaPortaviones(e.target.value)}>
                        {numeros.map((numero) => (
                            <option key={numero} value={numero}>
                                {numero}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Orientación:
                    <select
                        value={orientacionPortaviones}
                        onChange={(e) => setOrientacionPortaviones(e.target.value)}
                    >
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </label>
                <button type="submit" disabled={portavionesColocado}>Colocar Portaviones</button>
            </form>
            <form onSubmit={handleCrucero}>
                <label>
                    Fila:
                    <select value={filaCrucero} onChange={(e) => setFilaCrucero(e.target.value)}>
                        {letras.map((letra) => (
                            <option key={letra} value={letra}>
                                {letra}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Columna:
                    <select value={columnaCrucero} onChange={(e) => setColumnaCrucero(e.target.value)}>
                        {numeros.map((numero) => (
                            <option key={numero} value={numero}>
                                {numero}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Orientación:
                    <select
                        value={orientacionCrucero}
                        onChange={(e) => setOrientacionCrucero(e.target.value)}
                    >
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </label>
                <button type="submit" disabled={cruceroColocado}>Colocar Crucero</button>
            </form>
            <form onSubmit={handleSubmarino}>
                <label>
                    Fila:
                    <select value={filaSubmarino} onChange={(e) => setFilaSubmarino(e.target.value)}>
                        {letras.map((letra) => (
                            <option key={letra} value={letra}>
                                {letra}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Columna:
                    <select value={columnaSubmarino} onChange={(e) => setColumnaSubmarino(e.target.value)}>
                        {numeros.map((numero) => (
                            <option key={numero} value={numero}>
                                {numero}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Orientación:
                    <select
                        value={orientacionSubmarino}
                        onChange={(e) => setOrientacionSubmarino(e.target.value)}
                    >
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </label>
                <button type="submit" disabled={submarinoColocado}>Colocar Submarino</button>
            </form>
            <form onSubmit={handleLancha}>
                <label>
                    Fila:
                    <select value={filaLancha} onChange={(e) => setFilaLancha(e.target.value)}>
                        {letras.map((letra) => (
                            <option key={letra} value={letra}>
                                {letra}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Columna:
                    <select value={columnaLancha} onChange={(e) => setColumnaLancha(e.target.value)}>
                        {numeros.map((numero) => (
                            <option key={numero} value={numero}>
                                {numero}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Orientación:
                    <select
                        value={orientacionLancha}
                        onChange={(e) => setOrientacionLancha(e.target.value)}
                    >
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                    </select>
                </label>
                <button type="submit" disabled={lanchaColocado}>Colocar Lancha</button>
            </form>
            <button onClick={handleIniciarPartida} disabled={inicioPartida}>Listo</button>
            <div className="tablero">
                <h2>Jugador</h2>
                <div className="filas-numero">
                    <div className="numero-celda"></div>
                    {numeros.map((numero) => (
                        <div key={numero} className="numero-celda">
                            {numero}
                        </div>
                    ))}
                </div>
                {letras.map((letra, fila) => (
                    <div key={letra} className="fila-letra">
                        <div className="letra-celda">{letra}</div>
                        {numeros.map((numero, columna) => (
                            <div
                                key={numero}
                                className="celda"
                            >
                                {tableroJugador[fila][columna]}
                            </div>
                        ))}
                    </div>
                ))}

                {/* Tablero de la Computadora */}
                <h2>Computadora</h2>
                <div className="filas-numero">
                    <div className="numero-celda"></div>
                    {numeros.map((numero) => (
                        <div key={numero} className="numero-celda">
                            {numero}
                        </div>
                    ))}
                </div>
                {letras.map((letra, fila) => (
                    <div key={letra} className="fila-letra">
                        <div className="letra-celda">{letra}</div>
                        {numeros.map((numero, columna) => (
                            <div
                                key={numero}
                                className="celda"
                                onClick={() => handleAtacar(letra, numero)}
                            >
                                {tableroComputadora[fila][columna]}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default JuegoVsComputadora;
