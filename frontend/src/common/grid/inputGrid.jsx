import React from 'react'

const inputGrid = props => (
    <input {...props.input}
        id={props.id}
        className={props.className}
        style={props.style}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
        value={props.value}
        type={props.type}
    />
)

export default inputGrid;