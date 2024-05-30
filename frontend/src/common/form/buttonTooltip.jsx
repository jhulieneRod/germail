import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const buttonTooltip = props => (

    <OverlayTrigger
        overlay={<Tooltip id={`${props.id}_tooltip`}>{props['data-title']}</Tooltip>}
        placement="top"
        delayShow={150}
        delayHide={50}
    >
        <button {...props}
            type={props.type}
            className={`btn btn-${props.className}`}
            disabled={props.disabled}
        >
            <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
        </button >
    </OverlayTrigger>
)

export default buttonTooltip;
