import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import PaletteFooter from '../PaletteFooter/PaletteFooter';

import './ColorPalette.css';

class ColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorLevel: 500,
            colorFormat: 'hex',
        };
    }

    handleSliderChange = (newLevel) => {
        this.setState({ colorLevel: newLevel });
    };

    handleFormatChange = (newFormat) => {
        this.setState({ colorFormat: newFormat });
    };

    render() {
        const { colors, paletteName, emoji } = this.props.palette;
        const { colorLevel, colorFormat } = this.state;
        const colorBoxes = colors[colorLevel].map((color) => (
            <ColorBox {...color} key={color.id} format={colorFormat} />
        ));
        return (
            <div className='ColorPalette'>
                <Navbar
                    paletteName={paletteName}
                    colorLevel={colorLevel}
                    handleSliderChange={this.handleSliderChange}
                    changeFormat={this.handleFormatChange}
                />
                <div className='ColorPalette__colors'>{colorBoxes}</div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
            </div>
        );
    }
}

export default ColorPalette;
