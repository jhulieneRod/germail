import './auth.css';
import 'bootstrap-show-password/dist/bootstrap-show-password.min.js';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from './authActions';
import Messages from '../common/msg/messages';
import Input from '../common/form/inputAuth';
import InputPass from '../common/form/inputAuthPass';
import logo from '../common/image/LogoPretaHorizontal.png';
// import EsqueceuSenha from './esqueceuSenha';

class Auth extends Component {
    constructor(props) {
        super(props);

        this.showPass = this.showPass.bind(this);

        this.state = {
            loginMode: true,
            typeField: 'password',
            iconPass: 'fa-eye',
            // show: false
        }
    }

    showPass() {
        this.setState({
            typeField: (this.state.typeField === 'password') ? 'input' : 'password',
            iconPass: (this.state.typeField === 'password') ? 'fa-eye-slash' : 'fa-eye'
        });
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    onSubmit(values) {
        const { login } = this.props;
        login(values);
    }

    render() {
        const { typeField, iconPass } = this.state
        const { handleSubmit } = this.props
        return (
            <div className='login-page'>
                <div className='login-box'>
                    {/* <EsqueceuSenha show={this.state.show} onHide={this.handleClose} /> */}

                    <div className='card card-outline card-dark'>
                        <div className='card-header text-center'>
                            <img src={logo} className='img_logo_login p-0' alt='' style={{maxHeight : '70px'}} />
                        </div>
                        <div className='card-body'>
                            {/* <p className='login-box-msg'>You are only one step a way from your new password, recover your password now.</p> */}
                            <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
                                <Field component={Input} type='text' name='usuario' placeholder='Usuário' />
                                <Field component={InputPass} type={typeField} name='senha' placeholder='Senha' icon={iconPass} iconClick={this.showPass} />
                                <div className='row'>
                                    <div className='col-12'>
                                        <button type='submit' className='btn bg-dark btn-block m-0'>Entrar</button>
                                    </div>

                                </div>
                            </form>
                            {/* <p className='mt-3 mb-1'>
                                <button
                                    className='button_link_a'
                                    onClick={() => { this.setState({ show: true }) }}>Esqueceu sua senha?</button>
                            </p> */}
                        </div>
                        <Messages />
                    </div>
                </div>
            </div>
        )
    }
}

Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)