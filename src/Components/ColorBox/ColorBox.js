import React, { Component } from 'react';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div
                style={{ backgroundColor: this.props.color }}
                className='ColorBox'
            >
                {this.props.name}
            </div>
        );
    }
}

export default ColorBox;
