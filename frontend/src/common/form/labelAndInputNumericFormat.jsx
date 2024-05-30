import React from 'react';
import Grid from '../layout/grid';
import NumberFormat from 'react-number-format';

const handleFocus = (event) => {
    event.target.select()
};// seleciona tudo quando da o focus()

const labelAndInputNumericFormat = props => (
    <Grid cols={props.cols} className={props.colsClass} style={props.colsStyle}>
        <div className='form-group form-group-sm'>
            <label className='label-gt' htmlFor={props.name}>{props.label}</label>
            
            <NumberFormat {...props.input} className={`form-control ${props.meta.touched && ((props.meta.error && 'form-valid') || (props.meta.warning && 'form-valid'))} ${props.inputClass}`}
                placeholder={props.placeholder}
                readOnly={props.readOnly}
                type={props.type}
                id={props.id}
                maxLength={(props.maxLength) ? props.maxLength : 20}
                step={props.step}
                onKeyDown={props.onKeyDown}
                autoFocus={props.autoFocus}

                ref={props.setFieldToBeFocused}// carrega uma funcao para atribuir o input ao ref e permitir o focus
                onKeyUp={props.onKeyUp}
                onFocus={handleFocus}

                style={ props.wCol ? {width: `${props.wCol}px` } : {}}

                //padrão para o componente
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={(props.decimalScale) ? props.decimalScale : 2}
                fixedDecimalScale={(props.fixedDecimalScale === undefined) ? true : props.fixedDecimalScale}
                tabIndex={(props.readOnly) ? -1 : props.tabIndex}
            />
            {props.meta.touched && ((props.meta.error && <span className='msg_span'>{props.meta.error}</span>) || (props.meta.warning && <span className='msg_span'>{props.meta.warning}</span>))}

        </div>
    </Grid>
)

export default labelAndInputNumericFormat;