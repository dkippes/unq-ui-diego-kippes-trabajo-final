import React, {useEffect, useMemo, useState} from 'react';
import HeaderNavigation from '../../components/HeaderNavigation.jsx';
import './styles/JuegoVsComputadora.css';
import {Juego} from '../../game/Juego.js';
import {incrementarVictorias} from '../../game/Victorias.js';
import ToastUtil from '../../utils/ToastUtil.js';
import ImagenBarco from '../../components/ImagenBarco.jsx';
import BotonJugar from '../../components/BotonJugar.jsx';
import {ocultarTablero,} from '../../utils/utils.js';
import {letras, letrasBarco, numeros} from '../../utils/constantes.js';
import Lancha from '../../static/lancha.png';
import Submarino from '../../static/submarino.png';
import Crucero from '../../static/crucero.png';
import Portaaviones from '../../static/portaaviones.png';
import ModalTermino from "../../components/ModalTermino.jsx";
import NumeroFila from "../../components/NumeroFila.jsx";
import TituloTablero from "../../components/TituloTablero.jsx";
import Celda from "../../components/Celda.jsx";
import CeldaOculta from "../../components/CeldaOculta.jsx";
import OrientacionSelector from "../../components/OrientacionSelector.jsx";

const JuegoVsComputadora = () => {
    const juego = useMemo(() => new Juego(), []);

    const [tableroJugador, setTableroJugador] = useState(juego.jugador1.tablero);
    const [tableroComputadora, setTableroComputadora] = useState(
        ocultarTablero(juego.jugador2.tablero)
    );
    const [inicioPartida, setInicioPartida] = useState(true);
    const [juegoEnCurso, setJuegoEnCurso] = useState(false);

    const [barcoSeleccionado, setBarcoSeleccionado] = useState(null);
    const [orientacionSeleccionada, setOrientacionSeleccionada] =
        useState('horizontal');

    const [barcosColocados, setBarcosColocados] = useState({
        Portaaviones: false,
        Crucero: false,
        Submarino: false,
        Lancha: false,
    });

    const [modalTermino, setModalTermino] = useState({showModal: false, estado: null});

    useEffect(() => {
        setTableroJugador([...juego.jugador1.tablero]);
        setTableroComputadora(juego.jugador2.tablero);
    }, [juego.jugador1.tablero, juego.jugador2.tablero]);

    useEffect(() => {
        setTableroJugador([...juego.jugador1.tablero]);
    }, [juego.jugador1.tablero]);

    const handleTableroClick = (fila, columna) => {
        let numeroColumna = parseInt(columna);
        let tipo = barcoSeleccionado?.[1];
        let numeroBarco = barcoSeleccionado?.[0];
        if (barcoSeleccionado) {
            if (
                juego.jugador1.esPosicionDisponible(
                    letrasBarco[numeroBarco],
                    fila,
                    numeroColumna,
                    orientacionSeleccionada
                )
            ) {
                juego.jugador1.colocarBarco(
                    letrasBarco[numeroBarco],
                    fila,
                    numeroColumna,
                    orientacionSeleccionada
                );
                setTableroJugador([...juego.jugador1.tablero]);
                setInicioPartida(!juego.jugador1.barcosEnPosicion());
                setBarcoColocado(tipo);
                ToastUtil.toastSuccess(`${tipo} colocado`);
                setBarcoSeleccionado(null);
            } else {
                ToastUtil.toastError(`No se puede colocar el ${tipo} en esa posición`);
            }
        }
    };

    const setBarcoColocado = (tipo) => {
        setBarcosColocados((prevColocados) => ({...prevColocados, [tipo]: true}));
    };

    const handleIniciarPartida = (e) => {
        e.preventDefault();
        juego.jugarContraComputadora();
        setTableroComputadora(juego.jugador2.tablero);
        setInicioPartida(true);
        setJuegoEnCurso(true);
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
            setTableroComputadora(juego.jugador2.tablero);
            if (juego.jugador2.perdio()) {
                incrementarVictorias();
                setModalTermino({showModal: true, estado: 'Ganaste'});
            } else if (juego.jugador1.perdio()) {
                setModalTermino({showModal: true, estado: 'Perdiste'});
            }
        }
    };

    const handleSelectChange = (e) => {
        setOrientacionSeleccionada(e.target.value);
    };


    const handleImagenClick = (barco) => {
        const [, tipoBarco] = barco;

        if (barcosColocados[tipoBarco]) {
            ToastUtil.toastError(`El ${tipoBarco.toLowerCase()} ya ha sido colocado`);
            return;
        }
        ToastUtil.toastSuccess(`Se selecciono ${tipoBarco.toLowerCase()}`);

        setBarcoSeleccionado(barco);
    };

    return (
        <>
            <HeaderNavigation/>
            <div className="juego-vs-computadora">
                {!juegoEnCurso && (
                    <div className="formulario-container">
                        <ImagenBarco
                            src={Portaaviones}
                            alt="Portaaviones"
                            onClick={(e) => handleImagenClick([0, 'Portaaviones'])}
                            blancoNegro={!barcosColocados.Portaaviones}
                            disabled={barcosColocados.Portaaviones}
                        />
                        <ImagenBarco
                            src={Crucero}
                            alt="Crucero"
                            onClick={(e) => handleImagenClick([1, 'Crucero'])}
                            blancoNegro={!barcosColocados.Crucero}
                            disabled={!barcosColocados.Crucero}
                        />
                        <ImagenBarco
                            src={Submarino}
                            alt="Submarino"
                            onClick={(e) => handleImagenClick([2, 'Submarino'])}
                            blancoNegro={!barcosColocados.Submarino}
                            disabled={!barcosColocados.Submarino}
                        />
                        <ImagenBarco
                            src={Lancha}
                            alt="Lancha"
                            onClick={(e) => handleImagenClick([3, 'Lancha'])}
                            blancoNegro={!barcosColocados.Lancha}
                            disabled={!barcosColocados.Lancha}
                        />
                        <OrientacionSelector handleSelectChange={handleSelectChange}/>
                        <div>
                            <BotonJugar onClick={handleIniciarPartida} disabled={inicioPartida}/>
                        </div>
                    </div>
                )}
                <div className="tablero-container">
                    <div
                        className="tablero"
                        onClick={(e) =>
                            handleTableroClick(e.target.dataset.fila, e.target.dataset.columna)
                        }
                    >
                        <TituloTablero titulo={"Jugador"}/>
                        <NumeroFila numeros={numeros}/>
                        {letras.map((letra, fila) => (
                            <div key={letra} className="fila-letra">
                                <div className="letra-celda">{letra}</div>
                                {numeros.map((numero, columna) => (
                                    <Celda
                                        key={numero}
                                        letra={letra}
                                        numero={numero}
                                        tablero={tableroJugador}
                                        fila={fila}
                                        columna={columna}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="tablero">
                        <TituloTablero titulo={"Computadora"}/>
                        <NumeroFila numeros={numeros}/>
                        {letras.map((letra, fila) => (
                            <div key={letra} className="fila-letra">
                                <div className="letra-celda">{letra}</div>
                                {numeros.map((numero, columna) => (
                                    <CeldaOculta
                                        key={numero}
                                        letra={letra}
                                        numero={numero}
                                        tablero={tableroComputadora}
                                        fila={fila}
                                        columna={columna}
                                        handleAtacar={handleAtacar}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                {modalTermino.showModal && (
                    <ModalTermino estado={modalTermino.estado}/>
                )}
            </div>
        </>
    );
};

export default JuegoVsComputadora;
