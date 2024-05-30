import React from 'react';
import NumberFormat from "react-number-format";

const handleFocus = (event) => {
    event.target.select()
};// seleciona tudo quando da o focus()

const inputNumericFormat = props => (
    <NumberFormat {...props}
        maxLength={(props.maxLength) ? props.maxLength : 20}
        
        ref={props.setFieldToBeFocused}// carrega uma funcao para atribuir o input ao ref e permitir o focus
        onFocus={handleFocus}

        //padrão para o componente
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={(props.decimalScale === undefined) ? 2 : props.decimalScale}
        fixedDecimalScale={(props.fixedDecimalScale === undefined) ? true : props.fixedDecimalScale}
        tabIndex={(props.readOnly) ? -1 : props.tabIndex} 
        onBlur={props.onBlur}
    />
)

export default inputNumericFormat;