import React from 'react'
import Grid from '../layout/grid'

const labelAndInputChange = props => (
    <Grid cols={props.cols} style={props.colsStyle}>
        <div className='form-group form-group-sm'>
            <label className='label-gt' htmlFor={props.name} >{props.label}</label> {/*style={{float: 'right'}} */}
            <input {...props.input} className={`form-control ${props.inputClass}`}
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type}
                id={props.id}
                name={props.name}
                min={props.min}
                max={props.max}
                value={props.value}
                // defaultValue={props.defaultValue}
                onBlur={props.onBlur}
                onChange={props.onChange}
                tabIndex={(props.readOnly) ? -1 : props.tabIndex}
                accept={props.accept}
            />
            
        </div>
    </Grid>
)

export default labelAndInputChange;