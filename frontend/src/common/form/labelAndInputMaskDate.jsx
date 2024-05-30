import React from 'react';
import Grid from '../layout/grid';
import InputMask from 'react-input-mask';

const LabelAndInputMaskDate = props => {

    // let wCol = props.wCol;
    let gridStyle = props.wCol ? { width: `${props.wCol}px` } : {};

    if (props.mask === '99:99') gridStyle = { width: '100px' };
    if (props.mask === '99/9999') gridStyle = { width: '120px' };

    // mask='99:99'
    return (
        <Grid cols="12" className='p-0'> {/* adicionado para gerar sempre em uma linha só e permitir diminuir o tamnho dos campos sem eles se agruparem em uma linha só */}
            {/* <Grid cols={props.cols} wCol={wCol}> */}
            <Grid cols={props.cols}>
                <div className='form-group form-group-sm'>
                    <label className='label-gt' htmlFor={props.name}>{props.label}
                        <i className='label-optional'>{(props.isOptional) ? ` - Opcional` : ''}</i>
                    </label>
                    <InputMask
                        {...props.input} className={`form-control ${props.meta.touched && ((props.meta.error && 'form-valid') || (props.meta.warning && 'form-valid'))}`}
                        placeholder={props.placeholder}
                        readOnly={props.readOnly}
                        type={props.type}
                        id={props.id}
                        min={props.min}
                        max={props.max}
                        maxLength={props.maxLength}
                        step={props.step}
                        style={gridStyle}
                        // value={props.value}
                        // value={props.defaultValue}
                        // defaultValue={props.defaultValue}
                        // onBlur={props.onBlur}
                        onKeyDown={props.onKeyDown}
                        autoFocus={props.autoFocus}

                        mask={props.mask}
                    // value={props.value}
                    // onChange={props.onChange}
                    >
                        {/* {(inputprops) => <MaterialInput {...inputprops} type="tel" disableUnderline />} */}
                    </InputMask>
                    {props.meta.touched && ((props.meta.error && <span className='msg_span'>{props.meta.error}</span>) || (props.meta.warning && <span className='msg_span'>{props.meta.warning}</span>))}
                </div>
            </Grid>
        </Grid>
    )
}

export default LabelAndInputMaskDate;