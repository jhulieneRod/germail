import React from 'react'
import Grid from '../layout/grid'

const labelAndSelectForm = props => {

    let gridStyle = (props.style) ? props.style : {};

    if (props.wCol) gridStyle = { ...gridStyle, width: `${props.wCol}px` };

    return (
        <Grid cols="12" className='p-0'> {/* adicionado para gerar sempre em uma linha só e permitir diminuir o tamnho dos campos sem eles se agruparem em uma linha só */}
            <Grid cols={props.cols} className={props.colsClass} style={props.colsStyle}>
                <div className='form-group form-group-sm'>
                    <label className='label-gt' htmlFor={props.name}>
                        {props.label}
                        <i className='label-optional'>{(props.isOptional) ? ` - Opcional` : ''}</i>
                    </label>
                    <select {...props.input}
                        className={`form-control ${props.meta.touched && ((props.meta.error && 'form-valid') || (props.meta.warning && 'form-valid'))}`}
                        placeholder={props.placeholder}
                        readOnly={props.readOnly}
                        id={props.id}
                        defaultValue={props.defaultValue}
                        disabled={props.disabled}
                        style={gridStyle}
                    >
                        {props.children}
                    </select>
                    {props.meta.touched && ((props.meta.error && <span className='msg_span'>{props.meta.error}</span>) || (props.meta.warning && <span className='msg_span'>{props.meta.warning}</span>))}
                </div>
            </Grid>
        </Grid>
    )
}
export default labelAndSelectForm;