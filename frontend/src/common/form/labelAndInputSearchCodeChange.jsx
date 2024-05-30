import React from 'react';
import Grid from '../layout/grid';
import Button from './button';

const LabelAndInputSearchCode = props => {
    return (
        <Grid cols={props.cols}>
            <div className='form-group form-group-sm'>
                <label className='label-gt' htmlFor={props.name}>{props.label}</label>
                <div className="input-group" >
                    <div className="input-group-prepend">
                        <input {...props.input}
                            className={`form-control`}
                            style={{ width: '100px', borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                            placeholder={props.placeholder}
                            readOnly={(props.readOnly !== undefined) ? props.readOnly : true}
                            type={props.type}
                            id={props.id}
                            min={props.min}
                            max={props.max}
                            maxLength={props.maxLength}
                            step={props.step}
                            onChange={props.onInputChange}
                            onBlur={props.onInputBlur}
                            onKeyDown={props.onKeyDown}
                            autoFocus={props.autoFocus}
                            value={props.value}
                        />
                        <Button
                            type='button'
                            className='primary input_search_btn input_search_btn_addon m-0'
                            icon='search'
                            onClick={props.onBtnClick}
                            disabled={(props.readOnly !== undefined) ? props.readOnly : true}
                        />
                    </div>
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
            </div>
        </Grid>
    )
}

export default LabelAndInputSearchCode;