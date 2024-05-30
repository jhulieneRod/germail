import React, { Component } from 'react';

class NavTabContent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: (this.props.selected !== undefined) ? this.props.selected : false
        }

    }


    render() {
        return (
            <div
                className={`tab-pane fade ${this.state.selected ? 'show active' : ''} `}
                id={this.props.id}
                role='tabpanel'
            // aria-labelledby='home-tab'
            >
                {this.props.children}
            </div>
        )
    }
}

export default NavTabContent;