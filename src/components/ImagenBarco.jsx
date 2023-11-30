import React from 'react';

const ImagenBarco = ({ src, alt }) => {
    const estiloImagen = {
        width: '50px',  // Puedes ajustar el tamaño según tus necesidades
        height: '50px', // Puedes ajustar el tamaño según tus necesidades
    };

    return (
        <img
            src={src}
            alt={alt}
            style={estiloImagen}
        />
    );
};

export default ImagenBarco;
