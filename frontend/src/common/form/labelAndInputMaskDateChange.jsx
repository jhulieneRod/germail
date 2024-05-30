import React, { Component } from 'react';
import Grid from '../layout/grid';
import InputMask from 'react-input-mask';

const LabelAndInputMaskDateChange = props => {
    return (
        <Grid cols={props.cols}>
            <div className='form-group form-group-sm'>
                <label className='label-gt' htmlFor={props.name}>{props.label}</label>
                <InputMask
                    className={`form-control`}
                    placeholder={props.placeholder}
                    readOnly={props.readOnly}
                    type={props.type}
                    id={props.id}
                    min={props.min}
                    max={props.max}
                    maxLength={props.maxLength}
                    step={props.step}
                    // value={props.value}
                    // value={props.defaultValue}
                    // defaultValue={props.defaultValue}
                    onBlur={props.onBlur}
                    onKeyDown={props.onKeyDown}
                    autoFocus={props.autoFocus}

                    mask={props.mask}
                    value={props.value}
                    onChange={props.onChange}
                >
                </InputMask>
            </div>
        </Grid>
    )
}

export default LabelAndInputMaskDateChange;