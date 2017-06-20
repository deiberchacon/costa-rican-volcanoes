import React from 'react';
import jQuery from 'jquery';


export default class TabBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedParent: 0,
            selectedChildren: 0
        };
    }
    
    handleClick(parentIndex, childrenIndex) {
        this.props.handleClick(event);
        this.setState({ 
            selectedParent: parentIndex,
            selectedChildren: childrenIndex
        });
    }
    
    handleNavClick() {
        const e = event;
        e.preventDefault();
        e.stopPropagation();
        
        var dropdown = (jQuery(e.target).prop('tagName') != 'SPAN' ? jQuery(e.target).next() : jQuery(e.target).parent().next());
        dropdown.toggle();
        
        jQuery('html').click(function () {
            dropdown.hide();
        });
    }
    
    render() {
        return (
            <ul className="page-nav-list">
                {
                    this.props.volcanoes.map((volcano, i) => {
                        var styleParent = '';
                        
                        if (this.state.selectedParent == i) {
                            styleParent = 'active';
                        }
                        
                        return (
                            <li className="list-item">
                                <a
                                    href="#"
                                    className={styleParent}
                                    onClick={this.handleNavClick}
                                >
                                    {volcano.title} <span className="icon-chevron-down"></span>
                                </a>
                                <ul className="dropdown-list">
                                    {
                                        volcano.cameras.map((camera, j) => {
                                            var styleChildren = '';
                                            
                                            if (this.state.selectedParent == i && this.state.selectedChildren == j) {
                                                styleChildren = 'active';
                                            }
                                            
                                            return (
                                                <li className="list-item">
                                                    <a
                                                        href="#"
                                                        className={styleChildren}
                                                        onClick={this.handleClick.bind(this, i, j)}
                                                        data-volcano={camera.id}
                                                        >
                                                            {camera.title}
                                                    </a>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                        );
                    })
                }
            </ul>
        )
    }
}