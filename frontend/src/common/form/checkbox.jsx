import React from 'react'
import Grid from '../layout/grid'

const checkbox = props => (
    <Grid cols={props.cols}>
        {/* <div className='form-group form-check'>
            <input {...props.input}
                readOnly={props.readOnly}
                type={props.type}
                id={props.id}
                // style={{marginRight:'5px', marginTop:'15px'}}
                className={`form-check-input label_checkbox ${(props.className) ? props.className : ''}`}
                disabled={props.disabled}
            // value={props.value}
            // checked={props.checked}
            // onChange={props.onChange}
            />
            <label className='form-check-label' htmlFor={props.name}  >{props.label}</label>
        </div> */}

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
    </Grid>
)

export default checkbox;