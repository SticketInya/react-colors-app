import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {
    render() {
        const { paletteName, colorLevel, handleSliderChange } = this.props;
        return (
            <nav className='Navbar'>
                <div className='Navbar__title'>
                    <Link to='/'>{paletteName}</Link>
                </div>
                <div className='Slider-container'>
                    <p className='Slider-level'>level: {colorLevel}</p>
                    <Slider
                        className='Navbar__slider'
                        defaultValue={colorLevel}
                        min={100}
                        max={900}
                        step={100}
                        onChange={handleSliderChange}
                    />
                </div>
            </nav>
        );
    }
}

export default Navbar;
