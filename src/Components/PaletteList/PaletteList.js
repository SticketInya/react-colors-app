import React, { Component } from 'react';
import MiniPalette from '../MiniPalette/MiniPalette';
import { Link } from 'react-router-dom';

import './PaletteList.css';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { palettes } = this.props;
        return (
            <div className='PaletteList'>
                <div className='PaletteList__container'>
                    <nav className='PaletteList__nav'>
                        <h1 className='PaletteList__title'>
                            Flatter UI Colors
                        </h1>
                        <Link to='palette/new' className='PaletteList__new'>
                            Create Palette
                        </Link>
                    </nav>
                    <div className='PaletteList__miniPalettes'>
                        {palettes.map((palette) => (
                            <MiniPalette key={palette.id} {...palette} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default PaletteList;
