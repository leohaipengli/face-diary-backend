import React, { Component } from 'react';
import classNames from 'classnames/bind';
import './ProgressBar.css'

class ProgressBar extends Component {
    getValue() {
        return this.props.value * 100;
    }

    getType() {
        return this.props.type;
    }

    render() {
        var barClass = classNames({
            'progress-bar progress-bar-striped progress-bar-animated': true,
            'bars-red': this.getType() === 'anger',
            'bars-gray': this.getType() === 'contempt',
            'bars-brown': this.getType() === 'disgust',
            'bars-purple': this.getType() === 'surprise',
            'bars-orange': this.getType() === 'fear',
            'bars-green': this.getType() === 'happiness',
            'bars-light-blue': this.getType() === 'sadness',
            'bars-light-yellow': this.getType() === 'neutral',
        });

        return (
            <div className="container">
                <div className="row vcenter">
                    <div className="col-12 no-padding">
                        <em className="bar-description">{this.getType() + ": "}</em>
                    </div>
                    <div className="col-12 no-padding">
                        <div className="progress thick-bar">
                            <div className={barClass} role="progressbar" style={{width: this.getValue() + "%"}}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressBar;
