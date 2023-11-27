import './styles/HeaderNavigation.css';
import {useNavigate} from "react-router-dom";

const HeaderNavigation = () => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/');
    };

    return (
        <h3 onClick={handleNavigate} className="linkToHome">
            Ir a la Página Principal
        </h3>
    );
};

export default HeaderNavigation;
