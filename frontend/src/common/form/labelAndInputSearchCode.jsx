import React from 'react';
import Grid from '../layout/grid';
import Button from './button';
import IF from '../operator/if';

const LabelAndInputSearchCode = props => {
    return (
        <Grid cols={props.cols}>
            <div className='form-group form-group-sm'>
                {/* <label className='label-gt' htmlFor={props.name}>{props.label}</label> */}
                <label className='label-gt' htmlFor={props.name}>
                    {props.label}
                    <i className='label-optional'>{(props.isOptional) ? ` - Opcional` : ''}</i>
                </label>                

                <div className="input-group" >
                    <IF condicao={!props.ocultaPesquisa}>
                        <div className="input-group-prepend">
                            <input {...props.input}
                                className={`form-control ${props.meta.touched && ((props.meta.error && 'form-valid') || (props.meta.warning && 'form-valid'))}`}
                                style={{ width: props.isMultipleSelection ? '450px' : '100px', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                                placeholder={props.placeholder}
                                readOnly={(props.readOnly !== undefined) ? props.readOnly : true}
                                type={props.type}
                                id={props.id}
                                min={props.min}
                                max={props.max}
                                maxLength={props.maxLength}
                                step={props.step}
                                onBlur={props.onInputBlur}
                                onKeyDown={props.onKeyDown}
                                autoFocus={props.autoFocus}
                            />
                            <Button
                                type='button'
                                className='primary input_search_btn input_search_btn_addon m-0'
                                icon='search'
                                onClick={props.onBtnClick}
                                disabled={(props.readOnly !== undefined) ? props.readOnly : true}
                            />
                        </div>
                    </IF>
                    <input
                        className="form-control"
                        readOnly={true}
                        type={'text'}
                        id={`${props.id}_descSearch`}
                        tabIndex={-1}
                        onChange={props.onDescChange}
                        value={props['data-desc']}
                    />
                </div>
                {props.meta.touched && ((props.meta.error && <span className='msg_span'>{props.meta.error}</span>) || (props.meta.warning && <span className='msg_span'>{props.meta.warning}</span>))}
            </div>
        </Grid>
    )
}

export default LabelAndInputSearchCode;