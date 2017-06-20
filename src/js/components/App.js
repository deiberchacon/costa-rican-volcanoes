import React from 'react';
import ReactDOM from 'react-dom';
import TabBar from './TabBar';
import Image from './Image';
import Banner from './Banner';

const volcanoesData = [
    {
        title: 'Turrialba',
        cameras: [
            {
                id: 'turrialba',
                title: 'Cámara 1'
            },
            {
                id: 'irazu',
                title: 'Cámara 2'
            }
        ]
    },
    {
        title: 'Poás',
        cameras: [
            {
                id: 'poas',
                title: 'Cámara 1'
            },
            {
                id: 'craterpoas',
                title: 'Cámara 2'
            }
        ]
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'turrialba',
            volcanoUrl: 'http://www.ovsprivado.una.ac.cr/images/stories/liveturrialba/camara.jpg'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(e) {
        e.preventDefault();
        
        let volcano = e.target.getAttribute('data-volcano');
        this.setState({
            active: volcano,
            volcanoUrl: `http://www.ovsprivado.una.ac.cr/images/stories/live${volcano}/camara.jpg`,
        });
    }

    render() {
        return (
            <div className="page">
                <Banner />
                <header className="page-header">
                    <a href="https://deiberdev.github.io/costa-rican-volcanoes/" className="page-logo">
                        <h1 className="page-logo-title">Volcanes Costarricenses</h1>
                    </a>
                    <nav className="page-nav">
                        <TabBar handleClick={this.handleClick} active={this.state.active} volcanoes={volcanoesData} />
                    </nav>
                </header>
                <div className="page-container">
                    <Image source={this.state.volcanoUrl} />
                </div>
            </div>
        );
    }
}

var mountNode = document.getElementById('app');
ReactDOM.render(<App />, mountNode);