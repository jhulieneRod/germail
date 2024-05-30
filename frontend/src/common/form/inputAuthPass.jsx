import React from 'react';

const inputAuthPass = props => (

    <div className='input-group mb-3'>
        <input {...props.input}
            // data-toggle='password'
            className='form-control'
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            type={props.type}

        />

        <div className="input-group-append">
            <div className="input-group-text login_pass" style={{ backgroundColor: '#FFFFFF' }} title="Exibir senha" onClick={props.iconClick}>
                <i className={`fa icon-eye-close ${props.icon}`}></i>
            </div>
        </div>
    </div>
)
export default inputAuthPass;
