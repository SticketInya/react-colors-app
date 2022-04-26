import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
import { MenuItem, Select, Snackbar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

class Navbar extends Component {
    static defaultProps = {
        showSlider: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex',
            isOpen: false,
        };
    }

    handleChange = (e) => {
        const newFormat = e.target.value;
        this.setState({ format: newFormat, isOpen: true }, () => {
            this.props.changeFormat(newFormat);
        });
    };

    handleClose = () => {
        this.setState({ isOpen: false });
    };

    render() {
        const { colorLevel, handleSliderChange } = this.props;
        const closeButton = (
            <>
                <IconButton
                    size='small'
                    aria-label='close'
                    color='inherit'
                    onClick={this.handleClose}
                >
                    <CloseIcon fontSize='small' />
                </IconButton>
            </>
        );
        return (
            <nav className='Navbar'>
                <div className='Navbar__title'>
                    <Link to='/'>Flatter UI Colors</Link>
                </div>
                {this.props.showSlider && (
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
                )}
                <div className='Select_container'>
                    <Select defaultValue={'hex'} onChange={this.handleChange}>
                        <MenuItem value='hex'>HEX</MenuItem>
                        <MenuItem value='rgb'>RGB</MenuItem>
                        <MenuItem value='rgba'>RGBA</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    open={this.state.isOpen}
                    autoHideDuration={2000}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    onClose={this.handleClose}
                    message={'Format changed!'}
                    action={closeButton}
                />
            </nav>
        );
    }
}

export default Navbar;
