import React, { useState } from 'react';
import Grid from '../layout/grid';

const LabelAndInputAuthPass = props => {

    const [typeField, setTypeField] = useState('password');
    const [iconPass, setIconPass] = useState('fa-eye');

    function showPass() {
        setTypeField((typeField === 'password') ? 'input' : 'password');
        setIconPass((typeField === 'password') ? 'fa-eye-slash' : 'fa-eye');
    }

    // let gridStyle = (props.style) ? props.style : {};

    // if (props.wCol) gridStyle = { ...gridStyle, width: `${props.wCol}px` };

    return <Grid cols={props.cols} style={props.colsStyle} className={(props.className) ? props.className : ''}>
        <div className='form-group form-group-sm'>
            <label className='label-gt' htmlFor={props.name}>{props.label}</label>
            <div className='input-group mb-0'>
                <input {...props.input}
                    // style={gridStyle}
                    className='form-control'
                    placeholder={props.placeholder}
                    readOnly={props.readOnly}
                    type={typeField}
                />
                <div className="input-group-append">
                    <div className="input-group-text login_pass" style={{ backgroundColor: '#FFFFFF' }} title="Exibir senha" onClick={showPass}>
                        <i className={`fa icon-eye-close ${iconPass}`}></i>
                    </div>
                </div>
                {props.meta.touched && ((props.meta.error && <span className='msg_span'>{props.meta.error}</span>) || (props.meta.warning && <span className='msg_span'>{props.meta.warning}</span>))}
            </div>
        </div>
    </Grid>

}
export default LabelAndInputAuthPass;
