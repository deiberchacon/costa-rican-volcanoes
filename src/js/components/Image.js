import React from 'react';
import Spinner from './Spinner';

export default class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUpdate: this.props.source,
            loading: true
        };
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
    }
    
    componentDidMount() {
        this.timerID = setInterval(
            () => this.handleImageChange(),
            1000
        );
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    handleImageLoaded() {
        if (this.state.loading) {
            this.setState({ loading: false });
        }
    }
    
    handleImageError() {
        this.setState({ imageUpdate: this.props.source });
    }
    
    handleImageChange() {
        let date = new Date();
        let time = date.getTime();
        this.setState({ imageUpdated: `${this.props.source}?${time}` });
    }
    
    render() {
        return (
            <div>
                <img 
                    className="image" 
                    src={this.state.imageUpdated} 
                    onLoad={this.handleImageLoaded.bind(this)} 
                    onError={this.handleImageError.bind(this)} 
                />
                { this.state.loading ? <Spinner /> : null }
            </div>
        ); 
        
    }
}