import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { required } from '../common/form/inputConfig';
import { init, create, update } from './sequenciaActions';
import LabelAndInput from '../common/form/labelAndInput';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import { CardBodyScroll, CardFooter } from '../common/layout/card';

let SequenciaForm = (props) => {

    function salvarSequencia() {
        if (!props.valid) {
            msgWarning('Informe os campos obrigatórios');
            props.handleSubmit();
        } else {
            if (props.readOnly) {
                props.update(props.formValue);
            } else {
                props.create(props.formValue);
            }
        }
    }

    return (
        <form name={props.name}>
            <CardBodyScroll>
                <Field
                    name='id'
                    component={LabelAndInput}
                    readOnly={true}
                    label='Código'
                    cols='12'
                    placeholder='Automático'
                    wCol="135"
                />

                <Field
                    name='nome'
                    maxLength={100}
                    component={LabelAndInput}
                    label='Nome'
                    cols='12'
                    placeholder='Informe o nome'
                    validate={required}
                />
            </CardBodyScroll>
            <CardFooter>
                <Button type='button' className={props.submitClass} icon='check' label={props.submitLabel} onClick={salvarSequencia} />
                <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={() => { props.init() }} />
            </CardFooter>
        </form>
    )
}

SequenciaForm = reduxForm({ form: 'sequenciaForm', destroyOnUnmount: false, })(SequenciaForm);

const mapStateToProps = state => ({
    formValue: getFormValues('sequenciaForm')(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SequenciaForm);