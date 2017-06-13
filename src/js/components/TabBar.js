import React from 'react';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.active
        };
        this.onClick = this.onClick.bind(this);
    }
    
    setActive() {
        this.setState({ selected: this.props.active });
    }

    isActive(volcanoItem) {
        return (volcanoItem === this.state.selected ? 'active' : null);
    }
    
    onClick(e) {
        this.setActive();
        this.props.handleClick(e);
    }
    
    render() {
        return (
            <ul className="page-nav-list">
                <li className="list-item">
                    <a 
                        href="javascript:(void);" 
                        className={ this.isActive('turrialba') } 
                        onClick={ this.onClick } 
                        data-volcano="turrialba" 
                    >
                        Turrialba
                    </a>
                </li>
                <li className="list-item">
                    <a 
                        href="javascript:(void);" 
                        className={ this.isActive('poas') } 
                        onClick={ this.onClick } 
                        data-volcano="poas" 
                    >
                        Poás
                    </a>
                </li>
            </ul>
        )
    }
}