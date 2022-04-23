import React, { Component } from 'react';
import ColorBox from '../ColorBox/ColorBox';
import './ColorPalette.css';

class ColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const colorBoxes = this.props.colors.map((color) => (
            <ColorBox {...color} key={color.name} />
        ));
        return (
            <div className='ColorPalette'>
                <h1 className='ColorPalette__title'>
                    {this.props.paletteName}
                </h1>
                <div className='ColorPalette__colors'>{colorBoxes}</div>
            </div>
        );
    }
}

export default ColorPalette;
