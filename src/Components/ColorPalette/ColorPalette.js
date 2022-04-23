import React, { Component } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import ColorBox from '../ColorBox/ColorBox';
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
                <div className='ColorPalette__navbar'>
                    <h1 className='ColorPalette__title'>
                        {this.props.palette.paletteName}
                    </h1>
                    <Slider
                        className='ColorPalette__slider'
                        defaultValue={this.state.colorLevel}
                        min={100}
                        max={900}
                        step={100}
                        onChange={this.handleSliderChange}
                    />
                </div>

                <div className='ColorPalette__colors'>{colorBoxes}</div>
            </div>
        );
    }
}

export default ColorPalette;
