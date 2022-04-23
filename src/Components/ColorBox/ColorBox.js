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
                <div className='ColorBox__copy'>copy</div>
                <div className='btnContainer'>
                    <span className='btnContainer__color'>
                        {this.props.name}
                    </span>
                    <button className='btnContainer__more'>more</button>
                </div>
            </div>
        );
    }
}

export default ColorBox;
