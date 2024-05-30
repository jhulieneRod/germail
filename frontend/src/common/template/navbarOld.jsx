import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../auth/authActions'
import Button from '../form/button';
import { Modal } from 'react-bootstrap';
import AlterarSenha from '../../auth/alterarSenha';
import consts from '../../consts';
import LabelAndInputMaskDateChange from '../../common/form/labelAndInputMaskDateChange';
import ClienteSearch from '../../cliente/clienteSearch';
//import { reduxForm, Field } from 'redux-form';
import { required, requiredCompet } from '../../common/form/inputConfig';
import { msgWarning } from '../../common/msg/msg';
import { getListAll } from '../../combobox/comboBoxActions';
import { getCidadeListAll } from '../../cidade/cidadeActions';
import ClienteModalSelect from '../../cliente/clienteModalSelect';
import { getListComboBoxAll } from '../../combobox/comboBoxActions';

const userKey = '_cfg'

class Navbar extends Component {

    constructor(props) {
        super(props)

        this.props.getListAll();
        this.props.getCidadeListAll();
        this.props.getListComboBoxAll();

        this.handleClose = this.handleClose.bind(this);
        this.hideConsulta = this.hideConsulta.bind(this);
        this.changeSelecao = this.changeSelecao.bind(this);

        this.state = {
            open: false,
            show: false,
            showSelecao: this.carregarDados(0),

                filtroAux: {
                    periodo: this.retornarCompetenciaAtual(),
                    //cliente: this.carregarDados(1),
                    cliente: '',
                    nome: this.carregarDados(2) ? this.carregarDados(2) : ''
                }
        }     
    }

    carregarDados(tipo) {

        const aux = JSON.parse(localStorage.getItem('_cfg'));

        if (tipo === 0)
            return aux.showSelecao;
        else if (tipo === 1)
            return aux.cliente;
        else if (tipo === 2)
            return aux.nome;
    }

    retornarCompetenciaAtual() {
        const data = new Date();
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        return mes + '/' + ano;
    }

    hideConsulta() {
        this.setState({ showSelecao: false})
    }

    onChangePeriodo(event) {
        let filtroAux = this.state.filtroAux;
        filtroAux.periodo = event.target.value;
        this.setState({ filtroAux: filtroAux });
    }

    selecionaCliente(row) {

        if (row) {
            this.setState({ dsClienteSearch: row.nome });
            //this.setState({ cdClienteSearch: row.id });
            this.setState({ nome: row.nome });
            this.setState({ cliente: row.id });

            let filtroAux = this.state.filtroAux;
            filtroAux.cliente = row.id;
            filtroAux.nome = row.nome;
            this.setState({ filtroAux: filtroAux });

            let _cliente = row.id;
            this.setState({ cdClienteSearch: _cliente });
            
            console.log('_cliente', _cliente);
    
        } else {
            this.setState({ cliente: '' });
            this.setState({ nome: '' });
            this.setState({ dsClienteSearch: '' });
            this.setState({ cdClienteSearch: '' });
        }
    }

    aplicarFiltro() {
        if ((this.state.filtroAux.cliente === '') || (this.state.filtroAux.periodo === ''))
            msgWarning('Informe os campos obrigatórios');
        else {
            let filtroTela = this.state.filtroAux;
           
            filtroTela = {...filtroTela, showSelecao: false};

            localStorage.setItem(userKey, JSON.stringify(filtroTela))   
            
            this.setState({ showSelecao: false })
        }  
    }

    limparFiltro() {
        let filtroTela = this.state.filtroAux;

        filtroTela.cliente = '';
        filtroTela.periodo = '';
        filtroTela.nome = '';

        this.setState({ filtroAux: filtroTela })

        this.setState({ showSelecao: false })

    }

    changeSelecao() {

        const aux = JSON.parse(localStorage.getItem('_cfg'));

        let filtroAux = this.state.filtroAux;
        filtroAux.cliente = aux.cliente;
        filtroAux.nome = aux.nome;
        filtroAux.periodo = aux.periodo;

        this.state.dsClienteSearch = aux.nome;

        let _cliente = aux.cliente;

        this.setState({ filtroAux: filtroAux });
        this.setState({ cdClienteSearch: _cliente });
        this.setState({ cliente: _cliente })
    }

