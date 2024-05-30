import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { required } from '../common/form/inputConfig';
import { init, create, update } from './tagActions';
import LabelAndInput from '../common/form/labelAndInput';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import { CardBodyScroll, CardFooter } from '../common/layout/card';
import inputColorPicker from '../common/form/inputColorPicker';

let TagForm = (props) => {
    const [cor, setCor] = useState({});

    function salvarTag() {
        if (!props.valid) {
            msgWarning('Informe os campos obrigatórios');
            props.handleSubmit();
        } else {
            props.formValue.cor = cor.hex;
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
                    name='titulo'
                    maxLength={100}
                    component={LabelAndInput}
                    label='Título'
                    cols='12'
                    placeholder='Informe o título'
                    validate={required}
                />

                <Field
                    name='descricao'
                    maxLength={200}
                    component={LabelAndInput}
                    label='Descrição'
                    cols='12'
                    placeholder='Informe a descrição'
                />

                <Field
                    name='cor'
                    maxLength={200}
                    component={inputColorPicker}
                    label='Cor'
                    cols='12'
                    onSelectCor={setCor}
                />

            </CardBodyScroll>
            <CardFooter>
                <Button type='button' className={props.submitClass} icon='check' label={props.submitLabel} onClick={salvarTag} />
                <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={() => { props.init() }} />
            </CardFooter>
        </form>
    )
}

TagForm = reduxForm({ form: 'tagForm', destroyOnUnmount: false, })(TagForm);

const mapStateToProps = state => ({
    formValue: getFormValues('tagForm')(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(TagForm);