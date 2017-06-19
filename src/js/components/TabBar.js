import React from 'react';

export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
    }
    
    handleClick(index) {
        this.props.handleClick(event);
        this.setState({ selected: index });
    }
    
    render() {
        return (
            <ul className="page-nav-list">
                {
                    this.props.volcanoes.map((volcano, i) => {
                        var style = '';
                        
                        if (this.state.selected == i) {
                            style = 'active';
                        }
                        
                        return (
                            <li className="list-item">
                                <a
                                    href="#"
                                    className={style}
                                    onClick={this.handleClick.bind(this, i)}
                                    data-volcano={volcano.id}
                                >
                                    {volcano.title}
                                </a>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}