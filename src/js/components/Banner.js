import React from 'react';

export default class Banner extends React.Component {
    render() {
        return (
            <div className="banner">
                <span className="banner-line blue"></span>
                <span className="banner-line white"></span>
                <span className="banner-line red"></span>
                <span className="banner-line red"></span>
                <span className="banner-line white"></span>
                <span className="banner-line blue"></span>
            </div>
        );
    }
}