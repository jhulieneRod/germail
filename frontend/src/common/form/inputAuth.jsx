import React from 'react';

const inputAuth = props => (
    // <div className="form-group has-feedback">
    <div className="input-group mb-3">
        <input {...props.input}
            className='form-control'
            id={props.id}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            type={props.type} />
    </div>
)

export default inputAuth;
