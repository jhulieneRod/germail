import React from 'react';
import Grid from '../layout/grid';
// import Row from '../layout/row';
import Button from './button';

const labelAndInputSearch = props => {

    // console.log('readOnly',props.readOnly);

    return (
        // <Row>
        <Grid cols={props.cols}>
            <div className='form-group form-group-sm'>
                <label className='label-gt' htmlFor={props.name}>{props.label}</label>
                <div className="input-group">
                    <input {...props.input} className={`form-control ${props.meta.touched && ((props.meta.error && 'form-valid') || (props.meta.warning && 'form-valid'))}`}
                        placeholder={props.placeholder}
                        readOnly={(props.readOnly !== undefined) ? props.readOnly : true}
                        type={props.type}
                        id={props.id}
                        min={props.min}
                        max={props.max}
                        maxLength={props.maxLength}
                        step={props.step}
                        // value={props.value}
                        // value={props.defaultValue}
                        // defaultValue={props.defaultValue}
                        // onBlur={props.onBlur}
                        onKeyDown={props.onKeyDown}
                        autoFocus={props.autoFocus}
                    // onChange={props.onChange}
                    />
                    <span className="input-group-btn">
                        <Button type='button' className='primary input_search_btn' icon='search' onClick={props.onBtnClick} />
                    </span>
                </div>
                {props.meta.touched && ((props.meta.error && <span className='msg_span'>{props.meta.error}</span>) || (props.meta.warning && <span className='msg_span'>{props.meta.warning}</span>))}

            </div>
        </Grid>
        // </Row>
    )
}

export default labelAndInputSearch;