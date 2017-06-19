import React from 'react';
import Spinner from './Spinner';

export default class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageStatus: props.source ? 'loading' : 'noimage',
            source: props.source
        };
    }
   
    setFileStatus(status) {
       this.setState({ imageStatus: status });
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props.source != nextProps.source) {
            this.setState({
                imageStatus: nextProps.source ? 'loading' : 'noimage'
            });
        }
    }
    
    componentDidMount() {
        this.timerID = setInterval(() => {
            this.handleImageChange();
        }, 1000);
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
    handleImageChange() {
        const date = new Date();
        const time = date.getTime();
        this.setState({ source: `${this.props.source}?${time}` });
    }
    
    render() {
        return (
            <div className="image-container">
                {(() => {
                    const status = {
                        'loading': () => {
                            return (<Spinner />);
                        },
                        'loaded': () => {
                            return null;
                        },
                        'failed': () => {
                            return (<p className="error-msg">Error al cargar la imagen</p>);
                        },
                        'noimage': () => {
                            return (<p className="error-msg">No hay imagen</p>);
                        }
                    }
                    return status[this.state.imageStatus]()
                })()}
                <img
                    className="image" 
                    src={this.state.source}
                    onLoad={this.setFileStatus.bind(this, 'loaded')}
                    onError={this.setFileStatus.bind(this, 'failed')}
                    style={this.state.imageStatus == 'loaded' ? {display: 'block'} : {display: 'none'}}
                />
            </div>
        );
    }
}