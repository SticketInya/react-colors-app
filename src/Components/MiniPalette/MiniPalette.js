import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './MiniPalette.css';

class MiniPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { paletteName, emoji, colors, id } = this.props;
        const colorBoxes = colors.map((color) => {
            return (
                <div
                    key={id + color.name}
                    className='miniColor'
                    style={{ backgroundColor: color.color }}
                />
            );
        });
        return (
            <div className='MiniPalette'>
                <Link className='MiniPalette__link' to={`/palette/${id}`}>
                    <div className='MiniPalette__container'>
                        <div className='MiniPalette__colors'>{colorBoxes}</div>
                        <h2 className='MiniPalette__title'>
                            {paletteName}
                            <span className='emoji'>{emoji}</span>
                        </h2>
                    </div>
                </Link>
            </div>
        );
    }
}

export default MiniPalette;
