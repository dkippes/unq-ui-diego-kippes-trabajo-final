// BotonListo.jsx
import React from 'react';

const BotonListo = ({ onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled}>
        Listo
    </button>
);

export default BotonListo;
