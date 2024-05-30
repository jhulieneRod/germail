import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { required, requiredPassword } from '../common/form/inputConfig';
import { init, updateSenha, logout } from './authActions';
import LabelAndInput from '../common/form/labelAndInput';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import {CardBody, CardFooter} from '../common/layout/card';

class AlterarSenhaForm extends Component {

    constructor(props) {
        super(props);

        this.salvaSenha = this.salvaSenha.bind(this);
    }    

    salvaSenha() {
        console.log('aqui');

        if (!this.props.valid) {
            msgWarning('Preencha todos os campos');
        } else {

            if (this.props.formValue.senha_nova === this.props.formValue.senha_confirmar ){
                this.props.updateSenha(this.props.formValue);                
                this.props.onHide();                
            } else {
                msgWarning('"Confirmar Senha" está diferente de "Nova Senha"');
            }
        }
    }

    render() {
        const { readOnly } = this.props;

        // const requiredSenha = value => (value || readOnly) ? undefined : 'Obrigatório';
        
        // const requiredSenhaNova = value => {
        //     if (!value) return 'Obrigatório';
        
        //     const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/;
        //     if (regExp.test(value)) {
        //         return undefined
        //     } else {        
        //         return 'Mínimo de oito caracteres, pelo menos uma letra, um número e um caractere especial(@$.!%*#?&)';
        //     }
        // }

        return (
            <form >
                <CardBody>
                    <Field
                        name='senha_atual'
                        component={LabelAndInput}
                        readOnly={readOnly}
                        type='password'
                        label='Senha Atual'
                        cols='12'
                        placeholder='Informe a senha'
                        validate={required}
                    />

                    <Field
                        name='senha_nova'
                        component={LabelAndInput}
                        readOnly={readOnly}
                        type='password'
                        label='Nova Senha'
                        cols='12'
                        placeholder='Informe a senha'
                        validate={requiredPassword}
                    />

                    <Field
                        name='senha_confirmar'
                        component={LabelAndInput}
                        readOnly={readOnly}
                        type='password'
                        label='Confirmar Senha'
                        cols='12'
                        placeholder='Informe a senha'
                        validate={requiredPassword}
                    />

                </CardBody>
                <CardFooter>
                    <Button type='button' className='primary' icon='check' label='Salvar' onClick={this.salvaSenha}/>
                    <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={this.props.onHide} />
                </CardFooter>
            </form>
        )
    }
}

AlterarSenhaForm = reduxForm({ form: 'alterarsenhaForm', destroyOnUnmount: false, })(AlterarSenhaForm);

// const selector = formValueSelector('controladorForm');
const mapStateToProps = state => ({
    formValue: getFormValues('alterarsenhaForm')(state)
})


const mapDispatchToProps = dispatch => bindActionCreators({ init, updateSenha, logout }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AlterarSenhaForm);