import React, { useState } from 'react';
import Grid from '../layout/grid';
import InfoTooltip from './InfoTooltip';
import InputColor from 'react-input-color';

// const handleFocus = (event) => event.target.select();// seleciona tudo quando da o focus()

const InputColorPicker = props => {

    let gridStyle = (props.style) ? props.style : {};

    if (props.wCol) gridStyle = { ...gridStyle, width: `${props.wCol}px` };
    if (props.type === 'date') gridStyle = { ...gridStyle, width: '150px' };
    let colorInitial = props.input.value ?? '#5e72e4';

    return (
        <Grid cols="12" className='p-0'> {/* adicionado para gerar sempre em uma linha só e permitir diminuir o tamnho dos campos sem eles se agruparem em uma linha só */}
            {/* <Grid cols={props.cols} style={props.colsStyle} className={(props.className) ? props.className : ''} wCol={(props.type === 'date') ? 150 : props.wCol}> */}
            <Grid cols={props.cols} style={props.colsStyle} className={(props.className) ? props.className : ''} >
                <div className='form-group form-group-sm'>
                    <label className='label-gt' htmlFor={props.name}>
                        {props.label}
                        <i className='label-optional'>{(props.isOptional) ? ` - Opcional` : ''}</i>
                        <InfoTooltip info={props.info}></InfoTooltip>
                    </label>
                    {/* validate */}
                    <div>
                        <InputColor
                            initialValue={colorInitial}
                            placement="right"
                            onChange={props.onSelectCor}
                        />
                    </div>
                    
                    {props.meta.touched && ((props.meta.error && <span className='msg_span'>{props.meta.error}</span>) || (props.meta.warning && <span className='msg_span'>{props.meta.warning}</span>))}

                </div>
            </Grid>
        </Grid>
    )
}

export default InputColorPicker;