import React, { Component } from 'react';

class PreviewSingle extends Component {
    getImageURL() {
        return this.props.imageURL;
    }

    getTimeStamp() {
        return this.props.timestamp;
    }

    getKeywords() {
        return this.props.keywords;
    }

    getOnClickHandler() {
        return this.props.onClick;
    }

    render() {
        var keywords = this.getKeywords();
        var str = keywords.join();
        return (
            <div className="small-padding col-6 col-md-4 col-lg-3">
                <div className="btn preview-container card" onClick={this.getOnClickHandler()}>
                    <button className="card-img-top img-fluid btn btn-default preview-btn" style={
                        {
                            "background": `url(${this.getImageURL()})`,
                            "backgroundSize": "cover",
                            "backgroundPosition": "center",
                            "backgroundRepeat": "no-repeat",
                        }
                    }>
                    </button>
                    <div className="card-body preview-body">
                        <div className="preview-sub-body">
                        <p className="card-text preview-timestamp">{this.getTimeStamp()}</p>
                        <em className="card-text preview-weather">{str}</em>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PreviewSingle;
