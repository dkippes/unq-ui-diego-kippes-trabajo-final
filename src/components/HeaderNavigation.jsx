import './styles/HeaderNavigation.css';
import {useNavigate} from "react-router-dom";
import React, {useState} from "react";
import ModalAyuda from "./ModalAyuda.jsx";

const HeaderNavigation = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleNavigate = () => {
        navigate('/');
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="headerContainer">
                <div>
                    <h3 onClick={handleNavigate} className="headerLink">
                        Inicio
                    </h3>
                </div>
                <div>
                    <h3 onClick={handleOpenModal} className="headerLink">
                        Ayuda
                    </h3>
                    {isModalOpen && (
                        <ModalAyuda onClose={handleCloseModal}/>
                    )}
                </div>
            </div>

        </>

    );
};

export default HeaderNavigation;
