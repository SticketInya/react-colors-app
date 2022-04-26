import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

import './ColorBox.css';

const WCAG_CONTRAST_RATIO = 4.5;

class ColorBox extends Component {
    static defaultProps = {
        showLink: true,
    };
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
        const { [this.props.format]: color } = this.props;
        const isDarkBgColor =
            chroma.contrast(color, 'black') < WCAG_CONTRAST_RATIO;
        const isLightBgColor =
            chroma.contrast(color, 'white') < WCAG_CONTRAST_RATIO;
        const darkTextStyle = isDarkBgColor
            ? { color: 'white' }
            : { color: 'black' };
        const lightTextStyle = isLightBgColor
            ? { color: 'black' }
            : { color: 'white' };

        return (
            <CopyToClipboard text={color} onCopy={this.handleCopy}>
                <div style={{ backgroundColor: color }} className='ColorBox'>
                    <div
                        className={`ColorBox__overlay ${isActive}`}
                        style={{ backgroundColor: color }}
                    ></div>
                    <div className={`Overlay__text ${isActive}`}>
                        <h2 className='Overlay__title'>copied!</h2>
                        <h4 className='Overlay__color' style={lightTextStyle}>
                            {color}
                        </h4>
                    </div>
                    <div className='ColorBox__CpyBtn'>copy</div>
                    <div className='btnContainer'>
                        <span
                            className='btnContainer__color'
                            style={darkTextStyle}
                        >
                            {this.props.name}
                        </span>
                        {this.props.showLink && (
                            <Link
                                to={`${this.props.id}`}
                                className='btnContainer__more'
                                style={lightTextStyle}
                                onClick={(e) => e.stopPropagation}
                            >
                                more
                            </Link>
                        )}
                    </div>
                </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;
