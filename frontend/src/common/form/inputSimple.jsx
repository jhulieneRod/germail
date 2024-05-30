import React from 'react'

const inputSimple = props => (
    <input {...props.input}
        id={props.id}
        className={`form-control ${props.className}`}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        // onChange={props.onChange}
        disabled={props.disabled}
        // value={props.value}
        type={props.type}
    />
)

export default inputSimple;