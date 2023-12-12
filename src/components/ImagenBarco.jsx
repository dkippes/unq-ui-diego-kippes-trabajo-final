import React from 'react';

const ImagenBarco = ({src, alt, onClick, blancoNegro}) => {
    const estiloImagen = {
        width: '50px',
        height: '50px',
        cursor: blancoNegro ? 'pointer' : 'default',
        filter: blancoNegro ? 'none' : 'grayscale(100%)',
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
