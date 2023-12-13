import React from 'react'
import HeaderNavigation from "../../components/HeaderNavigation.jsx";
import './styles/JuegoVsJugador.css';
import Imagen from "../../components/Imagen.jsx";
import Trabajando from "../../static/trabajando.png";

const JuegoVsJugador = () => {
    return (
        <>
            <HeaderNavigation/>
            <div className="juego-vs-jugador">
                <div className="mensaje-desarrollo">
                    <h1 className="text-title-desarrollo">¡Estamos Trabajando en Algo Genial!</h1>
                    <p className="text-sub-desarrollo">¡Apreciamos tu interés y paciencia!</p>
                    <p className="text-sub-desarrollo">Estamos dedicando todo nuestro esfuerzo para crear una
                        experiencia increíble.</p>
                    <p className="text-sub-desarrollo">¡Regresa pronto para disfrutar al máximo del juego!</p>
                    <Imagen src={Trabajando} alt="Trabajando" className="imagen-desarrollo"/>
                </div>
            </div>
        </>
    );
};

export default JuegoVsJugador;
