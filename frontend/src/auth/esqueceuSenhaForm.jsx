import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';

import { init, esqueceuSenha } from './authActions';
import LabelAndInput from '../common/form/labelAndInput';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import Grid from '../common/layout/grid';
import {CardBody, CardFooter} from '../common/layout/card';

class EsqueceuSenhaForm extends Component {

    constructor(props) {
        super(props);

        this.salvaSenha = this.salvaSenha.bind(this);
    }

    salvaSenha() {

        if (!this.props.valid) {
            msgWarning('Preencha o campo de e-mail');
        } else {
            this.props.esqueceuSenha(this.props.formValue);
            this.props.onHide();
        }
    }

    render() {
        const { readOnly } = this.props;

        const requiredEmail = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'E-mail inválido' : undefined;

        return (
            <form >
                <CardBody>                    
                    <Grid cols='12'>
                        <label className='label-gt' htmlFor='cargofucanocargorel'>Informe seu e-mail cadastrado que enviaremos uma nova senha para acesso.</label>
                    </Grid>
                    <Field
                        name='email'
                        component={LabelAndInput}
                        readOnly={readOnly}
                        label=''
                        cols='12'
                        placeholder='Informe o email cadastrado'
                        validate={requiredEmail}
                    />

                </CardBody>
                <CardFooter>
                    <Button type='button' className='primary' icon='envelope' label='Enviar' onClick={this.salvaSenha} />
                    <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={this.props.onHide} />
                </CardFooter>
            </form>
        )
    }
}

EsqueceuSenhaForm = reduxForm({ form: 'esqueceusenhaForm', destroyOnUnmount: false, })(EsqueceuSenhaForm);
const mapStateToProps = state => ({
    formValue: getFormValues('esqueceusenhaForm')(state)
})
const mapDispatchToProps = dispatch => bindActionCreators({ init, esqueceuSenha }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EsqueceuSenhaForm);