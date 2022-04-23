import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import './ColorBox.css';

class ColorBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCopied: false,
        };
    }

    handleCopy = () => {
        this.setState({ isCopied: true }, () => {
            setTimeout(() => {
                this.setState({ isCopied: false });
            }, 1500);
        });
    };

    render() {
        const isActive = this.state.isCopied ? 'active' : 'hidden';
        const { hex: color } = this.props;
        return (
            <CopyToClipboard text={color} onCopy={this.handleCopy}>
                <div style={{ backgroundColor: color }} className='ColorBox'>
                    <div
                        className={`ColorBox__overlay ${isActive}`}
                        style={{ backgroundColor: color }}
                    ></div>
                    <div className={`Overlay__text ${isActive}`}>
                        <h2 className='Overlay__title'>copied!</h2>
                        <h4 className='Overlay__color'>{color}</h4>
                    </div>
                    <div className='ColorBox__CpyBtn'>copy</div>
                    <div className='btnContainer'>
                        <span className='btnContainer__color'>
                            {this.props.name}
                        </span>
                        <button className='btnContainer__more'>more</button>
                    </div>
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;
