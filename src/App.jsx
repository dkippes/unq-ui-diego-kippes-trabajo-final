import {useState} from 'react'
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import JuegoVsJugador from "./view/JuegoVsJugador/JuegoVsJugador.jsx";
import JuegoVsComputadora from "./view/JuegoVsComputadora/JuegoVsComputadora.jsx";
import HomePage from "./view/HomePage/HomePage.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route exact
                           path="/"
                           element={<HomePage/>}
                    />
                    <Route exact
                           path="/vs-computadora"
                           element={<JuegoVsComputadora/>}
                    />
                    <Route exact
                           path="/vs-jugador"
                           element={<JuegoVsJugador/>}
                    />
                </Routes>
            </BrowserRouter>
            <ToastContainer position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            draggable
                            theme="dark"
                            style={{whiteSpace: "pre-line"}}/>
        </>
    );
}

export default App
