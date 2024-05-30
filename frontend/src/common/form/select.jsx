import React from 'react'

const select = props => (
    <select {...props.input}
        id={props.id}
        className={`form-control ${props.className}`}
        style={props.style}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        onChange={props.onChange}
        disabled={props.disabled}
        value={props.value}>

        {props.children}
    </select>
)

export default select;