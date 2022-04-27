import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import './DraggableColorBox.css';

function DraggableColorBox({ color, name, deleteColor }) {
    const handleDelete = () => {
        deleteColor(name);
    };

    return (
        <div className='DraggableColorBox' style={{ backgroundColor: color }}>
            <div className='DraggableColorBox__content'>
                <span className='color-name'>{name}</span>
                <DeleteIcon className='delete-icon' onClick={handleDelete} />
            </div>
        </div>
    );
}

export default DraggableColorBox;
