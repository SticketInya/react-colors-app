import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ColorBox from '../ColorBox/ColorBox';

import './SingleColorPalette.css';

function SingleColorPalette({ palette: { colors } }) {
    const [colorFormat, setColorFormat] = useState('hex');
    const { colorId } = useParams();

    const getShades = (allColors, id) => {
        let shades = [];
        for (let level in allColors) {
            shades.push(allColors[level].find((color) => color.id === id));
        }
        return shades;
    };

    const shades = getShades(colors, colorId);
    console.log(shades);
    const colorBoxes = shades.map((shade) => {
        return (
            <ColorBox
                {...shade}
                format={colorFormat}
                key={shade.hex}
                showLink={false}
            />
        );
    });

    return (
        <div className='SingleColorPalette'>
            <h1 className='SingleColorPalette__title'>
                Single Color Page: {colorId}
            </h1>
            <div className='SingleColorPalette__colors'>{colorBoxes}</div>
        </div>
    );
}

export default SingleColorPalette;
