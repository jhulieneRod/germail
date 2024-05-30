import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import { init, create, update, getTelaList } from './usuarioActions';
import { required, requiredEmail, requiredPassword } from '../common/form/inputConfig';
import LabelAndInput from '../common/form/labelAndInput';
import LabelAndSelectForm from '../common/form/labelAndSelectForm';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import { CardBodyScroll, CardFooter } from '../common/layout/card';

let UsuarioForm = (props) => {

    useEffect(() => {
        props.getTelaList((props.formValue) ? props.formValue.id || 0 : 0);
    }, [])

    function salvarUsuario() {

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

    const { readOnly } = props;

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

                <Field
                    name='usuario'
                    maxLength={200}
                    component={LabelAndInput}
                    readOnly={readOnly}
                    label='Email'
                    cols='12'
                    placeholder='Informe o email para login'
                    validate={requiredEmail}
                />

                <Field
                    name='senha'
                    maxLength={100}
                    component={LabelAndInput}
                    readOnly={readOnly}
                    type='password'
                    label='Senha'
                    cols='12'
                    placeholder='Informe a senha'
                    validate={(readOnly) ? undefined : requiredPassword}
                    wCol="300"
                />

                <Field
                    name='confirmarSenha'
                    maxLength={100}
                    component={LabelAndInput}
                    readOnly={readOnly}
                    type='password'
                    label='Confirmar Senha'
                    cols='12'
                    placeholder='Confirme a senha'
                    validate={(readOnly) ? undefined : requiredPassword}
                    wCol="300"
                />

                <Field
                    name='tipo'
                    component={LabelAndSelectForm}
                    label='Tipo Usuário'
                    wCol="135"
                >
                    <option value='2'>Cliente</option>
                </Field>

                <Field name='x_ativo' component={LabelAndSelectForm} label='Ativo' wCol="100" >
                    <option value='1'>Sim</option>
                    <option value='0'>Não</option>
                </Field>

            </CardBodyScroll>
            <CardFooter>
                <Button type='button' className={props.submitClass} icon='check' label={props.submitLabel} onClick={salvarUsuario} />
                <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={() => { props.init() }} />
            </CardFooter>
        </form>
    )
}

UsuarioForm = reduxForm({ form: 'usuarioForm', destroyOnUnmount: false, })(UsuarioForm);

const mapStateToProps = state => ({
    formValue: getFormValues('usuarioForm')(state),
    listTela: state.usuarioCad.listTela,
});

const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, getTelaList }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UsuarioForm);