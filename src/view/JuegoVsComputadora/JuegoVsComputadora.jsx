import React, {useEffect, useMemo, useState} from 'react';
import HeaderNavigation from '../../components/HeaderNavigation.jsx';
import './styles/JuegoVsComputadora.css';
import {Juego} from "../../game/Juego.js";
import {useNavigate} from "react-router-dom";
import {incrementarVictorias} from "../../game/Victorias.js";
import ToastUtil from "../../utils/ToastUtil.js";
import BarcoForm from "../../components/BarcoForm.jsx";
import BotonListo from "../../components/BotonList.jsx";
import {letras, numeros, letrasBarco} from "../../utils/constantes.js";
import {determinarColorCelda, determinarColorCeldaOculta, ocultarTablero} from "../../utils/utils.js";

const JuegoVsComputadora = () => {
    const juego = useMemo(() => new Juego(), []);

    const navigate = useNavigate();

    const [tableroJugador, setTableroJugador] = useState(juego.jugador1.tablero);
    const [tableroComputadora, setTableroComputadora] = useState(juego.jugador2.tablero);
    const [inicioPartida, setInicioPartida] = useState(true);
    const [juegoEnCurso, setJuegoEnCurso] = useState(false);

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

        if (juego.jugador1.esPosicionDisponible(letrasBarco[0], filaPortaviones, columnaPortaviones, orientacionPortaviones)) {
            juego.jugador1.colocarBarco(letrasBarco[0], filaPortaviones, columnaPortaviones, orientacionPortaviones);
            setTableroJugador(juego.jugador1.tablero);
            setInicioPartida(!juego.jugador1.barcosEnPosicion())
            setPortavionesColocado(true);
            ToastUtil.toastSuccess('Portaaviones colocado');
        } else {
            ToastUtil.toastError('No se puede colocar el portaaviones en esa posición, ocupa 5 celdas');
        }
    };

    const handleCrucero = (e) => {
        e.preventDefault();

        if (juego.jugador1.esPosicionDisponible(letrasBarco[1], filaCrucero, columnaCrucero, orientacionCrucero)) {
            juego.jugador1.colocarBarco(letrasBarco[1], filaCrucero, columnaCrucero, orientacionCrucero);
            setTableroJugador(juego.jugador1.tablero);
            setInicioPartida(!juego.jugador1.barcosEnPosicion())
            setCruceroColocado(true);
            ToastUtil.toastSuccess('Crucero colocado');
        } else {
            ToastUtil.toastError('No se puede colocar el crucero en esa posición, ocupa 4 celdas');
        }
    };

    const handleSubmarino = (e) => {
        e.preventDefault();

        if (juego.jugador1.esPosicionDisponible(letrasBarco[2], filaSubmarino, columnaSubmarino, orientacionSubmarino)) {
            juego.jugador1.colocarBarco(letrasBarco[2], filaSubmarino, columnaSubmarino, orientacionSubmarino);
            setTableroJugador(juego.jugador1.tablero);
            setInicioPartida(!juego.jugador1.barcosEnPosicion())
            setSubmarinoColocado(true);
            ToastUtil.toastSuccess('Submarino colocado');
        } else {
            ToastUtil.toastError('No se puede colocar el submarino en esa posición, ocupa 3 celdas');
        }
    };

    const handleLancha = (e) => {
        e.preventDefault();

        if (juego.jugador1.esPosicionDisponible(letrasBarco[3], filaLancha, columnaLancha, orientacionLancha)) {
            juego.jugador1.colocarBarco(letrasBarco[3], filaLancha, columnaLancha, orientacionLancha);
            setTableroJugador(juego.jugador1.tablero);
            setInicioPartida(!juego.jugador1.barcosEnPosicion())
            setLanchaColocado(true);
            ToastUtil.toastSuccess('Lancha colocado');
        } else {
            ToastUtil.toastError('No se puede colocar la lancha en esa posición, ocupa 2 celdas');
        }
    };

    const handleIniciarPartida = (e) => {
        e.preventDefault();
        juego.jugarContraComputadora();
        setTableroComputadora(ocultarTablero(juego.jugador2.tablero));
        setInicioPartida(true);
        setJuegoEnCurso(true)
        ToastUtil.toastSuccess('Iniciando partida');
    };

    const handleAtacar = (fila, columna) => {
        if (!juegoEnCurso) {
            ToastUtil.toastError('La partida no ha comenzado');
            return;
        }

        if (!juego.jugador2.puedeRecibirDano(fila, columna)) {
            ToastUtil.toastError('No puedes atacar esa posición');
        } else {
            juego.atacarComputadora(fila, columna);
            setTableroJugador([...juego.jugador1.tablero]);
            setTableroComputadora(ocultarTablero(juego.jugador2.tablero));
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
            <BarcoForm
                onSubmit={handlePortaviones}
                fila={filaPortaviones}
                setFila={setFilaPortaviones}
                columna={columnaPortaviones}
                setColumna={setColumnaPortaviones}
                orientacion={orientacionPortaviones}
                setOrientacion={setOrientacionPortaviones}
                barcoColocado={portavionesColocado}
                nombreBarco="Portaviones"
            />
            <BarcoForm
                onSubmit={handleCrucero}
                fila={filaCrucero}
                setFila={setFilaCrucero}
                columna={columnaCrucero}
                setColumna={setColumnaCrucero}
                orientacion={orientacionCrucero}
                setOrientacion={setOrientacionCrucero}
                barcoColocado={cruceroColocado}
                nombreBarco="Crucero"
            />
            <BarcoForm
                onSubmit={handleSubmarino}
                fila={filaSubmarino}
                setFila={setFilaSubmarino}
                columna={columnaSubmarino}
                setColumna={setColumnaSubmarino}
                orientacion={orientacionSubmarino}
                setOrientacion={setOrientacionSubmarino}
                barcoColocado={submarinoColocado}
                nombreBarco="Submarino"
            />
            <BarcoForm
                onSubmit={handleLancha}
                fila={filaLancha}
                setFila={setFilaLancha}
                columna={columnaLancha}
                setColumna={setColumnaLancha}
                orientacion={orientacionLancha}
                setOrientacion={setOrientacionLancha}
                barcoColocado={lanchaColocado}
                nombreBarco="Lancha"
            />
            <BotonListo onClick={handleIniciarPartida} disabled={inicioPartida} />
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
                                style={{ backgroundColor: determinarColorCelda(tableroJugador[fila][columna]) }}
                            >
                                {tableroJugador[fila][columna]}
                            </div>
                        ))}
                    </div>
                ))}

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
                                className="celda-clickeable"
                                style={{ backgroundColor: determinarColorCeldaOculta(tableroComputadora[fila][columna]) }}
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
