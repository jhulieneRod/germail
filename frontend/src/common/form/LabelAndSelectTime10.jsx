import React from 'react';
import { Field } from 'redux-form';
import LabelAndSelectForm from './labelAndSelectForm';
import { parseISO, format, addMinutes } from 'date-fns';

const LabelAndSelectTime10 = props => {    

    function getOption() {
        let timeZero = parseISO('1900-01-01 00:00:00');
        let optionList = [];        

        for (let idx = 0; idx < 144; idx++) {                        
            optionList.push(<option value={`${format(timeZero, 'HH:mm:ss')}`}>{format(timeZero, 'HH:mm')}</option>);
            timeZero = addMinutes(timeZero, 10);
        }     
        
        return optionList;
    }

    return (
        <Field
            name={props.name}
            component={LabelAndSelectForm}
            label={props.label}
        >
            {getOption()}
        </Field>)
}
export default LabelAndSelectTime10;