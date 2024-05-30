import React from 'react';
import Grid from '../layout/grid';
import InfoTooltip from './InfoTooltip';

// const handleFocus = (event) => event.target.select();// seleciona tudo quando da o focus()

const labelAndInput = props => {

    let gridStyle = (props.style) ? props.style : {};

    if (props.wCol) gridStyle = { ...gridStyle, width: `${props.wCol}px` };
    if (props.type === 'date') gridStyle = { ...gridStyle, width: '150px' };

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
                    <input {...props.input} className={`form-control ${props.meta.touched && ((props.meta.error && 'form-valid') || (props.meta.warning && 'form-valid'))}`}
                        // style={props.style}
                        style={gridStyle}
                        placeholder={props.placeholder}
                        readOnly={props.readOnly}
                        type={props.type}
                        id={props.id}
                        min={props.min}// não funciona
                        max={props.max}// não funciona
                        maxLength={props.maxLength}
                        step={props.step}
                        // value={props.value}
                        // value={props.defaultValue}
                        // defaultValue={props.defaultValue}
                        // onBlur={props.onBlur}
                        onKeyDown={props.onKeyDown}
                        autoFocus={props.autoFocus}
                        // dataindex={props.index}
                        // onChange={props.onChange}

                        ref={props.setFieldToBeFocused}// carrega uma funcao para atribuir o input ao ref e permitir o focus
                        onKeyUp={props.onKeyUp}
                        tabIndex={(props.readOnly) ? -1 : props.tabIndex}
                        accept={props.accept}
                    // onFocus={handleFocus}

                    // data-proximo={props.proximo}// usado para entertab
                    />
                    {props.meta.touched && ((props.meta.error && <span className='msg_span'>{props.meta.error}</span>) || (props.meta.warning && <span className='msg_span'>{props.meta.warning}</span>))}

                </div>
            </Grid>
        </Grid>
    )
}

export default labelAndInput;