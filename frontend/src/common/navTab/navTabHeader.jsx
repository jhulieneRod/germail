import React, { Component } from 'react';

class NavTabHeader extends Component {

    render() {
        return (
            <li className='nav-item' role='presentation'>
                <button
                    className={`nav-link ml-0 button_link ${this.props.className ? this.props.className : ''} ${this.props.selected ? 'active' : ''}`}//border-left-0
                    // id='tabHeaderModeloChecklist'
                    data-toggle='tab'
                    data-target={`#${this.props.target}`}
                    type='button'
                    role='tab'
                    aria-controls={this.props.target}
                    aria-selected={(this.props.selected !== undefined) ? this.props.selected : false}
                ><i className={`fa fa-${this.props.icon}`}></i> {this.props.label}</button>
            </li>
        )
    }
}

export default NavTabHeader