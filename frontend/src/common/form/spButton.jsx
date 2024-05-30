import React, { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import './form.css';

class SPButton extends Component {

    render() {
        if (this.props['data-title']) {
            return (
                <OverlayTrigger
                    overlay={<Tooltip id={`${this.props.id}_tooltip`}>{this.props['data-title']}</Tooltip>}
                    placement="top"
                    delayShow={150}
                    delayHide={50}
                >
                    <button {...this.props}
                        type={this.props.type}
                        className={`btn btn-${this.props.className} button-size`}
                    >
                        <i className={`fas fa-${this.props.icon} icon-size`} />
                        {/* <div className={`fa fa-${props.icon} icon-size ${props['data-icon']}`} icon={props.icon} ></div> */}
                    </button>
                </OverlayTrigger>
                )
        } else {
            return (
                <button {...this.props}
                    type={this.props.type}
                    className={`btn btn-${this.props.className} button-size`}
                >                    
                    
                    <i className={`fas fa-${this.props.icon} icon-size`} />
                    {/* <div className={`fa fa-${props.icon} icon-size ${props['data-icon']}`} icon={props.icon} ></div> */}
                </button>)
        }
    }
}

export default SPButton;