import React from 'react'
import Grid from '../layout/grid'

const labelAndTextarea = props => (
    <Grid cols={props.cols}>
        <div className='form-group form-group-sm'>
            <label className='label-gt' htmlFor={props.name}>
                {props.label}
                <i className='label-optional'>{(props.isOptional) ? ` - Opcional` : ''}</i>
            </label>
            <textarea {...props.input} className={`form-control ${props.className}`}
                style={{ resize: 'none' }}
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type}
                id={props.id}
                name={props.name}
                min={props.min}
                max={props.max}
                rows={props.rows}
            />

        </div>
    </Grid>
)

export default labelAndTextarea;