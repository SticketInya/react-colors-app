import React from 'react';

import './DraggableColorBox.css';

function DraggableColorBox({ color, name }) {
    return (
        <div
            className='DraggableColorBox'
            style={{ color: 'white', backgroundColor: color }}
        >
            {name}
        </div>
    );
}

export default DraggableColorBox;
