import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { palettes } = this.props;
        return (
            <div className='PaletteList'>
                <h1 className='PaletteList__title'>Flatter UI Colors</h1>
                <div className='PaletteList__container'>
                    {palettes.map((p) => {
                        return (
                            <Link key={p.id} to={`/palette/${p.id}`}>
                                {p.paletteName}
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PaletteList;
