import React, { Component } from 'react';
import './PaletteFooter.css';

class PaletteFooter extends Component {
    render() {
        const { paletteName, emoji } = this.props;
        return (
            <div className='PaletteFooter'>
                <div className='PaletteFooter__name'>{paletteName}</div>
                <div className='PaletteFooter__emoji'>{emoji}</div>
            </div>
        );
    }
}

export default PaletteFooter;
