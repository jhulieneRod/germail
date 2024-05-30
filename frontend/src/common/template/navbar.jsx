import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout  } from '../../auth/authActions'
import Button from '../form/button';
// import AlterarSenha from '../../auth/alterarSenha';
import consts from '../../consts';
// import { getListComboBoxAll } from '../../combobox/comboBoxActions';


class Navbar extends Component {
    constructor(props) {
        super(props)    

        this.state = {
            open: false
        }
    }


    changeOpen() {
        this.setState({ open: !this.state.open })
    }

    render() {        
        const { nome, email } = this.props.user

        let nomeIniciais = nome.split(' ');
        if (nomeIniciais.length > 1) {
            nomeIniciais = `${nomeIniciais[0][0]}${nomeIniciais[1][0]}`;
        } else {
            nomeIniciais = `${nomeIniciais[0][0]}${nomeIniciais[0][1]}`;
        }

        return (
            <>

                {/* <AlterarSenha show={this.state.show} onHide={this.handleClose} /> */}

                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item dropdown'>
                        <a
                            id='dropdownSubMenu1'
                            href='#'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                            className='nav-link dropdown-toggle'>
                            <i className={`fa fa-user`}></i> <span>{nome}</span>
                        </a>
                        <ul aria-labelledby='dropdownSubMenu1' className='dropdown-menu dropdown-menu-right border-0 shadow pb-0' style={{ left: 'inherit', right: '0px' }}>
                            <li style={{ textAlign: 'center', padding: '4px' }}>
                                <b>{nome}</b>
                            </li>
                            <li style={{ textAlign: 'center', padding: '4px 10px' }}>
                                <small>{email}</small>
                            </li>

                            <li className='dropdown-divider mb-0'></li>

                            <li style={{ padding: '0px' }}>
                                {/* <Button type='button' className='btn btn-outline-info button_link button_down ml-0' icon='key' label='Alterar Senha' onClick={() => { this.setState({ show: true }); this.changeOpen(); }} /> */}
                            </li>
                            <li style={{ padding: '0px' }} >
                                <Button type='button' className='btn btn-outline-info button_link button_down ml-0' icon='sign-out-alt' label='Sair' onClick={this.props.logout} />
                            </li>

                            <li className="user-footer" style={{ padding: '0px' }}>
                                <div className='dropdown_menu_versao'><small><strong>Versão: {consts.VERSION}</strong></small></div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </>
        )
    }
}

const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)