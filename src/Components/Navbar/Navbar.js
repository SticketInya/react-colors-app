import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import { MenuItem, Select } from '@mui/material';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex',
        };
    }

    handleChange = (e) => {
        const newFormat = e.target.value;
        this.setState({ format: newFormat }, () => {
            this.props.changeFormat(newFormat);
        });
    };

    render() {
        const { paletteName, colorLevel, handleSliderChange } = this.props;
        const { format } = this.state;
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
                <div className='Select_container'>
                    <Select defaultValue={'hex'} onChange={this.handleChange}>
                        <MenuItem value='hex'>HEX</MenuItem>
                        <MenuItem value='rgb'>RGB</MenuItem>
                        <MenuItem value='rgba'>RGBA</MenuItem>
                    </Select>
                </div>
            </nav>
        );
    }
}

export default Navbar;
