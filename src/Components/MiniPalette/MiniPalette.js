import React from 'react';
import { useNavigate } from 'react-router-dom';

//Mui
import DeleteIcon from '@mui/icons-material/Delete';

import './MiniPalette.css';

export default function MiniPalette({
    paletteName,
    emoji,
    colors,
    id,
    deletePalette,
}) {
    const navigate = useNavigate();
    const colorBoxes = colors.map((color) => {
        return (
            <div
                key={id + color.name}
                className='miniColor'
                style={{ backgroundColor: color.color }}
            />
        );
    });

    const goToPalette = () => {
        navigate(`/palette/${id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        deletePalette(id);
    };

    return (
        <div className='MiniPalette' onClick={goToPalette}>
            <DeleteIcon
                onClick={handleDelete}
                className='MiniPalette__delete'
            />
            <div className='MiniPalette__container'>
                <div className='MiniPalette__colors'>{colorBoxes}</div>
                <h2 className='MiniPalette__title'>
                    {paletteName}
                    <span className='emoji'>{emoji}</span>
                </h2>
            </div>
        </div>
    );
}
