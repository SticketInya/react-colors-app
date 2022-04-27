import React from 'react';

import './DraggableColorBox.css';

function DraggableColorBox({ color }) {
    return (
        <div
            className='DraggableColorBox'
            style={{ color: 'white', backgroundColor: color }}
        >
            {color}
        </div>
    );
}

export default DraggableColorBox;
