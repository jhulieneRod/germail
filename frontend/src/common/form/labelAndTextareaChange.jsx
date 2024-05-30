import React from 'react'
import Grid from '../layout/grid'

const labelAndTextareaChange = props => (
    <Grid cols={props.cols}>
        <div className='form-group form-group-sm'>
            <label className='label-gt' htmlFor={props.name}>{props.label}</label>
            <textarea {...props.input} className={`form-control ${props.className}`}
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type}
                id={props.id}
                name={props.name}
                min={props.min}
                max={props.max}
                value={props.value}
                onBlur={props.onBlur}
                onChange={props.onChange}
                rows={props.rows}
            />
            
        </div>
    </Grid>
)

export default labelAndTextareaChange;