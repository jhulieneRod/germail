import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Modal } from 'react-bootstrap';
// import { msgQuestion } from '../common/msg/msg';
import Button from '../common/form/button';
import LabelAndInputMaskDate from '../common/form/labelAndInputMaskDate';
import ClienteFieldSearch from '../cliente/clienteFieldSearch';
import { reduxForm, Field } from 'redux-form';
import { required, requiredCompet } from '../common/form/inputConfig';
import { msgWarning } from '../common/msg/msg';

const userKey = '_cfg'

class DashboardFilter extends Component {

    constructor(props) {
        super(props);

        this.aplicarFiltro = this.aplicarFiltro.bind(this);
        this.onChangePeriodo = this.onChangePeriodo.bind(this);
        this.limparFiltro = this.limparFiltro.bind(this);
        this.selecionaCliente = this.selecionaCliente.bind(this);

        this.state = {
            dsClienteSearch: (this.props.formValue) ? this.props.formValue.cliente_nome : '',
            filtroAux: {
                periodo: '',
                cliente: '',
                nome: ''
            }
        }
    }

    onChangePeriodo(event) {
        this.props.onChangePeriodo(event.target.value);
        let filtroAux = this.state.filtroAux;
        filtroAux.periodo = event.target.value;
        this.setState({ filtroAux: filtroAux });
    }

    selecionaCliente(row) {
        if (row) {
            this.props.change('id', row.id);
            this.setState({ dsClienteSearch: row.nome });
            this.setState({ cliente: row.id });

            let filtroAux = this.state.filtroAux;
            filtroAux.cliente = row.id;
            filtroAux.nome = row.nome;
            this.setState({ filtroAux: filtroAux });
        } else {
            this.props.formValue.id = null;
            this.props.change('id', null);
            this.props.change('nome', '');
            this.setState({ dsClienteSearch: '' });
        }
    }

    aplicarFiltro() {
        if ((this.state.filtroAux.cliente === '') || (this.state.filtroAux.periodo === ''))
            msgWarning('Informe os campos obrigatórios');
        else {
            let filtroTela = this.state.filtroAux;
            this.props.onSave(filtroTela);
            localStorage.setItem(userKey, JSON.stringify(filtroTela))
        }  
    }

    limparFiltro() {
        let filtroTela = this.state.filtroAux;

        filtroTela.cliente = '';
        filtroTela.periodo = '';
        filtroTela.nome = '';

        this.setState({ filtroAux: filtroTela })
        this.props.onSave(filtroTela);
    }

    render() {

        return (

            //<Modal show={this.props.show} onHide={this.props.onHide} dialogClassName='modal-dialog'>
            
            <Modal dialogClassName='modal-dialog'>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>Selecione</Modal.Title>
                </Modal.Header>

                <Modal.Body className='modal-body'>
                
                   <ClienteFieldSearch
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
                    />

                    <Field
                        name='periodo'
                        component={LabelAndInputMaskDate}
                        label='Competência'
                        mask='99/9999'
                        cols='12 3'
                        placeholder='00/0000'
                        validate={requiredCompet}
                        value={this.state.filtroAux.periodo}
                        onChange={this.onChangePeriodo}
                    />
                </Modal.Body>

                <Modal.Footer className='modal_footer'>
                    <Button type='button' className='danger' icon='eraser' label='Cancelar' onClick={this.limparFiltro} />
                    <Button type='button' className='primary' icon='check' label='OK' onClick={this.aplicarFiltro} />
                </Modal.Footer>
            </Modal>
        )
    }
}

DashboardFilter = reduxForm({ form: 'dashboardFilter', destroyOnUnmount: false, })(DashboardFilter);

const mapStateToProps = state => ({ list: state.clienteCad.list })
// const mapDispatchToProps = dispatch => bindActionCreators({ showUpdate, remove, update }, dispatch)
export default connect(mapStateToProps, null)(DashboardFilter)