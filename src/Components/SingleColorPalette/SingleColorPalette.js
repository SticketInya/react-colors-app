import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import { Link } from 'react-router-dom';

import './SingleColorPalette.css';

function SingleColorPalette({
    palette: { colors, paletteName, emoji, id: paletteId },
}) {
    const [colorFormat, setColorFormat] = useState('hex');
    const { colorId } = useParams();

    const getShades = (allColors, id) => {
        let shades = [];
        for (let level in allColors) {
            shades.push(allColors[level].find((color) => color.id === id));
        }
        return shades;
    };

    const handleFormatChange = (newFormat) => {
        setColorFormat(newFormat);
    };

    const shades = getShades(colors, colorId);
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
            <Navbar changeFormat={handleFormatChange} />
            <div className='SingleColorPalette__colors'>
                {colorBoxes}
                <div style={{ backgroundColor: 'black', position: 'relative' }}>
                    <Link
                        to={`../palette/${paletteId}`}
                        className='SingleColorPalette__back'
                    >
                        go back
                    </Link>
                </div>
            </div>
            <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
    );
}

export default SingleColorPalette;
