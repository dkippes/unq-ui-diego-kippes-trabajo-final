import React from 'react';

const OrientacionSelector = ({handleSelectChange}) => {
    return (
        <div>
            <select
                id="orientacionSelect"
                className="selector"
                onChange={handleSelectChange}
            >
                <option value="horizontal">Horizontal</option>
                <option value="vertical">Vertical</option>
            </select>
        </div>
    );
};

export default OrientacionSelector;
