import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';

import './ColorPalette.css';

class ColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorLevel: 500,
        };
    }

    handleSliderChange = (newLevel) => {
        this.setState({ colorLevel: newLevel });
    };

    render() {
        const { colors } = this.props.palette;
        const { colorLevel } = this.state;
        const colorBoxes = colors[colorLevel].map((color) => (
            <ColorBox {...color} key={color.id} />
        ));
        return (
            <div className='ColorPalette'>
                <Navbar
                    paletteName={this.props.palette.paletteName}
                    colorLevel={colorLevel}
                    handleSliderChange={this.handleSliderChange}
                />
                <div className='ColorPalette__colors'>{colorBoxes}</div>
            </div>
        );
    }
}

export default ColorPalette;
