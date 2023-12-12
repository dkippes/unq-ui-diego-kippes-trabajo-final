import React from 'react';

const ImagenBarco = ({ src, alt, onClick, blancoNegro }) => {
    const estiloImagen = {
        width: '50px',
        height: '50px',
        cursor: blancoNegro ? 'pointer' : 'default', // Cambia el cursor si blancoNegro es true
        filter: blancoNegro ? 'none' : 'grayscale(100%)', // Cambia el filtro si blancoNegro es true
        marginRight: '10px'
    };

    return (
        <img
            src={src}
            alt={alt}
            style={estiloImagen}
            onClick={onClick}
        />
    );
};

export default ImagenBarco;
