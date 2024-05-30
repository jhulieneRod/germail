import React from 'react';
import InputMask from 'react-input-mask';

const inputMaskDate = props => (
    <InputMask {...props}
        className={props.className}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
        type={props.type}
        id={props.id}
        min={props.min}
        max={props.max}
        maxLength={props.maxLength}
        step={props.step}
        // value={props.value}
        // value={props.defaultValue}
        // defaultValue={props.defaultValue}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyDown}
        autoFocus={props.autoFocus}

        mask={props.mask}
        value={props.value}
        onChange={props.onChange}
    />
)

export default inputMaskDate;