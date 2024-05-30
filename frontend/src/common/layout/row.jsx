import React from 'react'

const row = props => (
    <div className={`row ${(props.className) ? props.className : ''}`} >{props.children}</div>
)

export default row;