    changeOpen() {
        this.setState({ open: !this.state.open })
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {

        const { periodo, nome } = this.state.filtroAux;
        const { name, email } = this.props.user

        let nomeEmpresaSelecionada = nome.substring(0, 30);
        let periodoSelecionado = periodo;

        let nomeIniciais = name.split(' ');
        if (nomeIniciais.length > 1) {
            nomeIniciais = `${nomeIniciais[0][0]}${nomeIniciais[1][0]}`;
        } else {
            nomeIniciais = `${nomeIniciais[0][0]}${nomeIniciais[0][1]}`;
        }

        return (
            <>           
                <Modal show={this.state.showSelecao} 
                       onHide={this.hideConsulta} 
                    //    size={'lg'} // sm lg xl
                       dialogClassName='modal-dialog'
                >
                    <Modal.Header className='modal-header' closeButton>
                        <Modal.Title>Selecione</Modal.Title>
                    </Modal.Header>

                    <Modal.Body className='modal-body p-4'>                  

                        <ClienteSearch
                            name='id'
                            data-desc={this.state.dsClienteSearch}
                            onSelect={this.selecionaCliente}
                            onDescBlur={(row) => {
                                this.selecionaCliente(row);
                            }}
                            label='Cliente'
                            cols='12'
                            readOnly={false}
                            validate={required}
                            //value={this.state.cdClienteSearch}
                            value={this.state.cdClienteSearch}
                        />
                    
                        <LabelAndInputMaskDateChange
                            name='periodo'
                            label='Competência'
                            mask='99/9999'
                            cols='12 3'
                            placeholder='00/0000'
                            validate={requiredCompet}
                            value={this.state.filtroAux.periodo}
                            onChange={this.onChangePeriodo}
                        />
                    </Modal.Body>
            
                <ClienteModalSelect show={this.state.showSelecao}
                    onHide={() => {
                        this.changeSelecao();
                        this.setState({ showSelecao: false })
                    }}
                />

                <AlterarSenha show={this.state.show} onHide={this.handleClose} />

                <ul className='navbar-nav ml-auto'>
                    <li className='nav-item dropdown'>
                        <a
                            id='dropdownMenuEmpSel'
                            href='#'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                            className='nav-link dropdown-toggle'
                        >
                            <i className={`fa fa-home`}></i>
                            <span> {nomeEmpresaSelecionada.substring(0, 30)}</span>
                        </a>

                        <ul aria-labelledby='dropdownMenuEmpSel' className='dropdown-menu dropdown-menu-right shadow p-0' style={{ left: 'inherit', right: '0px' }}>
                            {/* <li className="text-center" style={{ padding: '4px', backgroundColor:'#c6c8ca', color: '#1b1e21', borderColor: '#c6c8ca' }}>
                                <div>Empresa selecionada</div>
                            </li> */}
                            <li style={{ textAlign: 'center', padding: '10px' }}>
                                <span>{nomeEmpresaSelecionada}</span>
                            </li>
                            <li className='dropdown-divider mb-0'></li>
                            {/* <li className="text-center" style={{ padding: '4px', backgroundColor:'#c6c8ca', color: '#1b1e21', borderColor: '#c6c8ca' }}>
                                <div>Período selecionada</div>
                            </li> */}
                            <li style={{ textAlign: 'center', padding: '10px' }}>
                                <span>Período: {periodoSelecionado}</span>
                            </li>

                            <li className='dropdown-divider m-0'></li>

                            <li style={{ padding: '0px' }}>
                                <Button type='button' className='btn btn-outline-info button_link button_down ml-0' icon='edit' label='Alterar' onClick={() => { this.setState({ showSelecao: true }); this.changeSelecao(); }} />
                            </li>
                        </ul>
                    </li>

                    {/* <li className='nav-item dropdown'>
                        <a
                            id='dropdownMenuConfig'
                            href='#'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                            className='nav-link dropdown-toggle'
                        >
                            <i className={`fa fa-cog`}></i>
                            <span> Configuração</span>
                        </a>
                    </li> */}


                    <li className='nav-item dropdown'>
                        <a
                            id='dropdownSubMenu1'
                            href='#'
                            data-toggle='dropdown'
                            aria-haspopup='true'
                            aria-expanded='false'
                            className='nav-link dropdown-toggle'>
                            <i className={`fa fa-user`}></i> <span>{name}</span>
                        </a>
                        <ul aria-labelledby='dropdownSubMenu1' className='dropdown-menu dropdown-menu-right border-0 shadow pb-0' style={{ left: 'inherit', right: '0px' }}>
                            <li style={{ textAlign: 'center', padding: '4px' }}>
                                <b>{name}</b>
                            </li>
                            <li style={{ textAlign: 'center', padding: '4px 10px' }}>
                                <small>{email}</small>
                            </li>

                            <li className='dropdown-divider mb-0'></li>

                            <li style={{ padding: '0px' }}>
                                <Button type='button' className='btn btn-outline-info button_link button_down ml-0' icon='key' label='Alterar Senha' onClick={() => { this.setState({ show: true }); this.changeOpen(); }} />
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
 
const mapDispatchToProps = dispatch => bindActionCreators({ logout, getListAll, getCidadeListAll }, dispatch)

const mapDispatchToProps = dispatch => bindActionCreators({ logout, getListComboBoxAll }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)