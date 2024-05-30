import React from 'react'
import Grid from '../layout/grid'

const labelCheckbox = props => (
    <Grid cols={props.cols}>       
        <div className='form-group form-group-sm'>
            <label className='label-gt' htmlFor={props.name}></label>

            <div className='checkbox'>
                <label className='label-gt' >
                    <input {...props.input}
                        readOnly={props.readOnly}
                        type='checkbox'
                        id={props.id}
                        style={{ marginTop: '3px' }}
                        className={`form-check-input label_checkbox ${(props.className) ? props.className : ''}`}
                        disabled={props.disabled}
                    // value={props.value}
                    // checked={props.checked}
                    // onChange={props.onChange}
                    />
                    {props.label}
                </label>
            </div>
        </div>
    </Grid>
)

export default labelCheckbox;